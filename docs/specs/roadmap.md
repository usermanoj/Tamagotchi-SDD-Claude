# 🗺 ChuChu Tamagotchi — roadmap.md

## Project Roadmap
The roadmap sequences four feature phases. Each phase maps to one feature folder under docs/features/. Phases are designed to be independently buildable and testable.

## Phase Overview
| Phase | Feature Name | Folder |
|---|---|---|
| 1 | Living Vitals | docs/features/living-vitals/ |
| 2 | Care Loop | docs/features/care-loop/ |
| 3 | Dynamic States | docs/features/dynamic-states/ |
| 4 | Personal Touches (Personality) | docs/features/personality/ |

## Phase 1 — Living Vitals
**Goal:** ChuChu has three stats (Hunger, Happiness, Energy) that automatically tick down every 10 seconds. The UI displays them as labelled progress bars.

| Item | Detail |
|---|---|
| Inputs | Constitution (mission, tech-stack). |
| Outputs | Stat bars rendered in UI; game loop hook running; localStorage hydration on mount. |
| Dependencies | None — this is the foundation phase. |
| Success gate | All three stats visibly decrement every 10 seconds. Values persist on page refresh. |

## Phase 2 — Care Loop
**Goal:** Player can Feed, Play, and Rest ChuChu. Each action modifies specific stats by defined amounts. Buttons are disabled when the action would have no effect or when ChuChu is Sick (except Rest).

| Item | Detail |
|---|---|
| Inputs | Phase 1 complete (stats exist and tick). |
| Outputs | Three action buttons functional; stat values change correctly on click; reaction quotes displayed. |
| Dependencies | Phase 1 — Living Vitals. |
| Success gate | Each action modifies the correct stat(s) by the exact constant values. No stat exceeds 100 or goes below 0. |

## Phase 3 — Dynamic States
**Goal:** ChuChu transitions between Normal, Sick, and Evolved states based on stat rules. Visual appearance changes per state.

| Item | Detail |
|---|---|
| Inputs | Phase 1 and Phase 2 complete. |
| Outputs | State badge and pet sprite update per state; evolution timer logic; Sick recovery path. |
| Dependencies | Phase 1 (stats), Phase 2 (care actions trigger state changes). |
| Success gate | Sick fires when any stat hits 0. Evolution fires after 60s of Happiness ≥ 80. Recovery from Sick works via care actions raising all stats above 0. |

## Phase 4 — Personal Touches
**Goal:** ChuChu's cheeky personality expressed through dynamic speech bubble and witty reaction quotes. Easter eggs add surprise delight.

| Item | Detail |
|---|---|
| Inputs | Phases 1–3 complete. |
| Outputs | Speech bubble component; button reaction quotes; at least 2 Easter egg interactions. |
| Dependencies | All prior phases. |
| Success gate | Speech bubble updates on every action and every tick. Button labels show contextual reaction quotes. Easter eggs trigger and function correctly. |

## Timeline (7-Day Challenge)
| Day | Activity | Deliverable |
|---|---|---|
| Day 1 | Write constitution specs | 3 spec files complete |
| Day 2 | Write feature specs for all 4 phases | 12 feature files complete |
| Day 3 | Implement Phase 1 (Living Vitals) | Stats tick, bars render, localStorage works |
| Day 4 | Implement Phase 2 (Care Loop) | Feed / Play / Rest functional |
| Day 5 | Implement Phase 3 (Dynamic States) | State transitions working, evolution fires |
| Day 6 | Implement Phase 4 (Personality) + Polish | Speech bubbles, quotes, Easter eggs |
| Day 7 | Validation run, bug fixes, video, submission | GitHub repo + video submitted |
