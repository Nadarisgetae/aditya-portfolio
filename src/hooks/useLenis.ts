'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// ─────────────────────────────────────────────
//  useLenis — cinematic smooth scroll hook
//  Drop this into any layout/page component
// ─────────────────────────────────────────────

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Expose lenis to window for external control (e.g. stop during intro)
    ;(window as Window & { lenis?: Lenis }).lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete (window as Window & { lenis?: Lenis }).lenis
    }
  }, [])
}