# ChuChu Tamagotchi — CLAUDE.md

## Project Overview
Browser-based virtual pet app. Pet name: **ChuChu**. Built for DeepLearning.AI 7-Day SDD Challenge.

## Tech Stack
- React 18 (functional components + hooks only)
- Vite 5
- JavaScript ES2022+ (no TypeScript)
- Plain CSS Modules + single `src/index.css`
- localStorage only (`chuchu_save` key)
- No external state libs, no backend

## File Structure (follow exactly)
```
src/
  App.jsx                    # Root — owns all game state
  components/
    PetDisplay.jsx           # Sprite, state badge, speech bubble
    StatBar.jsx              # Reusable stat bar (pure presentational)
    ActionButtons.jsx        # Feed, Play, Rest with reaction quotes
    ResetButton.jsx          # Confirms + resets progress
    SpeechBubble.jsx         # Speech bubble with CSS tail
  hooks/
    useGameLoop.js           # 10s tick setInterval hook
  utils/
    constants.js             # ALL numeric constants (no magic numbers elsewhere)
    storage.js               # localStorage read/write/clear
    messages.js              # ALL message strings (no hardcoded strings in components)
  index.css                  # Global resets, CSS vars, keyframes
docs/
  specs/                     # mission.md, tech-stack.md, roadmap.md
  features/                  # living-vitals/, care-loop/, dynamic-states/, personality/
```

## Data Model (localStorage: chuchu_save)
```json
{ "hunger": 70, "happiness": 70, "energy": 70,
  "lifeStage": "baby", "petState": "normal", "evolutionTimer": 0 }
```

## Key Constants (all in constants.js)
| Constant | Value |
|---|---|
| TICK_INTERVAL_MS | 2000 |
| HUNGER_DECAY | 5 |
| HAPPINESS_DECAY | 4 |
| ENERGY_DECAY | 3 |
| FEED_HUNGER_GAIN | 25 |
| PLAY_HAPPINESS_GAIN | 20 |
| PLAY_ENERGY_COST | 10 |
| REST_ENERGY_GAIN | 30 |
| REST_HAPPINESS_COST | 5 |
| EVOLVE_HAPPINESS_MIN | 80 |
| EVOLVE_DURATION_MS | 60000 |
| STAT_MIN | 0 |
| STAT_MAX | 100 |
| DEFAULT_STAT | 70 |

## State Machine
- Normal → Sick: any stat hits 0
- Sick → Normal: all stats > 0 after care action
- Normal → Evolved: happiness ≥ 80 for 60 consecutive seconds
- Evolved → Sick: still possible (neglect)
- Evolved is permanent (lifeStage stays 'teen' forever)

## Rules
- Zero magic numbers in component code — import from constants.js
- Zero hardcoded strings — import from messages.js
- State transition logic only in tick handler + care action handlers in App.jsx
- StatBar is purely presentational (receives props only)
- All storage ops wrapped in try/catch
- Stat color: ≥50 green, 25–49 amber, <25 red
