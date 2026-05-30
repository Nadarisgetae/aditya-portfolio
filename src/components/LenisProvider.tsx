'use client'

import { useLenis } from '@/hooks/useLenis'

// ─────────────────────────────────────────────
//  LenisProvider — client wrapper for smooth scroll
//  Layout is a server component so Lenis hook
//  lives here instead
// ─────────────────────────────────────────────

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useLenis()
  return <>{children}</>
}