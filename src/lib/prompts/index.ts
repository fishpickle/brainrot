import { promptV1 } from "@/lib/prompts/v1";
import { promptV2 } from "@/lib/prompts/v2";
import type {
  PromptVersion,
  TranslationPrompt,
} from "@/lib/prompts/types";

export { promptVersions } from "@/lib/prompts/types";
export type { PromptVersion } from "@/lib/prompts/types";

export const defaultPromptVersion: PromptVersion = "v2";

const prompts = {
  v1: promptV1,
  v2: promptV2,
} satisfies Record<PromptVersion, TranslationPrompt>;

export function getTranslationPrompt(version: PromptVersion) {
  return prompts[version];
}
