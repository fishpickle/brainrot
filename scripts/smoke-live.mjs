// Opt-in check: six real translations against an already running server.
import { chromium, webkit, devices } from "@playwright/test";

const baseURL = process.argv[2] || process.env.SMOKE_BASE_URL || "http://127.0.0.1:3108";
const origin = new URL(baseURL).origin;
const protectionHeaders = process.env.VERCEL_OIDC_TOKEN && new URL(origin).hostname.endsWith(".vercel.app")
  ? { "x-vercel-trusted-oidc-idp-token": process.env.VERCEL_OIDC_TOKEN }
  : {};
const samples = [];
for (const [engine, direction, text] of [
  [chromium, "standard-to-alpha", "We should not count our chickens before they hatch."],
  [webkit, "alpha-to-standard", "That presentation was fire, no cap."],
]) {
  const browser = await engine.launch();
  try {
    const context = await browser.newContext(engine === webkit ? devices["iPhone 13"] : {
      viewport: { width: 1280, height: 900 }, permissions: ["clipboard-read", "clipboard-write"],
    });
    // Keep the short-lived credential on the deployment origin only.
    await context.route("**/*", route => route.continue({
      headers: new URL(route.request().url()).origin === origin
        ? { ...route.request().headers(), ...protectionHeaders }
        : route.request().headers(),
    }));
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(baseURL);
    if (direction === "alpha-to-standard") await page.getByText("Gen Alpha → Standard", { exact: true }).click();
    await page.getByLabel("Text to translate").fill(text);
    const responsePromise = page.waitForResponse(response => response.url().endsWith("/api/translate"));
    const startedAt = Date.now();
    await page.getByRole("button", { name: direction === "standard-to-alpha" ? "Cook it" : "Uncook it", exact: true }).click();
    const response = await responsePromise;
    const body = await response.json();
    const sample = { type: "live-browser", engine: engine.name(), direction, status: response.status(), durationMs: Date.now() - startedAt, prompt: response.headers()["x-prompt-version"], body };
    samples.push(sample);
    console.log(JSON.stringify(sample));
    if (!response.ok()) throw new Error("Live browser translation failed");
    await page.getByText(body.translation, { exact: true }).waitFor();
    if (engine === chromium) {
      await page.getByRole("button", { name: "Copy", exact: true }).click();
      if (await page.evaluate(() => navigator.clipboard.readText()) !== body.translation) throw new Error("Clipboard mismatch");
    }
    if (errors.length) throw new Error(errors.join("; "));
    await page.screenshot({ path: `/tmp/brainrot-smoke-${engine.name()}.png`, fullPage: true });
  } finally {
    await browser.close();
  }
}

for (const [name, text, direction] of [
  ["factual", "The museum closes at 5 p.m. on Tuesday for maintenance.", "standard-to-alpha"],
  ["profanity", "This fucking printer broke again.", "standard-to-alpha"],
  ["plain-reverse", "The meeting starts at noon.", "alpha-to-standard"],
  ["long-input", "The club meets on Tuesday at noon. Bring a notebook and a pencil. ".repeat(32).slice(0, 2000), "standard-to-alpha"],
]) {
  const startedAt = Date.now();
  const response = await fetch(`${baseURL}/api/translate`, {
    method: "POST", headers: { "Content-Type": "application/json", ...protectionHeaders },
    redirect: "error",
    body: JSON.stringify({ text, direction, clientId: crypto.randomUUID() }),
    signal: AbortSignal.timeout(20_000),
  });
  const body = await response.json();
  const sample = { type: "live-api", name, inputCharacters: text.length, status: response.status, durationMs: Date.now() - startedAt, prompt: response.headers.get("x-prompt-version"), body };
  samples.push(sample);
  console.log(JSON.stringify(sample));
  if (!response.ok || !body.translation) throw new Error("Live API translation failed");
}
console.log(JSON.stringify({ completed: samples.length, minDurationMs: Math.min(...samples.map(sample => sample.durationMs)), maxDurationMs: Math.max(...samples.map(sample => sample.durationMs)) }));
