# Production Roadmap — 2026-08-04

## Launch Standard

The MVP does not need to be perfect. It is ready when one evaluated translation
contract works reliably in both directions, the public experience is coherent,
production risks are bounded, and the deployed release can be monitored and
rolled back.

## Milestone 1 — Lock the Launch Contract

**Current status:** Fresh evaluation complete; the product owner approved
Prompt v6, and the application now uses it by default. Local end-to-end and
production-build verification passed. Commit, tag, and model snapshot decisions
remain outstanding.

### Must Have

- [x] Run Prompt v6 on a fresh held-out dataset and make a final
  v5.1-versus-v6 promotion decision.
  **Why:** The latest v6 gains were measured on inputs used during development.
- [ ] Freeze the selected launch prompt and record its prompt, model, reasoning
  setting, date, and evaluation results.
  **Why:** A reproducible baseline is necessary for diagnosing behavioral
  changes.
- [x] Choose and document the production model identifier.
  **Why:** Model choice directly affects quality, latency, cost, and
  reproducibility.
- [ ] Decide whether to use a stable model snapshot or the moving
  `gpt-5.6-terra` identifier.
  **Why:** A moving model may change behavior without a prompt revision.
- [ ] Update PRODUCT.md, README.md, and the canonical specification for the
  single Cook it / Uncook it contract.
  **Why:** Current documentation still presents the removed intensity product.
- [ ] Remove or formally deprecate residual intensity fields.
  **Why:** Hidden legacy behavior makes the implementation diverge from the
  product contract.

### Nice to Have

- [ ] Preserve the retired intensity design in a historical decision note.
- [ ] Add a concise prompt-version changelog.
- [ ] Record rejected launch alternatives and why they were deferred.

## Milestone 2 — Complete the Launch UX

The exact UI changes will be specified separately before implementation.

### Must Have

- [x] Verify that the winning prompt is selected by the ordinary UI.
  **Why:** The UI currently receives the application default, which remains
  v5.1.
- [ ] Implement the agreed pre-launch UI changes.
  **Why:** The public interface must reflect the intended launch experience.
- [ ] Review empty, typing, loading, success, explanation-free, error, and copy
  states on mobile and desktop.
  **Why:** These states comprise the complete core journey.
- [ ] Confirm keyboard operation, focus order, labels, contrast, status
  messages, and touch targets.
  **Why:** The core workflow must remain usable across common access methods.
- [ ] Add a concise AI limitations and processing disclosure.
  **Why:** Users should understand the service before relying on its output.
- [ ] Confirm development feedback controls are disabled in production.
  **Why:** Browser-only evaluation tooling was intentionally temporary.

### Nice to Have

- [ ] Add two or three tappable examples.
- [ ] Polish copy confirmation and the first-use empty state.
- [ ] Add a manual light/dark theme selector.
- [ ] Add automatic direction detection.

## Milestone 3 — Production Hardening

### Must Have

- [ ] Add abuse and cost controls to the public translation endpoint.
  **Why:** An unauthenticated model-backed endpoint can become an uncontrolled
  expense.
- [ ] Set explicit request, timeout, retry, output-token, and latency limits.
  **Why:** Predictable boundaries protect reliability and cost.
- [ ] Verify production-safe error logging without full user inputs or secrets.
  **Why:** Logs must support diagnosis without storing sensitive text.
- [ ] Add a stable, privacy-preserving OpenAI `safety_identifier` strategy.
  **Why:** It improves abuse detection without sending identifying information.
- [ ] Confirm preview and production environment configuration.
  **Why:** Model, key, flags, and branch behavior must not be inferred at deploy
  time.
- [ ] Audit dependencies, secrets, screenshots, research data, and repository
  contents.
  **Why:** A public release must not expose sensitive material accidentally.
- [ ] Add a minimal deployed-route smoke verification.
  **Why:** A successful framework deployment does not prove model integration.

### Nice to Have

- [ ] Add request-level cost telemetry.
- [ ] Add structured error aggregation and alerts.
- [ ] Add Vercel Web Analytics and performance monitoring.

## Milestone 4 — Release-Candidate Validation

### Must Have

- [ ] Pass lint, type checking, and a clean production build.
  **Why:** The release candidate must pass deterministic quality checks.
- [ ] Test the complete flow in a Vercel preview deployment.
  **Why:** Serverless runtime behavior can differ from localhost.
- [ ] Run both directions plus idiom, factual, profanity, long-input, and
  explanation-free smoke cases.
  **Why:** These cover the highest-risk behavioral and integration boundaries.
- [ ] Measure representative latency, failure rate, and token usage.
  **Why:** Prompt quality alone does not establish launch readiness.
- [ ] Test mobile Safari, mobile Chrome, and one desktop browser.
  **Why:** Clipboard, textarea, layout, and loading behavior vary by browser.
- [ ] Resolve blockers and explicitly accept remaining limitations.
  **Why:** Deliberate imperfections are manageable; undocumented ones are not.

### Nice to Have

- [ ] Add browser smoke testing to CI.
- [ ] Add visual regression screenshots.
- [ ] Commit a reusable prompt-comparison runner.
- [ ] Expand the reverse benchmark.

## Milestone 5 — Launch

### Must Have

- [ ] Deploy from a known commit and tag the release.
  **Why:** The launched version must be recoverable.
- [ ] Confirm production domain, metadata, favicon, title, description, and
  social preview.
  **Why:** A published product needs a coherent identity.
- [ ] Publish a minimal privacy statement and feedback path.
  **Why:** Users need processing transparency and a way to report problems.
- [ ] Document code and prompt/model rollback instructions.
  **Why:** Provider or prompt regressions may require rapid recovery.
- [ ] Perform one final production translation in each direction.
  **Why:** This confirms the actual public environment.

### Nice to Have

- [ ] Add lightweight launch analytics.
- [ ] Add durable public feedback.
- [ ] Publish a changelog or small launch demo.
- [ ] Configure a custom domain.

## Explicitly Post-Launch

- Surprise Me
- Cook it more
- Inline or clickable phrase explanations
- Public prompt selection
- Reverse-specific modes
- Translation confidence scores
- Accounts or translation history
- Prompt comparison dashboard
- Static slang or transformation library
- Social sharing

## Minimum Launch Gate

- [ ] One prompt/model configuration passed a fresh held-out evaluation.
- [ ] UI and documentation reflect the single translation contract.
- [ ] Production feedback tooling is disabled.
- [ ] Abuse, privacy, logging, and configuration controls are in place.
- [ ] Both directions work in preview and production.
- [ ] Mobile and accessibility smoke checks pass.
- [ ] The release is tagged and can be rolled back.
