# Translation Behavioral Specification v1

**Status:** Canonical

**Last updated:** 2026-07-28
**Applies to:** Standard English ↔ Gen Alpha translation

## Purpose

This document defines the intended behavior of the Gen Alpha Translator. It is
the source of truth for product decisions, prompt design, evaluation, and
acceptance testing. It describes required outcomes, not implementation or
prompt language.

## Product Goals

The product translates between contemporary Standard American English and Gen
Alpha slang while preserving meaning, tone, and communicative intent.

It should:

- Feel like a credible translation tool rather than a joke generator.
- Produce natural language appropriate to the selected direction and intensity.
- Help parents, teachers, millennials, Gen X users, and young people understand
  unfamiliar language without condescension.
- Make noteworthy changes understandable through concise explanations.
- Handle a paragraph, not only isolated slang terms or one-line examples.
- Return useful results quickly enough to support an interactive workflow.

Entertainment is welcome when it follows naturally from the selected register.
It is not a substitute for fidelity or authenticity.

## Translation Philosophy

Translation is a transfer of meaning and social intent between registers, not a
word-replacement exercise.

A successful translation preserves:

1. Factual content
2. Communicative intent
3. Emotional and interpersonal tone
4. Relevant implications and idiomatic meaning
5. Structural formatting

Style is adapted only after these obligations are satisfied. Natural phrasing
is preferred over literal wording when literal wording would sound unnatural in
the target register.

The source may be shortened, restructured, or made more figurative when the
target register calls for it. Those changes must not introduce a new claim,
action, relationship, judgment, or emotional stance.

Ambiguous slang should be translated according to the most likely
context-supported meaning. Genuine ambiguity should remain visible rather than
being concealed by unwarranted certainty.

Gen Alpha → Standard English should recover both literal meaning and pragmatic
force. For example, a rebuke should not become a neutral suggestion merely
because its literal action is the same.

## Directional Behavior

### Standard English → Gen Alpha

This direction supports the Mild, Cooked, and Ohio Max intensity contracts.
Intensity controls the degree of register transformation, not factual content.

### Gen Alpha → Standard English

This direction has one canonical behavior: natural, conversational Standard
American English that fully preserves meaning, attitude, and implied context.

The Mild, Cooked, and Ohio Max labels do not apply in this direction. If the
product later introduces reverse-translation modes, they require separate
names, user expectations, and evaluation criteria.

## Intensity Contracts

Intensity is relational. Cooked must be observably more transformed than Mild,
and Ohio Max must be observably more transformed than Cooked. Adding a generic
slang marker to an otherwise unchanged sentence does not satisfy a higher
intensity contract.

### Mild

Mild is accessible, restrained, and broadly understandable.

- Uses a small number of contextually appropriate slang transformations.
- Usually retains the source sentence structure.
- Preserves readability for users unfamiliar with Gen Alpha slang.
- Avoids dense references, stacked slang, and unnecessary exaggeration.
- Should feel translated, not merely suffixed with a slang phrase.

### Cooked

Cooked is clearly and consistently Gen Alpha in voice.

- Uses multiple contextually relevant transformations when the source supports
  them.
- May recast rhythm, syntax, or phrasing rather than preserving the source
  structure.
- Remains coherent and understandable from context.
- Uses slang as part of the sentence's construction, not as decoration.
- Must be materially distinguishable from Mild.

### Ohio Max

Ohio Max is highly stylized, playful, and unmistakably transformed.

- May use strong compression, figurative framing, rhythmic restructuring, and
  dense slang.
- Can heighten expressive energy while retaining the source's underlying tone.
- Must remain interpretable and semantically faithful.
- Must be materially distinguishable from Cooked.
- Is not permission to become random, surreal, insulting, or factually
  inventive unless those qualities already exist in the source.

## Fidelity Budget

### Invariants for every direction and intensity

The following may not change:

- People, entities, objects, events, and relationships
- Required actions, prohibitions, requests, and commitments
- Time, sequence, quantity, certainty, and negation
- The speaker's core goal
- Material emotional valence
- Existing profanity level, unless direct translation requires a neutral
  equivalent in Standard English

The translation must not add profanity, threats, praise, criticism, competition,
romance, urgency, or social judgment absent from the source.

### Permitted variation by intensity

- **Mild:** Minimal tonal variation. Clarity and fidelity dominate.
- **Cooked:** Noticeable stylistic and rhythmic variation. Tone may be made more
  casual, but its direction and social meaning must remain stable.
- **Ohio Max:** Maximum surface-level creativity. Expressive energy may increase,
  but facts, intent, and interpersonal stance remain fixed.

When creativity conflicts with fidelity, fidelity wins at every intensity.

## Vocabulary Policy

Vocabulary should represent contemporary, natural American Gen Alpha usage
rather than a static list of recognizable internet terms.

Every slang choice must contribute to at least one of:

- Meaning
- Tone
- Rhythm
- Register
- Idiomatic naturalness

Generic slang must not be used solely to signal that a translation occurred.
Expressions such as “no cap” are appropriate only when sincerity, truthfulness,
disbelief, or emphasis is relevant to the source.

The product should:

- Prefer context-specific language over reusable filler.
- Avoid repeating one fashionable phrase across unrelated contexts.
- Avoid forcing slang into sentences that have no natural slang equivalent.
- Avoid outdated terminology presented as current Gen Alpha usage.
- Avoid stereotypes, caricatures, and excessive performative misspelling.
- Preserve names, technical terms, and essential domain vocabulary when
  replacing them would reduce accuracy.
- Preserve source profanity without introducing or escalating it.

Novel or playful phrasing is acceptable when its meaning is recoverable and it
respects the fidelity budget.

## Explanations

“Why these changes” should explain noteworthy slang, idioms, pragmatic meaning,
or meaning-sensitive stylistic transformations.

Explanations should:

- Be concise and understandable to someone unfamiliar with the target register.
- Clarify why a phrase fits the source context.
- Surface important implied meaning when a literal translation would be
  incomplete.
- Avoid explaining trivial grammar or implementation details.
- Avoid claiming that a phrase is universal when usage is contextual.

No explanation is preferable to an explanation that merely restates the
translation.

## Failure Modes

The following are product failures:

### Decorative slang

An otherwise unchanged sentence receives a generic prefix, suffix, or filler
phrase that does not serve its meaning or tone.

### Intensity collapse

Adjacent intensity levels are identical or differ only through decorative
slang.

### Phrasebook repetition

A narrow group of expressions recurs across semantically unrelated inputs,
making outputs feel templated.

### Meaning drift

The translation changes or adds facts, intent, required actions, relationships,
or judgments.

### Tone drift

A neutral message becomes competitive, mocking, hostile, celebratory, or
otherwise socially different from the source.

### Pragmatic flattening

Literal content survives but the idiom's implied criticism, humor, affection,
urgency, or social function is lost.

### Randomness mistaken for intensity

Ohio Max becomes incoherent, surreal, or culturally referential without a clear
connection to the source.

### Under-translation

The result is grammatical but remains substantially in the source register.

### Over-translation

The result stacks unnecessary slang, harms readability, or turns a translation
into a performance.

### False certainty

An ambiguous phrase is assigned a narrow meaning unsupported by context.

## Evaluation Rubric

Each output is scored independently on a 1–5 scale:

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| Meaning fidelity | Material meaning changed | Core meaning retained with minor loss | Facts and implications fully preserved |
| Tone fidelity | Social or emotional stance changed | General tone retained | Tone and communicative intent fully retained |
| Naturalness | Awkward or implausible | Understandable but uneven | Natural in the target register |
| Intensity fit | Wrong or absent intensity | Partially matches contract | Clearly fulfills the selected contract |
| Vocabulary relevance | Decorative or mismatched slang | Mostly relevant | Every notable choice fits the context |
| Overall usefulness | Misleading or unusable | Usable with revision | Ready to use as-is |

Standard → Gen Alpha triplets also receive two comparative scores:

- Mild → Cooked differentiation
- Cooked → Ohio Max differentiation

Each differentiation score is:

- **0:** Identical or decorative difference only
- **1:** Noticeable but weak difference
- **2:** Clear, contract-aligned difference

### Automatic rejection conditions

An output is rejected regardless of average score if it:

- Introduces a material factual or intent change.
- Reverses or removes negation.
- Adds a new required action or social judgment.
- Introduces or escalates profanity.
- Produces unsafe, discriminatory, or targeted insulting content absent from the
  source.

### Evaluation protocol

- Evaluate intensity triplets side by side.
- Compare prompt versions on the same inputs.
- Run each condition multiple times to measure stability.
- Balance both translation directions and a range of speech acts and contexts.
- Include questions, requests, commands, negation, emotion, sarcasm, ambiguity,
  formality, profanity, technical language, and multi-sentence passages.
- Record the model, prompt version, date, direction, intensity, and rater type.
- Track repeated slang and adjacent-level similarity across the full dataset.
- Use more than one rater when judging authenticity or tone.

## Acceptance Criteria

A prompt or product revision is acceptable only when:

- Meaning and tone fidelity do not regress from the current baseline.
- Cooked is consistently distinguishable from Mild.
- Ohio Max is consistently distinguishable from Cooked.
- Generic filler and repeated slang decline materially.
- Reverse translation preserves pragmatic meaning, not only literal content.
- Automatic rejection failures are rare and investigated individually.

Exact numerical release thresholds should be set after the evaluation rubric is
calibrated on a representative dataset.
