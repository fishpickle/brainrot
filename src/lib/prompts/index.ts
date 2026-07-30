import { promptV1 } from "@/lib/prompts/v1";
import { promptV2 } from "@/lib/prompts/v2";
import { promptV3 } from "@/lib/prompts/v3";
import { promptV4 } from "@/lib/prompts/v4";
import { promptV5 } from "@/lib/prompts/v5";
import { promptV51 } from "@/lib/prompts/v5-1";
import type {
  PromptVersion,
  TranslationPrompt,
} from "@/lib/prompts/types";

export { promptVersions } from "@/lib/prompts/types";
export type { PromptVersion } from "@/lib/prompts/types";

export const defaultPromptVersion: PromptVersion = "v5.1";

const prompts = {
  v1: promptV1,
  v2: promptV2,
  v3: promptV3,
  v4: promptV4,
  v5: promptV5,
  "v5.1": promptV51,
} satisfies Record<PromptVersion, TranslationPrompt>;

export function getTranslationPrompt(version: PromptVersion) {
  return prompts[version];
}
