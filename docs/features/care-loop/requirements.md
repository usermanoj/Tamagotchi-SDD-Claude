# 💖 Feature 2: Care Loop — requirements.md

## Functional Requirements
| ID | Requirement |
|---|---|
| CL-F-01 | Feed action: hunger = clamp(hunger + FEED_HUNGER_GAIN, STAT_MIN, STAT_MAX). |
| CL-F-02 | Play action: happiness = clamp(happiness + PLAY_HAPPINESS_GAIN, STAT_MIN, STAT_MAX); energy = clamp(energy - PLAY_ENERGY_COST, STAT_MIN, STAT_MAX). |
| CL-F-03 | Rest action: energy = clamp(energy + REST_ENERGY_GAIN, STAT_MIN, STAT_MAX); happiness = clamp(happiness - REST_HAPPINESS_COST, STAT_MIN, STAT_MAX). |
| CL-F-04 | Feed button shall be disabled (disabled attribute + aria-disabled) when hunger >= STAT_MAX. |
| CL-F-05 | Play button shall be disabled when energy <= STAT_MIN OR hunger <= STAT_MIN. Play remains available when sick to allow happiness recovery. |
| CL-F-06 | Rest button shall never be disabled. |
| CL-F-07 | After each action, saveGame() shall be called immediately. |
| CL-F-08 | After each action, a context-appropriate reaction quote shall be stored in state and rendered. |

## Non-Functional Requirements
| ID | Requirement |
|---|---|
| CL-N-01 | All action logic shall live in a single handler function per action (handleFeed, handlePlay, handleRest) in App.jsx. |
| CL-N-02 | All delta values shall be imported from constants.js. |
| CL-N-03 | Buttons shall provide visual feedback on disable state (opacity: 0.4, cursor: not-allowed). |
