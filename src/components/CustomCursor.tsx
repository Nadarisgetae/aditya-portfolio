'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ─────────────────────────────────────────────
//  CustomCursor — magnetic cursor + trail
// ─────────────────────────────────────────────

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Main dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40 })

  // Ring — lags behind for elegance
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    // Hide on mobile/touch devices
    if ('ontouchstart' in window) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)

      // Add trail point
      const id = trailIdRef.current++
      setTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }])

      // Check cursor type
      const target = e.target as HTMLElement
      const isClickable =
        target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]') !== null
      setIsPointer(isClickable)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)
    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [mouseX, mouseY])

  // Clear old trail points
  useEffect(() => {
    if (trail.length === 0) return
    const timer = setTimeout(() => {
      setTrail(prev => prev.slice(1))
    }, 80)
    return () => clearTimeout(timer)
  }, [trail])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, index) => {
        const opacity = (index / trail.length) * 0.4
        const size = (index / trail.length) * 6 + 2
        return (
          <div
            key={point.id}
            style={{
              position: 'fixed',
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `rgba(139, 92, 246, ${opacity})`,
              pointerEvents: 'none',
              zIndex: 9998,
              transition: 'opacity 0.1s ease',
            }}
          />
        )
      })}

      {/* Outer ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.6 : isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.3 } }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <div
          style={{
            width: isPointer ? 44 : 36,
            height: isPointer ? 44 : 36,
            borderRadius: '50%',
            border: `1.5px solid ${isPointer ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.3)'}`,
            background: isPointer ? 'rgba(59,130,246,0.06)' : 'transparent',
            boxShadow: isPointer
              ? '0 0 20px rgba(59,130,246,0.3)'
              : '0 0 10px rgba(255,255,255,0.05)',
            transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : isPointer ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.15 }, opacity: { duration: 0.3 } }}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            boxShadow: '0 0 10px rgba(139,92,246,0.8)',
          }}
        />
      </motion.div>
    </>
  )
}