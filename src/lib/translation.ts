import { z } from "zod";

import { promptVersions } from "@/lib/prompts/types";

export const MAX_INPUT_LENGTH = 2_000;

export const translationRequestSchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(1, "Enter something to translate.")
      .max(MAX_INPUT_LENGTH, `Keep it under ${MAX_INPUT_LENGTH} characters.`),
    direction: z.enum(["standard-to-alpha", "alpha-to-standard"]),
    promptVersion: z.enum(promptVersions).optional(),
  })
  .strict();

export const translationResponseSchema = z.object({
  translation: z.string().min(1),
  explanations: z
    .array(
      z.object({
        original: z.string().min(1),
        translated: z.string().min(1),
        reason: z.string().min(1),
      }),
    )
    .max(5),
});

export type TranslationRequest = z.infer<typeof translationRequestSchema>;
export type TranslationResponse = z.infer<typeof translationResponseSchema>;
