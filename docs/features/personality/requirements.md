# ✨ Feature 4: Personality — requirements.md

## Functional Requirements
| ID | Requirement |
|---|---|
| PE-F-01 | A SpeechBubble component shall render above PetDisplay and accept a message string prop. |
| PE-F-02 | App.jsx shall maintain a currentMessage state string, updated by a deriveMessage(stats, petState, lifeStage) pure function. |
| PE-F-03 | deriveMessage shall select messages randomly from context-appropriate arrays defined in src/utils/messages.js. |
| PE-F-04 | currentMessage shall be recalculated after every tick and after every care action. |
| PE-F-05 | ActionButtons shall accept a reactionQuote string prop; when non-null, render it as the button label; revert after 2000ms. |
| PE-F-06 | Each care action handler shall set a context-appropriate reactionQuote string, drawn from messages.js. |
| PE-F-07 | Easter Egg 'Stare': track lastActionTime; if now - lastActionTime > 60000ms, show stare message and stare sprite. |
| PE-F-08 | Easter Egg 'Triple Feed': track consecutiveFeedCount and lastFeedTime; if count >= 3 within 20000ms, trigger quote and wobble class. |
| PE-F-09 | Easter Egg 'Full Stats Party': on any stat update, check if all three stats === 100; if so, trigger confetti class and party message. |
| PE-F-10 | All message strings shall live in src/utils/messages.js — zero hardcoded strings in components. |

## Non-Functional Requirements
| ID | Requirement |
|---|---|
| PE-N-01 | SpeechBubble fade-in shall use CSS transition: opacity 0.3s ease. |
| PE-N-02 | No message shall exceed 70 characters. |
| PE-N-03 | Easter egg animations shall use CSS classes toggled by React state (not direct DOM manipulation). |
| PE-N-04 | The reactionQuote timeout (2000ms) shall be cleared on component unmount to prevent state updates on unmounted components. |
