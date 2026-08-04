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
```

## Vercel

Import the repository into Vercel and add `OPENAI_API_KEY` in the project
environment variables. `OPENAI_MODEL` is optional and defaults to
`gpt-5.6-terra`.

`NEXT_PUBLIC_ENABLE_LOCAL_FEEDBACK` is development-only and must remain unset
or `false` in production.

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
