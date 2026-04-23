# 🐾 ChuChu Tamagotchi — mission.md

## Project Mission
ChuChu is a browser-based virtual pet web application built with React + Vite. The player adopts and names their pet ChuChu, nurtures it by managing three core vitals — Hunger, Happiness, and Energy — and guides ChuChu through a life stage evolution from Baby to Teen. The application demonstrates mastery of Spec-Driven Development as a primary deliverable for the DeepLearning.AI 7-Day Learner Challenge.

## Why This Exists
- Demonstrate SDD workflow: spec-first, implementation-second, validation-third.
- Produce an engaging, living digital companion that rewards attentive care.
- Serve as a portfolio artifact showing disciplined agentic software engineering.

## Target Audience
| Audience | Description |
|---|---|
| Primary | DeepLearning.AI challenge judges evaluating spec quality and SDD discipline. |
| Secondary | Casual browser users who enjoy simple, charming virtual pet experiences. |
| Tertiary | Developers studying SDD workflow applied to a real project. |

## Product Vision
ChuChu must feel alive. Stats tick down automatically, visual states shift in real time, and ChuChu's playful, cheeky personality shines through witty speech bubbles and button reaction quotes. The player is emotionally invested — not merely clicking buttons on a dashboard.

## Scope Statement

### In Scope
- Single-user, single-pet experience — pet name: ChuChu.
- Three stats: Hunger, Happiness, Energy (each 0–100).
- Three care actions: Feed, Play, Rest.
- Three pet states: Normal, Sick, Evolved.
- One evolution path: Baby → Teen.
- One recovery path: Sick → Normal (via care actions).
- Stat persistence via localStorage with manual Reset option.
- Cute kawaii visual style with CSS animations.
- Cheeky personality via speech bubbles and button reaction quotes.

### Explicitly Out of Scope
- Authentication, multiple users, multiple pets.
- Inventories, currencies, mini-games, social features.
- Push notifications, backend server, database.
- Admin features, complex multi-stage evolutions.
- Permanent death mechanics.

## Success Criteria
| Criterion | Definition of Done |
|---|---|
| Spec completeness | All required /specs and /feature-name files present and internally consistent. |
| Living vitals | Stats auto-decrement every 10 seconds while app is open. |
| Care loop | Feed, Play, Rest each restore their target stats by defined amounts. |
| State transitions | Normal → Sick and Sick → Normal transitions fire correctly per rules. |
| Evolution | Baby → Teen triggers when Happiness ≥ 80 for 60 consecutive seconds. |
| Personality | Speech bubble updates on every action; button quotes are contextually witty. |
| Persistence | Stats and state survive page refresh; Reset clears all data. |
| No scope violations | Zero features from the 'Not Allowed' list appear in the build. |

## Constraints
- Framework: React 18 + Vite 5. No other UI frameworks.
- Styling: Plain CSS modules or a single global CSS file. No Tailwind, no CSS-in-JS libs.
- State: React useState / useEffect only. No Redux, Zustand, or external state libs.
- Persistence: localStorage only. No backend, no cookies, no IndexedDB.
- Build output must be deployable as a static site (npm run build).
- All stat thresholds and timing values must match the spec exactly — no magic numbers in code.
