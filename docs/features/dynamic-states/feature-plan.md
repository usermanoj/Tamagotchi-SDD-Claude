# 🔄 Feature 3: Dynamic States — feature-plan.md

## Feature Intent
ChuChu shifts between three meaningful life states: Normal (healthy default), Sick (neglected), and Evolved (thriving teen). Each state changes the pet's appearance and available interactions.

## State Definitions
| State | Trigger Condition | Visual |
|---|---|---|
| Normal | Default. All stats > 0 and evolution not yet achieved. | Happy kawaii sprite. Green border glow. |
| Sick | ANY single stat drops to 0 (STAT_MIN). | Sad sprite + 'zz' / sweat emoji. Red border pulse animation. |
| Evolved | Happiness ≥ 80 continuously for 60 seconds AND petState was Normal. | Sparkle sprite + crown/star. Gold shimmer animation. Persists permanently. |

## State Transition Rules
| Transition | Rule |
|---|---|
| Normal → Sick | Fires immediately on the tick where any stat first reaches 0. Takes priority over evolution check. |
| Sick → Normal | Fires when all stats are > 0 after care actions. |
| Normal → Evolved | Fires when evolutionTimer reaches EVOLVE_DURATION_MS (60 000 ms) while Happiness ≥ EVOLVE_HAPPINESS_MIN (80). |
| Evolved → Sick | Still possible — even evolved pets can be neglected. |
| Sick → Evolved | Not possible directly — must recover to Normal first. |
| Evolved → Normal | Impossible — evolution is permanent and irreversible. |

## Evolution Timer Logic
- An evolutionTimer integer (in ms) is stored in state and persisted to localStorage.
- On each tick: if petState !== 'sick' AND happiness >= EVOLVE_HAPPINESS_MIN: evolutionTimer += TICK_INTERVAL_MS.
- If evolutionTimer >= EVOLVE_DURATION_MS and lifeStage === 'baby': set lifeStage = 'teen', set petState = 'evolved'.
- If happiness drops below EVOLVE_HAPPINESS_MIN: reset evolutionTimer to 0.

## Edge Cases
| Edge Case | Expected Behaviour |
|---|---|
| Two stats hit 0 simultaneously on one tick | One Sick trigger — state is 'sick', not double-triggered. |
| Happiness exactly 80 for 59 seconds then drops to 79 | evolutionTimer resets to 0. Evolution does not fire. |
| App closed and reopened after evolutionTimer = 45000 | evolutionTimer is restored from localStorage. Timer continues from 45 000ms. |
| Evolved pet has a stat hit 0 | petState becomes 'sick'. lifeStage remains 'teen' (evolution is permanent). |

## Acceptance Criteria
- When any stat reaches 0, petState immediately becomes 'sick'.
- When all stats > 0 and petState === 'sick', petState reverts to 'normal'.
- After Happiness ≥ 80 for 60 uninterrupted seconds, lifeStage becomes 'teen' and petState becomes 'evolved'.
- If Happiness drops below 80 before 60s, the timer resets to 0.
- The pet sprite and state badge visually reflect the current state.
- Evolved state is permanent — lifeStage never reverts to 'baby'.
