import { z } from "zod";

import {
  translationResponseSchema,
  type TranslationRequest,
  type TranslationResponse,
} from "@/lib/translation";

const STORAGE_KEY = "gen-alpha-translator:feedback:v1";

export const localFeedbackEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_ENABLE_LOCAL_FEEDBACK === "true";

export const translationFailureReasons = [
  { value: "not-transformed-enough", label: "Not transformed enough" },
  { value: "meaning-changed", label: "Meaning changed" },
  { value: "unnatural-or-forced", label: "Unnatural or forced" },
  { value: "culturally-weak-or-dated", label: "Culturally weak or dated" },
  {
    value: "unsupported-invention",
    label: "Too much unsupported invention",
  },
  { value: "profanity-not-sanitized", label: "Profanity not sanitized" },
  { value: "other", label: "Other" },
] as const;

export const explanationFailureReasons = [
  { value: "span-too-broad", label: "Span too broad" },
  { value: "spans-do-not-correspond", label: "Spans do not correspond" },
  { value: "reason-inaccurate", label: "Reason is inaccurate" },
  { value: "important-change-omitted", label: "Important change omitted" },
  { value: "unnecessary-explanation", label: "Unnecessary explanation" },
  { value: "profanity-not-redacted", label: "Profanity not redacted" },
  { value: "other", label: "Other" },
] as const;

export type TranslationRating = "up" | "down";
export type ExplanationRating = "aligned" | "misaligned";
export type TranslationFailureReason =
  (typeof translationFailureReasons)[number]["value"];
export type ExplanationFailureReason =
  (typeof explanationFailureReasons)[number]["value"];

export type LocalFeedbackRecord = {
  id: string;
  timestamp: string;
  input: string;
  direction: TranslationRequest["direction"];
  promptVersion: string;
  runNumber: number;
  translationRating: TranslationRating;
  translationFailureReason?: TranslationFailureReason;
  explanationRating: ExplanationRating | null;
  explanationFailureReason?: ExplanationFailureReason;
  result: TranslationResponse;
};

const translationFailureReasonSchema = z.enum(
  translationFailureReasons.map((reason) => reason.value) as [
    TranslationFailureReason,
    ...TranslationFailureReason[],
  ],
);

const explanationFailureReasonSchema = z.enum(
  explanationFailureReasons.map((reason) => reason.value) as [
    ExplanationFailureReason,
    ...ExplanationFailureReason[],
  ],
);

const localFeedbackRecordSchema = z.object({
  id: z.string().min(1),
  timestamp: z.string().min(1),
  input: z.string(),
  direction: z.enum(["standard-to-alpha", "alpha-to-standard"]),
  promptVersion: z.string().min(1),
  runNumber: z.number().int().positive(),
  translationRating: z.enum(["up", "down"]),
  translationFailureReason: translationFailureReasonSchema.optional(),
  explanationRating: z.enum(["aligned", "misaligned"]).nullable(),
  explanationFailureReason: explanationFailureReasonSchema.optional(),
  result: translationResponseSchema,
}).superRefine((record, context) => {
  if (record.translationRating === "up" && record.translationFailureReason) {
    context.addIssue({
      code: "custom",
      path: ["translationFailureReason"],
      message: "A positive translation cannot have a failure reason.",
    });
  }

  if (
    record.explanationRating !== "misaligned" &&
    record.explanationFailureReason
  ) {
    context.addIssue({
      code: "custom",
      path: ["explanationFailureReason"],
      message: "Only a misaligned explanation can have a failure reason.",
    });
  }
});

const localFeedbackSchema = z.array(localFeedbackRecordSchema);

const legacyFeedbackSchema = z.array(
  z.object({
    id: z.string().min(1),
    timestamp: z.string().min(1),
    input: z.string(),
    direction: z.enum(["standard-to-alpha", "alpha-to-standard"]),
    promptVersion: z.string().min(1),
    rating: z.enum(["up", "down"]),
    result: translationResponseSchema,
  }),
);

function migrateLegacyFeedback(
  records: z.infer<typeof legacyFeedbackSchema>,
): LocalFeedbackRecord[] {
  const runCounts = new Map<string, number>();

  return records.map(({ rating, ...record }) => {
    const runKey = JSON.stringify([
      record.promptVersion,
      record.direction,
      record.input,
    ]);
    const runNumber = (runCounts.get(runKey) ?? 0) + 1;

    runCounts.set(runKey, runNumber);

    return {
      ...record,
      runNumber,
      translationRating: rating,
      explanationRating: null,
    };
  });
}

export function readLocalFeedback(): LocalFeedbackRecord[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    const json: unknown = JSON.parse(stored);
    const parsed = localFeedbackSchema.safeParse(json);

    if (parsed.success) return parsed.data;

    const legacy = legacyFeedbackSchema.safeParse(json);
    return legacy.success ? migrateLegacyFeedback(legacy.data) : [];
  } catch {
    return [];
  }
}

export function getNextRunNumber({
  input,
  direction,
  promptVersion,
}: Pick<LocalFeedbackRecord, "input" | "direction" | "promptVersion">) {
  return (
    readLocalFeedback().reduce(
      (highest, record) =>
        record.input === input &&
        record.direction === direction &&
        record.promptVersion === promptVersion
          ? Math.max(highest, record.runNumber)
          : highest,
      0,
    ) + 1
  );
}

export function saveLocalFeedback(record: LocalFeedbackRecord) {
  const parsedRecord = localFeedbackRecordSchema.parse(record);
  const records = readLocalFeedback();
  const existingIndex = records.findIndex((item) => item.id === record.id);

  if (existingIndex >= 0) {
    records[existingIndex] = parsedRecord;
  } else {
    records.push(parsedRecord);
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  return records.length;
}

export function clearLocalFeedback() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function exportLocalFeedback() {
  const records = readLocalFeedback();
  const blob = new Blob([JSON.stringify(records, null, 2)], {
    type: "application/json",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `gen-alpha-feedback-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  window.URL.revokeObjectURL(url);
}
