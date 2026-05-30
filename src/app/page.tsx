'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CinematicIntro from '@/components/CinematicIntro'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'

// ─────────────────────────────────────────────
//  Landing Page — intro + hero + about
// ─────────────────────────────────────────────

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Check if user already saw intro this session
  useEffect(() => {
    const seen = sessionStorage.getItem('intro-seen')
    if (seen) {
      setIntroComplete(true)
      setShowContent(true)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('intro-seen', 'true')
    setIntroComplete(true)
    // Slight delay so intro exit animation finishes cleanly
    setTimeout(() => setShowContent(true), 200)
  }

  return (
    <>
      {/* Cinematic intro — only on first visit per session */}
      <AnimatePresence mode="wait">
        {!introComplete && (
          <CinematicIntro onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main content — fades in after intro */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection />
            <AboutSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}