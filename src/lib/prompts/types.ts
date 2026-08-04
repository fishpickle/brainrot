export const promptVersions = [
  "v1",
  "v2",
  "v3",
  "v4",
  "v5",
  "v5.1",
  "v6",
] as const;

export type PromptVersion = (typeof promptVersions)[number];

export type TranslationPromptInput = {
  direction: "standard-to-alpha" | "alpha-to-standard";
};

export type TranslationPrompt = {
  version: PromptVersion;
  label: string;
  buildInstructions: (input: TranslationPromptInput) => string;
};
