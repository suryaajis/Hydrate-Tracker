# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build step required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

Live deployment: https://suryaajis.github.io/Hydrate-Tracker/

## Architecture

Vanilla JavaScript SPA with no framework, bundler, or package manager. All Bootstrap/jQuery/Popper.js dependencies load via CDN in `index.html`.

**Three files do all the work:**
- `index.html` — UI markup and CDN script tags
- `style.css` — Custom styles using CSS variables (blue/cyan theme)
- `js/script.js` — All application logic (~242 lines, global scope)

**Data flow:**
1. User submits profile (name, gender, age) → `calcDailyGoal()` sets `dailyGoal` (2700ml female / 3700ml male, reduced for under-14)
2. User picks a drink type — each has a hydration effectiveness factor (water=1.0, coffee=0.8, etc.)
3. User adds intake via quick buttons (150/300/600 ml) or custom input → `updateProgressBar(rawMl)` multiplies by factor, adds to `consumed`
4. `updateUI()` re-renders progress bar, stat cards, and color-coded status (red → orange → yellow → green)
5. Every state change calls `saveToStorage()` — LocalStorage keys are prefixed `ht_` (`ht_consumed`, `ht_goal`, `ht_user`, `ht_log`)
6. On load, `loadFromStorage()` restores all state and re-renders

**Key globals in `js/script.js`:** `dailyGoal`, `consumed`, `userName`, `hydrationLog`, `currentDrinkType`

## Conventions

- camelCase for variables and functions, PascalCase for classes, SCREAMING_SNAKE_CASE for constants
- Direct DOM manipulation via `getElementById()` — no virtual DOM
- No modules or imports; all code is in the global scope of `script.js`
- Commit messages are freeform, ~59 characters
