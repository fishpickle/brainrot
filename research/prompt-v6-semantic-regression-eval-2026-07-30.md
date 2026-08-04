# Prompt v6 Semantic Regression — 2026-07-30

## Scope

Three fresh runs for the six focused-regression inputs after adding semantic
resolution while shortening the active forward instructions by 1,031
characters (18%). The product owner reviewed all eighteen outputs
individually.

## Results

| ID | Run | Translation | Rating | Primary note |
|---|---:|---|---|---|
| A1 | 1 | Your move’s queued up now. | Up | Excellent, pithy transformation |
| A1 | 2 | Your move now—you got the controller. | Up | Effective but wordier and less natural than Run 1 |
| A1 | 3 | It’s your move now—your serve’s live. | Down | Target-register signal feels secondary and appended |
| A2 | 1 | We haven’t forest-escaped yet. | Down | Literalizes the source vehicle |
| A2 | 2 | We haven’t respawned out the danger biome yet. | Down | Implies a prior failure and remains awkward |
| A2 | 3 | We haven’t cleared the danger biome yet. | Up | Expresses continuing danger through a gaming frame |
| B2 | 1 | Window-side seat, lock it in for me. | Down | Unnatural fronted construction persists |
| B2 | 2 | Window-side seat, lock it in for me. | Down | Unnatural fronted construction persists |
| B2 | 3 | Window-side seat? Save that slot for me. | Up | Borderline; “window-side seat” remains awkward |
| B3 | 1 | The package pulled up a whole two days early. | Up | Faithful but barely transformed enough |
| B3 | 2 | The package pulled up two days ahead of its ETA. | Up | Faithful but barely transformed enough |
| B3 | 3 | The package pulled up two days early, lowkey beating the ETA. | Up | Strongest of the three; colorful and factually anchored |
| C3 | 1 | The museum low-key secured the painting from a private collection in 1987. | Down | Ordinary synonym plus decorative marker |
| C3 | 2 | The museum snatched the painting from a private collection in 1987. | Up | Perceptible, recoverable acquisition recast |
| C3 | 3 | The museum copped the painting from a private collection in 1987. | Up | Direct vernacular recast of obtaining |
| D1 | 1 | The invite is giving honored, but I need a lil think-buffer before I lock in. | Down | Still changes the attitude-holder structure |
| D1 | 2 | Lowkey appreciate the invite, but I need a minute to let it marinate. | Up | Vastly improved; preserves appreciation and deliberation |
| D1 | 3 | Big appreciate for the invite, but I need a lil think-buffer before I lock in. | Up | Direct appreciation with a strong second clause |

**Product-owner approval:** 11/18 (61%)

## Assessment

The compact semantic-resolution procedure materially improves the focused set
from 3/18 product-owner approvals in the prior run to 11/18 product-owner
approvals. A1 now translates turn-taking rather than a literal ball, C3 clears
the transformation floor in two runs, and D1 preserves the speaker’s act of
appreciation in two runs. B3 remains strong.

The remaining failures are concentrated and legible: inconsistent idiom
resolution on A2, the repeated fronted syntax on B2, decorative “low-key,” and
one residual attitude-holder error. This regression is fully calibrated;
future generations will require their own product-owner review.
