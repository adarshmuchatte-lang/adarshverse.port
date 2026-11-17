// ============================================================
//  ADARSHVERSE — content
//  👉 Replace every value below with YOUR real information.
//  Everything in the UI pulls from this single file.
// ============================================================

export const profile = {
  name: 'Adarsh Muchatte',
  alias: 'ADARSHVERSE',
  handle: '@adarshverse',
  roles: ['Creative Developer', '3D Engineer', 'WebGL Artisan'],
  tagline: 'I bend light, gravity and pixels into living interfaces.',
  location: 'India · Planet Earth',
  email: 'hello@adarshverse.dev',
  availability: 'Open to freelance & full-time',
  bio: [
    'I am a creative developer obsessed with the space where design meets real-time graphics. I build fluid, physics-driven websites that feel less like pages and more like places you can fall into.',
    'My playground is the browser: WebGL, shaders, generative systems and buttery 60fps interaction. I treat every project as a tiny universe — crafted with intent, shipped with obsession.',
  ],
  stats: [
    { value: '4+', label: 'Years crafting' },
    { value: '40+', label: 'Projects shipped' },
    { value: '60fps', label: 'Always the target' },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/adarshverse', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/adarshverse', icon: 'linkedin' },
    { label: 'X / Twitter', href: 'https://x.com/adarshverse', icon: 'x' },
    { label: 'Instagram', href: 'https://instagram.com/adarshverse', icon: 'instagram' },
    { label: 'Email', href: 'mailto:hello@adarshverse.dev', icon: 'mail' },
  ],
}

export const skills = [
  {
    group: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'GLSL', 'Rust'],
  },
  {
    group: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind', 'Framer Motion'],
  },
  {
    group: '3D & Graphics',
    items: ['Three.js', 'React Three Fiber', 'WebGL', 'Shaders', 'Blender'],
  },
  {
    group: 'Creative Tech',
    items: ['Web Audio', 'Canvas', 'Generative Art', 'WebXR', 'GSAP'],
  },
]

export const projects = [
  {
    id: 'nebula',
    title: 'Nebula',
    subtitle: '3D Portfolio Engine',
    year: '2025',
    tags: ['Three.js', 'R3F', 'GLSL', 'Vite'],
    description:
      'A real-time 3D portfolio engine with a morphing fluid core, particle cosmos and bloom-lit UI — the very system this site runs on.',
    accent: '#22d3ee',
    links: { live: '#', source: '#' },
  },
  {
    id: 'gravity-well',
    title: 'Gravity Well',
    subtitle: 'WebGL Arcade Game',
    year: '2024',
    tags: ['WebGL', 'Physics', 'TypeScript'],
    description:
      'An orbital physics game where you slingshot satellites around a collapsing star. Procedural levels, screen-shake and spatial audio.',
    accent: '#a855f7',
    links: { live: '#', source: '#' },
  },
  {
    id: 'aurora',
    title: 'Aurora UI',
    subtitle: 'Fluid Design System',
    year: '2024',
    tags: ['React', 'CSS', 'Motion'],
    description:
      'A component system built around animated gradients, glass surfaces and magnetic micro-interactions for cinematic product interfaces.',
    accent: '#34d399',
    links: { live: '#', source: '#' },
  },
  {
    id: 'orbital',
    title: 'Orbital',
    subtitle: 'Realtime AI Copilot',
    year: '2025',
    tags: ['Next.js', 'WebSockets', 'AI'],
    description:
      'A streaming AI workspace with a spatial canvas, collaborative cursors and a voice-first command layer for creative teams.',
    accent: '#f472b6',
    links: { live: '#', source: '#' },
  },
  {
    id: 'lumen',
    title: 'Lumen',
    subtitle: 'Shader Gallery',
    year: '2023',
    tags: ['GLSL', 'WebGL', 'Creative'],
    description:
      'An interactive museum of 40+ hand-written fragment shaders — fluid simulations, ray-marched forms and audio-reactive light.',
    accent: '#fbbf24',
    links: { live: '#', source: '#' },
  },
  {
    id: 'pulse',
    title: 'Pulse',
    subtitle: 'Realtime Analytics',
    year: '2023',
    tags: ['React', 'D3', 'WebSocket'],
    description:
      'A live analytics wall visualising thousands of events per second as a pulsing particle constellation — used in three production ops rooms.',
    accent: '#f87171',
    links: { live: '#', source: '#' },
  },
]

export const certifications = [
  { title: 'Three.js Journey', issuer: 'Bruno Simon', year: '2024' },
  { title: 'Creative Coding with GLSL', issuer: 'Frontend Masters', year: '2023' },
  { title: 'Interaction Design Specialisation', issuer: 'UC San Diego', year: '2023' },
  { title: 'Advanced React & Performance', issuer: 'Meta', year: '2022' },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
]
