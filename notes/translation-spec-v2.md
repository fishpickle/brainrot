# Translation Behavioral Specification v2

**Status:** Canonical

**Last updated:** 2026-07-29

**Applies to:** Standard English ↔ Gen Alpha translation

## Purpose

This document defines the intended behavior of the Gen Alpha Translator. It is
the source of truth for product decisions, prompt design, evaluation, and
acceptance testing. It describes required outcomes, not prompt language.

## Product Goals

The product translates between contemporary Standard American English and the
youth and internet vernacular naturally associated with Gen Alpha while
preserving meaning, tone, and communicative intent.

It should:

- Feel like a credible translation tool rather than a joke generator.
- Produce a natural, unmistakably translated result in either direction.
- Help people understand unfamiliar language without condescension.
- Explain only noteworthy idioms, ambiguity, or meaning-sensitive changes.
- Handle paragraphs as well as short phrases.
- Return useful results quickly enough for an interactive workflow.

Entertainment is welcome when it follows naturally from the target register.
It is not a substitute for fidelity or authenticity.

## Translation Philosophy

Translation is a transfer of meaning and social intent between registers, not a
word-replacement exercise.

A successful translation preserves:

1. Factual content
2. Communicative intent and speech act
3. Emotional and interpersonal tone
4. Relevant implications and idiomatic meaning
5. Subjects, speakers, addressees, and relationships
6. Structural formatting

Natural target-register phrasing is preferred over literal wording when a
literal rendering would sound unnatural. The source may be shortened,
restructured, compressed, or made more figurative when the target register
calls for it, but those changes must not introduce a new claim, action,
relationship, judgment, emotion, or degree of certainty.

## Directional Behavior

### Standard English → Gen Alpha

This direction has one canonical forward contract. The output should combine
the readability originally intended for Cooked with the willingness to recast
shown by successful Ohio Max translations. It does not inherit Ohio Max's
permission for dense slang, heightened performance, or emotional escalation.

### Gen Alpha → Standard English

This direction has one canonical behavior: natural, conversational Standard
American English that recovers literal meaning, attitude, social intent, and
implied context. It has no intensity setting.

## Canonical Forward Translation Contract

The translation must:

- Feel unmistakably translated, not merely casualized.
- Use contemporary language naturally associated with Gen Alpha.
- Use the strongest natural transformation the source supports.
- Integrate target-register language into the sentence rather than attaching
  decorative slang.
- Remain coherent and understandable from context.
- Sustain the target register across multi-sentence input.
- Preserve every fidelity invariant.

Valid transformation mechanisms include:

- Idiomatic recasting
- Rhythmic or syntactic restructuring
- Compression
- Context-specific metaphor
- Playful but immediately recoverable word formation
- Contemporary vocabulary that fits the source

One strong contextual recast is better than several weak slang markers.
Contractions, generic casual wording, an appended slang phrase, or an extra
explanatory sentence do not by themselves constitute a successful translation.

The translation must not:

- Stack slang to demonstrate transformation.
- Heighten excitement, mockery, certainty, praise, or criticism.
- Add unrelated memes or cultural references.
- Become random, surreal, hostile, or performative unless the source already
  has that quality.
- Invent content to compensate for a source with no natural slang equivalent.

## Canonical Reverse Translation Contract

The translation must:

- Recover both literal meaning and pragmatic force.
- Preserve whether the source is praise, criticism, humor, affection, a
  request, an assertion, an apology, or another speech act.
- Preserve fragments as fragments when context is missing.
- Avoid inventing a speaker, subject, addressee, pronoun, or emotional valence.
- Use a neutral rendering when context cannot resolve genuine ambiguity.
- Surface important ambiguity in “Why these changes” without claiming
  unwarranted certainty.

## Fidelity Budget

The following may not change in either direction:

- People, entities, objects, events, and relationships
- Subjects, speakers, and addressees
- Required actions, prohibitions, requests, assertions, and commitments
- Explanations, apologies, praise, criticism, and other speech acts
- Time, sequence, quantity, certainty, and negation
- The speaker's core goal
- Material emotional valence and interpersonal stance
- Existing profanity level

The translation must not add profanity, threats, praise, criticism, competition,
romance, urgency, humor, or social judgment absent from the source. When
creativity conflicts with fidelity, fidelity wins.

## Vocabulary Policy

Vocabulary should represent contemporary, natural American youth and internet
usage associated with Gen Alpha rather than a static phrase list.

Every notable choice must contribute to meaning, tone, rhythm, register, or
idiomatic naturalness. The product should:

- Prefer context-specific language over reusable filler.
- Avoid generic slang used only to signal that translation occurred.
- Use “no cap” only when sincerity, truthfulness, disbelief, or emphasis is
  relevant.
- Avoid stereotypes, caricatures, outdated terminology presented as current,
  and excessive performative misspelling.
- Preserve names, technical terms, and essential domain vocabulary when
  replacing them would reduce accuracy.
- Preserve source profanity without introducing or escalating it.

## Explanations

“Why these changes” should explain noteworthy slang, idioms, genuine ambiguity,
pragmatic meaning, or meaning-sensitive stylistic changes.

Explanations should:

- Be concise and understandable to someone unfamiliar with the target register.
- Clarify why a phrase fits the source context.
- Surface important implied meaning or unresolved ambiguity.
- Avoid explaining trivial grammar or implementation details.
- Avoid claiming that contextual usage is universal.

No explanation is preferable to one that merely restates the translation.

## Failure Modes

The following are product failures:

### Decorative slang

An otherwise unchanged sentence receives a generic prefix, suffix, filler, or
extra sentence that does not serve its meaning or tone.

### Under-translation

The result is grammatical but remains substantially in the source register.

### Over-translation

The result stacks unnecessary slang, harms readability, or turns translation
into a performance.

### Phrasebook repetition

A narrow group of expressions recurs across unrelated inputs.

### Meaning or tone drift

The translation changes facts, intent, required actions, relationships,
emotional direction, or social judgment.

### Pragmatic flattening

Literal content survives but the source's criticism, humor, affection, urgency,
ambiguity, or social function is lost.

### Unsupported inference

The result invents a subject, addressee, pronoun, claim, or emotional valence.

### False certainty

An ambiguous phrase receives a narrow interpretation unsupported by context.

## Evaluation Rubric

Each output is scored independently on a 1–5 scale:

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| Meaning fidelity | Material meaning changed | Core meaning retained with minor loss | Facts and implications fully preserved |
| Pragmatic fidelity | Speech act or stance changed | General intent retained | Social function and stance fully retained |
| Naturalness | Awkward or implausible | Understandable but uneven | Natural in the target register |
| Register transformation | Source register remains | Partially transformed | Unmistakably in the target register |
| Vocabulary relevance | Decorative or mismatched | Mostly relevant | Every notable choice fits the context |
| Overall usefulness | Misleading or unusable | Usable with revision | Ready to use as-is |

Standard → Gen Alpha also receives this binary check:

> Is the output unmistakably in the target register without relying on an
> appended marker?

Reverse translations are evaluated for semantic stability and ambiguity
preservation, not intensity differentiation.

### Automatic rejection conditions

Reject an output if it:

- Introduces a material factual or intent change.
- Reverses or removes negation.
- Adds a new subject, addressee, required action, or social judgment.
- Changes the source's speech act or material emotional valence.
- Introduces or escalates profanity.
- Assigns unsupported certainty to an ambiguous source.

### Evaluation protocol

- Compare prompt versions on the same inputs.
- Run each condition multiple times to measure stability.
- Separate harmless wording variation from interpretive instability.
- Balance both directions and a range of speech acts and contexts.
- Include questions, requests, commands, negation, emotion, sarcasm, ambiguity,
  formality, profanity, technical language, and multi-sentence passages.
- Test ambiguous reverse phrases both alone and with disambiguating context.
- Record model, prompt version, date, direction, run number, and rater type.
- Track repeated slang across the full dataset.
- Use more than one rater when judging authenticity or tone.

## Acceptance Criteria

A prompt or product revision is acceptable only when:

- Meaning and pragmatic fidelity do not regress from the Prompt v2 baseline.
- Forward outputs are unmistakably translated without decorative slang.
- Clear reverse translations remain stable and natural.
- Ambiguous reverse translations do not invent subjects, addressees, or
  polarity.
- Generic filler and repeated slang decline materially.
- Automatic rejection failures are rare and investigated individually.

Exact numerical release thresholds should be set after the rubric is calibrated
on a representative dataset.
