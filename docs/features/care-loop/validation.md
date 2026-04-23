# 💖 Feature 2: Care Loop — validation.md

## Level 1 — Automated Tests

### Test Suite: actions.test.js
- Feed: hunger 50 → 75. Feed: hunger 90 → 100 (capped, not 115).
- Play: happiness 60 → 80, energy 50 → 40.
- Play: energy 5 → 0 (floored), not -5.
- Rest: energy 60 → 90 (capped at 100 if near max). Happiness 10 → 5.
- Rest: happiness 3 → 0 (floored).

### Test Suite: ActionButtons.test.jsx
- Feed button is disabled when hunger prop is 100.
- Feed button is enabled when hunger prop is 99.
- Play button is disabled when energy prop is 0.
- Play button is disabled when petState prop is 'sick'.
- Rest button is never disabled regardless of prop values.
- Clicking Feed calls onFeed callback exactly once.
- Clicking disabled Feed does not call onFeed.

## Level 2 — Manual User Flow Tests
| Test ID | Steps & Expected Result |
|---|---|
| CL-M-01 | Set Hunger to 50. Click Feed. Verify Hunger shows 75. |
| CL-M-02 | Set Hunger to 85. Click Feed. Verify Hunger shows 100 (not 110). |
| CL-M-03 | Set Happiness to 60, Energy to 50. Click Play. Verify Happiness = 80, Energy = 40. |
| CL-M-04 | Set Energy to 5. Click Play. Verify Energy = 0 (not -5). Play button becomes disabled. |
| CL-M-05 | Set Energy to 60, Happiness to 10. Click Rest. Verify Energy = 90, Happiness = 5. |
| CL-M-06 | Set Happiness to 3. Click Rest. Verify Happiness = 0 (not -2). |
| CL-M-07 | Refresh page after clicking Feed. Verify updated Hunger value persists. |
| CL-M-08 | Set all stats to 100. Verify Feed button is disabled. Verify Play is enabled. |

## Validation Completion Gate
- All automated tests pass (npm test — 0 failures).
- All 8 manual tests pass.
- No console errors during manual tests.
