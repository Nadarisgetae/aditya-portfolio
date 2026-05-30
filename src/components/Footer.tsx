'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { socialLinks, personalInfo } from '@/lib/data'

// ─────────────────────────────────────────────
//  Footer — minimal premium footer
// ─────────────────────────────────────────────

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const icons: Record<string, React.ComponentType> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
}

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="relative overflow-hidden">

      {/* Top gradient separator */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(6,182,212,0.3), transparent)',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 200,
          background:
            'radial-gradient(ellipse at center bottom, rgba(139,92,246,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Subtle floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${8 + i * 8}%`,
            bottom: `${20 + (i % 3) * 20}%`,
            width: i % 2 === 0 ? 2 : 1,
            height: i % 2 === 0 ? 2 : 1,
            background:
              i % 3 === 0 ? '#3B82F6' : i % 3 === 1 ? '#8B5CF6' : '#06B6D4',
            opacity: 0.25,
          }}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="container-max py-16 relative z-10">

        {/* ── Main footer row ── */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          {/* Left — brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start gap-4"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                  boxShadow: '0 0 24px rgba(139,92,246,0.4)',
                }}
              >
                AN
              </div>
              <span className="font-semibold text-sm" style={{ color: '#F5F5F5' }}>
                {personalInfo.name}
              </span>
            </div>

            {/* Tagline */}
            <p className="text-xs leading-relaxed max-w-xs text-center md:text-left" style={{ color: '#6B6B6B' }}>
              {personalInfo.shortBio}
            </p>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="status-dot" style={{ width: 6, height: 6 }} />
              <span className="text-xs label-text" style={{ color: '#6B6B6B' }}>
                Building {personalInfo.currentlyBuilding}
              </span>
            </div>
          </motion.div>

          {/* Center — quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-xs label-text" style={{ color: '#6B6B6B' }}>
              Navigate
            </p>
            <div className="flex flex-col items-center gap-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: 'Experience', href: '/experience' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: '#6B6B6B' }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = '#F5F5F5')
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLAnchorElement).style.color = '#6B6B6B')
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-end gap-4"
          >
            <p className="text-xs label-text" style={{ color: '#6B6B6B' }}>
              Connect
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = icons[link.icon]
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.icon !== 'mail' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#6B6B6B',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(59,130,246,0.1)'
                      el.style.borderColor = 'rgba(59,130,246,0.3)'
                      el.style.color = '#3B82F6'
                      el.style.boxShadow = '0 0 16px rgba(59,130,246,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = 'rgba(255,255,255,0.04)'
                      el.style.borderColor = 'rgba(255,255,255,0.08)'
                      el.style.color = '#6B6B6B'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {Icon && <Icon />}
                  </motion.a>
                )
              })}
            </div>

            {/* Email text */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-xs transition-colors duration-200"
              style={{ color: '#6B6B6B' }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = '#3B82F6')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = '#6B6B6B')
              }
            >
              {personalInfo.email}
            </a>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-xs" style={{ color: '#2A2A2A' }}>
            Built with passion, motion & vision.
          </p>

          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              }}
            />
            <p className="text-xs" style={{ color: '#2A2A2A' }}>
              © {new Date().getFullYear()} {personalInfo.name}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}