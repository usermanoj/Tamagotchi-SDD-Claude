# 🔄 Feature 3: Dynamic States — validation.md

## Level 1 — Automated Tests

### Test Suite: stateTransitions.test.js
- Tick with hunger=0 → petState becomes 'sick'.
- Tick with happiness=0 → petState becomes 'sick'.
- Tick with energy=0 → petState becomes 'sick'.
- Care action raises all stats > 0 while sick → petState becomes 'normal'.
- 6 ticks (60s) with happiness=80 while normal → lifeStage='teen', petState='evolved'.
- Happiness drops to 79 after 5 ticks → evolutionTimer resets to 0, no evolution.
- Evolved pet with hunger=0 → petState='sick', lifeStage stays 'teen'.

### Test Suite: PetDisplay.test.jsx
- Renders sick sprite when petState prop is 'sick'.
- Renders evolved sprite when petState prop is 'evolved'.
- State badge shows 'Sick!' when petState is 'sick'.
- State badge shows 'Evolved ✨' when petState is 'evolved'.

## Level 2 — Manual User Flow Tests
| Test ID | Steps & Expected Result |
|---|---|
| DS-M-01 | Let Hunger tick to 0. Verify ChuChu shows sick sprite and red pulse. Verify Play button is disabled. |
| DS-M-02 | While Sick, Feed and Rest until all stats > 0. Verify petState reverts to 'normal'. |
| DS-M-03 | Raise Happiness to 85. Wait 60 seconds. Verify ChuChu evolves to Teen with sparkle animation. |
| DS-M-04 | Raise Happiness to 85. At 50 seconds, drop Happiness to 75. Verify timer resets. |
| DS-M-05 | Evolve ChuChu. Then let a stat hit 0. Verify Sick fires but lifeStage remains 'teen'. |
| DS-M-06 | Refresh page mid-evolution (evolutionTimer ~40s). Verify timer resumes from saved value, not 0. |
| DS-M-07 | Verify evolution badge and shimmer persist after page refresh. |

## Validation Completion Gate
- All automated tests pass (npm test — 0 failures).
- All 7 manual tests pass.
- No console errors during state transitions.
