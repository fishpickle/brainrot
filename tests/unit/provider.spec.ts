import { expect, test } from "@playwright/test";
import { POST } from "../../src/app/api/translate/route";

test("provider failures are not retried and time out before the function deadline", async () => {
  test.setTimeout(20_000);
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.OPENAI_API_KEY;
  const originalError = console.error;
  let attempts = 0;
  let stall = false;
  process.env.OPENAI_API_KEY = "test-key-not-a-real-credential";
  console.error = () => {};
  globalThis.fetch = async (_input, init) => {
    attempts++;
    if (!stall) return new Response(JSON.stringify({ error: { message: "Unavailable" } }), { status: 503 });
    return new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;
      if (!signal) return reject(new Error("Missing request abort signal"));
      signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    });
  };
  const request = () => new Request("http://localhost/api/translate", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "Hello", direction: "standard-to-alpha", clientId: "550e8400-e29b-41d4-a716-446655440000" }),
  });
  try {
    const unavailable = await POST(request());
    expect(unavailable.status).toBe(502);
    expect(attempts).toBe(1);
    expect(await unavailable.json()).toEqual({ error: "We couldn't translate that. Please try again." });
    stall = true;
    attempts = 0;
    const startedAt = Date.now();
    expect((await POST(request())).status).toBe(502);
    expect(attempts).toBe(1);
    expect(Date.now() - startedAt).toBeLessThan(14_500);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
  }
});
