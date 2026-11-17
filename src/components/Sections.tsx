import Reveal from './Reveal'
import { profile, skills, projects, certifications } from '../data/content'

function SectionHead({ kicker, title, ghost }: { kicker: string; title: string; ghost?: string }) {
  return (
    <div className="section-head">
      <div className="section-kicker">{kicker}</div>
      <h2 className="section-title">
        {title} {ghost ? <span className="ghost">{ghost}</span> : null}
      </h2>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <Reveal>
          <div className="hero-availability">
            <span className="dot" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' }} />
            {profile.availability}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="hero-name">
            <span className="glitch" data-text={profile.name}>
              {profile.name}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <div className="hero-roles">
            {profile.roles.map((r, i) => (
              <span key={r}>
                {i > 0 && <span style={{ color: 'var(--muted)' }}>/</span>} <em>{r}</em>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="hero-tagline">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Work
            </a>
            <a className="btn" href="#contact">
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>

      <div className="scroll-hint">Scroll to fall in</div>
    </section>
  )
}

export function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <SectionHead kicker="01 · About" title="A mind that lives" ghost="in motion." />
      </Reveal>

      <div className="about-grid">
        <Reveal delay={80}>
          <div className="about-card glass">
            {profile.bio.map((p, i) => (
              <p key={i}>
                {i === 0 ? <strong>{profile.name}</strong> : null} {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="stats-card glass">
            {profile.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-value grad-text">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <Reveal>
        <SectionHead kicker="02 · Skills" title="The tools in" ghost="my orbit." />
      </Reveal>

      <div className="skills-grid">
        {skills.map((group, i) => (
          <Reveal key={group.group} delay={i * 70}>
            <div className="skill-card glass">
              <div className="skill-group">{group.group}</div>
              <div className="skill-tags">
                {group.items.map((item) => (
                  <span className="skill-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <Reveal>
        <SectionHead kicker="03 · Projects" title="Worlds I've" ghost="engineered." />
      </Reveal>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <article className="project-card glass">
              <div className="pc-top">
                <span className="project-index">0{i + 1}</span>
                <span className="project-year">{p.year}</span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <div className="project-subtitle">{p.subtitle}</div>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={p.links.live} target="_blank" rel="noreferrer">
                  Live ↗
                </a>
                <a href={p.links.source} target="_blank" rel="noreferrer">
                  Source ↗
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Certifications() {
  return (
    <section className="section" id="certifications">
      <Reveal>
        <SectionHead kicker="04 · Certifications" title="Proof of" ghost="flight." />
      </Reveal>

      <div className="certs-list">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 60}>
            <div className="cert-row glass">
              <div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
              <div className="cert-year">{c.year}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact-wrap">
        <Reveal>
          <SectionHead kicker="05 · Contact" title="Let's build" ghost="a universe." />
        </Reveal>

        <Reveal delay={80}>
          <a className="contact-email grad-text" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </Reveal>

        <Reveal delay={160}>
          <div className="socials">
            {profile.socials.map((s) => (
              <a className="social-pill" key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Marquee() {
  const items = ['ADARSHVERSE', 'CREATIVE DEV', 'WEBGL', '3D', 'SHADERS', 'ANTIGRAVITY', 'MOTION', 'GENERATIVE']
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className={i % 2 === 0 ? 'solid' : 'outline'}>
            {t} ✦
          </span>
        ))}
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name}</span>
      <span>Built in the {profile.alias.toLowerCase()} · React + Three.js</span>
    </footer>
  )
}
