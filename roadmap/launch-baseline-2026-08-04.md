# Prompt v6 Launch Baseline — 2026-08-04

## Status

Prompt v6 is the promoted application default and launch candidate. The
configuration has passed local end-to-end and production-build verification;
it has not yet been committed, tagged, or deployed.

## Configuration

| Setting | Value |
|---|---|
| Prompt | `v6` — Controlled creative transformation |
| Default prompt | `v6` |
| Model identifier | `gpt-5.6-terra` |
| Reasoning effort | `none` |
| API | OpenAI Responses API with `responses.parse()` |
| Structured output | Zod schema through `zodTextFormat` |
| OpenAI SDK | `^6.49.0` |
| Next.js | `15.5.21` |
| Evaluation date | 2026-08-04 |

The production decision between the moving `gpt-5.6-terra` identifier and an
available fixed snapshot remains open. Changing the model requires a focused
behavior and latency check against this baseline.

## Evaluation Evidence

- Translation approval: 39/45 (87%)
- Explanation alignment: 42/45 (93%)
- Under-translation failures: 0
- Request integrity: 90/90 successful; zero prompt-header mismatches
- Findings: `research/findings-2026-08-04.md`
- Rated results:
  `research/prompt-v6-launch-held-out-ratings-2026-08-04.json`

## Verification

- [x] Default API request returned `X-Prompt-Version: v6`
- [x] Cook it completed through the UI with an idiomatic transformation
- [x] Uncook it completed through the UI
- [x] Phrase-level explanations rendered
- [x] An empty explanation list rendered without the explanation section
- [x] Empty input kept the primary action disabled
- [x] ESLint passed
- [x] TypeScript checking passed
- [x] Optimized Next.js production build passed

## Known Limitations

- Gaming-language concentration: spawn-family wording appeared in 8/45 v6
  outputs across 5/15 launch inputs.
- Scientific prose can trigger mechanically assembled coinages.
- AI output can miss context and requires user judgment for important uses.

These limitations are accepted for the launch candidate and should be
monitored rather than tuned against the now-visible launch dataset.

## Recovery

Prompt v5.1 remains available in the prompt registry as the immediate behavior
fallback. A Git commit and annotated launch-candidate tag are still required to
make this baseline fully recoverable.
