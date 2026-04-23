# 🐾 ChuChu — Tiny Tamagotchi

> A spec-driven virtual pet built with React 18 + Vite — submission for the [DeepLearning.AI 7-Day SDD Challenge](https://www.deeplearning.ai/).

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-97%20passing-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🎮 Demo

> 📹 [Watch the gameplay demo video](./demo/demo.webm)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Living Vitals** | Hunger, Happiness & Energy decay every 2 seconds |
| **Care Loop** | Feed 🍖 · Play 🎉 · Rest 💤 actions with reaction quotes |
| **State Machine** | Normal → Sick → Recovered · Normal → Evolved (permanent) |
| **Personality** | Sassy, opinionated speech bubble messages per state |
| **Easter Eggs** | The Stare · Triple Feed · Full Stats Party 🎊 |
| **Persistence** | localStorage auto-save — ChuChu survives page refresh |
| **Test Suite** | 97 automated tests across 13 files (Vitest + RTL) |

---

## 🧠 State Machine

```
Normal ──(any stat → 0)──▶ Sick
  Sick ──(all stats > 0 after care)──▶ Normal
Normal ──(happiness ≥ 80 for 60s)──▶ Evolved ✨  (permanent)
Evolved ──(neglect)──▶ Sick
```

---

## 🛠 Tech Stack

- **React 18** — functional components + hooks only
- **Vite 5** — dev server & build
- **CSS Modules** — scoped styles, no Tailwind
- **Vitest + React Testing Library** — unit & component tests
- **localStorage** — persistence (key: `chuchu_save`)
- No external state libraries · No backend

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Run test suite
npm run test

# Production build
npm run build
```

---

## 📁 Project Structure

```
src/
  App.jsx                  # Root — owns all game state
  components/
    PetDisplay.jsx         # Custom SVG puppy sprite + state badge
    StatBar.jsx            # Reusable stat bar (presentational)
    ActionButtons.jsx      # Feed · Play · Rest with reaction quotes
    ResetButton.jsx        # Confirms + resets progress
    SpeechBubble.jsx       # Speech bubble with CSS tail
  hooks/
    useGameLoop.js         # 2s tick via setInterval
  utils/
    constants.js           # All numeric constants
    storage.js             # localStorage read/write/clear
    messages.js            # All message strings
docs/
  specs/                   # mission · tech-stack · roadmap
  features/                # living-vitals · care-loop · dynamic-states · personality
```

---

## 🗝 Key Constants

| Constant | Value |
|---|---|
| Tick interval | 2 s |
| Hunger decay | −5 / tick |
| Happiness decay | −4 / tick |
| Energy decay | −3 / tick |
| Feed gain | +25 hunger |
| Play gain | +20 happiness, −10 energy |
| Rest gain | +30 energy, −5 happiness |
| Evolve threshold | Happiness ≥ 80 for 60 s |

---

## 🧪 Test Coverage

97 tests across 13 files covering:
- Constants validation
- State transitions (sick / evolved / recovery)
- Care action logic
- Message derivation
- Storage read/write
- Component rendering & interaction

---

## 📋 SDD Approach

This project was built using **Spec-Driven Development**:
1. Specs authored in Claude Chat (mission · roadmap · 4 feature docs)
2. Specs converted to markdown and committed alongside code
3. Implementation driven entirely by `docs/features/*/requirements.md`
4. Each feature has a matching `validation.md` → automated tests

---

*Built with ❤️ using Claude Code for the DeepLearning.AI SDD Challenge*
