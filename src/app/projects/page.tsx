'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from '@/components/ProjectCard'
import { projects, research, skills } from '@/lib/data'

// ─────────────────────────────────────────────
//  Projects Page — showcase + skills + research
// ─────────────────────────────────────────────

const categories = ['All', 'Web3', 'Finance / AI', 'Software Engineering']

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

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const headerRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const skillsInView = useInView(skillsRef, { once: true, margin: '-80px' })

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

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

      {/* Ambient glow top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          right: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(ellipse, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="container-max pt-32 pb-20 relative z-10">

        {/* ── Page header ── */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <SectionTag>Projects & Skills</SectionTag>
            <h1
              className="cinematic-text-lg font-black mt-3"
              style={{ color: '#F5F5F5' }}
            >
              Things I&apos;ve{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Built.
              </span>
            </h1>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: '#6B6B6B' }}
            >
              From quantitative finance systems to Web3 infrastructure — projects
              built at the intersection of technology and markets.
            </p>
          </motion.div>

          {/* ── Category filter ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background:
                    activeCategory === cat
                      ? 'linear-gradient(135deg, #3B82F6, #8B5CF6)'
                      : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat ? '#fff' : '#6B6B6B',
                  border:
                    activeCategory === cat
                      ? '1px solid transparent'
                      : '1px solid rgba(255,255,255,0.08)',
                  boxShadow:
                    activeCategory === cat
                      ? '0 0 20px rgba(139,92,246,0.3)'
                      : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Projects grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Research panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <SectionTag>Research</SectionTag>
          <h2
            className="cinematic-text-md font-bold mt-2 mb-8"
            style={{ color: '#F5F5F5' }}
          >
            Academic Work
          </h2>

          {research.map((r) => (
            <div
              key={r.id}
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(139,92,246,0.04)',
                border: '1px solid rgba(139,92,246,0.15)',
              }}
            >
              {/* Glow accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)',
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
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

                  <h3
                    className="text-lg font-bold leading-snug mb-3"
                    style={{ color: '#F5F5F5' }}
                  >
                    {r.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: '#6B6B6B' }}
                  >
                    {r.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md"
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

                {/* Right stat */}
                <div
                  className="flex flex-col items-center justify-center p-5 rounded-xl flex-shrink-0 text-center"
                  style={{
                    background: 'rgba(139,92,246,0.06)',
                    border: '1px solid rgba(139,92,246,0.12)',
                    minWidth: 130,
                  }}
                >
                  <span className="text-2xl mb-1">🔬</span>
                  <span
                    className="text-xs label-text"
                    style={{ color: '#8B5CF6' }}
                  >
                    Peer Review
                  </span>
                  <span
                    className="text-sm font-semibold mt-1"
                    style={{ color: '#F5F5F5' }}
                  >
                    {r.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Full skills section ── */}
        <div ref={skillsRef}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <SectionTag>Tech Stack & Skills</SectionTag>
            <h2
              className="cinematic-text-md font-bold mt-2"
              style={{ color: '#F5F5F5' }}
            >
              What I Work With
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(skills).map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.09,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative p-5 rounded-2xl group transition-all duration-300 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: `${cat.color}20`,
                  y: -3,
                }}
              >
                {/* Hover corner glow */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${cat.color}12, transparent)`,
                  }}
                />

                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: cat.color,
                      boxShadow: `0 0 8px ${cat.color}`,
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
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-2 py-1 rounded-md text-xs cursor-default transition-all duration-200"
                      style={{
                        background: `${cat.color}08`,
                        color: '#A0A0A0',
                        border: `1px solid ${cat.color}12`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = `${cat.color}18`
                        el.style.color = cat.color
                        el.style.borderColor = `${cat.color}30`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = `${cat.color}08`
                        el.style.color = '#A0A0A0'
                        el.style.borderColor = `${cat.color}12`
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}