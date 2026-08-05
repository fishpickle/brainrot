# Deployment Configuration — 2026-08-05

## Environment matrix

| Variable | Local | Preview | Production |
|---|---|---|---|
| `OPENAI_API_KEY` | Developer key in `.env.local` | Vercel encrypted secret | Vercel encrypted secret |
| `OPENAI_MODEL` | `gpt-5.6-terra` | `gpt-5.6-terra` | `gpt-5.6-terra` |
| `NEXT_PUBLIC_ENABLE_LOCAL_FEEDBACK` | `true` only during evaluation | `false` | `false` |

Prompt v6 is the code-level default in every environment. Preview and
production must use separately scoped OpenAI secrets where practical; neither
secret belongs in Git or a `NEXT_PUBLIC_` variable.

## Vercel project setup

1. Create and link the intended project.
2. Add all three variables explicitly to Preview and Production.
3. Enable Web Analytics and Speed Insights in the project dashboard.
4. Confirm the feedback flag is `false` in a preview build.
5. Run one translation in each direction and inspect runtime telemetry.

Do not use a preview deployment as production merely because its environment
variables happen to match.
