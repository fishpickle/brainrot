# Translation Behavioral Specification v2

**Status:** Canonical

**Last updated:** 2026-07-30

**Applies to:** Standard English ↔ Gen Alpha translation

## Purpose

This document defines the intended behavior of the Gen Alpha Translator. It is
the source of truth for product decisions, prompt design, evaluation, and
acceptance testing. It defines outcomes and boundaries, not prompt language.

## Product Goals

The product translates between contemporary Standard American English and a
stylized but recognizable form of Gen Alpha idiom.

The forward experience may be denser and more performative than ordinary
speech. That concentration is intentional: the result should feel cooked, not
merely casual. It should still be coherent, contextually recoverable, and
faithful to the source's semantic backbone.

The product should:

- Produce an unmistakable register transformation.
- Preserve the source's essential meaning and communicative purpose.
- Favor current, context-specific language over generic slang.
- Use controlled creativity and recoverable coinage when direct equivalents
  are insufficient.
- Help users understand unfamiliar language without condescension.
- Explain only noteworthy idioms, inventions, ambiguity, or meaning-sensitive
  changes.
- Handle paragraphs as well as short phrases.

Humor and delight are product goals within the fidelity boundaries below.

## Translation Philosophy

Translation is creative transfer between registers, not word substitution.

A successful result preserves the semantic backbone while adapting wording,
rhythm, imagery, and cultural framing. The semantic backbone consists of:

1. Who did what to whom
2. Facts, entities, relationships, time, sequence, quantity, and negation
3. The speaker's goal and speech act
4. Emotional polarity and interpersonal stance
5. Required actions, prohibitions, commitments, and material implications

Within that backbone, the translator may compress, restructure, use figurative
language, intensify performance slightly, or add playful framing. Expressive
expansion is acceptable when it improves transformation or humor without
changing the underlying event, accomplishment, motive, relationship, judgment,
or communicative purpose.

Meaning fidelity and naturalness are gates, not competing preferences.
Perceptible transformation is optimized inside those gates.

## Directional Behavior

### Standard English → Gen Alpha

This direction uses one canonical forward contract. It targets a stylized,
recognizable Gen Alpha translator register rather than a literal simulation of
an average child's everyday speech.

### Gen Alpha → Standard English

This direction returns natural, conversational Standard American English that
recovers literal meaning, attitude, social intent, and implied context. It has
no intensity setting and should not retain stylization merely for flavor.

## Forward Translation Strategy

Use the first strategy that produces a strong, faithful result:

1. Use an established Gen Alpha expression or construction when it fits
   precisely.
2. When no strong direct equivalent exists, create a transparent,
   context-specific recast using productive patterns associated with Gen Alpha.
3. Draw from Gen Z, gaming, meme, AAVE-derived, queer, or broader internet
   language only when no suitable Gen Alpha construction exists or when those
   traditions supply the clearest basis for a recoverable coinage.
4. Preserve the source conservatively only when stronger transformation would
   make the result unnatural, misleading, or unrecoverable.

Adjacent registers are supporting knowledge, not the primary target. Their use
must be contextually accurate and should not erase cultural provenance by
presenting every internet expression as uniquely Gen Alpha.

## Transformation Floor

A forward result must feel clearly translated.

The following do not satisfy that requirement by themselves:

- Contractions or generic casual grammar
- An ordinary synonym
- A mainstream or older idiom substituted for another mainstream idiom
- Workplace or marketing language described as youth language
- An appended marker such as “fr” attached to an otherwise ordinary paraphrase
- An explanatory sentence added after an under-translated result

The translation should transform a high-leverage verb, evaluation, image,
idiom, discourse marker, relationship, or sentence structure. One strong,
integrated transformation is preferable to several weak signals.

## Invention and Coinage

Novel language is encouraged when established vocabulary cannot produce a
strong translation. A successful coinage is:

- Built from recognizable components or productive patterns
- Immediately inferable from the sentence's context
- Specific to the source rather than reusable filler
- Concise enough that it does not require a second sentence to decode
- Compatible with the source's semantic backbone

Permitted mechanisms include:

- Productive affixes such as `-maxxing`
- Transparent compounds
- Product-tier or interface analogies
- Gaming and status metaphors
- Sound-based, rhythmic, or grammatical play
- Domain-specific puns and double meanings

These mechanisms are generative patterns, not a phrase bank. Previously
observed NGA expressions should not be copied into unrelated contexts.

## Context Budget

Each sentence should normally contain one dominant invention or contextual
recast. Supporting slang is permitted when it improves rhythm, clarity, or
cohesion, but it must not introduce a competing metaphor or unrelated meme.

Across paragraphs:

- Preserve a coherent voice.
- Concentrate transformation at high-leverage moments.
- Preserve names, domain nouns, facts, and technical terminology.
- Avoid translating every eligible word.
- Do not repeat the same slang marker merely to sustain the register.

Text-only translation requires more conservative invention than a captioned
video with visible context. The output itself must supply enough context to
recover the intended meaning.

## Expressive Expansion Budget

The translator may:

- Make imagery more vivid.
- Increase rhythm, playfulness, or performative energy.
- Slightly amplify an emotion already present.
- Turn an existing evaluation into a more entertaining expression of the same
  evaluation.

The translator must not:

- Reverse emotional polarity.
- Turn neutral information into praise, criticism, mockery, or judgment.
- Change a statement into a command, promise, apology, threat, or other speech
  act.
- Convert avoidance into victory, effort into success, uncertainty into
  certainty, or inconvenience into disaster.
- Invent an action, participant, motive, relationship, competition, or outcome.
- Add romance, hostility, urgency, or social status absent from the source.

Emotional amplification should be slight and serve humor or translation. It
must not alter what the speaker materially believes, wants, or communicates.

## Canonical Reverse Translation Contract

The reverse translation must:

- Recover both literal meaning and pragmatic force.
- Preserve praise, criticism, humor, affection, requests, assertions,
  apologies, and other speech acts.
- Preserve fragments as fragments when context is missing.
- Avoid inventing a speaker, subject, addressee, pronoun, or emotional valence.
- Use a neutral rendering when context cannot resolve genuine ambiguity.
- Surface important ambiguity in “Why these changes” without claiming
  unwarranted certainty.
- Recover transparent coinages from their components and context rather than
  treating unfamiliar wording as meaningless.

Reverse recoverability is a diagnostic for forward creativity, not a
requirement that a round trip reproduce the exact original wording.

## Profanity Policy

The product must not generate or repeat unredacted profanity in either
direction.

- Prefer replacing source profanity with a non-profane expression that
  preserves its approximate force and emotional role.
- A first-letter redaction such as `f-` is also permitted in the translation
  when removing the profanity would noticeably flatten the source's tone.
- Do not intensify profanity or substitute a different profane term.
- In explanation fields that quote the source, redact a profane word to its
  first letter followed by a hyphen, such as `f-`.
- Reasons may describe the source as profane without reproducing the word.

Sanitization must not flatten the rest of the source's emotion or intent.

## Vocabulary Policy

Vocabulary should reflect current Gen Alpha idiom without becoming a static
approved list.

Every notable choice must serve meaning, tone, rhythm, register, humor, or
idiomatic naturalness. The product should:

- Prefer context-specific language over reusable filler.
- Treat recurring markers such as “lowkey,” “chat,” “rizz,” and “aura” as
  optional tools rather than mandatory proof of translation.
- Avoid stereotypes, caricature, performative misspelling, and dated language
  presented as current.
- Preserve names and essential technical vocabulary.
- Avoid falsely describing ordinary language as internet or youth vernacular.
- Avoid repetitive phrasebook behavior across unrelated inputs.

## Explanations

“Why these changes” should explain noteworthy slang, coinages, idioms, genuine
ambiguity, pragmatic meaning, or meaning-sensitive stylistic changes.

Explanations should:

- Select the smallest semantically corresponding source and translated spans.
- Use one item per independently meaningful transformation.
- Permit whole-sentence spans for genuinely integrated recasts.
- Explain the complete selected pair.
- Clarify productive word formation when a coinage may be unfamiliar.
- Surface unresolved ambiguity without claiming certainty.
- Be concise and useful to someone unfamiliar with the target register.
- Redact profanity according to the policy above.

No explanation is preferable to one that merely restates the translation.

## Failure Modes

### Under-translation

The output remains ordinary casual, workplace, or mainstream idiomatic English
without a perceptible target-register transformation.

### Decorative slang

A generic marker is attached to an otherwise under-translated sentence.

### Unsupported invention

A metaphor or coinage creates a new event, outcome, motive, relationship,
judgment, or implication.

### Unrecoverable invention

A novel expression cannot be interpreted from its components and context.

### Over-translation

Competing metaphors, dense slang, or excessive performance harms coherence.

### Meaning or pragmatic drift

The output changes facts, agency, intent, speech act, polarity, required
actions, certainty, or material interpersonal stance.

### Phrasebook repetition

A narrow set of expressions recurs across unrelated inputs.

### False cultural labeling

An ordinary, dated, or culturally mismatched phrase is presented as current
Gen Alpha language.

### Explanation misalignment

Selected spans are unnecessarily broad, contain different semantic
information, combine independent changes, or are not fully explained.

### Profanity leakage

The output or explanation repeats or generates an unredacted profane term.

## Evaluation Rubric

Evaluation is intentionally lightweight and separates the product's two
outputs.

### Translation rating

Choose **thumbs up** when the translation is ready to use. Otherwise choose
**thumbs down** and optionally select one primary reason:

- Not transformed enough
- Meaning changed
- Unnatural or forced
- Culturally weak or dated
- Too much unsupported invention
- Profanity not sanitized
- Other

A translation cannot receive thumbs up if it materially changes the semantic
backbone, reverses polarity, changes the speech act, or leaks profanity.

Among translations that pass those gates, prefer:

1. Clearly perceptible transformation
2. Gen Alpha cultural currency
3. Context specificity and recoverability
4. Humor or delight
5. Vocabulary novelty and diversity

### Explanation rating

Choose **aligned** when the explanations accurately and usefully account for
the noteworthy changes. Otherwise choose **misaligned** and optionally select
one primary reason:

- Span too broad
- Spans do not correspond
- Reason is inaccurate
- Important change omitted
- Unnecessary explanation
- Profanity not redacted
- Other

Explanations remain visible while the translation is rated.

### Evaluation protocol

- Compare prompt versions on identical inputs.
- Run each prompt three times per input.
- Rate translation and explanation independently.
- Record prompt version, model, date, direction, run number, and ratings.
- Track repeated vocabulary across the full dataset.
- Treat reverse round trips as recoverability diagnostics, not exact-match
  tests.
- Add multiple raters later if authenticity judgments become a release
  bottleneck; one product rater is sufficient for the current iteration.

## Acceptance Criteria

A forward prompt revision is a viable successor to v5.1 only when:

- Translation approval improves on the matched held-out suite.
- Under-translation declines without a material increase in meaning drift.
- Novel expressions remain contextually recoverable.
- Profanity is consistently sanitized and redacted.
- Repeated runs show acceptable stability.
- Vocabulary does not collapse around a narrow set of markers.
- Reverse behavior and explanation alignment do not materially regress.

Exact numerical release thresholds should be set after the first matched
v5.1-versus-v6 evaluation establishes a realistic baseline.
