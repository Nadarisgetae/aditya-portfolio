'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '@/lib/data'

// ─────────────────────────────────────────────
//  CinematicIntro — full-screen pre-trailer
// ─────────────────────────────────────────────

interface CinematicIntroProps {
  onComplete: () => void
}

const WORD_DELAY = 600   // ms between each intro word
const HOLD_AFTER = 800  // ms after last word before tagline
const TAGLINE_HOLD = 1200 // ms to show tagline before CTA

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<
    'words' | 'tagline' | 'cta' | 'exiting' | 'done'
  >('words')
  const [visibleWords, setVisibleWords] = useState<number>(0)
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; duration: number; delay: number; color: string }[]
  >([])

  const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#ffffff']

  // Generate particles once on mount
  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sequence: reveal words one by one
  useEffect(() => {
    if (phase !== 'words') return

    const words = personalInfo.introWords
    let current = 0

    const interval = setInterval(() => {
      current += 1
      setVisibleWords(current)

      if (current >= words.length) {
        clearInterval(interval)
        setTimeout(() => setPhase('tagline'), HOLD_AFTER)
      }
    }, WORD_DELAY)

    return () => clearInterval(interval)
  }, [phase])

  // After tagline → show CTA
  useEffect(() => {
    if (phase !== 'tagline') return
    const t = setTimeout(() => setPhase('cta'), TAGLINE_HOLD)
    return () => clearTimeout(t)
  }, [phase])

  // Handle enter
  const handleEnter = useCallback(() => {
    setPhase('exiting')
    // Stop lenis scroll during transition
    const w = window as Window & { lenis?: { stop: () => void; start: () => void } }
    w.lenis?.stop()
    setTimeout(() => {
      onComplete()
      w.lenis?.start()
    }, 1000)
  }, [onComplete])

  // Keyboard shortcut: Enter or Space
  useEffect(() => {
    if (phase !== 'cta') return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') handleEnter()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleEnter])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0A0A0A' }}
        >
          {/* ── Ambient grid ── */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* ── Radial glow center ── */}
          <div
            className="absolute"
            style={{
              width: '70vw',
              height: '70vw',
              maxWidth: 700,
              maxHeight: 700,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background:
                'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* ── Floating particles ── */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: p.color,
                opacity: 0.3,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* ── Corner lines ── */}
          {[
            { top: 24, left: 24 },
            { top: 24, right: 24 },
            { bottom: 24, left: 24 },
            { bottom: 24, right: 24 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...pos, width: 40, height: 40 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div
                className="absolute top-0 left-0 h-px w-full"
                style={{ background: 'rgba(59,130,246,0.5)' }}
              />
              <div
                className="absolute top-0 left-0 w-px h-full"
                style={{ background: 'rgba(59,130,246,0.5)' }}
              />
            </motion.div>
          ))}

          {/* ── Main content ── */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">

            {/* Word sequence */}
            <AnimatePresence mode="wait">
              {phase === 'words' && (
                <motion.div
                  key="words"
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-xl"
                >
                  {personalInfo.introWords.map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                      animate={
                        i < visibleWords
                          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                          : { opacity: 0, y: 24, filter: 'blur(8px)' }
                      }
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: i === visibleWords - 1 ? '#3B82F6' : '#F5F5F5',
                        textShadow:
                          i === visibleWords - 1
                            ? '0 0 40px rgba(59,130,246,0.6)'
                            : 'none',
                        transition: 'color 0.3s, text-shadow 0.3s',
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {/* Tagline */}
              {(phase === 'tagline' || phase === 'cta') && (
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Main tagline */}
                  <h1
                    style={{
                      fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      lineHeight: 0.9,
                      background: 'linear-gradient(135deg, #F5F5F5 0%, #A0A0A0 50%, #F5F5F5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {personalInfo.tagline}
                  </h1>

                  {/* Glowing divider line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: 120,
                      height: 1,
                      background: 'linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, #06B6D4, transparent)',
                      boxShadow: '0 0 20px rgba(139,92,246,0.6)',
                      transformOrigin: 'center',
                    }}
                  />

                  {/* Name */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="label-text"
                    style={{ color: '#6B6B6B', letterSpacing: '0.3em' }}
                  >
                    ADITYA NADAR
                  </motion.p>

                  {/* CTA button */}
                  <AnimatePresence>
                    {phase === 'cta' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 flex flex-col items-center gap-4"
                      >
                        <motion.button
                          onClick={handleEnter}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="relative group px-10 py-4 rounded-xl font-semibold text-white overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                            boxShadow: '0 0 40px rgba(139,92,246,0.4)',
                            fontSize: '1rem',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {/* Shimmer sweep */}
                          <span
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background:
                                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                              transform: 'skewX(-20deg)',
                            }}
                          />
                          <span className="relative z-10">DISCOVER MY WORLD</span>
                        </motion.button>

                        <p className="text-xs" style={{ color: '#6B6B6B' }}>
                          Press{' '}
                          <kbd
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              border: '1px solid rgba(255,255,255,0.1)',
                              background: 'rgba(255,255,255,0.05)',
                              color: '#A0A0A0',
                            }}
                          >
                            Enter
                          </kbd>{' '}
                          to continue
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom status bar ── */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8 md:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="text-xs label-text" style={{ color: '#6B6B6B' }}>
                Currently Building {personalInfo.currentlyBuilding}
              </span>
            </div>
            <span className="text-xs label-text" style={{ color: '#6B6B6B' }}>
              {personalInfo.university}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}