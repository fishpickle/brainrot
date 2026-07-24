import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";

import { buildTranslationInstructions } from "@/lib/prompt";
import {
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
      timeout: 12_000,
      maxRetries: 1,
    });
  }

  return client;
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
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Translation is temporarily unavailable." },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "The request must contain valid JSON." },
      { status: 400 },
    );
  }

  const parsedRequest = translationRequestSchema.safeParse(body);

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

  try {
    const response = await getOpenAI().responses.parse({
      model: getModel(),
      reasoning: { effort: "none" },
      max_output_tokens: 1_200,
      instructions: buildTranslationInstructions(parsedRequest.data),
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

    if (!parsedResponse.success) {
      throw new Error("The model returned an invalid translation.");
    }

    return NextResponse.json(parsedResponse.data);
  } catch (error) {
    logTranslationError(error);

    return NextResponse.json(
      { error: "We couldn't translate that. Please try again." },
      { status: 502 },
    );
  }
}
