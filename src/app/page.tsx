import { Translator } from "@/components/translator";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-10 sm:px-6 sm:py-16">
      <header className="mb-8 max-w-2xl sm:mb-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          No cap, just context
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
          Gen Alpha Translator
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg">
          Translate between Standard English and Gen Alpha slang without losing
          the meaning.
        </p>
      </header>
      <Translator />
      <footer className="mt-auto pt-10 text-center text-xs text-muted">
        AI can miss context. Check important translations.
      </footer>
    </main>
  );
}
