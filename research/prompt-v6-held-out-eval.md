# Prompt v6 Held-Out Evaluation

## Purpose

Compare Prompt v5.1 and Prompt v6 on forward translation quality without using
inputs that informed either prompt. This suite emphasizes transformation
strength, semantic stability, controlled invention, and explanation alignment.

Do not add these inputs or preferred outputs to a prompt.

## Protocol

- Run every input three times with Prompt v5.1 and three times with Prompt v6.
- Use the same model and application configuration for all 90 requests.
- Keep “Why these changes” visible while rating.
- Alternate or randomize prompt versions to reduce order effects.
- Judge each generation independently; do not select the best of three.
- Record exact outputs before discussing or revising Prompt v6.
- Do not replace a difficult input after seeing its results.

## Translation Rating

Choose **thumbs up** when the translation is faithful, natural enough for the
stylized register, and unmistakably transformed.

For **thumbs down**, optionally choose one primary reason:

- Not transformed enough
- Meaning changed
- Unnatural or forced
- Culturally weak or dated
- Too much unsupported invention
- Profanity not sanitized
- Other

## Explanation Rating

Choose **aligned** or **misaligned** independently of the translation rating.

For **misaligned**, optionally choose one primary reason:

- Span too broad
- Spans do not correspond
- Reason is inaccurate
- Important change omitted
- Unnecessary explanation
- Profanity not redacted
- Other

## Held-Out Inputs

### A. Existing idioms

These test whether the prompt can transform an existing mainstream idiom
without substituting another ordinary idiom or inventing a different event.

| ID | Input | Primary pressure |
|---|---|---|
| A1 | The ball is in your court now. | Preserve transferred responsibility. |
| A2 | We’re not out of the woods yet. | Preserve ongoing risk without escalation. |
| A3 | He threw me under the bus during the meeting. | Preserve betrayal, agency, and context. |

### B. Literal everyday statements

These test whether ordinary content receives a perceptible but coherent
transformation rather than decorative slang.

| ID | Input | Primary pressure |
|---|---|---|
| B1 | My phone died while I was waiting for the bus. | Recast a common inconvenience without inventing urgency. |
| B2 | Save me a seat near the window. | Preserve a simple request and location. |
| B3 | The package arrived two days earlier than expected. | Preserve timing and quantity without assigning a positive or negative reaction. |

### C. Technical and domain language

These test high-leverage transformation while protecting terminology, facts,
and causal relationships.

| ID | Input | Primary pressure |
|---|---|---|
| C1 | The deployment was rolled back after the health checks failed. | Preserve sequence and software meaning. |
| C2 | A catalyst lowers the activation energy without being consumed. | Preserve the scientific relationship and negation. |
| C3 | The museum acquired the painting from a private collection in 1987. | Preserve institution, provenance, and date. |

### D. Emotion and pragmatic sensitivity

These test boundaries, polarity, mild amplification, speech acts, and profanity
sanitization.

| ID | Input | Primary pressure |
|---|---|---|
| D1 | I appreciate the invitation, but I need some time to think about it. | Preserve gratitude, hesitation, and the boundary. |
| D2 | I’m frustrated that you changed the plan without telling me. | Preserve criticism without escalating hostility. |
| D3 | This fucking printer stopped working again. | Preserve frustration while sanitizing output and redacting explanations. |

### E. Recoverable coinage opportunities

These invite productive morphology, compounds, analogies, or playful framing
without providing a ready-made slang equivalent.

| ID | Input | Primary pressure |
|---|---|---|
| E1 | The tiny balcony has an unexpectedly impressive view. | Create vivid contrast without changing physical facts. |
| E2 | Our spreadsheet has become so complicated that nobody understands it anymore. | Recast collective incomprehension without inventing additional consequences. |
| E3 | He organized every cable, charger, and adapter into labeled compartments. | Recast meticulous organization without adding praise or obsession. |

## Evaluation Record

Create one record per generation:

| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Model | |
| Prompt version | v5.1 / v6 |
| Input ID | |
| Run | 1 / 2 / 3 |
| Translation | |
| Translation rating | Up / Down |
| Translation failure reason | Optional |
| Explanations | |
| Explanation rating | Aligned / Misaligned |
| Explanation failure reason | Optional |
| Notes | Optional |

## Comparison Summary

Report:

- Translation approval by prompt and category
- Primary translation failure reasons
- Explanation alignment by prompt and category
- Inputs with unstable results across three runs
- Repeated vocabulary across unrelated inputs
- Strong and weak coinages with recoverability rationale
- Any meaning, polarity, speech-act, or profanity violations
- Reverse smoke-test regressions observed after Prompt v6 implementation

Do not promote Prompt v6 based only on a higher aggregate approval rate.
Investigate every semantic-backbone or profanity failure individually.
