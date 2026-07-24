# Gen Alpha Translator

A mobile-first translator between Standard American English and Gen Alpha
slang, built with Next.js 15, React 19, TypeScript, Tailwind CSS, Zod, and the
OpenAI Responses API.

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
