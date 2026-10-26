# Hardening and validation — 2026-10-26

## Changes prepared locally

- Updated Next.js and its ESLint configuration to 15.5.28, Sharp to 0.35.5,
  and the Zod requirement to ^4.6.6. Refreshed vulnerable transitive dependencies.
- Production translations no longer read development feedback storage.
  Feedback reads also tolerate denied storage and malformed saved data.
- Disabled automatic provider retries: one 12-second attempt fits within the
  route's 15-second function budget.
- Production rejects historical prompt overrides. Development retains them
  for prompt comparisons; the evaluated v6 prompt and model remain unchanged.
- Corrected PRODUCT.md to reflect the approved light-only launch design.
- Added Playwright regression coverage, GitHub Actions checks, and an opt-in
  live integration smoke runner. No provider credentials are required by CI.

## Verification

- `npm audit`: zero known vulnerabilities across the full dependency tree.
- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript checks.
- `npm test`: 17 passed. Includes desktop Chromium, mobile Chromium and WebKit
  emulation, blocked storage in both directions, explanations, mocked clipboard,
  HTML HTTP 429 errors, real-route validation, and provider transport failures.
- The stalled-provider test returned HTTP 502 after approximately 12 seconds
  with exactly one provider attempt.
- `node scripts/smoke-live.mjs`: six of six real local-production-build
  translations returned HTTP 200 and `X-Prompt-Version: v6`.
- Live cases: forward idiom, reverse slang, factual sentence, profanity,
  unchanged plain-English reverse input, and 2,000-character repeated prose.
- Chromium and mobile WebKit rendered real outputs without page exceptions.
  Chromium clipboard contents matched the generated translation. Screenshots
  were visually reviewed; automated viewport checks found no horizontal overflow.
- Client-observed latency in the completed six-case run: 1.33–4.53 seconds.
  Server telemetry: 5,291 input tokens, 990 output tokens, 6,281 total tokens.
  These are a small synthetic sample, not a production latency/failure-rate study.
- An initial runner attempt completed three additional provider requests before
  a runner-only Fetch `response.ok` bug stopped it. That runner bug was fixed
  and the complete six-case run passed. Nine provider requests were made in total.

Semantic limitations remain: one earlier idiom output retained chicken/egg
imagery; the factual example used the somewhat mechanical “hard-logs off.”
The profanity example used a broad explanation span. The long case is repetitive
and does not establish fidelity on arbitrary 2,000-character prose. No prompt
tuning or new approval-rate claim is implied by these integration checks.

## Live infrastructure inspection

- Confirmed project `prj_QqzG4tr12HJnC0pRm7n5rf2ACW8s`, team
  `team_sJjqlH1VrbRFKicYqMFOlcHB`, Next.js preset, Node 22.
- Public homepage returned HTTP 200 at
  https://gen-alpha-translator-theta.vercel.app.
- Latest reported production deployment remains
  `dpl_6SmmsnjfyJW9HyLSCHmdyvWznZC1`; these local changes are not deployed.
- Firewall is enabled. `Observe translation rate`
  (`rule_observe_translation_rate_nufFWl`) matches exactly POST `/api/translate`,
  counts by IP at six requests per 60 seconds, and still uses over-limit action
  `log`. No pending firewall drafts were present or created.
- The CLI traffic query for the last 24 hours returned empty statistics and
  series. This does not establish that the threshold is safe for shared networks.
- The connector's firewall-config call returned 404; scoped CLI reads provided
  the configuration above.

## Remaining release steps

1. Review and commit the patch, tests, workflow, and documentation. Preserve the
   pre-existing roadmap edits and design/research artifacts deliberately.
2. Deploy a preview from that known commit and run the opt-in smoke check there.
   After review, deploy production, record the deployment and commit, and tag
   the release. Recheck both directions and production telemetry.
3. Review representative firewall traffic before changing over-limit behavior.
   Dashboard:
   https://vercel.com/jbromberg-gmailcoms-projects/gen-alpha-translator/firewall/traffic?filter=rule_observe_translation_rate_nufFWl
   The firewall skill requires user traffic review and user publication of staged
   rules. No enforcement change has been made based on an empty traffic window.
4. Verify physical-device Safari and Chrome, real mobile clipboard behavior,
   analytics/Core Web Vitals ingestion, and representative production latency.
5. Finish public privacy/feedback and release identity decisions already listed
   in the production roadmap.

## Recovery procedure

Before release, record the current production deployment and the new candidate
commit. For a deployment regression, inspect the target deployment before using
`npx vercel rollback <deployment-id-or-url> --scope team_sJjqlH1VrbRFKicYqMFOlcHB`.
Then verify the public alias and a translation in each direction. Rolling back
to the August build also restores its vulnerable dependencies; prefer a patched
recovery build when practical.

For a prompt regression, change `defaultPromptVersion` in
`src/lib/prompts/index.ts` to the retained `v5.1`, run the checks and focused
behavior comparison, then deploy the reviewed recovery commit. Production's
prompt restriction follows this default. Model changes go through the same
focused evaluation and deployment process. Do not change prompt/model during
an observation window without recording a new baseline.
