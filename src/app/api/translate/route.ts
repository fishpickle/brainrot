import { createHash } from "node:crypto";

import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

import {
  defaultPromptVersion,
  getTranslationPrompt,
} from "@/lib/prompts";
import {
  MAX_OUTPUT_TOKENS,
  MAX_REQUEST_BYTES,
  OPENAI_MAX_RETRIES,
  OPENAI_REQUEST_TIMEOUT_MS,
  translationRequestSchema,
  translationResponseSchema,
} from "@/lib/translation";

export const runtime = "nodejs";
export const maxDuration = 15;

let client: OpenAI | undefined;

function getOpenAI() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: OPENAI_REQUEST_TIMEOUT_MS,
      maxRetries: OPENAI_MAX_RETRIES,
    });
  }

  return client;
}

function getSafetyIdentifier(clientId: string) {
  return createHash("sha256")
    .update(`gen-alpha-translator:v1:${clientId}`)
    .digest("hex");
}

async function parseRequestBody(request: Request) {
  const contentType = request.headers.get("content-type");

  if (!contentType?.toLowerCase().startsWith("application/json")) {
    return {
      error: "The request must use application/json.",
      status: 415,
    } as const;
  }

  const declaredLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return { error: "The request is too large.", status: 413 } as const;
  }

  const rawBody = await request.text();

  if (Buffer.byteLength(rawBody, "utf8") > MAX_REQUEST_BYTES) {
    return { error: "The request is too large.", status: 413 } as const;
  }

  try {
    return { body: JSON.parse(rawBody) as unknown } as const;
  } catch {
    return {
      error: "The request must contain valid JSON.",
      status: 400,
    } as const;
  }
}

function getModel() {
  return process.env.OPENAI_MODEL?.trim() || "gpt-5.6-terra";
}

function logTranslationError(error: unknown) {
  if (error instanceof OpenAI.APIError) {
    console.error("Translation request failed:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      status: error.status,
      code: error.code,
      requestId: error.requestID,
    });
    return;
  }

  console.error(
    "Translation request failed:",
    error instanceof Error
      ? { name: error.name, message: error.message, stack: error.stack }
      : { error: "Unknown error" },
  );
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Translation is temporarily unavailable." },
      { status: 503 },
    );
  }

  let requestBody: Awaited<ReturnType<typeof parseRequestBody>>;

  try {
    requestBody = await parseRequestBody(request);
  } catch {
    return NextResponse.json(
      { error: "The request could not be read." },
      { status: 400 },
    );
  }

  if ("error" in requestBody) {
    return NextResponse.json(
      { error: requestBody.error },
      { status: requestBody.status },
    );
  }

  const parsedRequest = translationRequestSchema.safeParse(requestBody.body);

  if (!parsedRequest.success) {
    return NextResponse.json(
      {
        error:
          parsedRequest.error.issues[0]?.message ??
          "Check the translation request.",
      },
      { status: 400 },
    );
  }

  if (
    process.env.NODE_ENV === "production" &&
    parsedRequest.data.promptVersion &&
    parsedRequest.data.promptVersion !== defaultPromptVersion
  ) {
    return NextResponse.json(
      { error: "Only the current translation prompt is available." },
      { status: 400 },
    );
  }

  try {
    const prompt = getTranslationPrompt(
      parsedRequest.data.promptVersion ?? defaultPromptVersion,
    );
    const model = getModel();
    const outputTokenLimit = MAX_OUTPUT_TOKENS;
    const response = await getOpenAI().responses.parse({
      model,
      store: false,
      safety_identifier: getSafetyIdentifier(parsedRequest.data.clientId),
      reasoning: { effort: "none" },
      max_output_tokens: outputTokenLimit,
      instructions: prompt.buildInstructions({
        direction: parsedRequest.data.direction,
      }),
      input: parsedRequest.data.text,
      text: {
        format: zodTextFormat(
          translationResponseSchema,
          "translation_result",
        ),
      },
    });

    const parsedResponse = translationResponseSchema.safeParse(
      response.output_parsed,
    );

    if (response.status !== "completed" || !parsedResponse.success) {
      console.error(JSON.stringify({
        level: "error",
        event: "translation.invalid_response",
        responseId: response.id,
        model,
        promptVersion: prompt.version,
        status: response.status,
        incompleteReason: response.incomplete_details?.reason ?? null,
        outputTokenLimit,
        inputTokens: response.usage?.input_tokens ?? null,
        outputTokens: response.usage?.output_tokens ?? null,
        outputTypes: response.output.map((item) => item.type),
        validationIssues: parsedResponse.success ? [] : parsedResponse.error.issues.map(
          ({ code, path }) => ({ code, path }),
        ),
      }));
      throw new Error("The model returned an invalid translation.");
    }

    console.log(
      JSON.stringify({
        level: "info",
        event: "translation.completed",
        route: "/api/translate",
        requestId: request.headers.get("x-vercel-id"),
        responseId: response.id,
        promptVersion: prompt.version,
        model,
        direction: parsedRequest.data.direction,
        inputCharacters: parsedRequest.data.text.length,
        outputTokenLimit,
        inputTokens: response.usage?.input_tokens ?? null,
        cachedInputTokens:
          response.usage?.input_tokens_details.cached_tokens ?? null,
        cacheWriteTokens:
          response.usage?.input_tokens_details.cache_write_tokens ?? null,
        outputTokens: response.usage?.output_tokens ?? null,
        reasoningTokens:
          response.usage?.output_tokens_details.reasoning_tokens ?? null,
        totalTokens: response.usage?.total_tokens ?? null,
        durationMs: Date.now() - startedAt,
      }),
    );

    return NextResponse.json(parsedResponse.data, {
      headers: { "X-Prompt-Version": prompt.version },
    });
  } catch (error) {
    logTranslationError(error);

    return NextResponse.json(
      { error: "We couldn't translate that. Please try again." },
      { status: 502 },
    );
  }
}
