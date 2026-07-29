export const promptVersions = ["v1", "v2"] as const;

export type PromptVersion = (typeof promptVersions)[number];

export type TranslationPromptInput = {
  direction: "standard-to-alpha" | "alpha-to-standard";
  intensity: "mild" | "cooked" | "ohio-max";
};

export type TranslationPrompt = {
  version: PromptVersion;
  label: string;
  buildInstructions: (input: TranslationPromptInput) => string;
};
