import { useCallback, useState } from 'react'
import { ui } from './store'
import { usePointerTracking, useScrollTracking } from './lib/hooks'
import Scene from './three/Scene'
import { Aurora, Grain, Cursor, ScrollProgress, Header, HUD, Loader } from './components/Chrome'
import { Hero, About, Skills, Projects, Certifications, Contact, Marquee, Footer } from './components/Sections'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  usePointerTracking()
  useScrollTracking((p) => {
    setProgress(p)
    setScrolled(window.scrollY > 40)
  })

  const handleEnter = useCallback(() => {
    ui.entered = true
    setEntered(true)
  }, [])

  return (
    <>
      <Scene />
      <Aurora />
      <Grain />

      <Cursor />
      <ScrollProgress progress={progress} />
      <Header scrolled={scrolled} />
      <HUD />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />

      {!entered && <Loader onEnter={handleEnter} />}
    </>
  )
}
