# ADARSHVERSE — Antigravity 3D Portfolio

A fully-3D, fluid, "antigravity" portfolio for **Adarsh Muchatte**, built with React, TypeScript, Vite, and Three.js (React Three Fiber + post-processing bloom).

> ⚡ **Quick start:** open `dist/index.html` in any browser to see the built site. No build step needed.

---

## ✨ What's inside

- **Fluid morphing core** — a real-time GLSL-displaced sphere (simplex noise) that breathes and shifts shape, with iridescent fresnel + bloom.
- **Particle cosmos** — 2000 additive-blended stars drifting in a shell around the camera.
- **Orbital gyroscope rings** — rotating neon wireframe rings.
- **Scroll-reactive camera** — the scene pulls back and drifts as you scroll; pointer gives parallax.
- **Glassmorphic UI** — glass cards with gradient borders, glitch typography, marquee, animated gradient "aurora", film grain, custom fluid cursor, HUD overlays, and a cinematic intro loader.
- **Fully responsive** with reduced-motion support.

## 🚀 Run it yourself

```bash
# install dependencies
pnpm install       # or: npm install

# dev server (hot reload)
pnpm dev

# production build → dist/index.html (a single self-contained file)
pnpm build

# preview the build
pnpm preview
```

## ✏️ Make it yours (important)

**Everything lives in one file:** [`src/data/content.ts`](src/data/content.ts)

Open it and replace the placeholder values with your real info:

- `profile` — name, roles, tagline, bio, email, location, social links
- `skills` — your actual skill groups
- `projects` — your real projects (title, description, tags, links, accent color)
- `certifications` — your real certifications

The whole UI reads from that single file — no need to touch components. After editing, run `pnpm build` again to regenerate `dist/`.

## 🗂 Structure

```
src/
├── data/content.ts      ← ALL your content (edit this)
├── three/
│   ├── Scene.tsx        ← Canvas, bloom, camera rig
│   └── shaders.ts       ← GLSL (fluid blob + starfield)
├── components/
│   ├── Chrome.tsx       ← loader, header, HUD, cursor, aurora, grain
│   ├── Sections.tsx     ← hero, about, skills, projects, certs, contact
│   └── Reveal.tsx       ← scroll-reveal
├── lib/hooks.ts         ← pointer + scroll tracking
├── store.ts             ← shared frame state
├── App.tsx
└── index.css            ← the whole visual language
```

## 🛠 Stack

React 19 · TypeScript · Vite 6 · Three.js · @react-three/fiber · @react-three/postprocessing
