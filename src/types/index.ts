export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
  order: number;
  createdAt: string;
}

export interface Domain {
  id: string;
  code: string;
  tag: string;
  title: string;
  description: string;
  skills: string[];
  regulatoryNote: string | null;
  showRegulatoryNote: boolean;
  visible: boolean;
  highlightHero: boolean;
  order: number;
}

export interface Service {
  id: string;
  code: string;
  title: string;
  description: string;
  deliverablesTitle: string;
  deliverables: string;
  order: number;
  visible: boolean;
}

export interface Application {
  id: string;
  orderCode: string;
  tag: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  overlayType: 'dark' | 'natural';
  overlayIntensity: number;
  showLegalReserve: boolean;
  highlightCarousel: boolean;
  position: number;
  visible: boolean;
  lastModifiedBy: string;
  lastModifiedAt: string;
}

export interface Step {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  order: number;
}

export interface ApproachCard {
  id: string;
  type: 'public' | 'private';
  title: string;
  description: string;
  points: string[];
  icon: string;
}

export interface Principle {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  italicWord: string;
  leadParagraph: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  briefTitle: string;
  briefTag: string;
  briefPillars: Array<{
    id: string;
    title: string;
    subtitle: string;
  }>;
  briefFooterNote: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  displayPhone: string;
  hours: string;
}

export interface LegalInfo {
  companyName: string;
  legalForm: string;
  capital: string;
  siren: string;
  rcs: string;
  headquarters: string;
  publicationDirector: string;
  technicalContact: string;
  standardPhone: string;
  rgpdNotice: string;
  professionalDisclaimer: string;
}

export interface MessageReply {
  id: string;
  author: string;
  content: string;
  sentAt: string;
}

export interface Message {
  id: string;
  ref: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'high' | 'normal' | 'low';
  clientType: 'public' | 'private' | 'sem' | 'other';
  createdAt: string;
  domains: string[];
  attachmentName?: string;
  attachmentSize?: string;
  attachmentDate?: string;
  deadline?: string;
  budgetEstimate?: string;
  replies?: MessageReply[];
  internalNotes?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  avatar: string;
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  action: string;
  details: string;
  author: string;
  category: string;
  timestamp: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowContactSubmission: boolean;
  enablePromoCarousel: boolean;
  lastDeployedAt: string;
  systemVersion: string;
}
