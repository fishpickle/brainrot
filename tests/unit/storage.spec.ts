import { expect, test } from "@playwright/test";
import { getNextRunNumber, readLocalFeedback } from "../../src/lib/local-feedback";

test("feedback reads tolerate denied storage and malformed saved data", () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "window");
  try {
    Object.defineProperty(globalThis, "window", { configurable: true, value: {
      get localStorage() { throw new DOMException("Storage blocked", "SecurityError"); },
    } });
    expect(readLocalFeedback()).toEqual([]);
    expect(getNextRunNumber({ input: "Hello", direction: "standard-to-alpha", promptVersion: "v6" })).toBe(1);
    Object.defineProperty(globalThis, "window", { configurable: true, value: {
      localStorage: { getItem: () => "not JSON" },
    } });
    expect(readLocalFeedback()).toEqual([]);
  } finally {
    if (previous) Object.defineProperty(globalThis, "window", previous);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
