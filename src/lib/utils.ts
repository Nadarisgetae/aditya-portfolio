import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn() — merges Tailwind classes safely, resolving conflicts
 * Usage: cn('text-white', condition && 'text-blue-500', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Stagger delay utility for animation sequences
 * Usage: stagger(index, 0.1) → 0, 100, 200, 300ms...
 */
export function stagger(index: number, delayMs: number = 100): number {
  return index * delayMs
}

/**
 * Format a date range for experience cards
 */
export function formatDateRange(start: string, end?: string): string {
  return end ? `${start} — ${end}` : `${start} — Present`
}

/**
 * Clamp a number between min and max
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

/**
 * Map a value from one range to another (used for mouse parallax)
 */
export function mapRange(
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}