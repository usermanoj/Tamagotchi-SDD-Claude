# 💖 Feature 2: Care Loop — feature-plan.md

## Feature Intent
The player keeps ChuChu alive and happy by performing three care actions: Feed, Play, and Rest. Each action instantly adjusts one or more stats by precisely defined amounts.

## Action Definitions
| Action | Stat Changes | Notes |
|---|---|---|
| Feed | Hunger +25 | Capped at 100. Does not affect other stats. |
| Play | Happiness +20, Energy -10 | Happiness capped at 100. Energy floored at 0. Disabled if Energy = 0. |
| Rest | Energy +30, Happiness -5 | Energy capped at 100. Happiness floored at 0. Always available. |

## Button Disable Rules
- **Feed:** disabled when Hunger = 100 (already full). Enabled when ChuChu is Sick.
- **Play:** disabled when Energy = 0 (too tired) OR Hunger = 0 (too hungry) OR petState === 'sick'.
- **Rest:** always enabled — even when Sick.

## UX Expectations
- Buttons are large, rounded, and visually distinct (pink for Feed, yellow for Play, blue for Rest).
- Disabled buttons are greyed out and show a tooltip explaining why.
- On click, the stat bars animate to their new values with a smooth CSS transition.
- A reaction quote appears on the button for 2 seconds after each click.

## Edge Cases
| Edge Case | Expected Behaviour |
|---|---|
| Feed when Hunger = 100 | Button disabled. No stat change. No reaction quote. |
| Play when Energy = 0 | Button disabled. No stat change. |
| Feed brings Hunger from 85 to 110 | Clamp to 100. Display 100. |
| Rest when Happiness is 3 | Happiness falls to 0 (floored), not -2. |
| Multiple rapid clicks | Each click applies the delta once. Debounce not required for MVP. |

## Acceptance Criteria
- Feed increases Hunger by exactly 25 (capped at 100).
- Play increases Happiness by 20 and decreases Energy by 10.
- Rest increases Energy by 30 and decreases Happiness by 5.
- No stat exceeds 100 or falls below 0 after any action.
- Correct buttons are disabled per the disable rules above.
- A reaction quote is shown after each successful action.
- Stat changes are saved to localStorage immediately after each action.
