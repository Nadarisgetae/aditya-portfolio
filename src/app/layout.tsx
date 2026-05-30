import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import LenisProvider from '@/components/LenisProvider'

// ─────────────────────────────────────────────
//  Root Layout — wires the entire app together
// ─────────────────────────────────────────────

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aditya Nadar — Finance · AI · Web3 · Marketing',
  description:
    'Portfolio of Aditya Nadar — Computer Science undergraduate, CMO at PitchX, Web3 builder, and quantitative finance enthusiast. Building at the intersection of AI, Finance, and Blockchain.',
  keywords: [
    'Aditya Nadar',
    'Portfolio',
    'Web3',
    'AI',
    'Finance',
    'Blockchain',
    'Quantitative Finance',
    'PitchX',
    'Aryavart',
    'BML Munjal University',
  ],
  authors: [{ name: 'Aditya Nadar' }],
  creator: 'Aditya Nadar',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aditya-nadar.vercel.app',
    title: 'Aditya Nadar — Finance · AI · Web3 · Marketing',
    description:
      'Building at the intersection of AI, Finance, and Web3. CMO at PitchX. Founder of Aryavart.',
    siteName: 'Aditya Nadar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Nadar — Finance · AI · Web3 · Marketing',
    description:
      'Building at the intersection of AI, Finance, and Web3.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        style={{
          background: '#0A0A0A',
          color: '#F5F5F5',
          overflowX: 'hidden',
        }}
      >
        {/* Lenis smooth scroll provider */}
        <LenisProvider>
          {/* Custom magnetic cursor — hidden on touch devices */}
          <CustomCursor />

          {/* Sticky navbar */}
          <Navbar />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}