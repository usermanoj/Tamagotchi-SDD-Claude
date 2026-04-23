# ⚡ Feature 1: Living Vitals — feature-plan.md

## Feature Intent
ChuChu is alive. The three vital stats — Hunger, Happiness, and Energy — automatically decrease over time to simulate real needs. This is the foundational mechanic of the entire game.

## Problem Being Solved
A static pet with no time pressure creates no emotional engagement. Decaying stats force the player to return and care for ChuChu, creating a sense of responsibility and attachment.

## Scope

### In Scope
- Three stat variables: Hunger, Happiness, Energy. Each is an integer 0–100.
- Auto-decrement every TICK_INTERVAL_MS (10,000ms) while the browser tab is open.
- Decay rates per tick: Hunger -5, Happiness -4, Energy -3.
- Stats are clamped: never below 0, never above 100.
- Stat values persisted to localStorage after every tick.
- Stat bars rendered as labelled progress bars showing label, fill, and numeric value.
- App hydrates from localStorage on mount; falls back to DEFAULT_STAT (70) for all stats.

### Out of Scope
- Any care actions (Phase 2). Stats only go down in this phase.
- State changes (Sick/Evolved) — handled in Phase 3.

## UX Expectations
- Three stat bars are always visible, stacked vertically.
- Hunger bar: pink/red. Happiness bar: yellow/orange. Energy bar: blue/teal.
- Fill color shifts from green → amber → red as the stat falls below 50 and then 25.
- Numeric value (e.g., '72') shown to the right of each bar.
- Smooth CSS transition on bar width change (transition: width 0.4s ease).

## Edge Cases
| Edge Case | Expected Behaviour |
|---|---|
| Stat already at 0 when tick fires | Clamp to 0 — do not go negative. |
| localStorage is empty / corrupted | Ignore and load defaults (Hunger: 70, Happiness: 70, Energy: 70). |
| localStorage is partially populated | Use stored values for present keys; default for missing keys. |
| Browser tab backgrounded | setInterval continues (may be throttled by browser, acceptable for MVP). |
| Multiple tabs open | Last-write-wins on localStorage. No cross-tab sync required. |

## Acceptance Criteria
- On first load with no localStorage data, all three stats display as 70.
- Stats visibly decrement every 10 seconds while the app is open.
- Hunger decrements by exactly 5, Happiness by 4, Energy by 3 per tick.
- No stat goes below 0 or above 100 at any point.
- After refreshing the page, stats show the same values they had before refresh.
