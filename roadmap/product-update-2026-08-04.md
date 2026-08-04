# Gen Alpha Translator — Product Update, August 4

The MVP remains functional, mobile-first, and deployable to Vercel. Since July
30, the largest changes have been to the translation contract, prompt
evaluation process, and development-only feedback tooling.

## What Has Changed

The three forward intensity levels—Mild, Cooked, and Ohio Max—have been removed
from the interface. Research showed that the levels were not reliably
differentiated, particularly Mild versus Cooked, and created an inconsistent
experience in reverse mode.

The product now has one canonical forward experience:

- **Cook it:** Standard English → Gen Alpha
- **Uncook it:** Gen Alpha → Standard English

A future “Cook it more” escalation remains possible, but it is not part of the
current MVP.

The prompt architecture now preserves versions **v1 through v6** as
first-class artifacts. Prompt v5.1 remains the application’s default; v6 is the
current experimental successor and has not yet been promoted.

Prompt v6 introduces:

- A stylized but recognizable Gen Alpha register
- Stronger structural and idiomatic transformation
- Semantic interpretation before translation
- Controlled, recoverable coinage
- Context-sensitive use of Gen Z, gaming, meme, AAVE-derived, queer, and
  broader internet language
- Explicit speech-act, attitude-holder, ambiguity, factual, and profanity
  protections
- Anti-decorative-slang rules
- Phrase-level explanation requirements

The latest v6 revision reduced active forward instruction length by
approximately 18% while materially improving the difficult regression set from
**3/18 to 11/18 product-owner approvals**. It now needs validation on fresh
inputs rather than further tuning against the same examples.

## Current Product Capabilities

| Capability | Status |
|---|---|
| Two-way translation | Implemented |
| Three intensity levels | Intentionally removed |
| Cook it / Uncook it CTAs | Implemented |
| Structured OpenAI Responses API output | Implemented |
| Zod request and response validation | Implemented |
| “Why these changes” explanations | Implemented |
| Phrase-level explanation contract | Implemented and iterated |
| Suppress unneeded explanations | Implemented in the prompt and UI |
| Copy action and confirmation | Implemented |
| Loading and empty states | Implemented at an MVP level |
| Mobile-first responsive UI | Implemented |
| Automatic system dark mode | Implemented |
| Manual theme selector | Not implemented |
| Prompt versions v1–v6 | Implemented |
| API prompt selection and response header | Implemented |
| Prompt selector in the user interface | Not implemented |
| Behavioral specifications v1 and v2 | Implemented |
| Benchmark and repeatability evaluations | Implemented as research artifacts |
| Local thumbs-up/down evaluation | Implemented behind a development flag |
| Translation and explanation failure reasons | Implemented in local evaluation mode |
| Blind A/B or comparison dashboard | Not implemented |
| Inline highlighted explanations | Not implemented |
| Automatic direction detection | Not implemented |

## PM-List Items That Are Now Obsolete

These should be removed from the roadmap rather than implemented:

- Side-by-side intensity outputs
- Two-level Default/Ohio Max product
- Revised Mild and Cooked contracts
- Intensity descriptions
- Triplet-level evaluation
- Direction-specific intensity handling
- A default-to-Ohio-Max escalation flow as currently described

A later “Cook it more” interaction could be reconsidered as a new product
feature, but it should not revive the former intensity architecture.

Several proposed AI features are also already represented in the current
specification and v6 prompt:

- Translate ideas rather than words
- Context before vocabulary
- Fidelity hierarchy
- Preserve ambiguity
- Preserve speech acts
- Anti-decorative slang
- Structural transformation
- Register-first translation
- Contextual vocabulary policy
- Reversible or recoverable coinages
- Every transformation must earn its place

A static transformation or phrase library is not currently recommended.
Research suggests that generative rules and recoverable invention produce
better results than phrase-bank behavior.

## Remaining High-Impact Work

### 1. Validate Prompt v6 on a Fresh Held-Out Dataset

This is the highest-priority product task. The latest revision substantially
improved known failures, but those inputs are now exhausted as development
examples. We need unseen idioms, requests, factual statements, speech acts,
technical language, and coinage opportunities.

The outcome should determine whether v6:

- Generalizes beyond the regression set
- Preserves its gains without increasing semantic drift
- Maintains explanation quality
- Is ready to replace v5.1 as the default

### 2. Make an Explicit Prompt-Promotion Decision

The interface currently defaults to v5.1 even though v6 is the leading
experimental candidate. After the fresh evaluation, we should either promote
v6 or document why v5.1 remains the release default.

This is more important than exposing prompt versions to ordinary users. A
prompt selector may be useful for internal evaluation, but it is not an
end-user feature.

### 3. Improve First-Use Onboarding

The current interface is understandable, but it assumes users already know
what to enter. A small set of tappable example inputs would improve activation
and demonstrate:

- Forward translation
- Reverse translation
- An idiom
- A longer or more contextual example

This would provide more value than “Surprise Me,” automatic direction
detection, or a manual theme control at this stage.

### 4. Formalize Reusable Evaluation Tooling

The project now has a strong evaluation methodology, benchmark data,
repeatability runs, local feedback capture, and separate
translation/explanation ratings. The next useful step is a repeatable internal
comparison workflow—not a large dashboard.

A lightweight tool should support:

- Running two prompt versions on the same held-out inputs
- Multiple generations per input
- Blind product-owner rating
- Translation and explanation ratings kept separate
- Exportable results with prompt, model, and run metadata

### 5. Consider Inline Explanation UX After Prompt Promotion

Phrase-level explanation generation already exists. Highlighting translated
phrases and connecting them to explanations could make the feature more
intuitive, but it should wait until the translation and explanation contracts
are stable.

## Items That Can Safely Wait

- Surprise Me
- Automatic direction detection
- Reverse-specific modes
- Manual theme selection
- Public prompt/version metadata
- Prompt selector for ordinary users
- Full comparison dashboard
- Translation confidence scores
- “Cook it more” escalation
- Clickable inline phrase highlighting

Confidence scores should be approached particularly carefully: a
model-generated confidence indicator could imply reliability without being
meaningfully calibrated.

## Recommended Immediate Sequence

1. Build and run the fresh held-out v6 evaluation.
2. Decide whether to promote v6 over v5.1.
3. Update the canonical product documentation to reflect the single-contract
   experience.
4. Add lightweight example-based onboarding.
5. Package the existing evaluation workflow into a reusable internal tool.

The product is no longer deciding between three intensities. Its central
question is now whether one creative, culturally legible translation contract
can consistently deliver perceptible transformation without losing the
source’s meaning or communicative intent.
