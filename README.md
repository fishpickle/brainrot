# Gen Alpha Translator

A mobile-first translator between Standard American English and Gen Alpha
slang, built with Next.js 15, React 19, TypeScript, Tailwind CSS, Zod, and the
OpenAI Responses API.

The product has one forward **Cook it** contract and one reverse **Uncook it**
contract. Prompt v6 is the evaluated launch default; earlier prompts remain in
the registry for regression comparison and recovery.

## Local development

Requires Node.js 20 or newer.

1. Copy `.env.example` to `.env.local`.
2. Add your OpenAI API key to `OPENAI_API_KEY`.
3. Install dependencies with `npm install`.
4. Start the app with `npm run dev`.

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
npm exec playwright install chromium webkit
npm test
```

The tests use a production build, mock successful browser translations, and
exercise request validation and provider failures without paid API calls.
They cover desktop Chromium plus mobile Chromium and WebKit emulation;
physical-device Safari and Chrome checks remain a release task. GitHub Actions
runs the audit, lint, build, and tests on pushes and pull requests.

Production accepts only the current prompt. Historical prompt versions remain
available through the development server for regression comparisons.
Provider requests have a 12-second timeout and no automatic retries so they
fit within the route's 15-second execution budget.
Output is capped at 1,200 tokens for short input, rising with input length to
2,000 tokens for a full-length request. Incomplete or invalid model responses
return a retryable user-facing error and log metadata without translation text.

For an opt-in live check, start the production build with
`npm run start -- --port 3108`, then run `node scripts/smoke-live.mjs`.
This makes six real provider requests using synthetic inputs and writes two
browser screenshots to `/tmp`. Set `SMOKE_BASE_URL` to check another deployment.
It verifies integration; review the printed translations for semantic quality.
The URL can also be passed as the first script argument. For protected previews,
run it through `vercel env run -- node scripts/smoke-live.mjs <preview-url>`;
the runner scopes the short-lived Vercel OIDC header to that deployment origin.

## Vercel

Import the repository into Vercel and add `OPENAI_API_KEY` in the project
environment variables. `OPENAI_MODEL` is optional and defaults to
`gpt-5.6-terra`.

`NEXT_PUBLIC_ENABLE_LOCAL_FEEDBACK` is development-only and must remain unset
or `false` in production.

Web Analytics and Speed Insights are included through Vercel's first-party
packages and become active after they are enabled for the Vercel project.
Successful translation requests emit structured token and latency telemetry to
the server runtime logs without input text, output text, or browser identifiers.

## Launch baseline

- Prompt: `v6`
- Model: `gpt-5.6-terra`
- Reasoning effort: `none`
- Structured output: Zod through `zodTextFormat`
- Evaluation findings: `research/findings-2026-08-04.md`

OpenAI currently documents `gpt-5.6-terra` as the balanced intelligence/cost
model and does not list a separate dated Terra snapshot. The launch therefore
uses the evaluated model identifier and requires a focused regression check if
that model behavior changes.
