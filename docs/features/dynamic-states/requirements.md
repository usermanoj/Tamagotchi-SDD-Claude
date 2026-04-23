# 🔄 Feature 3: Dynamic States — requirements.md

## Functional Requirements
| ID | Requirement |
|---|---|
| DS-F-01 | On each tick, if any stat === STAT_MIN and petState !== 'evolved', set petState = 'sick'. |
| DS-F-02 | After each care action, if all stats > STAT_MIN and petState === 'sick', set petState = 'normal'. |
| DS-F-03 | On each tick, if petState !== 'sick' and happiness >= EVOLVE_HAPPINESS_MIN: evolutionTimer += TICK_INTERVAL_MS; else: evolutionTimer = 0. |
| DS-F-04 | If evolutionTimer >= EVOLVE_DURATION_MS and lifeStage === 'baby': set lifeStage = 'teen' and petState = 'evolved'. |
| DS-F-05 | lifeStage shall never revert from 'teen' to 'baby'. |
| DS-F-06 | PetDisplay component shall render a different sprite/emoji set for each of the three petState values. |
| DS-F-07 | A state badge shall display the current petState as a human-readable label ('Normal', 'Sick!', 'Evolved ✨'). |
| DS-F-08 | evolutionTimer shall be persisted to localStorage as part of the save object. |

## Non-Functional Requirements
| ID | Requirement |
|---|---|
| DS-N-01 | State transition logic shall live exclusively in the tick handler and the care action handlers in App.jsx. |
| DS-N-02 | Sick state shall trigger a CSS animation (pulsing red border) on PetDisplay. |
| DS-N-03 | Evolved state shall trigger a CSS shimmer/sparkle animation on PetDisplay. |
| DS-N-04 | All state transitions shall be reflected in localStorage within the same synchronous update cycle as the stat change that caused them. |
