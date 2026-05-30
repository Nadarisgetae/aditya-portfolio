// ─────────────────────────────────────────────
//  types/index.ts — TypeScript interfaces
//  for Aditya Nadar's Portfolio
// ─────────────────────────────────────────────

export interface PersonalInfo {
  name: string
  title: string
  tagline: string
  currentlyBuilding: string
  university: string
  degree: string
  year: string
  email: string
  phone: string
  github: string
  linkedin: string
  bio: string
  shortBio: string
  rotatingWords: string[]
  introWords: string[]
  stats: Stat[]
}

export interface Stat {
  value: string
  label: string
}

export interface SkillCategory {
  label: string
  color: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  tech: string[]
  color: string
  glowColor: string
  status: 'Completed' | 'In Progress' | 'Under Review'
  featured: boolean
  github: string
  category: string
  demo?: string
}

export interface Research {
  id: string
  title: string
  conference: string
  status: string
  year: string
  description: string
  tags: string[]
  color: string
}

export interface Experience {
  id: string
  role: string
  organisation: string
  type: 'Leadership' | 'Internship' | 'Entrepreneurship' | 'Research'
  period: string
  endPeriod: string
  description: string
  achievements: string[]
  skills: string[]
  color: string
  icon: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  category: string
  color: string
  icon: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface JourneyItem {
  year: string
  title: string
  description: string
  color: string
}

export interface CurrentFocusItem {
  label: string
  value: string
  color: string
}

export interface MousePosition {
  x: number
  y: number
}

export interface AnimationVariants {
  hidden: object
  visible: object
  exit?: object
}