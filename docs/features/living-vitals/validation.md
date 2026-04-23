# ⚡ Feature 1: Living Vitals — validation.md

## Validation Strategy Overview
Validation covers two levels: automated unit/integration tests (Vitest + React Testing Library) and structured manual user-flow tests.

## Level 1 — Automated Tests (Vitest + React Testing Library)

### Test Suite: constants.test.js
- Assert TICK_INTERVAL_MS === 10000.
- Assert HUNGER_DECAY === 5, HAPPINESS_DECAY === 4, ENERGY_DECAY === 3.
- Assert DEFAULT_STAT === 70, STAT_MIN === 0, STAT_MAX === 100.

### Test Suite: storage.test.js
- loadGame() returns null when localStorage is empty.
- saveGame(state) writes a JSON object to localStorage under key 'chuchu_save'.
- loadGame() returns the same object that was saved.
- clearGame() removes 'chuchu_save' from localStorage.
- loadGame() returns null after clearGame() is called.

### Test Suite: StatBar.test.jsx
- Renders label, numeric value, and a progress element.
- Progress bar width reflects value/maxValue ratio.
- Colour class is 'green' when value = 75, 'amber' when value = 40, 'red' when value = 20.

### Test Suite: gameLoop.test.js (useGameLoop hook)
- After 1 simulated tick (fake timers), Hunger is reduced by HUNGER_DECAY.
- After 1 tick, Happiness is reduced by HAPPINESS_DECAY.
- After 1 tick, Energy is reduced by ENERGY_DECAY.
- Stats clamp at 0 — never negative after multiple ticks from 0.
- saveGame is called after each tick.

## Level 2 — Manual User Flow Tests
| Test ID | Steps & Expected Result |
|---|---|
| LV-M-01 | Open app with empty localStorage. Verify all three bars show value 70. |
| LV-M-02 | Wait 10 seconds. Verify Hunger drops to 65, Happiness to 66, Energy to 67. |
| LV-M-03 | Wait 30 seconds from fresh state. Verify Hunger = 55, Happiness = 58, Energy = 61. |
| LV-M-04 | Refresh the page. Verify stats retained the values from before refresh. |
| LV-M-05 | Manually set hunger to 3 in localStorage JSON. Reload. Wait 10s. Verify Hunger clamps at 0, not -2. |
| LV-M-06 | Delete localStorage manually (DevTools). Reload. Verify all stats reset to 70. |
| LV-M-07 | Open app in two tabs. Wait for a tick in Tab 1. Switch to Tab 2. Verify Tab 2 reflects same values (last-write-wins). |

## Validation Completion Gate
- All automated tests pass (npm test shows 0 failures).
- All 7 manual tests pass with observed behaviour matching expected.
- No console errors during any manual test.
