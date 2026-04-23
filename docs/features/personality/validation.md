# ✨ Feature 4: Personality — validation.md

## Level 1 — Automated Tests

### Test Suite: messages.test.js
- deriveMessage with petState='sick' returns a string from the SICK_MESSAGES array.
- deriveMessage with happiness > 80 returns a string from HIGH_HAPPINESS_MESSAGES.
- deriveMessage with hunger < 25 returns a string from LOW_HUNGER_MESSAGES.
- deriveMessage with petState='evolved' returns a string from EVOLVED_MESSAGES.
- All message strings in messages.js are <= 70 characters (array validation loop).

### Test Suite: SpeechBubble.test.jsx
- Renders the message prop as visible text.
- Has a CSS class that enables the tail triangle.
- Updates when message prop changes.

### Test Suite: easterEggs.test.js
- consecutiveFeedCount increments on each Feed action.
- Triple Feed triggers the quote after 3 feeds within 20s.
- Triple Feed counter resets after 20s without a Feed.
- Full Stats Party triggers when all stats are 100.
- Full Stats Party does not trigger when any stat is 99.

## Level 2 — Manual User Flow Tests
| Test ID | Steps & Expected Result |
|---|---|
| PE-M-01 | Open app. Verify speech bubble is visible with a load message. |
| PE-M-02 | Click Feed. Verify button label changes to a Feed reaction quote for ~2 seconds, then reverts to 'Feed'. |
| PE-M-03 | Click Play. Verify a different reaction quote appears. Verify it reverts after 2 seconds. |
| PE-M-04 | Let Hunger drop below 25. Verify speech bubble shows a hunger complaint message. |
| PE-M-05 | Let any stat hit 0 (Sick). Verify speech bubble switches to a sick message. |
| PE-M-06 | Achieve evolution. Verify evolution speech bubble fires. |
| PE-M-07 | Leave app idle for 60 seconds. Verify 'The Stare' Easter egg activates. |
| PE-M-08 | Click Feed 3 times within 20 seconds. Verify Triple Feed Easter egg and Hunger bar wobbles. |
| PE-M-09 | Set all stats to 100. Verify confetti animation and party message. |

## Validation Completion Gate
- All automated tests pass (npm test — 0 failures).
- All 9 manual tests pass.
- All 3 Easter eggs are observable by a first-time player without reading the spec.
- No speech bubble message overflows its container.
