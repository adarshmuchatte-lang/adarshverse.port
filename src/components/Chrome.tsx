import { useEffect, useRef, useState } from 'react'
import { ui } from '../store'
import { profile, nav } from '../data/content'

export function Aurora() {
  return <div className="aurora" aria-hidden />
}

export function Grain() {
  return <div className="grain" aria-hidden />
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    let x = 0
    let y = 0
    let rx = 0
    let ry = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      ui.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      ui.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement
      const hoverable = t.closest('a, button, .project-card, .cert-row, .skill-tag, .social-pill')
      ring.classList.toggle('is-hover', !!hoverable)
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  )
}

export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="scroll-progress" aria-hidden>
      <span style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

export function Header({ scrolled }: { scrolled: boolean }) {
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand">
        <span className="brand-x">◆</span> {profile.alias}
      </a>
      <nav className="nav">
        {nav.map((n) => (
          <a key={n.id} href={`#${n.id}`}>
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export function HUD() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-GB', { hour12: false }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hud" aria-hidden>
      <span className="hud-tl">SYS://{profile.alias}</span>
      <span className="hud-tr">
        <span className="dot" /> ANTIGRAVITY CORE · ONLINE
      </span>
      <span className="hud-bl">
        {profile.location.toUpperCase()} · {time} IST
      </span>
      <span className="hud-br">v1.0 · WEBGL</span>
    </div>
  )
}

export function Loader({ onEnter }: { onEnter: () => void }) {
  useEffect(() => {
    const t = setTimeout(onEnter, 2200)
    return () => clearTimeout(t)
  }, [onEnter])

  return (
    <div className="loader">
      <div className="loader-core">
        <div className="loader-logo grad-text">{profile.alias}</div>
        <div className="loader-bar">
          <span />
        </div>
        <div className="loader-enter">Initialising universe…</div>
      </div>
    </div>
  )
}
