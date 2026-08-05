# Translation Endpoint Hardening — 2026-08-05

## Application boundaries

- Accept only `application/json` requests no larger than 8 KiB.
- Validate the complete request and structured response with Zod.
- Limit source text to 2,000 characters and model output to 1,200 tokens.
- Apply a 12-second OpenAI timeout, one retry, and a 15-second function limit.
- Set `store: false` on Responses API requests.
- Send OpenAI a SHA-256 pseudonym derived from a browser-generated UUID; do
  not send the UUID itself or log it.

## Rate-limit rollout

Use Vercel Firewall rather than an in-memory application counter so limits work
across serverless instances. The project is not linked in this checkout, so no
external rule has been staged or published.

1. Link the intended Vercel project and confirm the production hostname.
2. Stage a rule matching `POST /api/translate`, counted by IP, at 6 requests
   per 60 seconds with over-limit action set to `log`.

   ```sh
   vercel firewall rules add "Observe translation rate" \
     --condition '{"type":"method","op":"eq","value":"POST"}' \
     --condition '{"type":"path","op":"eq","value":"/api/translate"}' \
     --action rate_limit \
     --rate-limit-window 60 \
     --rate-limit-requests 6 \
     --rate-limit-keys ip \
     --rate-limit-action log \
     --yes
   ```

3. Review legitimate and flagged traffic for at least 48 hours.
4. If shared-network users are unaffected, keep the six-request threshold,
   change the over-limit action to `rate_limit` (HTTP 429), review the draft
   diff, and publish deliberately.
5. Revisit the threshold after request-level cost telemetry is available.

Vercel rate-limit counters are regional, so this is a coarse abuse boundary,
not a globally exact quota. Do not publish a stricter threshold without usage
evidence.
