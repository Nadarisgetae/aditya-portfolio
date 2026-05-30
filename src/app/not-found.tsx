'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ─────────────────────────────────────────────
//  Custom 404 Page
// ─────────────────────────────────────────────

export default function NotFound() {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 8 + 5,
        delay: Math.random() * 3,
      }))
    )
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#06B6D4',
            opacity: 0.25,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-black select-none"
            style={{
              fontSize: 'clamp(6rem, 20vw, 16rem)',
              lineHeight: 1,
              letterSpacing: '-0.06em',
              background:
                'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none',
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Glowing divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 100,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, #3B82F6, #8B5CF6, transparent)',
            boxShadow: '0 0 20px rgba(139,92,246,0.5)',
            marginBottom: '2rem',
            transformOrigin: 'center',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="cinematic-text-md font-bold mb-3"
          style={{ color: '#F5F5F5' }}
        >
          Lost in the{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Digital Void.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-sm max-w-sm leading-relaxed mb-10"
          style={{ color: '#6B6B6B' }}
        >
          This page doesn&apos;t exist — or maybe it does in a parallel blockchain.
          Either way, let&apos;s get you back.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link href="/" className="btn-primary px-7 py-3">
            Back to Home
          </Link>
          <Link href="/projects" className="btn-outline px-7 py-3">
            View Projects
          </Link>
        </motion.div>

        {/* Subtle bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-xs label-text"
          style={{ color: '#2A2A2A' }}
        >
          ADITYA NADAR · PORTFOLIO
        </motion.p>
      </div>
    </div>
  )
}