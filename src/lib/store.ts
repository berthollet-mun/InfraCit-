import { useState, useEffect } from 'react';
import {
  CarouselSlide,
  Domain,
  Service,
  Application,
  Step,
  ApproachCard,
  Principle,
  HeroContent,
  ContactInfo,
  LegalInfo,
  Message,
  User,
  SiteSettings,
  AuditLog
} from '../types';
import {
  initialCarouselSlides,
  initialDomains,
  initialServices,
  initialApplications,
  initialSteps,
  initialApproachCards,
  initialPrinciples,
  initialHeroContent,
  initialContactInfo,
  initialLegalInfo,
  initialMessages,
  initialUsers,
  initialAuditLogs,
  initialSiteSettings
} from './initialData';

export interface AppState {
  carouselSlides: CarouselSlide[];
  domains: Domain[];
  services: Service[];
  applications: Application[];
  steps: Step[];
  approachCards: ApproachCard[];
  principles: Principle[];
  heroContent: HeroContent;
  contactInfo: ContactInfo;
  legalInfo: LegalInfo;
  messages: Message[];
  users: User[];
  auditLogs: AuditLog[];
  settings: SiteSettings;
  currentUser: User | null;
}

const STORAGE_KEY = 'infracite_store_v2.5';

function loadInitialState(): AppState {
  if (typeof window === 'undefined') {
    return {
      carouselSlides: initialCarouselSlides,
      domains: initialDomains,
      services: initialServices,
      applications: initialApplications,
      steps: initialSteps,
      approachCards: initialApproachCards,
      principles: initialPrinciples,
      heroContent: initialHeroContent,
      contactInfo: initialContactInfo,
      legalInfo: initialLegalInfo,
      messages: initialMessages,
      users: initialUsers,
      auditLogs: initialAuditLogs,
      settings: initialSiteSettings,
      currentUser: initialUsers[0]
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        currentUser: parsed.currentUser || initialUsers[0]
      };
    }
  } catch (err) {
    console.warn('Failed to parse localStorage store:', err);
  }

  return {
    carouselSlides: initialCarouselSlides,
    domains: initialDomains,
    services: initialServices,
    applications: initialApplications,
    steps: initialSteps,
    approachCards: initialApproachCards,
    principles: initialPrinciples,
    heroContent: initialHeroContent,
    contactInfo: initialContactInfo,
    legalInfo: initialLegalInfo,
    messages: initialMessages,
    users: initialUsers,
    auditLogs: initialAuditLogs,
    settings: initialSiteSettings,
    currentUser: initialUsers[0]
  };
}

let globalState: AppState = loadInitialState();
const listeners = new Set<(state: AppState) => void>();

function notify() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    } catch (err) {
      console.warn('LocalStorage save failed (possibly quota exceeded):', err);
    }
  }
  listeners.forEach((fn) => fn(globalState));
}

function recordAudit(action: string, details: string, category: string) {
  const author = globalState.currentUser ? `${globalState.currentUser.name} (${globalState.currentUser.role})` : 'Wilfried N. (Super Admin)';
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    action,
    details,
    author,
    category,
    timestamp: 'À l’instant'
  };
  globalState = {
    ...globalState,
    auditLogs: [newLog, ...globalState.auditLogs.slice(0, 49)]
  };
}

export const appStore = {
  getState(): AppState {
    return globalState;
  },

  subscribe(listener: (state: AppState) => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Auth
  setCurrentUser(user: User | null) {
    globalState = { ...globalState, currentUser: user };
    notify();
  },

  login(email: string): boolean {
    const found = globalState.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      globalState = { ...globalState, currentUser: found };
      recordAudit('Connexion au back-office', `Accréditation validée pour ${found.name}`, 'Sécurité');
      notify();
      return true;
    }
    // Fallback: grant Super Admin
    const fallbackUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      lastLogin: 'À l’instant'
    };
    globalState = {
      ...globalState,
      users: [fallbackUser, ...globalState.users],
      currentUser: fallbackUser
    };
    recordAudit('Connexion session nouvel utilisateur', `Accès octroyé pour ${email}`, 'Sécurité');
    notify();
    return true;
  },

  logout() {
    if (globalState.currentUser) {
      recordAudit('Déconnexion du back-office', `Session clôturée pour ${globalState.currentUser.name}`, 'Sécurité');
    }
    globalState = { ...globalState, currentUser: null };
    notify();
  },

  // Carousel Slides
  saveCarouselSlide(slide: CarouselSlide) {
    const exists = globalState.carouselSlides.some((s) => s.id === slide.id);
    let newSlides: CarouselSlide[];
    if (exists) {
      newSlides = globalState.carouselSlides.map((s) => (s.id === slide.id ? slide : s));
      recordAudit(`Mise à jour bannière : ${slide.title}`, `Slide ID ${slide.id}`, 'Bannières');
    } else {
      newSlides = [...globalState.carouselSlides, slide];
      recordAudit(`Création bannière carrousel : ${slide.title}`, `Ordre ${slide.order}`, 'Bannières');
    }
    globalState = { ...globalState, carouselSlides: newSlides };
    notify();
  },

  deleteCarouselSlide(id: string) {
    const target = globalState.carouselSlides.find((s) => s.id === id);
    globalState = {
      ...globalState,
      carouselSlides: globalState.carouselSlides.filter((s) => s.id !== id)
    };
    recordAudit(`Suppression de bannière obsolète`, target ? target.title : id, 'Bannières');
    notify();
  },

  toggleCarouselSlide(id: string) {
    globalState = {
      ...globalState,
      carouselSlides: globalState.carouselSlides.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      )
    };
    recordAudit(`Bascule visibilité bannière`, `ID: ${id}`, 'Bannières');
    notify();
  },

  // Domains
  saveDomain(domain: Domain) {
    const exists = globalState.domains.some((d) => d.id === domain.id);
    let newDomains: Domain[];
    if (exists) {
      newDomains = globalState.domains.map((d) => (d.id === domain.id ? domain : d));
      recordAudit(`Mise à jour du domaine : ${domain.tag}`, domain.title, 'Domaines');
    } else {
      newDomains = [...globalState.domains, domain];
      recordAudit(`Création nouveau domaine : ${domain.tag}`, domain.title, 'Domaines');
    }
    globalState = { ...globalState, domains: newDomains };
    notify();
  },

  deleteDomain(id: string) {
    const target = globalState.domains.find((d) => d.id === id);
    globalState = {
      ...globalState,
      domains: globalState.domains.filter((d) => d.id !== id)
    };
    recordAudit(`Suppression domaine`, target ? target.tag : id, 'Domaines');
    notify();
  },

  toggleDomainVisibility(id: string) {
    globalState = {
      ...globalState,
      domains: globalState.domains.map((d) =>
        d.id === id ? { ...d, visible: !d.visible } : d
      )
    };
    notify();
  },

  // Services
  saveService(service: Service) {
    globalState = {
      ...globalState,
      services: globalState.services.map((s) => (s.id === service.id ? service : s))
    };
    recordAudit(`Mise à jour prestation : ${service.code}`, service.title, 'Prestations');
    notify();
  },

  // Applications
  saveApplication(app: Application) {
    const exists = globalState.applications.some((a) => a.id === app.id);
    let newApps: Application[];
    const updatedApp = {
      ...app,
      lastModifiedBy: globalState.currentUser?.name || 'Wilfried N.',
      lastModifiedAt: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    if (exists) {
      newApps = globalState.applications.map((a) => (a.id === app.id ? updatedApp : a));
      recordAudit(`Mise à jour champ d'application : ${app.tag}`, app.title, 'Applications');
    } else {
      newApps = [...globalState.applications, updatedApp];
      recordAudit(`Création champ d'application : ${app.tag}`, app.title, 'Applications');
    }
    globalState = { ...globalState, applications: newApps };
    notify();
  },

  deleteApplication(id: string) {
    const target = globalState.applications.find((a) => a.id === id);
    globalState = {
      ...globalState,
      applications: globalState.applications.filter((a) => a.id !== id)
    };
    recordAudit(`Suppression champ d'application`, target ? target.title : id, 'Applications');
    notify();
  },

  toggleApplicationVisibility(id: string) {
    globalState = {
      ...globalState,
      applications: globalState.applications.map((a) =>
        a.id === id ? { ...a, visible: !a.visible } : a
      )
    };
    notify();
  },

  // Steps
  saveStep(step: Step) {
    globalState = {
      ...globalState,
      steps: globalState.steps.map((st) => (st.id === step.id ? step : st))
    };
    recordAudit(`Mise à jour étape processus : ${step.stepNumber}`, step.title, 'Méthode');
    notify();
  },

  // Approach & Principles
  saveApproachCard(card: ApproachCard) {
    globalState = {
      ...globalState,
      approachCards: globalState.approachCards.map((c) => (c.id === card.id ? card : c))
    };
    recordAudit(`Mise à jour carte approche : ${card.title}`, card.type, 'Approche');
    notify();
  },

  savePrinciple(principle: Principle) {
    globalState = {
      ...globalState,
      principles: globalState.principles.map((p) => (p.id === principle.id ? principle : p))
    };
    recordAudit(`Mise à jour principe directeur : ${principle.number}`, principle.title, 'Approche');
    notify();
  },

  // Hero Content
  saveHeroContent(hero: HeroContent) {
    globalState = { ...globalState, heroContent: hero };
    recordAudit('Refonte des textes d’en-tête Hero & En Bref', 'Page d’accueil', 'Accueil');
    notify();
  },

  // Contact Info
  saveContactInfo(info: ContactInfo) {
    globalState = { ...globalState, contactInfo: info };
    recordAudit('Mise à jour coordonnées & standard téléphonique', info.displayPhone, 'Contact');
    notify();
  },

  // Legal Info
  saveLegalInfo(info: LegalInfo) {
    globalState = { ...globalState, legalInfo: info };
    recordAudit('Mise à jour mentions légales & SIREN', `SIREN: ${info.siren}`, 'Mentions');
    notify();
  },

  // Messages (Contact Form + Admin Response)
  addMessage(msg: Omit<Message, 'id' | 'ref' | 'createdAt' | 'status' | 'replies'>) {
    const count = globalState.messages.length + 1;
    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newMessage: Message = {
      ...msg,
      id: `msg-${Date.now()}`,
      ref: `MSG-2026-${String(count).padStart(4, '0')}`,
      createdAt: dateStr,
      status: 'new',
      priority: msg.priority || 'normal',
      replies: []
    };
    globalState = {
      ...globalState,
      messages: [newMessage, ...globalState.messages]
    };
    recordAudit(`Nouvelle demande de contact reçue`, `${msg.name} (${msg.company}) : ${msg.subject}`, 'Messages');
    notify();
    return newMessage;
  },

  markMessageAsRead(id: string) {
    globalState = {
      ...globalState,
      messages: globalState.messages.map((m) =>
        m.id === id && m.status === 'new' ? { ...m, status: 'read' } : m
      )
    };
    notify();
  },

  markAllMessagesAsRead() {
    globalState = {
      ...globalState,
      messages: globalState.messages.map((m) => ({
        ...m,
        status: m.status === 'new' ? 'read' : m.status
      }))
    };
    recordAudit('Tous les messages marqués comme lus', `${globalState.messages.length} messages`, 'Messages');
    notify();
  },

  replyToMessage(id: string, replyText: string) {
    const authorName = globalState.currentUser?.name || 'Wilfried N.';
    const dateStr = new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    globalState = {
      ...globalState,
      messages: globalState.messages.map((m) => {
        if (m.id !== id) return m;
        const replies = m.replies || [];
        return {
          ...m,
          status: 'replied',
          replies: [
            ...replies,
            {
              id: `rep-${Date.now()}`,
              author: authorName,
              content: replyText,
              sentAt: dateStr
            }
          ]
        };
      })
    };
    recordAudit(`Réponse officielle transmise`, `Pour message ID ${id}`, 'Messages');
    notify();
  },

  archiveMessage(id: string) {
    globalState = {
      ...globalState,
      messages: globalState.messages.map((m) =>
        m.id === id ? { ...m, status: 'archived' } : m
      )
    };
    recordAudit(`Archivage dossier message`, `ID: ${id}`, 'Messages');
    notify();
  },

  deleteMessage(id: string) {
    globalState = {
      ...globalState,
      messages: globalState.messages.filter((m) => m.id !== id)
    };
    recordAudit(`Suppression définitive message`, `ID: ${id}`, 'Messages');
    notify();
  },

  // Settings
  setMaintenanceMode(active: boolean) {
    globalState = {
      ...globalState,
      settings: {
        ...globalState.settings,
        maintenanceMode: active
      }
    };
    recordAudit(
      active ? 'Activation du mode maintenance' : 'Désactivation du mode maintenance',
      active ? 'Le site public affiche désormais l’écran de maintenance' : 'Le site public est pleinement accessible',
      'Système'
    );
    notify();
  },

  saveSettings(settings: SiteSettings) {
    globalState = {
      ...globalState,
      settings: {
        ...settings,
        lastDeployedAt: 'À l’instant'
      }
    };
    recordAudit('Mise à jour des paramètres système et SEO', settings.siteName, 'Système');
    notify();
  },

  deployChanges(): string {
    const now = new Date().toLocaleDateString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const deployText = `Aujourd'hui à ${now}`;
    globalState = {
      ...globalState,
      settings: {
        ...globalState.settings,
        lastDeployedAt: deployText
      }
    };
    recordAudit('Publication globale & Purge CDN Edge', 'Mise en ligne immédiate de toutes les révisions', 'Système');
    notify();
    return deployText;
  },

  // Reset to initial seed
  resetFactoryData() {
    globalState = {
      carouselSlides: initialCarouselSlides,
      domains: initialDomains,
      services: initialServices,
      applications: initialApplications,
      steps: initialSteps,
      approachCards: initialApproachCards,
      principles: initialPrinciples,
      heroContent: initialHeroContent,
      contactInfo: initialContactInfo,
      legalInfo: initialLegalInfo,
      messages: initialMessages,
      users: initialUsers,
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          action: 'Réinitialisation usine de la base de données',
          details: 'Restauration complète des fiches et maquettes initiales',
          author: 'Wilfried N. (Super Admin)',
          category: 'Système',
          timestamp: 'À l’instant'
        },
        ...initialAuditLogs
      ],
      settings: initialSiteSettings,
      currentUser: initialUsers[0]
    };
    notify();
  }
};

export function useAppStore(): AppState {
  const [state, setState] = useState<AppState>(appStore.getState());

  useEffect(() => {
    return appStore.subscribe(setState);
  }, []);

  return state;
}
