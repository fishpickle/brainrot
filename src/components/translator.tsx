"use client";

import { type FormEvent, useState } from "react";

import {
  MAX_INPUT_LENGTH,
  type TranslationRequest,
  type TranslationResponse,
  translationResponseSchema,
} from "@/lib/translation";

const directions = [
  { value: "standard-to-alpha", label: "Standard → Gen Alpha" },
  { value: "alpha-to-standard", label: "Gen Alpha → Standard" },
] as const;

const intensities = [
  { value: "mild", label: "Mild" },
  { value: "cooked", label: "Cooked" },
  { value: "ohio-max", label: "Ohio Max" },
] as const;

export function Translator() {
  const [text, setText] = useState("");
  const [direction, setDirection] =
    useState<TranslationRequest["direction"]>("standard-to-alpha");
  const [intensity, setIntensity] =
    useState<TranslationRequest["intensity"]>("mild");
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!text.trim() || isLoading) return;

    setIsLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, direction, intensity }),
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

      setResult(parsed.data);
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
      await navigator.clipboard.writeText(result.translation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2_000);
    } catch {
      setError("Copy failed. Select the translation and copy it manually.");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-border bg-surface p-4 shadow-[0_18px_60px_rgba(20,18,12,0.06)] sm:p-6"
      >
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Direction</legend>
          <div className="grid grid-cols-2 rounded-xl bg-background p-1">
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
                <span className="flex min-h-11 items-center justify-center rounded-lg px-2 text-center text-xs font-semibold text-muted transition peer-checked:bg-surface peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:outline-3 peer-focus-visible:outline-accent sm:text-sm">
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
            className="min-h-52 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 leading-7 placeholder:text-muted/70"
          />
        </div>

        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-semibold">Intensity</legend>
          <div className="grid grid-cols-3 gap-2">
            {intensities.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="intensity"
                  value={option.value}
                  checked={intensity === option.value}
                  onChange={() => setIntensity(option.value)}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center rounded-xl border border-border px-2 text-sm font-semibold text-muted transition peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent-strong peer-focus-visible:outline-3 peer-focus-visible:outline-accent">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-5 font-semibold text-white transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-50 dark:text-background"
        >
          {isLoading ? "Translating…" : "Translate"}
        </button>

        <p aria-live="polite" className="mt-3 min-h-5 text-sm text-danger">
          {error}
        </p>
      </form>

      <section
        aria-live="polite"
        aria-busy={isLoading}
        className="min-h-80 rounded-3xl border border-border bg-surface p-4 shadow-[0_18px_60px_rgba(20,18,12,0.06)] sm:p-6"
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
          <div className="mt-6 space-y-3" role="status">
            <span className="sr-only">Translating your text</span>
            <div className="h-4 w-full animate-pulse rounded bg-accent-soft" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-accent-soft" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-accent-soft" />
          </div>
        ) : result ? (
          <>
            <p className="mt-5 whitespace-pre-wrap text-lg leading-8">
              {result.translation}
            </p>
            {result.explanations.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="text-lg font-bold">Why these changes</h3>
                <ul className="mt-4 space-y-4">
                  {result.explanations.map((item, index) => (
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
          </>
        ) : (
          <div className="flex min-h-64 items-center justify-center text-center">
            <p className="max-w-xs text-sm leading-6 text-muted">
              Your translation and a quick explanation of the key changes will
              appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
