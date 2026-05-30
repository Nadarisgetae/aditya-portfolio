'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { personalInfo, socialLinks, certifications } from '@/lib/data'

// ─────────────────────────────────────────────
//  Contact Page — form + socials
// ─────────────────────────────────────────────

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const icons: Record<string, React.ComponentType> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
}

type FormState = 'idle' | 'sending' | 'sent' | 'error'

function InputField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  multiline = false,
  delay = 0,
  inView = false,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
  delay?: number
  inView?: boolean
}) {
  const [focused, setFocused] = useState(false)

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: focused ? 'rgba(59,130,246,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${focused ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '0.75rem',
    padding: '0.875rem 1rem',
    color: '#F5F5F5',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused ? '0 0 20px rgba(59,130,246,0.08)' : 'none',
    resize: 'none' as const,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2"
    >
      <label
        htmlFor={name}
        className="text-xs label-text"
        style={{ color: focused ? '#3B82F6' : '#6B6B6B', transition: 'color 0.3s' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          style={baseStyle}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
    </motion.div>
  )
}

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: '-60px' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formState, setFormState] = useState<FormState>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setFormState('sending')

    // Simulate send — replace with your emailjs / formspree / api call
    await new Promise((r) => setTimeout(r, 1800))
    setFormState('sent')

    // Reset after 4 seconds
    setTimeout(() => {
      setFormState('idle')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

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

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          right: '-15%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '10%',
          left: '-10%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)',
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
              Contact
            </div>

            <h1
              className="cinematic-text-lg font-black mt-3"
              style={{ color: '#F5F5F5' }}
            >
              Let&apos;s{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Connect.
              </span>
            </h1>

            <p
              className="mt-4 max-w-xl text-base leading-relaxed"
              style={{ color: '#6B6B6B' }}
            >
              Whether it&apos;s a collaboration, internship opportunity, or just a
              conversation about AI, Finance, and Web3 — my inbox is open.
            </p>
          </motion.div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left — form (3 cols) */}
          <div ref={formRef} className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent)',
                }}
              />

              <h2
                className="text-lg font-bold mb-6"
                style={{ color: '#F5F5F5' }}
              >
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Your Name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    delay={0.1}
                    inView={formInView}
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    delay={0.15}
                    inView={formInView}
                  />
                </div>

                <InputField
                  label="Subject"
                  name="subject"
                  placeholder="Collaboration / Internship / Just saying hi"
                  value={formData.subject}
                  onChange={handleChange}
                  delay={0.2}
                  inView={formInView}
                />

                <InputField
                  label="Message"
                  name="message"
                  placeholder="Tell me what you're thinking..."
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  delay={0.25}
                  inView={formInView}
                />

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35, duration: 0.5 }}
                >
                  <motion.button
                    type="submit"
                    disabled={formState === 'sending' || formState === 'sent'}
                    whileHover={
                      formState === 'idle' ? { scale: 1.02, y: -1 } : {}
                    }
                    whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden"
                    style={{
                      background:
                        formState === 'sent'
                          ? 'linear-gradient(135deg, #10B981, #06B6D4)'
                          : 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                      color: '#fff',
                      boxShadow:
                        formState === 'sent'
                          ? '0 0 30px rgba(16,185,129,0.3)'
                          : '0 0 30px rgba(139,92,246,0.3)',
                      opacity: formState === 'sending' ? 0.7 : 1,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {formState === 'idle' && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Send Message →
                        </motion.span>
                      )}
                      {formState === 'sending' && (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <svg
                            className="animate-spin"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Sending...
                        </motion.span>
                      )}
                      {formState === 'sent' && (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          ✓ Message Sent!
                        </motion.span>
                      )}
                      {formState === 'error' && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Something went wrong. Try again.
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Right — info (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Direct contact */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <h3
                className="text-sm font-semibold mb-5"
                style={{ color: '#F5F5F5' }}
              >
                Direct Contact
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(59,130,246,0.06)'
                    el.style.borderColor = 'rgba(59,130,246,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.borderColor = 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}
                  >
                    <MailIcon />
                  </div>
                  <div>
                    <p className="text-xs label-text mb-0.5" style={{ color: '#6B6B6B' }}>
                      Email
                    </p>
                    <p className="text-sm" style={{ color: '#F5F5F5' }}>
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(59,130,246,0.06)'
                    el.style.borderColor = 'rgba(59,130,246,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.borderColor = 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6' }}
                  >
                    <LinkedinIcon />
                  </div>
                  <div>
                    <p className="text-xs label-text mb-0.5" style={{ color: '#6B6B6B' }}>
                      LinkedIn
                    </p>
                    <p className="text-sm" style={{ color: '#F5F5F5' }}>
                      aditya-nadar
                    </p>
                  </div>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                  style={{ border: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'rgba(139,92,246,0.06)'
                    el.style.borderColor = 'rgba(139,92,246,0.2)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = 'transparent'
                    el.style.borderColor = 'rgba(255,255,255,0.05)'
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(139,92,246,0.1)', color: '#8B5CF6' }}
                  >
                    <GithubIcon />
                  </div>
                  <div>
                    <p className="text-xs label-text mb-0.5" style={{ color: '#6B6B6B' }}>
                      GitHub
                    </p>
                    <p className="text-sm" style={{ color: '#F5F5F5' }}>
                      Nadarisgetae
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl"
              style={{
                background: 'rgba(6,182,212,0.04)',
                border: '1px solid rgba(6,182,212,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="status-dot" />
                <span className="text-xs label-text" style={{ color: '#06B6D4' }}>
                  Currently Available
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
                Open to{' '}
                <span style={{ color: '#F5F5F5' }}>internships</span>,{' '}
                <span style={{ color: '#F5F5F5' }}>collaborations</span>, and{' '}
                <span style={{ color: '#F5F5F5' }}>freelance projects</span> in
                AI, Finance, Web3, and Marketing.
              </p>
            </motion.div>

            {/* Response time */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-xs label-text" style={{ color: '#6B6B6B' }}>
                  Typical Response Time
                </p>
                <p className="text-sm font-medium mt-0.5" style={{ color: '#F5F5F5' }}>
                  Within 24 hours
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}