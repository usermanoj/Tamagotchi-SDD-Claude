# ⚡ Feature 1: Living Vitals — requirements.md

## Functional Requirements
| ID | Requirement |
|---|---|
| LV-F-01 | The app shall maintain three integer stat variables: Hunger, Happiness, Energy, each bounded [0, 100]. |
| LV-F-02 | A game loop shall fire every TICK_INTERVAL_MS (10 000 ms) using setInterval. |
| LV-F-03 | On each tick, Hunger shall decrease by HUNGER_DECAY (5), Happiness by HAPPINESS_DECAY (4), Energy by ENERGY_DECAY (3). |
| LV-F-04 | After each tick, all stats shall be clamped: Math.max(STAT_MIN, Math.min(STAT_MAX, value)). |
| LV-F-05 | After each tick, the full game state shall be written to localStorage via saveGame(). |
| LV-F-06 | On app mount, the game state shall be read from localStorage via loadGame(); if absent or invalid, defaults (70, 70, 70) shall be used. |
| LV-F-07 | Three StatBar components shall be rendered, one per stat, each showing label, fill bar, and numeric value. |
| LV-F-08 | StatBar fill colour shall follow: value ≥ 50 → green (#4CAF50); 25 ≤ value < 50 → amber (#FF9800); value < 25 → red (#F44336). |

## Non-Functional Requirements
| ID | Requirement |
|---|---|
| LV-N-01 | The game loop hook (useGameLoop) shall clean up the interval on component unmount to prevent memory leaks. |
| LV-N-02 | All numeric constants shall be imported from constants.js — zero magic numbers in component code. |
| LV-N-03 | StatBar shall be a reusable, pure presentational component: receives (label, value, maxValue, colour) as props. |
| LV-N-04 | Storage operations shall be wrapped in try/catch to handle QuotaExceededError gracefully (fail silently for MVP). |

## Data Model
| Field | Type / Range / Default |
|---|---|
| hunger | Integer, 0–100, default 70 |
| happiness | Integer, 0–100, default 70 |
| energy | Integer, 0–100, default 70 |
| lifeStage | String enum: 'baby' \| 'teen', default 'baby' |
| petState | String enum: 'normal' \| 'sick' \| 'evolved', default 'normal' |
| evolutionTimer | Integer (ms elapsed), default 0 |
