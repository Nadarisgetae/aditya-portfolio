'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personalInfo, journey, currentFocus, skills } from '@/lib/data'

// ─────────────────────────────────────────────
//  AboutSection — storytelling + timeline
// ─────────────────────────────────────────────

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl md:text-4xl font-black"
        style={{
          background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </motion.span>
      <span className="text-xs label-text text-center" style={{ color: '#6B6B6B' }}>
        {label}
      </span>
    </div>
  )
}

function SectionTag({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      id="about"
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          right: '-20%',
          transform: 'translateY(-50%)',
          width: 600,
          height: 600,
          background:
            'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-max">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <SectionTag>About Me</SectionTag>
          <h2 className="cinematic-text-lg font-black mt-2" style={{ color: '#F5F5F5' }}>
            The Story <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              So Far.
            </span>
          </h2>
        </motion.div>

        {/* ── Two column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-lg leading-relaxed" style={{ color: '#A0A0A0' }}>
              {personalInfo.bio}
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#6B6B6B' }}>
              Currently in my <span style={{ color: '#F5F5F5', fontWeight: 600 }}>3rd year</span> at{' '}
              <span style={{ color: '#3B82F6', fontWeight: 600 }}>BML Munjal University</span>,
              pursuing B.Tech in Computer Science Engineering. Simultaneously serving as{' '}
              <span style={{ color: '#8B5CF6', fontWeight: 600 }}>CMO at PitchX</span> and
              building <span style={{ color: '#F59E0B', fontWeight: 600 }}>Aryavart</span> — a Web3
              project I&apos;m deeply invested in.
            </p>

            {/* Stats */}
            <div
              className="grid grid-cols-2 gap-6 mt-4 p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {personalInfo.stats.map((stat) => (
                <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </motion.div>

          {/* Right — current focus panels */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {currentFocus.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between p-4 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: `${item.color}30`,
                  x: 4,
                }}
              >
                <span className="text-xs label-text" style={{ color: '#6B6B6B' }}>
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                  />
                  <span className="text-sm font-medium" style={{ color: '#F5F5F5' }}>
                    {item.value}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Education card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-xl mt-2"
              style={{
                background: 'rgba(59,130,246,0.04)',
                border: '1px solid rgba(59,130,246,0.12)',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)' }}
                >
                  🎓
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#F5F5F5' }}>
                    {personalInfo.university}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>
                    {personalInfo.degree}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#3B82F6' }}>
                    {personalInfo.year}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Journey timeline ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <SectionTag>My Journey</SectionTag>
          <h3
            className="cinematic-text-md font-bold mt-2 mb-10"
            style={{ color: '#F5F5F5' }}
          >
            From Curiosity to Creation
          </h3>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background:
                  'linear-gradient(180deg, transparent, rgba(59,130,246,0.3) 10%, rgba(139,92,246,0.3) 50%, rgba(6,182,212,0.3) 90%, transparent)',
                transform: 'translateX(-50%)',
              }}
            />

            <div className="flex flex-col gap-12">
              {journey.map((item, i) => {
                const isRight = i % 2 === 0
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isRight ? -30 : 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.6 + i * 0.15,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Year bubble — mobile: left, desktop: center */}
                    <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 20px ${item.color}60`,
                          color: '#0A0A0A',
                        }}
                      >
                        ●
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-4 md:ml-0 md:w-5/12 p-5 rounded-xl ${
                        isRight ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                      }`}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${item.color}20`,
                      }}
                    >
                      <span
                        className="text-xs label-text mb-2 block"
                        style={{ color: item.color }}
                      >
                        {item.year}
                      </span>
                      <h4
                        className="text-base font-bold mb-2"
                        style={{ color: '#F5F5F5' }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Skills overview ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionTag>Skills Snapshot</SectionTag>
          <h3
            className="cinematic-text-md font-bold mt-2 mb-10"
            style={{ color: '#F5F5F5' }}
          >
            What I Work With
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(skills).map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.8 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-5 rounded-xl group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: `${cat.color}25`,
                  y: -2,
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: cat.color,
                      boxShadow: `0 0 8px ${cat.color}80`,
                    }}
                  />
                  <span
                    className="text-xs label-text"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded-md text-xs"
                      style={{
                        background: `${cat.color}10`,
                        color: '#A0A0A0',
                        border: `1px solid ${cat.color}15`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}