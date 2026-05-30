'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import { personalInfo } from '@/lib/data'

// ─────────────────────────────────────────────
//  Experience Page
// ─────────────────────────────────────────────

export default function ExperiencePage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true })

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          left: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Ambient glow bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          right: '-10%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">

        {/* ── Page hero header ── */}
        <div
          ref={headerRef}
          className="container-max pt-32 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tag */}
            <div className="section-tag">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#3B82F6',
                  display: 'inline-block',
                  boxShadow: '0 0 8px rgba(59,130,246,0.8)',
                }}
              />
              Experience & Journey
            </div>

            {/* Headline */}
            <h1
              className="cinematic-text-lg font-black mt-3"
              style={{ color: '#F5F5F5' }}
            >
              The Roles That{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Shaped Me.
              </span>
            </h1>

            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: '#6B6B6B' }}
            >
              From leading marketing at a startup to building Web3 infrastructure
              from scratch — every role has pushed the frontier of what I can do.
            </p>
          </motion.div>

          {/* ── Quick stat strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-6 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            {[
              { value: '3', label: 'Leadership Roles', color: '#3B82F6' },
              { value: '1', label: 'Internship', color: '#06B6D4' },
              { value: '1', label: 'Research Paper', color: '#8B5CF6' },
              { value: '7', label: 'Certifications', color: '#F59E0B' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col gap-1"
              >
                <span
                  className="text-2xl font-black"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}99)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs label-text"
                  style={{ color: '#6B6B6B' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Full timeline component ── */}
        <ExperienceTimeline />

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="container-max pb-20"
        >
          <div
            className="relative p-8 md:p-12 rounded-3xl overflow-hidden text-center"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Glow background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)',
              }}
            />

            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), transparent)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="status-dot" />
                <span
                  className="text-xs label-text"
                  style={{ color: '#06B6D4' }}
                >
                  Open to Opportunities
                </span>
              </div>

              <h3
                className="cinematic-text-md font-bold mb-3"
                style={{ color: '#F5F5F5' }}
              >
                Let&apos;s Build Something
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Remarkable.
                </span>
              </h3>

              <p
                className="text-sm leading-relaxed max-w-md mx-auto mb-8"
                style={{ color: '#6B6B6B' }}
              >
                Currently in {personalInfo.year} and open to internships,
                collaborations, and exciting projects in AI, Finance, and Web3.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/contact"
                  className="btn-primary px-8 py-3"
                >
                  Get In Touch
                </a>
                <a
                  href="/projects"
                  className="btn-outline px-8 py-3"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}