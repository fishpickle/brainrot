# Prompt v6 Focused Regression — 2026-07-30

## Scope

Three fresh v6 runs for each of the six inputs that produced the twelve
product-owner-rejected outputs in the held-out evaluation. The product owner
reviewed all eighteen outputs individually after an initial AI product review.

## Results

| ID | Run | Translation | Rating | Primary reason |
|---|---:|---|---|---|
| A1 | 1 | The ball’s in your court now—your move, fr. | Down | Not transformed enough; appended filler |
| A1 | 2 | The ball just got passed to your side—your move now. | Down | Not transformed enough |
| A1 | 3 | Your turn’s got the controller now. | Down | Unnatural subject; promising gaming recast |
| A2 | 1 | We’re not out the forest-server yet. | Down | Unnatural, under-transformed literalization |
| A2 | 2 | We’re not outta the forest boss level yet. | Down | Unnatural, under-transformed literalization |
| A2 | 3 | We’re not forest-free yet. | Down | Unnatural literalization |
| B2 | 1 | Window-side seat, save it for me. | Down | Unnatural word order; insufficient transformation |
| B2 | 2 | Window-side seat, save it for me. | Down | Unnatural word order; insufficient transformation |
| B2 | 3 | Window-side seat, save it for me. | Down | Unnatural word order; insufficient transformation |
| B3 | 1 | The package pulled up two days early. | Up | Faithful, natural high-leverage recast |
| B3 | 2 | The package pulled up two days ahead of schedule. | Up | Faithful, natural high-leverage recast |
| B3 | 3 | The package pulled up two days early, low-key speedrunning the expected date. | Up | Vivid but recoverable; no new factual circumstance |
| C3 | 1 | The museum collection-snapped the painting from a private collection in 1987. | Down | Creative but mechanical near-miss |
| C3 | 2 | The museum secured the painting from a private collection in 1987. | Down | Not transformed enough |
| C3 | 3 | The museum got the painting from a private collection in 1987. | Down | Not transformed enough |
| D1 | 1 | The invite is sweet, but I need a little brain-buffer time on it. | Down | Changes expressed appreciation into an evaluation |
| D1 | 2 | The invite is low-key a W, but I need a lil think-sesh before I lock in. | Down | Changes expressed appreciation into an evaluation |
| D1 | 3 | The invite is sweet, but I need a lil brain-buffer time before I lock in. | Down | Changes expressed appreciation into an evaluation |

**Product-owner approval:** 3/18 (17%)

## Assessment

The revision produced a clean improvement only on B3. All three outputs
preserve the timing fact while using “pulled up,” and the most creative run
keeps its speedrunning metaphor anchored to the known early arrival. Run 2 is
approved but weaker because “ahead of schedule” returns part of the sentence to
Standard English; Run 3 is slightly wordy but adds useful color.

The remaining rules are not reliably operational:

- A1 and A2 reveal a deeper idiom-resolution failure. The prompt manipulates a
  source idiom’s literal vehicle—ball, court, woods, or forest—instead of first
  resolving its conventional figurative meaning and translating from that
  meaning. “Your turn’s got the controller” is a promising gaming recast, but
  fails because “your turn” is an unnatural grammatical subject.
- B2 converges on the same awkward fronted construction in all three runs.
- C3 alternates between mechanical coinage and ordinary synonyms.
- D1 continues to replace the speaker’s act of appreciation with an evaluation
  of the invitation, despite the new ownership rule. Its second clauses,
  including “brain-buffer time” and “think-sesh before I lock in,” are strong
  partial transformations.

The next v6 revision should add an idiom-resolution procedure: silently
identify literal, conventional figurative, and genuinely ambiguous readings;
derive the intended proposition; then translate from that proposition rather
than from the source imagery. Preserve the original vehicle only when context
supports literal or intentionally double meaning.

The stable B2, C3, and D1 failures should not be solved by adding
example-specific phrases.
