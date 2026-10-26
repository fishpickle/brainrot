import { expect, test } from "@playwright/test";
import { POST } from "../../src/app/api/translate/route";

test("provider failures stay bounded and incomplete responses log only metadata", async () => {
  test.setTimeout(20_000);
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.OPENAI_API_KEY;
  const originalError = console.error;
  let attempts = 0;
  let stall = false;
  let incomplete = false;
  const errors: unknown[][] = [];
  const requestedLimits: number[] = [];
  process.env.OPENAI_API_KEY = "test-key-not-a-real-credential";
  console.error = (...args) => { errors.push(args); };
  globalThis.fetch = async (_input, init) => {
    attempts++;
    requestedLimits.push(JSON.parse(String(init?.body)).max_output_tokens);
    if (incomplete) return new Response(JSON.stringify({
      id: "resp_test", status: "incomplete",
      incomplete_details: { reason: "max_output_tokens" },
      output: [{ type: "message", role: "assistant", content: [{
        type: "output_text", text: '{"translation":"PRIVATE_SENTINEL","explanations":[]}',
        annotations: [],
      }] }],
      usage: { input_tokens: 1000, output_tokens: 1200 },
    }), { status: 200, headers: { "Content-Type": "application/json" } });
    if (!stall) return new Response(JSON.stringify({ error: { message: "Unavailable" } }), { status: 503 });
    return new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;
      if (!signal) return reject(new Error("Missing request abort signal"));
      signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    });
  };
  const request = (text = "Hello") => new Request("http://localhost/api/translate", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, direction: "standard-to-alpha", clientId: "550e8400-e29b-41d4-a716-446655440000" }),
  });
  try {
    const unavailable = await POST(request());
    expect(unavailable.status).toBe(502);
    expect(attempts).toBe(1);
    expect(await unavailable.json()).toEqual({ error: "We couldn't translate that. Please try again." });
    stall = true;
    attempts = 0;
    const startedAt = Date.now();
    expect((await POST(request("x".repeat(500)))).status).toBe(502);
    expect(attempts).toBe(1);
    expect(requestedLimits).toEqual([1200, 1200]);
    expect(Date.now() - startedAt).toBeLessThan(14_500);
    incomplete = true;
    const partial = await POST(request("x".repeat(500)));
    expect(partial.status).toBe(502);
    expect(await partial.json()).toEqual({ error: "We couldn't translate that. Please try again." });
    const diagnostic = errors.flat().find(value => typeof value === "string" && value.includes("translation.invalid_response"));
    expect(JSON.parse(String(diagnostic))).toMatchObject({
      status: "incomplete", incompleteReason: "max_output_tokens", outputTokenLimit: 1200,
    });
    expect(JSON.stringify(errors)).not.toContain("PRIVATE_SENTINEL");
    const attemptsBeforeRejection = attempts;
    const oversized = await POST(request("x".repeat(501)));
    expect(oversized.status).toBe(400);
    expect(await oversized.json()).toEqual({ error: "Use 500 characters or fewer." });
    expect(attempts).toBe(attemptsBeforeRejection);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
  }
});
