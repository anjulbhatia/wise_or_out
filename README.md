# HotSeat

> Ten questions. One shot. Are you wise enough — or are you out?

A cinematic quiz game powered by [Elevenlabs](https://elevenlabs.io/) voice + [Firecrawl](https://firecrawl.dev/) live question fetching.

Built for the ElevenLabs x Firecrawl Hackathon.

#elevenhacks

---

## Gallery
  <img width="1000" height="540" alt="image" src="https://github.com/user-attachments/assets/9604bba7-6963-44ac-8100-5f529cde2fe6" />
<div style="display:flex-inline">
  <img width="700" height="540" alt="image" src="https://github.com/user-attachments/assets/d704d7c8-10de-476c-8cb9-e5e5ad0d8f74" />
  <img width="300" height="540" alt="image" src="https://github.com/user-attachments/assets/5f7ee966-2655-4fbc-b319-22ed332110f0" />
</div>

---

## Stack

- Next.js
- Tailwind CSS
- ElevenLabs Agents (Amitabh-style host)
- Firecrawl (live web question fetching)
---

## Setup

```bash
git clone https://github.com/anjulbhatia/hotseat.git
cd hotseat
bun install
npm run dev
```

Copy all component files into `src/`. Then:

```bash
cp .env.local.example .env.local
# Fill in your API keys
NEXT_PUBLIC_ELEVENLABS_API_KEY=<YOUR_ELEVENLABS_API_KEY>
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=<YOUR_ELEVENLABS_VOICE_ID>
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=<YOUR_ELEVENLABS_AGENT_ID>
FIRECRAWL_API_KEY=<YOUR_FIRECRAWL_API_ID>

npm run dev
```

---

## Architecture

All screens are managed via `GameContext` state — no page routing. 
The `GameRouter` in `page.tsx` switches components based on `state.screen`.

```
landing → category → intro → game → gameover / victory → leaderboard
```

### Files

```
src/
  lib/
    types.ts          — All types, constants, prize ladder
    game-context.tsx  — Global state + all game actions
    questions.ts      — Firecrawl question fetcher
    audio.ts          — ElevenLabs audio manager
  components/
    LandingScreen.tsx
    CategoryScreen.tsx
    IntroScreen.tsx
    GameScreen.tsx    — Core loop (most important)
    EndScreens.tsx    — GameOver + Victory
    LeaderboardScreen.tsx
  app/
    page.tsx          — GameProvider + GameRouter
    api/
      questions/route.ts   — Firecrawl + Claude question API
      leaderboard/route.ts — Score storage + percentile
```
