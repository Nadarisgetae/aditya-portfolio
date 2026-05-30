'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { Project } from '@/types'

// ─────────────────────────────────────────────
//  ProjectCard — magnetic hover + expand modal
// ─────────────────────────────────────────────

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Magnetic tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6])
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsExpanded(true)}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          delay: index * 0.1,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        whileHover={{ scale: 1.02, z: 20 }}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        data-cursor="pointer"
      >
        {/* Card background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: `1px solid rgba(255,255,255,0.07)`,
          }}
        />

        {/* Mouse-follow glow spot */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${project.glowColor} 0%, transparent 60%)`,
          }}
        />

        {/* Color accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            opacity: 0.6,
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col gap-1">
              {/* Status badge */}
              <span
                className="text-xs px-2 py-0.5 rounded-full self-start"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
              >
                {project.status}
              </span>

              {/* Category */}
              <span
                className="text-xs label-text mt-2"
                style={{ color: '#6B6B6B' }}
              >
                {project.category}
              </span>
            </div>

            {/* Expand arrow */}
            <motion.div
              className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
              }}
              whileHover={{ scale: 1.1 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                style={{ color: project.color }}
              >
                <path
                  d="M2 12L12 2M12 2H6M12 2V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold mb-1 group-hover:text-white transition-colors duration-200"
            style={{ color: '#E5E5E5' }}
          >
            {project.title}
          </h3>
          <p className="text-sm mb-4" style={{ color: '#8B5CF6' }}>
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#6B6B6B' }}>
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: '#A0A0A0',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Tech stack pills */}
          <div
            className="pt-4 flex flex-wrap gap-1.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md font-medium"
                style={{
                  background: `${project.color}10`,
                  color: project.color,
                  border: `1px solid ${project.color}20`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Expanded modal ── */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[150]"
              style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
              onClick={() => setIsExpanded(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 md:inset-[10%] z-[160] overflow-y-auto rounded-2xl"
              style={{
                background: '#111111',
                border: `1px solid ${project.color}30`,
                boxShadow: `0 0 80px ${project.glowColor}`,
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#A0A0A0',
                }}
              >
                ✕
              </button>

              {/* Accent bar */}
              <div
                className="h-1 w-full rounded-t-2xl"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                }}
              />

              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <span
                    className="text-xs label-text mb-3 block"
                    style={{ color: project.color }}
                  >
                    {project.category} · {project.status}
                  </span>
                  <h2
                    className="cinematic-text-md font-black mb-2"
                    style={{ color: '#F5F5F5' }}
                  >
                    {project.title}
                  </h2>
                  <p className="text-lg" style={{ color: '#8B5CF6' }}>
                    {project.subtitle}
                  </p>
                </div>

                {/* Long description */}
                <div className="mb-8">
                  <h4
                    className="text-xs label-text mb-3"
                    style={{ color: '#6B6B6B' }}
                  >
                    Overview
                  </h4>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: '#A0A0A0' }}
                  >
                    {project.longDescription}
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <h4 className="text-xs label-text mb-3" style={{ color: '#6B6B6B' }}>
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          background: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mb-8">
                  <h4 className="text-xs label-text mb-3" style={{ color: '#6B6B6B' }}>
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          color: '#F5F5F5',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub link */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300"
                  style={{
                    background: `${project.color}15`,
                    color: project.color,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}