# COCDLE UNLIMITED

An unlimited, Wordle-style Clash of Clans guessing game built with **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, and **Framer Motion**.

> **Disclaimer:** Unofficial fan-made project. Not affiliated with, endorsed, sponsored, or specifically approved by Supercell.

## Features
- **Four Game Modes:**
  - **Troops Mode:** Classic attribute-comparison grid across Home Village, Builder Base, and Clan Capital with staggered 3D card flips, directional higher/lower indicators, and progressive unlockable hints (`Lvl 1 Stats` & `Description`).
  - **Pixel Mode:** HTML5 Canvas progressive pixelation (`8x8` up to `256x256`) with 5 multiple-choice troop cards.
  - **Description Mode:** In-game flavor quote deduction with automatic troop-name masking and progressive letter-count hints.
  - **Buildings Mode:** Full structural attribute grid across all three villages comparing category, resource, targets, range, tile area (`Size`), max level, and hall unlock level.
- **Unlimited Play:** Instant new random rounds with 5-round anti-repeat protection per mode.
- **Zero Backend:** All stats, streaks, active round states, settings, and quick modifiers persist in `localStorage`.
- **Accessibility & Polish:** Keyboard-first autocomplete (`ArrowUp`, `ArrowDown`, `Enter`, `Escape`), ARIA screen-reader feedback on every grid cell, colorblind-friendly palette toggle, and `prefers-reduced-motion` support.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
