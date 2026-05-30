// ─────────────────────────────────────────────
//  data.ts — Aditya Nadar's Portfolio Data
//  Single source of truth for the entire site
// ─────────────────────────────────────────────

export const personalInfo = {
  name: 'Aditya Nadar',
  title: 'Finance · AI&DS · Blockchain · Quantitative Study',
  tagline: 'DECODING THE FUTURE.',
  currentlyBuilding: 'Aryavart',
  university: 'BML Munjal University',
  degree: 'B.Tech Computer Science Engineering',
  year: '3rd Year (2024–2028)',
  email: 'nadarisgetae@gmail.com',
  phone: '+91 9205964091',
  github: 'https://github.com/Nadarisgetae',
  linkedin: 'https://linkedin.com/in/aditya-nadar',
  bio: `Computer Science Sophomore with a deep obsession for building at the intersection of AI, Finance, and Web3. 
  From quantitative market models to decentralised systems — I engineer solutions that sit at the frontier of technology.`,
  shortBio: 'Builder. Strategist. Creator at the intersection of Artificial Intelligence , Finance & Web3.',
  rotatingWords: [
    'Strategist',
    'Finance Aficionado',
    'Blockchain Enthusiast',
    'AI/ML Engineer',
    'Quant Thinker',
    'Founder',
  ],
  introWords: ['Finance.', 'Artifical Intelligence.', 'Web-3.', 'Blockchain.', 'Systemic Logic.'],
  stats: [
    { value: 'Multiple', label: 'Projects Built' },
    { value: '1', label: 'Research Paper' },
    { value: '6+', label: 'Certifications' },
    { value: '3', label: 'Leadership Roles' },
  ],
}

// ─────────────────────────────────────────────
//  Skills
// ─────────────────────────────────────────────

export const skills = {
  languages: {
    label: 'Languages',
    color: '#3B82F6',
    items: ['Python', 'C', 'C++', 'Java', 'SQL', 'JavaScript', 'HTML', 'CSS', 'Pine Script', 'Solidity (learning)'],
  },
  aiml: {
    label: 'AI / ML',
    color: '#8B5CF6',
    items: [
      'Data Analysis',
      'Time Series Analysis',
      'Predictive Modeling',
      'Volatility Modeling',
      'Machine Learning',
      'Statistical Modeling',
    ],
  },
  finance: {
    label: 'Finance',
    color: '#06B6D4',
    items: [
      'Quantitative Finance',
      'Financial Analysis',
      'Cryptocurrency Analytics',
      'Portfolio Optimization',
      'Risk Metrics',
      'TradingView Pine Script',
      'Drawdown Analysis',
    ],
  },
  web3: {
    label: 'Web3 / Blockchain',
    color: '#F59E0B',
    items: [
      'Blockchain Technology',
      'Web3 Development',
      'Smart Contracts (learning)',
      'DeFi Concepts',
      'Crypto Market Analysis',
    ],
  },
  tools: {
    label: 'Tools & Platforms',
    color: '#10B981',
    items: [
      'Git & GitHub',
      'VS Code',
      'Jupyter Notebook',
      'MySQL',
      'MongoDB',
      'Bootstrap',
        'Tailwind CSS',
    ],
  },
  softSkills: {
    label: 'Soft Skills',
    color: '#EC4899',
    items: [
      'Strategic Marketing',
      'Team Leadership',
      'Sponsorship Acquisition',
      'Brand Positioning',
      'Data-Driven Decision Making',
      'Cross-functional Collaboration',
    ],
  },
}

// ─────────────────────────────────────────────
//  Projects
// ─────────────────────────────────────────────

export const projects = [
  {
    id: 'aryavart',
    title: 'Aryavart',
    subtitle: 'Web3 Platform',
    description:
      'A futuristic Web3 project currently under active development. Building decentralised infrastructure that bridges virtual economies with real-world value exchange.',
    longDescription:
      'Aryavart is a Web3 initiative focused on decentralised financial infrastructure. The project explores how blockchain technology can redefine value exchange, ownership, and financial participation at scale.',
    tags: ['Web3', 'Blockchain', 'DeFi', 'In Progress'],
    tech: ['Blockchain', 'Web3', 'Smart Contracts', 'Decentralised Systems'],
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    status: 'In Progress',
    featured: true,
    github: 'https://github.com/Nadarisgetae',
    category: 'Web3',
  },
  {
    id: 'bnb-quant',
    title: 'BNB Quantitative Market Analysis',
    subtitle: 'Crypto Analytics System',
    description:
      'A Python-based financial analytics system for Binance Coin (BNB) market analysis with rolling volatility models, moving averages, return distributions, and drawdown analysis.',
    longDescription:
      'Built structured financial data pipelines for handling historical cryptocurrency datasets. Applied quantitative finance concepts for risk-adjusted asset evaluation. Implemented rolling volatility models and statistical frameworks to decode market behaviour.',
    tags: ['Python', 'Quantitative Finance', 'Crypto', 'Data Analysis'],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Financial APIs'],
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/Nadarisgetae',
    category: 'Finance / AI',
  },
  {
    id: 'crypto-volatility',
    title: 'Crypto Volatility Lab',
    subtitle: 'Risk Analysis Framework',
    description:
      'A crypto risk analysis framework for volatility modeling, systemic shock detection, and market condition monitoring with a live dashboard.',
    longDescription:
      'Implemented candle-based market prediction logic using volatility clustering and crash severity scaling. Added dashboard visualisation for market condition monitoring and classification. Developed customisable stress-testing and market selection modules.',
    tags: ['Python', 'Risk Analysis', 'Volatility', 'Dashboard'],
    tech: ['Python', 'NumPy', 'Matplotlib', 'Statistical Models'],
    color: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    status: 'Completed',
    featured: true,
    github: 'https://github.com/Nadarisgetae',
    category: 'Finance / AI',
  },
  {
    id: 'ease-buy',
    title: 'Ease Buy — Trading Signal Indicator',
    subtitle: 'TradingView Pine Script',
    description:
      'A TradingView Pine Script indicator for automated BUY and SELL signal generation using EMA trend alignment, RSI momentum filtering, and breakout confirmation.',
    longDescription:
      'Designed a live dashboard displaying real-time signal confirmation and strength scoring. Created customisable parameters for indicators, thresholds, and visual controls. Integrates multiple technical analysis methods into a unified decision framework.',
    tags: ['Pine Script', 'TradingView', 'Algo Trading', 'Technical Analysis'],
    tech: ['TradingView Pine Script', 'EMA', 'RSI', 'Technical Indicators'],
    color: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.3)',
    status: 'Completed',
    featured: false,
    github: 'https://github.com/Nadarisgetae',
    category: 'Finance / AI',
  },
  {
    id: 'taskmaster',
    title: 'TaskMaster',
    subtitle: 'Collaborative Task Management',
    description:
      'Backend logic and database workflows for a collaborative task management system with modular task lifecycle tracking and optimised data handling.',
    longDescription:
      'Designed scalable software architecture focused on maintainable code structure. Collaborated using Git-based version control and structured development practices. Implemented efficient database schemas for task lifecycle management.',
    tags: ['Python', 'SQL', 'Backend', 'OOP'],
    tech: ['Python', 'MySQL', 'Git', 'OOP', 'DSA'],
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    status: 'Completed',
    featured: false,
    github: 'https://github.com/Nadarisgetae',
    category: 'Software Engineering',
  },
]

// ─────────────────────────────────────────────
//  Research
// ─────────────────────────────────────────────

export const research = [
  {
    id: 'quantum-crypto',
    title: 'Quantum Circuit-Based Financial Analysis for Cryptocurrency Markets',
    conference: 'STELMAR 2026',
    status: 'Under Review',
    year: '2026',
    description:
      'Proposed quantum circuit frameworks for modelling stochastic cryptocurrency price movements. Explored quantum-inspired optimisation techniques for predictive financial systems. Combined concepts from computational finance, AI-driven analytics, and advanced algorithmic modelling.',
    tags: ['Quantum Computing', 'Cryptocurrency', 'Computational Finance', 'AI'],
    color: '#8B5CF6',
  },
]

// ─────────────────────────────────────────────
//  Experience
// ─────────────────────────────────────────────

export const experience = [
  {
    id: 'pitchx-cmo',
    role: 'Chief Marketing Officer',
    organisation: 'PitchX',
    type: 'Leadership',
    period: '2024',
    endPeriod: 'Present',
    description:
      'Leading strategic growth, digital outreach, and brand positioning initiatives for PitchX. Managing cross-functional teams and coordinating marketing execution workflows.',
    achievements: [
      'Led strategic growth and digital outreach initiatives',
      'Structured sponsorship and partnership pipelines for institutional collaborations',
      'Applied data-driven decision making for campaign optimisation',
      'Managed cross-functional teams across design, content, and strategy',
    ],
    skills: ['Strategic Marketing', 'Brand Positioning', 'Team Leadership', 'Data Analytics'],
    color: '#3B82F6',
    icon: '🚀',
  },
  {
    id: 'aryavart-founder',
    role: 'Founder & Builder',
    organisation: 'Aryavart',
    type: 'Entrepreneurship',
    period: '2024',
    endPeriod: 'Present',
    description:
      'Building a Web3 project from the ground up — from concept to architecture. Exploring decentralised infrastructure that bridges traditional finance with blockchain.',
    achievements: [
      'Conceptualised and architected a Web3 platform from scratch',
      'Researching DeFi mechanisms and blockchain infrastructure',
      'Building community and ecosystem around the project',
    ],
    skills: ['Web3', 'Blockchain', 'Product Development', 'Entrepreneurship'],
    color: '#F59E0B',
    icon: '⚡',
  },
  {
    id: 'acic-intern',
    role: 'Intern',
    organisation: 'ACIC — Atal Community Innovation Center',
    type: 'Internship',
    period: '2024',
    endPeriod: '2024',
    description:
      'Assisted in startup ecosystem analysis and innovation program coordination. Conducted research on early-stage venture models and incubation strategies.',
    achievements: [
      'Analysed early-stage startup ecosystems and incubation models',
      'Supported operational management and stakeholder engagement',
      'Coordinated innovation programs and community events',
    ],
    skills: ['Startup Ecosystem', 'Research', 'Stakeholder Management', 'Innovation'],
    color: '#06B6D4',
    icon: '💡',
  },
  {
    id: 'sponsorship-lead',
    role: 'Sponsorship Lead',
    organisation: 'BML Munjal University Events',
    type: 'Leadership',
    period: '2024',
    endPeriod: 'Present',
    description:
      'Structured sponsorship acquisition and outreach strategies for university events. Negotiated partnership agreements and managed corporate engagement.',
    achievements: [
      'Structured end-to-end sponsorship acquisition pipelines',
      'Negotiated partnership agreements with corporate sponsors',
      'Managed financial allocation and sponsor communications',
    ],
    skills: ['Sponsorship Acquisition', 'Negotiation', 'Corporate Relations', 'Event Management'],
    color: '#8B5CF6',
    icon: '🤝',
  },
]

// ─────────────────────────────────────────────
//  Certifications
// ─────────────────────────────────────────────

export const certifications = [
  {
    id: 'quant-finance',
    title: 'Quantitative Finance Fundamentals',
    issuer: 'Learnex',
    category: 'Finance',
    color: '#3B82F6',
    icon: '📈',
  },
  {
    id: 'crypto-analytics',
    title: 'Financial Market Analysis & Cryptocurrency Analytics',
    issuer: 'Learnex',
    category: 'Finance',
    color: '#06B6D4',
    icon: '₿',
  },
  {
    id: 'dsa',
    title: 'Data Structures and Algorithms',
    issuer: 'Academic',
    category: 'Computer Science',
    color: '#8B5CF6',
    icon: '🧠',
  },
  {
    id: 'prob-stats',
    title: 'Probability and Statistics for Engineers',
    issuer: 'Academic',
    category: 'Mathematics',
    color: '#10B981',
    icon: '📊',
  },
  {
    id: 'blockchain',
    title: 'Introduction to Blockchain Technology',
    issuer: 'Academic',
    category: 'Web3',
    color: '#F59E0B',
    icon: '⛓️',
  },
  {
    id: 'nsw-forage',
    title: 'Economic Analysis Job Simulation',
    issuer: 'NSW Government × Forage',
    category: 'Finance',
    color: '#EC4899',
    icon: '🏛️',
  },
  {
    id: 'jpmorgan-forage',
    title: 'Investment Banking Job Simulation',
    issuer: 'JPMorgan Chase × Forage',
    category: 'Finance',
    color: '#EF4444',
    icon: '🏦',
  },
]

// ─────────────────────────────────────────────
//  Navigation
// ─────────────────────────────────────────────

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
]

// ─────────────────────────────────────────────
//  Social Links
// ─────────────────────────────────────────────

export const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Nadarisgetae',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aditya-nadar',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:nadarisgetae@gmail.com',
    icon: 'mail',
  },
]

// ─────────────────────────────────────────────
//  About / Journey Sections
// ─────────────────────────────────────────────

export const journey = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Started exploring programming and financial markets simultaneously — discovering the intersection where technology meets finance.',
    color: '#3B82F6',
  },
  {
    year: '2024',
    title: 'University & Beyond',
    description: 'Joined BML Munjal University for B.Tech CSE. Simultaneously became CMO at PitchX and started building quantitative finance projects.',
    color: '#8B5CF6',
  },
  {
    year: '2025',
    title: 'Research & Web3',
    description: 'Submitted a research paper on Quantum Circuit-Based Financial Analysis to STELMAR 2026. Started building Aryavart — a Web3 project.',
    color: '#06B6D4',
  },
  {
    year: '2026',
    title: 'Now',
    description: 'In 3rd year, deep in AI, blockchain, and quantitative systems. Building Aryavart, exploring LLMs, and pushing the frontier of finance-tech.',
    color: '#F59E0B',
  },
]

export const currentFocus = [
  { label: 'Currently Building', value: 'Aryavart (Web3)', color: '#F59E0B' },
  { label: 'Currently Learning', value: 'LLMs + LangChain', color: '#8B5CF6' },
  { label: 'Open To', value: 'Collaborate & Internships', color: '#06B6D4' },
  { label: 'Latest Research', value: 'Quantum Finance (STELMAR 2026)', color: '#3B82F6' },
]