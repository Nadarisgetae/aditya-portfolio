'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, personalInfo } from '@/lib/data'

// ─────────────────────────────────────────────
//  Navbar — animated sticky nav with blur
// ─────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          style={{
            background: scrolled
              ? 'rgba(10,10,10,0.85)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 2px 40px rgba(0,0,0,0.4)'
              : 'none',
            transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div className="container-max flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 select-none">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.4)',
                  }}
                >
                  AN
                </div>
                {/* Pulse ring */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }}
                />
              </div>
              <span
                className="hidden sm:block text-sm font-semibold tracking-wide"
                style={{ color: '#F5F5F5' }}
              >
                {personalInfo.name}
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 group"
                    style={{ color: isActive ? '#F5F5F5' : '#A0A0A0' }}
                  >
                    {/* Active / hover background */}
                    <motion.span
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: isActive
                          ? 'rgba(59,130,246,0.1)'
                          : 'transparent',
                        border: isActive
                          ? '1px solid rgba(59,130,246,0.2)'
                          : '1px solid transparent',
                      }}
                      whileHover={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="relative z-10">{link.label}</span>

                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#3B82F6', boxShadow: '0 0 6px rgba(59,130,246,0.8)' }}
                      />
                    )}
                  </Link>
                )
              })}

              {/* CTA button */}
              <a
                href="mailto:nadarisgetae@gmail.com"
                className="ml-4 btn-primary text-sm py-2 px-5"
                style={{ borderRadius: '0.5rem' }}
              >
                Let&apos;s Talk
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors duration-200"
              style={{
                background: menuOpen ? 'rgba(59,130,246,0.1)' : 'transparent',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-px rounded-full"
                style={{ background: '#F5F5F5' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-px rounded-full"
                style={{ background: '#F5F5F5' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="block w-5 h-px rounded-full"
                style={{ background: '#F5F5F5' }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />

            <div className="flex flex-col items-center justify-center flex-1 gap-8 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className="block text-center group"
                    >
                      <span
                        className="cinematic-text-md font-bold transition-colors duration-300"
                        style={{ color: isActive ? '#3B82F6' : '#F5F5F5' }}
                      >
                        {link.label}
                      </span>
                      <div
                        className="h-px mt-1 mx-auto transition-all duration-300"
                        style={{
                          width: isActive ? '100%' : '0%',
                          background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
                        }}
                      />
                    </Link>
                  </motion.div>
                )
              })}

              <motion.a
                href="mailto:nadarisgetae@gmail.com"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="btn-primary mt-4 text-base px-8 py-3"
              >
                Let&apos;s Talk
              </motion.a>
            </div>

            {/* Bottom social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 pb-12 relative z-10"
            >
              <a
                href="https://github.com/Nadarisgetae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs label-text transition-colors duration-200"
                style={{ color: '#6B6B6B' }}
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/aditya-nadar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs label-text transition-colors duration-200"
                style={{ color: '#6B6B6B' }}
              >
                LinkedIn
              </a>
              <a
                href="mailto:nadarisgetae@gmail.com"
                className="text-xs label-text transition-colors duration-200"
                style={{ color: '#6B6B6B' }}
              >
                Email
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}