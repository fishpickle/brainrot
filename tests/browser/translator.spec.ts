import { expect, test } from "@playwright/test";

for (const direction of ["standard-to-alpha", "alpha-to-standard"] as const) {
  test(`${direction} succeeds with storage blocked`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, "localStorage", {
        get() { throw new DOMException("Storage blocked", "SecurityError"); },
      });
    });
    await page.route("**/api/translate", async (route) => {
      const request = route.request().postDataJSON();
      expect(request.direction).toBe(direction);
      expect(request.clientId).toMatch(/^[\da-f-]{36}$/i);
      expect(request).not.toHaveProperty("promptVersion");
      await route.fulfill({
        json: { translation: "Verified translation.", explanations: [] },
        headers: { "X-Prompt-Version": "v6" },
      });
    });
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Cook it", exact: true })).toBeDisabled();
    if (direction === "alpha-to-standard") {
      await page.getByText("Gen Alpha → Standard", { exact: true }).click();
    }
    await page.getByLabel("Text to translate").fill("A small translation test.");
    await page.getByRole("button", {
      name: direction === "standard-to-alpha" ? "Cook it" : "Uncook it",
      exact: true,
    }).click();
    await expect(page.getByText("Verified translation.", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why these changes" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Save evaluation" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Copy", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("explains changes and copies the translation", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: async (text: string) => { document.documentElement.dataset.copiedText = text; } },
    });
  });
  await page.route("**/api/translate", (route) => route.fulfill({ json: {
    translation: "That is a W.",
    explanations: [{ original: "success", translated: "W", reason: "W means a win." }],
  } }));
  await page.goto("/");
  await page.getByLabel("Text to translate").fill("That is a success.");
  await page.getByRole("button", { name: "Cook it", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Why these changes" })).toBeVisible();
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await expect(page.getByRole("button", { name: "Copied", exact: true })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-copied-text", "That is a W.");
});

test("handles a non-JSON firewall 429 and allows retry", async ({ page }) => {
  await page.route("**/api/translate", (route) => route.fulfill({
    status: 429, contentType: "text/html", body: "Rate limited",
  }));
  await page.goto("/");
  await page.getByLabel("Text to translate").fill("Please translate this.");
  await page.getByRole("button", { name: "Cook it", exact: true }).click();
  await expect(page.getByText("You’re cooking too fast. Give it a moment and try again.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Cook it", exact: true })).toBeEnabled();
});

test("production endpoint rejects invalid and retired contracts", async ({ request }) => {
  const body = {
    text: "Hello", direction: "standard-to-alpha",
    clientId: "550e8400-e29b-41d4-a716-446655440000",
  };
  const retired = await request.post("/api/translate", { data: { ...body, promptVersion: "v1" } });
  expect(retired.status()).toBe(400);
  expect(await retired.json()).toEqual({ error: "Only the current translation prompt is available." });
  const oversized = await request.post("/api/translate", { data: { ...body, text: "x".repeat(501) } });
  expect(oversized.status()).toBe(400);
  expect(await oversized.json()).toEqual({ error: "Use 500 characters or fewer." });
  expect((await request.post("/api/translate", { data: "not json" })).status()).toBe(415);
  expect((await request.post("/api/translate", {
    data: "{", headers: { "Content-Type": "application/json" },
  })).status()).toBe(400);
  expect((await request.post("/api/translate", { data: { ...body, text: "x".repeat(9000) } })).status()).toBe(413);
});

test("input stops at 500 characters and submits the exact boundary", async ({ page }) => {
  let submittedText: string | undefined;
  await page.route("**/api/translate", async (route) => {
    submittedText = route.request().postDataJSON().text;
    await route.fulfill({ json: { translation: "Boundary translation.", explanations: [] } });
  });
  await page.goto("/");
  const input = page.getByLabel("Text to translate");
  await expect(input).toHaveAttribute("maxlength", "500");
  await input.fill("a".repeat(501));
  await expect(input).toHaveValue("a".repeat(500));
  await expect(page.getByText("500/500", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Cook it", exact: true }).click();
  await expect(page.getByText("Boundary translation.", { exact: true })).toBeVisible();
  expect(submittedText).toBe("a".repeat(500));
});
