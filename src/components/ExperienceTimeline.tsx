'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { experience, research, certifications } from '@/lib/data'

// ─────────────────────────────────────────────
//  ExperienceTimeline — glowing vertical timeline
// ─────────────────────────────────────────────

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

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[0]
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative pl-10 md:pl-14"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-5 w-5 h-5 rounded-full flex items-center justify-center z-10"
        style={{
          background: item.color,
          boxShadow: `0 0 20px ${item.color}80, 0 0 40px ${item.color}30`,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: '#0A0A0A' }}
        />
      </div>

      {/* Connector line segment */}
      {index < experience.length - 1 && (
        <div
          className="absolute left-[9px] top-7 w-px"
          style={{
            height: 'calc(100% + 3rem)',
            background: `linear-gradient(180deg, ${item.color}40, transparent)`,
          }}
        />
      )}

      {/* Card */}
      <motion.div
        onClick={() => setExpanded(!expanded)}
        className="rounded-2xl p-5 md:p-6 cursor-pointer group transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: `${item.color}25`,
        }}
        data-cursor="pointer"
      >
        {/* Card top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Icon bubble */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
              style={{ background: `${item.color}12` }}
            >
              {item.icon}
            </div>

            <div>
              {/* Type badge */}
              <span
                className="text-xs px-2 py-0.5 rounded-full mb-1 inline-block"
                style={{
                  background: `${item.color}12`,
                  color: item.color,
                  border: `1px solid ${item.color}25`,
                }}
              >
                {item.type}
              </span>

              <h3
                className="text-base font-bold"
                style={{ color: '#F5F5F5' }}
              >
                {item.role}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: item.color }}>
                {item.organisation}
              </p>
              <p className="text-xs mt-1 label-text" style={{ color: '#6B6B6B' }}>
                {item.period}
                {item.endPeriod !== item.period && ` — ${item.endPeriod}`}
              </p>
            </div>
          </div>

          {/* Expand toggle */}
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#A0A0A0',
              fontSize: 16,
            }}
          >
            +
          </motion.div>
        </div>

        {/* Description — always visible */}
        <p
          className="text-sm leading-relaxed mt-4"
          style={{ color: '#6B6B6B' }}
        >
          {item.description}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mt-4 pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Achievements */}
                <p
                  className="text-xs label-text mb-3"
                  style={{ color: '#6B6B6B' }}
                >
                  Key Achievements
                </p>
                <ul className="flex flex-col gap-2 mb-4">
                  {item.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 6px ${item.color}`,
                        }}
                      />
                      <span className="text-sm" style={{ color: '#A0A0A0' }}>
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Skills gained */}
                <p
                  className="text-xs label-text mb-2"
                  style={{ color: '#6B6B6B' }}
                >
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 rounded-md"
                      style={{
                        background: `${item.color}10`,
                        color: item.color,
                        border: `1px solid ${item.color}20`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default function ExperienceTimeline() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="relative section-padding overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '-15%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="container-max">

        {/* ── Header ── */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <SectionTag>Experience</SectionTag>
            <h2
              className="cinematic-text-lg font-black mt-2"
              style={{ color: '#F5F5F5' }}
            >
              Where I&apos;ve{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Shown Up.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative mb-20">
          {/* Full vertical line */}
          <div
            className="absolute left-[9px] top-0 w-px"
            style={{
              height: '100%',
              background:
                'linear-gradient(180deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2), rgba(6,182,212,0.2), transparent)',
            }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((item, i) => (
              <ExperienceCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Research section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <SectionTag>Research</SectionTag>
          <h3
            className="cinematic-text-md font-bold mt-2 mb-8"
            style={{ color: '#F5F5F5' }}
          >
            Published Work
          </h3>

          {research.map((r) => (
            <div
              key={r.id}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(139,92,246,0.04)',
                border: '1px solid rgba(139,92,246,0.15)',
              }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(139,92,246,0.12)',
                        color: '#8B5CF6',
                        border: '1px solid rgba(139,92,246,0.25)',
                      }}
                    >
                      {r.status}
                    </span>
                    <span
                      className="text-xs label-text"
                      style={{ color: '#6B6B6B' }}
                    >
                      {r.conference} · {r.year}
                    </span>
                  </div>

                  <h4
                    className="text-base font-bold mb-3"
                    style={{ color: '#F5F5F5' }}
                  >
                    {r.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: '#6B6B6B' }}
                  >
                    {r.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md"
                        style={{
                          background: 'rgba(139,92,246,0.08)',
                          color: '#8B5CF6',
                          border: '1px solid rgba(139,92,246,0.15)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Certifications ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionTag>Certifications</SectionTag>
          <h3
            className="cinematic-text-md font-bold mt-2 mb-8"
            style={{ color: '#F5F5F5' }}
          >
            Credentials
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 p-4 rounded-xl group transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: `${cert.color}25`,
                  x: 3,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: `${cert.color}12` }}
                >
                  {cert.icon}
                </div>
                <div>
                  <p
                    className="text-sm font-medium leading-snug"
                    style={{ color: '#E5E5E5' }}
                  >
                    {cert.title}
                  </p>
                  <p className="text-xs mt-1" style={{ color: cert.color }}>
                    {cert.issuer}
                  </p>
                  <span
                    className="text-xs mt-1.5 inline-block px-2 py-0.5 rounded-full"
                    style={{
                      background: `${cert.color}10`,
                      color: cert.color,
                      border: `1px solid ${cert.color}20`,
                    }}
                  >
                    {cert.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}