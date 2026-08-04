"use client";

import { type FormEvent, useEffect, useState } from "react";

import {
  MAX_INPUT_LENGTH,
  type TranslationRequest,
  type TranslationResponse,
  translationResponseSchema,
} from "@/lib/translation";
import {
  clearLocalFeedback,
  explanationFailureReasons,
  exportLocalFeedback,
  getNextRunNumber,
  type ExplanationFailureReason,
  type ExplanationRating,
  localFeedbackEnabled,
  readLocalFeedback,
  saveLocalFeedback,
  translationFailureReasons,
  type TranslationFailureReason,
  type TranslationRating,
} from "@/lib/local-feedback";

const directions = [
  { value: "standard-to-alpha", label: "Standard → Gen Alpha" },
  { value: "alpha-to-standard", label: "Gen Alpha → Standard" },
] as const;

type CompletedTranslation = {
  id: string;
  input: string;
  direction: TranslationRequest["direction"];
  promptVersion: string;
  runNumber: number;
  data: TranslationResponse;
};

function ThumbIcon({ direction }: { direction: TranslationRating }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <path d="M7 10v10H4V10h3Zm0 9h10.2a2 2 0 0 0 1.96-1.61l1.2-6A2 2 0 0 0 18.4 9H14l.7-3.2A2.3 2.3 0 0 0 10.3 4L7 10v9Z" />
      ) : (
        <path d="M7 14V4H4v10h3Zm0-9h10.2a2 2 0 0 1 1.96 1.61l1.2 6A2 2 0 0 1 18.4 15H14l.7 3.2a2.3 2.3 0 0 1-4.4 1.8L7 14V5Z" />
      )}
    </svg>
  );
}

export function Translator() {
  const [text, setText] = useState("");
  const [direction, setDirection] =
    useState<TranslationRequest["direction"]>("standard-to-alpha");
  const [result, setResult] = useState<CompletedTranslation | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [translationRating, setTranslationRating] =
    useState<TranslationRating | null>(null);
  const [translationFailureReason, setTranslationFailureReason] = useState<
    TranslationFailureReason | ""
  >("");
  const [explanationRating, setExplanationRating] =
    useState<ExplanationRating | null>(null);
  const [explanationFailureReason, setExplanationFailureReason] = useState<
    ExplanationFailureReason | ""
  >("");
  const [feedbackSaved, setFeedbackSaved] = useState(false);
  const [feedbackCount, setFeedbackCount] = useState(0);

  useEffect(() => {
    if (localFeedbackEnabled) {
      setFeedbackCount(readLocalFeedback().length);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setError("");
    setCopied(false);
    setTranslationRating(null);
    setTranslationFailureReason("");
    setExplanationRating(null);
    setExplanationFailureReason("");
    setFeedbackSaved(false);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, direction }),
      });
      const body: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof body === "object" &&
          body !== null &&
          "error" in body &&
          typeof body.error === "string"
            ? body.error
            : "We couldn't translate that. Please try again.";
        throw new Error(message);
      }

      const parsed = translationResponseSchema.safeParse(body);

      if (!parsed.success) {
        throw new Error("The translation came back in an unexpected format.");
      }

      const completedTranslation = {
        id: window.crypto.randomUUID(),
        input: text.trim(),
        direction,
        promptVersion: response.headers.get("X-Prompt-Version") ?? "unknown",
        data: parsed.data,
      };

      setResult({
        ...completedTranslation,
        runNumber: getNextRunNumber(completedTranslation),
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "We couldn't translate that. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function copyTranslation() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.data.translation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      setError("Copy failed. Select the translation and copy it manually.");
    }
  }

  function saveEvaluation() {
    if (!result || !translationRating || !explanationRating) return;

    try {
      const count = saveLocalFeedback({
        id: result.id,
        timestamp: new Date().toISOString(),
        input: result.input,
        direction: result.direction,
        promptVersion: result.promptVersion,
        runNumber: result.runNumber,
        translationRating,
        ...(translationRating === "down" && translationFailureReason
          ? { translationFailureReason }
          : {}),
        explanationRating,
        ...(explanationRating === "misaligned" && explanationFailureReason
          ? { explanationFailureReason }
          : {}),
        result: result.data,
      });

      setFeedbackSaved(true);
      setFeedbackCount(count);
    } catch {
      setError("Feedback couldn't be saved in this browser.");
    }
  }

  function clearFeedback() {
    if (!window.confirm("Clear all locally saved translation feedback?")) return;

    clearLocalFeedback();
    setFeedbackCount(0);
    setFeedbackSaved(false);
  }

  const actionLabel =
    direction === "standard-to-alpha" ? "Cook it" : "Uncook it";
  const loadingLabel =
    direction === "standard-to-alpha" ? "Cooking…" : "Uncooking…";

  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-surface p-4 shadow-[0_14px_45px_rgba(68,45,25,0.07)] sm:p-6"
      >
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Direction</legend>
          <div className="grid grid-cols-2 rounded-lg border border-border bg-background p-1">
            {directions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="direction"
                  value={option.value}
                  checked={direction === option.value}
                  onChange={() => setDirection(option.value)}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center rounded-md px-2 text-center text-xs font-semibold text-muted transition peer-checked:bg-surface peer-checked:text-accent-strong peer-checked:shadow-sm peer-focus-visible:outline-3 peer-focus-visible:outline-accent sm:text-sm">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-5">
          <div className="mb-2 flex items-end justify-between gap-4">
            <label htmlFor="source-text" className="text-sm font-semibold">
              Text to translate
            </label>
            <span className="font-mono text-xs text-muted">
              {text.length}/{MAX_INPUT_LENGTH}
            </span>
          </div>
          <textarea
            id="source-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            maxLength={MAX_INPUT_LENGTH}
            rows={8}
            placeholder="Paste a sentence or paragraph…"
            className="min-h-52 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 leading-7 placeholder:text-muted/70"
          />
        </div>

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="mt-5 flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-5 font-semibold text-white transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? loadingLabel : actionLabel}
        </button>

        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-danger">
          {error}
        </p>
      </form>

      <section
        aria-live="polite"
        aria-busy={isLoading}
        className="flex min-h-80 flex-col rounded-2xl border border-border bg-surface p-4 shadow-[0_14px_45px_rgba(68,45,25,0.07)] sm:p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold">Translation</h2>
          {result && (
            <button
              type="button"
              onClick={copyTranslation}
              className="min-h-10 rounded-lg border border-border px-3 text-sm font-semibold transition hover:bg-background"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="mt-6 flex-1 space-y-3" role="status">
            <span className="sr-only">Translating your text</span>
            <div className="h-4 w-full animate-pulse rounded bg-accent-soft" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-accent-soft" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-accent-soft" />
          </div>
        ) : result ? (
          <div className="flex flex-1 flex-col">
            <p className="font-editorial mt-5 whitespace-pre-wrap text-2xl leading-9">
              {result.data.translation}
            </p>
            {result.data.explanations.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-editorial text-2xl">Why these changes</h3>
                <ul className="mt-4 space-y-4">
                  {result.data.explanations.map((item, index) => (
                    <li key={`${item.original}-${index}`}>
                      <p className="font-semibold">
                        “{item.original}” → “{item.translated}”
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {item.reason}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {localFeedbackEnabled && (
              <div className="mt-auto border-t border-border pt-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <fieldset>
                    <legend className="text-sm font-semibold">
                      Translation
                    </legend>
                    <p className="mt-1 text-xs text-muted">
                      Is this translation ready to use?
                    </p>
                    <div className="mt-3 flex gap-2">
                      {(["up", "down"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-label={
                            option === "up"
                              ? "Rate translation positively"
                              : "Rate translation negatively"
                          }
                          aria-pressed={translationRating === option}
                          title={option === "up" ? "Thumbs up" : "Thumbs down"}
                          onClick={() => {
                            setTranslationRating(option);
                            setTranslationFailureReason("");
                            setFeedbackSaved(false);
                          }}
                          className={`flex size-10 items-center justify-center rounded-lg border transition ${
                            translationRating === option
                              ? "border-accent bg-accent-soft text-accent-strong"
                              : "border-border text-muted hover:bg-background hover:text-foreground"
                          }`}
                        >
                          <ThumbIcon direction={option} />
                        </button>
                      ))}
                    </div>
                    {translationRating === "down" && (
                      <label className="mt-3 block text-xs font-semibold">
                        Translation failure reason{" "}
                        <span className="text-muted">(optional)</span>
                        <select
                          value={translationFailureReason}
                          onChange={(event) => {
                            setTranslationFailureReason(
                              event.target.value as TranslationFailureReason | "",
                            );
                            setFeedbackSaved(false);
                          }}
                          className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 font-normal text-foreground"
                        >
                          <option value="">Select a reason</option>
                          {translationFailureReasons.map((reason) => (
                            <option key={reason.value} value={reason.value}>
                              {reason.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-semibold">
                      Explanation
                    </legend>
                    <p className="mt-1 text-xs text-muted">
                      Do the explanation and spans align?
                    </p>
                    <div className="mt-3 flex gap-2">
                      {(["aligned", "misaligned"] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={explanationRating === option}
                          onClick={() => {
                            setExplanationRating(option);
                            setExplanationFailureReason("");
                            setFeedbackSaved(false);
                          }}
                          className={`min-h-10 rounded-lg border px-3 text-xs font-semibold transition ${
                            explanationRating === option
                              ? "border-accent bg-accent-soft text-accent-strong"
                              : "border-border text-muted hover:bg-background hover:text-foreground"
                          }`}
                        >
                          {option === "aligned" ? "Aligned" : "Misaligned"}
                        </button>
                      ))}
                    </div>
                    {explanationRating === "misaligned" && (
                      <label className="mt-3 block text-xs font-semibold">
                        Explanation failure reason{" "}
                        <span className="text-muted">(optional)</span>
                        <select
                          value={explanationFailureReason}
                          onChange={(event) => {
                            setExplanationFailureReason(
                              event.target.value as ExplanationFailureReason | "",
                            );
                            setFeedbackSaved(false);
                          }}
                          className="mt-1 min-h-10 w-full rounded-lg border border-border bg-background px-3 font-normal text-foreground"
                        >
                          <option value="">Select a reason</option>
                          {explanationFailureReasons.map((reason) => (
                            <option key={reason.value} value={reason.value}>
                              {reason.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </fieldset>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span>{feedbackCount} saved locally</span>
                    <button
                      type="button"
                      onClick={exportLocalFeedback}
                      disabled={feedbackCount === 0}
                      className="font-semibold underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Export
                    </button>
                    <button
                      type="button"
                      onClick={clearFeedback}
                      disabled={feedbackCount === 0}
                      className="font-semibold underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Clear
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={saveEvaluation}
                    disabled={!translationRating || !explanationRating}
                    className="min-h-10 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {feedbackSaved ? "Saved locally" : "Save evaluation"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex min-h-64 flex-1 items-center justify-center text-center">
            <div className="max-w-xs text-sm leading-6 text-muted">
              <p>Your translation will appear here.</p>
              <div
                className="mx-auto my-5 w-12 border-t border-border"
                aria-hidden="true"
              />
              <p>We’ll also explain the slang choices we made.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
