# Prompt v6 Launch Held-Out Evaluation — 2026-08-04

## Purpose

Determine whether the latest Prompt v6 generalizes well enough to replace
v5.1 as the launch default. These inputs were not used to develop or calibrate
v6 and must not be used for prompt revision before the first comparison is
complete.

## Design

- Direction: Standard English → Gen Alpha
- Prompt versions: v5.1 and v6
- Runs: Three per input and prompt
- Inputs: 15 across five product-risk categories
- Total requests: 90
- Translation and explanation ratings remain independent
- Ratings should be blind to prompt version when practical

Reverse translation is excluded from the matched comparison because v5.1 and
v6 use the same reverse contract. It remains part of release-candidate smoke
testing.

## Inputs

### A — Figurative and Idiomatic Meaning

| ID | Input |
|---|---|
| A1 | I don’t want to count my chickens before they hatch. |
| A2 | She opened a can of worms by mentioning the budget. |
| A3 | We need to read the room before we bring that up. |

### B — Speech Acts and Interpersonal Tone

| ID | Input |
|---|---|
| B1 | Thanks for checking on me, but I’d rather be alone tonight. |
| B2 | Could you lower the music while I finish this call? |
| B3 | I’m sorry I missed your message; I wasn’t ignoring you. |

### C — Factual and Technical Fidelity

| ID | Input |
|---|---|
| C1 | The library will close at 6 p.m. on Friday for electrical repairs. |
| C2 | Water expands when it freezes, which can crack sealed containers. |
| C3 | The committee approved the proposal by a vote of seven to three. |

### D — Everyday Transformation

| ID | Input |
|---|---|
| D1 | My headphones disappeared five minutes before the train arrived. |
| D2 | That tiny café makes surprisingly good pancakes. |
| D3 | Please remind me to charge the camera before sunrise. |

### E — Contextual Creativity and Coinage

| ID | Input |
|---|---|
| E1 | The shared calendar is so confusing that nobody knows which meeting is real. |
| E2 | Her suitcase is small, but somehow it holds everything she needs. |
| E3 | The presentation looked ordinary until the final slide changed the whole argument. |

## Translation Rating

Choose **up** only when the output is ready to use. Otherwise choose **down**
with one primary reason:

- Not transformed enough
- Meaning changed
- Unnatural or forced
- Culturally weak or dated
- Unsupported invention
- Profanity not sanitized
- Other

The semantic backbone, speech act, polarity, factual relationships, time,
quantity, and required actions are gates. Target-register grammatical play is
allowed when understandable, expressive, and plausible rather than
mechanically assembled.

## Explanation Rating

Choose **aligned** only when the explanations accurately and usefully account
for noteworthy changes. Otherwise choose **misaligned** with one primary
reason:

- Span too broad
- Spans do not correspond
- Reason is inaccurate
- Important change omitted
- Unnecessary explanation
- Profanity not redacted
- Other

## Promotion Decision

Prompt v6 should replace v5.1 only if it produces a meaningful translation
approval gain without a material explanation regression or a new systematic
fidelity failure. Category-level patterns and repeated failure modes matter
more than a narrow aggregate win.
