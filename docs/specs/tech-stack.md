# 🛠 ChuChu Tamagotchi — tech-stack.md

## Frontend Framework
| Decision | Detail |
|---|---|
| Framework | React 18 (functional components, hooks only — no class components). |
| Build tool | Vite 5 (fast HMR, zero-config static output via npm run build). |
| Language | JavaScript (ES2022+). No TypeScript required for MVP. |

## Styling
| Decision | Detail |
|---|---|
| Approach | Single global CSS file (src/index.css) for resets and variables; per-component .module.css files for scoped styles. |
| Design tokens | CSS custom properties (--color-*, --radius-*, --font-*) defined in :root to enforce visual consistency. |
| Animations | CSS @keyframes only — no JS animation libraries. Bounce, wiggle, pulse, and shimmer for pet states. |
| Visual style | Cute kawaii: rounded corners (border-radius ≥ 16px), pastel palette, emoji/Unicode pet sprite, soft drop shadows. |
| Fonts | System font stack or Google Fonts 'Nunito' (loaded via `<link>` in index.html — no npm font packages). |

## State Management
| Decision | Detail |
|---|---|
| Approach | React built-in hooks only: useState, useEffect, useRef, useCallback. |
| No external libs | No Redux, Zustand, Jotai, MobX, or Context API for global state — app is small enough. |
| Game loop | Single useEffect with setInterval (10-second tick) drives all stat decay. Cleared on unmount. |
| Derived state | Pet state (Normal / Sick / Evolved) and evolution timer are derived from raw stat values — not stored redundantly. |

## Persistence
| Decision | Detail |
|---|---|
| Mechanism | localStorage via a thin wrapper utility (src/utils/storage.js). |
| Save key | chuchu_save — single JSON object with stats, state, evolutionTimer, and lifeStage. |
| Save trigger | Saved on every stat change (after each action and after each tick). |
| Reset | Clears chuchu_save key and reloads default initial state. |
| Hydration | On app mount: read localStorage → if valid, restore; else use defaults. |

## Project Structure
| Path | Purpose |
|---|---|
| src/App.jsx | Root component. Owns all game state. Passes props down. |
| src/components/PetDisplay.jsx | Renders ChuChu's sprite, state badge, and speech bubble. |
| src/components/StatBar.jsx | Reusable stat bar (label + progress bar + value). |
| src/components/ActionButtons.jsx | Feed, Play, Rest buttons with reaction quote logic. |
| src/components/ResetButton.jsx | Confirms and resets all progress. |
| src/utils/storage.js | localStorage read / write / clear helpers. |
| src/utils/constants.js | All numeric thresholds and timing constants (single source of truth). |
| src/hooks/useGameLoop.js | Custom hook encapsulating the 10-second tick setInterval. |
| src/index.css | Global resets, CSS variables, keyframe animations. |
| docs/specs/ | Constitution spec files (mission.md, tech-stack.md, roadmap.md). |
| docs/features/ | Feature spec folders (living-vitals/, care-loop/, dynamic-states/, personality/). |

## Constants File Contract
| Constant | Value |
|---|---|
| TICK_INTERVAL_MS | 10000 |
| HUNGER_DECAY | 5 |
| HAPPINESS_DECAY | 4 |
| ENERGY_DECAY | 3 |
| FEED_HUNGER_GAIN | 25 |
| PLAY_HAPPINESS_GAIN | 20 |
| PLAY_ENERGY_COST | 10 |
| REST_ENERGY_GAIN | 30 |
| REST_HAPPINESS_COST | 5 |
| SICK_THRESHOLD | 0 |
| EVOLVE_HAPPINESS_MIN | 80 |
| EVOLVE_DURATION_MS | 60000 |
| STAT_MIN | 0 |
| STAT_MAX | 100 |
| DEFAULT_STAT | 70 |

## Build & Deployment
- `npm run dev` — local development with HMR.
- `npm run build` — outputs static files to dist/.
- Deployable to GitHub Pages, Vercel, or Netlify with zero additional config.
- No environment variables required.

## Architectural Trade-offs
| Trade-off | Decision & Rationale |
|---|---|
| SPA vs MPA | SPA — single index.html, React handles all routing/state. MVP has only one screen. |
| CSS Modules vs Tailwind | CSS Modules — keeps styling explicit and avoids build-time JIT config. Matches constraint. |
| localStorage vs sessionStorage | localStorage — state must survive page refresh. Session would reset on close. |
| setInterval vs requestAnimationFrame | setInterval — 10-second ticks do not need frame-accurate timing. Simpler, cleaner. |
| JS vs TypeScript | JS — reduces boilerplate for a focused MVP. Types can be added in a post-challenge refactor. |
