import { z } from "zod";

import {
  translationResponseSchema,
  type TranslationResponse,
} from "@/lib/translation";

const STORAGE_KEY = "gen-alpha-translator:feedback:v1";

export const localFeedbackEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_ENABLE_LOCAL_FEEDBACK === "true";

export type FeedbackRating = "up" | "down";

export type LocalFeedbackRecord = {
  id: string;
  timestamp: string;
  input: string;
  direction: "standard-to-alpha" | "alpha-to-standard";
  promptVersion: string;
  rating: FeedbackRating;
  result: TranslationResponse;
};

const localFeedbackRecordSchema = z.object({
  id: z.string().min(1),
  timestamp: z.string().min(1),
  input: z.string(),
  direction: z.enum(["standard-to-alpha", "alpha-to-standard"]),
  promptVersion: z.string().min(1),
  rating: z.enum(["up", "down"]),
  result: translationResponseSchema,
});

const localFeedbackSchema = z.array(localFeedbackRecordSchema);

export function readLocalFeedback(): LocalFeedbackRecord[] {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    const parsed = localFeedbackSchema.safeParse(JSON.parse(stored));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

export function saveLocalFeedback(record: LocalFeedbackRecord) {
  const records = readLocalFeedback();
  const existingIndex = records.findIndex((item) => item.id === record.id);

  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    records.push(record);
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
