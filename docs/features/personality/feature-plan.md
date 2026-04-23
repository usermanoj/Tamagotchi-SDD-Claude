# ✨ Feature 4: Personality — feature-plan.md

## Feature Intent
ChuChu has a distinct personality: playful, cheeky, and a little dramatic. Expressed through a dynamic speech bubble and witty reaction quotes. Easter eggs add surprise delight.

## Personality Pillars
- **Cheeky:** ChuChu complains, brags, and sasses the player.
- **Playful:** reactions are warm and funny, never mean.
- **Self-aware:** ChuChu knows they are a digital pet and occasionally jokes about it.

## Speech Bubble System
| Trigger | Example Messages |
|---|---|
| On app load / idle | 'Hello! I'm ChuChu and I run your life now.' / 'Don't forget about me!' |
| Happiness > 80 | 'Living my best life! ✨' / 'I am THRIVING.' |
| Happiness < 25 | 'I'm so bored I could cry.' / 'Entertain me. NOW.' |
| Hunger < 25 | 'I'm literally starving. LITERALLY.' / 'Feed me or I'll haunt you.' |
| Energy < 25 | 'So... tired... can't... function...' / 'Running on fumes here.' |
| Sick state | 'I don't feel so good… 🤒' / 'This is YOUR fault, you know.' |
| Evolution moment | 'Wait— am I… GLOWING?! ✨' / 'TEEN MODE ACTIVATED.' |
| After evolution | 'I've ascended. You're welcome.' / 'Main character arc: complete.' |

## Button Reaction Quotes
After each care action, button label temporarily changes for 2 seconds then reverts.

| Action | Normal Quotes | Sick / Low-stat Quotes |
|---|---|---|
| Feed | 'Finally! I was STARVING.' / 'Nom nom nom 🍖' | 'Ugh, even eating feels hard.' |
| Play | 'YESSS let's GOOO 🎉' / 'This is my element!' | (Disabled when sick) |
| Rest | 'Zzz… much needed.' / 'Beauty sleep activated.' | 'Rest is the only thing saving me right now.' |

## Easter Eggs
| Easter Egg | Trigger & Behaviour |
|---|---|
| The Stare | No action for 60 seconds → stare emoji + 'I'm just… going to stare at you then.' Resolves on next action. |
| Triple Feed | Feed clicked 3 times within 20 seconds → special quote + Hunger bar wobbles. |
| Full Stats Party | All three stats reach 100 simultaneously → confetti burst + party message. |

## Acceptance Criteria
- Speech bubble is always visible with a contextually appropriate message.
- Speech bubble updates after every care action and every tick.
- Each button shows a reaction quote for 2 seconds after a successful action.
- All 3 Easter eggs trigger correctly and resolve correctly.
- No speech bubble message is longer than 70 characters.
