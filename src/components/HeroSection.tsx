'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import Link from 'next/link'
import { personalInfo } from '@/lib/data'

// ─────────────────────────────────────────────
//  HeroSection — fullscreen cinematic hero
// ─────────────────────────────────────────────

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; duration: number; delay: number; opacity: number }[]
  >([])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  // Parallax layers
  const layer1X = useTransform(springX, [-1, 1], [-18, 18])
  const layer1Y = useTransform(springY, [-1, 1], [-18, 18])
  const layer2X = useTransform(springX, [-1, 1], [-8, 8])
  const layer2Y = useTransform(springY, [-1, 1], [-8, 8])
  const layer3X = useTransform(springX, [-1, 1], [8, -8])
  const layer3Y = useTransform(springY, [-1, 1], [8, -8])

  // Real-time clock
  useEffect(() => {
    setMounted(true)
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
          timeZone: 'Asia/Kolkata',
        }) + ' IST'
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // Generate particles once
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    )
  }, [])

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Build type animation sequence
  const typeSequence = personalInfo.rotatingWords.flatMap(word => [word, 2000])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Ambient glow ── */}
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className="absolute pointer-events-none"
        aria-hidden
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80vw',
            maxWidth: 900,
            maxHeight: 900,
            background:
              'radial-gradient(ellipse at 40% 40%, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.07) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* ── Floating particles layer ── */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#06B6D4',
              opacity: p.opacity,
            }}
            animate={{ y: [0, -20, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* ── Decorative floating rings ── */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden
      >
        {/* Outer ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            border: '1px solid rgba(59,130,246,0.06)',
            animation: 'spin 40s linear infinite',
          }}
        />
        {/* Mid ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            border: '1px solid rgba(139,92,246,0.08)',
            animation: 'spin 25s linear infinite reverse',
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 240,
            height: 240,
            border: '1px solid rgba(6,182,212,0.1)',
            animation: 'spin 15s linear infinite',
          }}
        />
        {/* Center dot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            background: '#06B6D4',
            boxShadow: '0 0 20px rgba(6,182,212,0.8)',
          }}
        />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 container-max flex flex-col items-center text-center pt-24 pb-16">

        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
          style={{
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.2)',
          }}
        >
          <span className="status-dot" />
          <span className="text-xs label-text" style={{ color: '#06B6D4' }}>
            Currently Building {personalInfo.currentlyBuilding}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="cinematic-text-xl font-black mb-2 select-none"
            style={{
              background: 'linear-gradient(135deg, #F5F5F5 0%, #C0C0C0 40%, #F5F5F5 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            {personalInfo.name.split(' ')[0]}
          </h1>
          <h1
            className="cinematic-text-xl font-black select-none"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.5))',
            }}
          >
            {personalInfo.name.split(' ')[1]}
          </h1>
        </motion.div>

        {/* Rotating type text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 flex items-center gap-3"
        >
          <span className="text-lg md:text-2xl font-light" style={{ color: '#6B6B6B' }}>
            I am a
          </span>
          <span
            className="text-lg md:text-2xl font-semibold min-w-[180px] text-left"
            style={{ color: '#3B82F6' }}
          >
            {mounted && (
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                deletionSpeed={60}
                repeat={Infinity}
              />
            )}
          </span>
        </motion.div>

        {/* Subtitle chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {['Finance', 'AI', 'Web3', 'Marketing'].map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#A0A0A0',
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-base md:text-lg leading-relaxed"
          style={{ color: '#6B6B6B' }}
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          <Link href="/projects" className="btn-primary px-6 py-3">
            Explore Projects
          </Link>
          <Link href="/experience" className="btn-outline px-6 py-3">
            My Journey
          </Link>
          <a
            href="mailto:nadarisgetae@gmail.com"
            className="btn-outline px-6 py-3"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-8 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {personalInfo.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl md:text-3xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs label-text" style={{ color: '#6B6B6B' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Real-time clock */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 font-mono text-xs"
            style={{ color: '#2A2A2A' }}
          >
            {time}
          </motion.div>
        )}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs label-text" style={{ color: '#2A2A2A' }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(180deg, rgba(59,130,246,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  )
}