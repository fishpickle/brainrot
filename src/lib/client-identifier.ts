const CLIENT_ID_STORAGE_KEY = "gen-alpha-translator:client-id:v1";
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function getClientIdentifier() {
  const fallback = window.crypto.randomUUID();

  try {
    const stored = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY);

    if (stored && UUID_PATTERN.test(stored)) {
      return stored;
    }

    window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, fallback);
  } catch {
    // Storage can be unavailable in private or tightly restricted browsers.
  }

  return fallback;
}
