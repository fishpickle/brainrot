import { Translator } from "@/components/translator";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-10 sm:px-6 sm:py-16">
      <header className="mb-4 max-w-2xl sm:mb-6">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-[#963b3b]">
          No cap, just context
        </p>
        <h1 className="font-editorial text-balance text-[2rem] leading-[1.05] tracking-[-0.035em] sm:text-[3.25rem]">
          Gen Alpha Translator
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-foreground/75 sm:text-lg">
          because every generation says it differently.
        </p>
      </header>
      <Translator />
      <footer className="mt-auto pt-10 text-center text-xs text-muted">
        Your text is sent to OpenAI to generate a translation. AI can miss
        context, so check important translations.
      </footer>
    </main>
  );
}
