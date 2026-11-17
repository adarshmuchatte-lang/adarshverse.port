import { useEffect } from 'react'
import { ui } from '../store'

export function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ui.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      ui.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
}

export function useScrollTracking(onProgress?: (p: number) => void) {
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      ui.scroll = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
      onProgress?.(ui.scroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onProgress])
}
