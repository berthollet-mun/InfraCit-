import {
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
  CarouselSlide,
  SiteSettings,
  AuditLog
} from '../types';

export const initialCarouselSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'Diagnostics territoriaux & Projets d’aménagement 2026',
    subtitle: 'Campagne de programmation estivale',
    description: 'Bénéficiez d’un cadrage méthodologique accéléré pour sécuriser vos arbitrages fonciers et vos études de faisabilité avant les arbitrages budgétaires de rentrée.',
    badge: 'OFFRE MAÎTRISE D’OUVRAGE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALvRl-r5OmzoMzr95hKkYijoCLzWDF7wKz-6AGL_MkgIcoewWdq1Nh9CRdKKWBMfr5xbdQGqCj_-pkvlDl5LpP3f94uP1GNATkydUOvrrbnXoLjMKhxX6FUUgm88MTbd-eR61i1K4xtQfTGBAeaGTndzl6d6OtQdSxsXVCE78s6_JbeeJWyJbnV9BGPZO6AAjfBvYG1DnVb-qwU7ibAKYKI6bZkcN-cGOsgjeNJQE',
    ctaText: 'Solliciter une étude prioritaire',
    ctaLink: '#contact',
    active: true,
    order: 1,
    createdAt: '2026-05-01'
  },
  {
    id: 'slide-2',
    title: 'Topographie technique & Systèmes d’Information Géographique',
    subtitle: 'Acquisition haute fidélité & SIG multi-échelles',
    description: 'Structuration et apurement de vos bases de données spatiales pour plans locaux d’urbanisme, réseaux et trames écologiques.',
    badge: 'EXPERTISE GÉOMATIQUE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLhIDzARLytIlGHPf2oFp1LV5xwmSVE8D-aKrI6VOWIICahipm84j6eKCkAfALsq9aUcAmKRgus2m21CRbhccjfwh8ocVudcK5xf4JVchTebblBl2uqVbn3kpWhryi-RwiS4NX-i9aBySoSLLoPGHg1uCuNiaxoU61a6cQ-yGLgJWhUAHdtw9fw7Shq3uEFjAKxSwY4YMH8foGog6OLANsJZDNUNzc713VeW1nOo',
    ctaText: 'Découvrir nos solutions SIG',
    ctaLink: '#missions',
    active: true,
    order: 2,
    createdAt: '2026-05-05'
  },
  {
    id: 'slide-3',
    title: 'Sensibilités environnementales & Diagnostic ZAN',
    subtitle: 'Transition écologique et conformité réglementaire',
    description: 'Évaluation des continuités écologiques, zones humides et compatibilité des projets avec les impératifs de sobriété foncière.',
    badge: 'INGÉNIERIE ÉCOLOGIQUE',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdzW2S50Ws1-REZVS0sfI47Tbc7EztKcRzSs-hw187fJt8HeHftstqwKTyUdWoW_lSTXBfwYNl-SZATYNmEKNn_7oikHa9_KLpwKOKdUjp2NBqaQmFuvQd9xDBHz4aLQKB59rsM8OL6jqbH5rk2aBkQ3g1BRgDvEov4sijvV_GAtUltZd26B5baI4UAqzqgq5xjczc3aPP6elUG-L7oQWTsZjMUFGiiSyvu-kmCKA',
    ctaText: 'Échanger avec un expert',
    ctaLink: '#contact',
    active: true,
    order: 3,
    createdAt: '2026-05-10'
  }
];

export const initialHeroContent: HeroContent = {
  eyebrow: "BUREAU D'ÉTUDES · INGÉNIERIE ET SCIENCES APPLIQUÉES",
  title: 'Des études et des idées au service',
  italicWord: 'des territoires.',
  leadParagraph: "InfraCité Ingénierie accompagne les acteurs publics et privés dans leurs réflexions et leurs projets grâce à une offre pluridisciplinaire d'études et de conseil : ingénierie, topographie, cartographie, géomatique, environnement, aménagement du territoire et urbanisme opérationnel. Nous transformons les données et les enjeux d'un site en analyses lisibles et en outils d'aide à la décision.",
  primaryCtaText: 'Parler de votre projet',
  primaryCtaLink: '#contact',
  secondaryCtaText: 'Découvrir nos domaines',
  secondaryCtaLink: '#domaines',
  briefTitle: 'InfraCité en bref',
  briefTag: 'Présentation',
  briefPillars: [
    {
      id: 'p-1',
      title: 'Ingénierie',
      subtitle: 'Études techniques, conseil et expertise'
    },
    {
      id: 'p-2',
      title: 'Géomatique',
      subtitle: 'Topographie, cartographie et systèmes d’information géographique'
    },
    {
      id: 'p-3',
      title: 'Territoires',
      subtitle: 'Aménagement du territoire et urbanisme opérationnel'
    },
    {
      id: 'p-4',
      title: 'Environnement',
      subtitle: 'Études environnementales et valorisation des données'
    }
  ],
  briefFooterNote: "Pour les maîtres d'ouvrage publics et privés"
};

export const initialDomains: Domain[] = [
  {
    id: 'domain-1',
    code: '01',
    tag: '01 — INGÉNIERIE',
    title: 'Études techniques, conseil et expertise',
    description: "Nous conduisons des études et apportons un conseil technique pour éclairer les choix des porteurs de projets. Notre intervention peut porter sur l'analyse d'une situation existante, l'identification des contraintes, la comparaison d'hypothèses et la formalisation de recommandations argumentées.",
    skills: ['Études techniques', 'Diagnostic préalable', 'Faisabilité', 'Conseil indépendant', 'Assistance technique', 'Expertise'],
    regulatoryNote: null,
    showRegulatoryNote: false,
    visible: true,
    highlightHero: true,
    order: 1
  },
  {
    id: 'domain-2',
    code: '02',
    tag: '02 — GÉOMATIQUE',
    title: 'Topographie, cartographie et SIG',
    description: "Acquisition, traitement, analyse spatiale et valorisation cartographique des données de terrain. Structuration de bases de données géoréférencées fiables au service des projets d’infrastructure et d’aménagement.",
    skills: ['Topographie technique', 'Cartographie thématique', 'SIG & Données spatiales', 'Modèles numériques de terrain', 'Géotraitement', 'Sémiologie graphique'],
    regulatoryNote: "* Les activités réglementées réservées aux professionnels habilités (ex. géomètres-experts pour la délimitation foncière) ne font pas partie de ces prestations.",
    showRegulatoryNote: true,
    visible: true,
    highlightHero: true,
    order: 2
  },
  {
    id: 'domain-3',
    code: '03',
    tag: '03 — ENVIRONNEMENT',
    title: 'Études environnementales et valorisation des données',
    description: "Évaluation des sensibilités écologiques, intégration paysagère, analyse multicritère des vulnérabilités environnementales et qualification rigoureuse des données d'impact territorial.",
    skills: ['Études d’impact', 'Sensibilités environnementales', 'Transition écologique', 'Corridors biologiques', 'Vulnérabilité climatique'],
    regulatoryNote: null,
    showRegulatoryNote: false,
    visible: true,
    highlightHero: true,
    order: 3
  },
  {
    id: 'domain-4',
    code: '04',
    tag: '04 — TERRITOIRES',
    title: 'Aménagement du territoire et urbanisme opérationnel',
    description: "Accompagnement stratégique dans la requalification des espaces, prospective territoriale, programmation urbaine et analyse des trames foncières pour façonner des lieux de vie équilibrés.",
    skills: ['Urbanisme opérationnel', 'Projets de territoire', 'Programmation', 'Requalification de friches', 'Trames foncières'],
    regulatoryNote: null,
    showRegulatoryNote: false,
    visible: true,
    highlightHero: true,
    order: 4
  }
];

export const initialServices: Service[] = [
  {
    id: 'service-1',
    code: '01 / OBSERVER',
    title: 'Diagnostics et analyses préalables',
    description: 'Recueil exhaustif des données existantes, observations de terrain, identification des contraintes physiques, réglementaires et environnementales propres au site.',
    deliverablesTitle: 'Restitutions possibles :',
    deliverables: "Synthèse documentaire, diagnostic, cartographie et note d'analyse.",
    order: 1,
    visible: true
  },
  {
    id: 'service-2',
    code: '02 / ÉVALUER',
    title: "Études d'opportunité et de faisabilité",
    description: 'Comparaison de scénarios d’aménagement, appréciation technique des contraintes de faisabilité, études de cohérence spatiale et évaluation des risques projet.',
    deliverablesTitle: 'Restitutions possibles :',
    deliverables: 'Étude de faisabilité, analyse multicritère et recommandations.',
    order: 2,
    visible: true
  },
  {
    id: 'service-3',
    code: '03 / REPRÉSENTER',
    title: 'Production cartographique et géomatique',
    description: 'Modélisation cartographique de précision, intégration des couches SIG complexes, sémiologie graphique haut de gamme pour rendre les données techniques compréhensibles par tous.',
    deliverablesTitle: 'Restitutions possibles :',
    deliverables: 'Plans, cartes, bases de données géographiques et supports SIG.',
    order: 3,
    visible: true
  },
  {
    id: 'service-4',
    code: '04 / CONSEILLER',
    title: 'Conseil et assistance technique',
    description: 'Éclairage indépendant pour orienter les arbitrages des maîtres d’ouvrage, préparation des dossiers techniques d’aménagement et formulation d’avis argumentés.',
    deliverablesTitle: 'Restitutions possibles :',
    deliverables: "Avis techniques, notes de synthèse et dossiers d'aide à la décision.",
    order: 4,
    visible: true
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app-1',
    orderCode: '01',
    tag: '01 / TERRITOIRES',
    title: 'Dynamiques territoriales',
    description: "Analyse de morphologie urbaine, mobilités, désenclavement et mutations d'échelles intercommunales.",
    tags: ['Mutations urbaines', 'Mobilités durables', 'Foncier & ZAN', 'Diagnostic spatial'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEbTqggP68f_BiRbu5QP9nLi3Ox7sFTOkWspXrq5pOSNiDCP1ri9uAiK718i4Opo2onZ6bLul1XsLLjYWXMOH4nfcRrEoRV496qho9ymnWxIX22D4KfNclrRJuXcpnOEf1_nvF4fpajdk4Ct3Ph-4jfDnoNqLtvRUddzA58EwUFvznSQk6tE4H2Kjpp6rGqo0nOIAQ3kY5ym6Zhdlne58rgPnM2-C5bggPwPrsm2I',
    imageAlt: 'Vue aérienne topographique haute résolution d’une zone d’aménagement',
    overlayType: 'dark',
    overlayIntensity: 75,
    showLegalReserve: true,
    highlightCarousel: true,
    position: 1,
    visible: true,
    lastModifiedBy: 'Wilfried N.',
    lastModifiedAt: '2026-05-11 14:38'
  },
  {
    id: 'app-2',
    orderCode: '02',
    tag: '02 / URBANISME',
    title: 'Urbanisme opérationnel',
    description: 'Reconversion de friches, intégration paysagère, programmation de ZAC et optimisation du parcellaire.',
    tags: ['Reconversion friches', 'Trame paysagère', 'ZAC d’activités', 'Insertion urbaine'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGiJ0pl33eSOx7cR0NSgSe_mw8dk8zT2bhWPJASRU2rHSmy5WM9Azr6dn4JOO_ePgwQdefN3SoZWtQ8LPuK9fwJ0qryCC6P_ggQp7j1wHPqDoldYSS_QNaPTkK0SSNoyOCMFRs1-zkI8Y7Xtn9AY2W0SzzrK_sMEoHn7mph5_WcPUuxgYi1a4hQP-95qW4r-4blF0KkFsuFaSlmTnCbrDv23MzG8P1HG-VYgA9hgY',
    imageAlt: 'Masterplan et schéma de programmation urbaine sur ancienne friche',
    overlayType: 'dark',
    overlayIntensity: 75,
    showLegalReserve: true,
    highlightCarousel: true,
    position: 2,
    visible: true,
    lastModifiedBy: 'Wilfried N.',
    lastModifiedAt: '2026-05-10 11:20'
  },
  {
    id: 'app-3',
    orderCode: '03',
    tag: '03 / ESPACE',
    title: 'Connaissance et représentation des sites',
    description: "Modèles d'élévation, atlas thématiques précis et inventaires géolocalisés des réseaux et des sols.",
    tags: ['MNT / MNS', 'Atlas cartographique', 'Réseaux VRD', 'Sémiologie vectorielle'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLhIDzARLytIlGHPf2oFp1LV5xwmSVE8D-aKrI6VOWIICahipm84j6eKCkAfALsq9aUcAmKRgus2m21CRbhccjfwh8ocVudcK5xf4JVchTebblBl2uqVbn3kpWhryi-RwiS4NX-i9aBySoSLLoPGHg1uCuNiaxoU61a6cQ-yGLgJWhUAHdtw9fw7Shq3uEFjAKxSwY4YMH8foGog6OLANsJZDNUNzc713VeW1nOo',
    imageAlt: 'Maillage altimétrique et courbes de niveau géomatiques',
    overlayType: 'dark',
    overlayIntensity: 75,
    showLegalReserve: true,
    highlightCarousel: true,
    position: 3,
    visible: true,
    lastModifiedBy: 'Wilfried N.',
    lastModifiedAt: '2026-05-09 16:45'
  },
  {
    id: 'app-4',
    orderCode: '04',
    tag: '04 / ENVIRONNEMENT',
    title: 'Enjeux environnementaux des territoires',
    description: 'Corridors biologiques, zones humides, vulnérabilité climatique et diagnostics de résilience locale.',
    tags: ['Trames vertes & bleues', 'Zones humides', 'Résilience hydrique', 'Bio-continuités'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdzW2S50Ws1-REZVS0sfI47Tbc7EztKcRzSs-hw187fJt8HeHftstqwKTyUdWoW_lSTXBfwYNl-SZATYNmEKNn_7oikHa9_KLpwKOKdUjp2NBqaQmFuvQd9xDBHz4aLQKB59rsM8OL6jqbH5rk2aBkQ3g1BRgDvEov4sijvV_GAtUltZd26B5baI4UAqzqgq5xjczc3aPP6elUG-L7oQWTsZjMUFGiiSyvu-kmCKA',
    imageAlt: 'Cartographie des continuités écologiques et bassin hydrographique',
    overlayType: 'dark',
    overlayIntensity: 75,
    showLegalReserve: true,
    highlightCarousel: true,
    position: 4,
    visible: true,
    lastModifiedBy: 'Wilfried N.',
    lastModifiedAt: '2026-05-08 09:12'
  }
];

export const initialSteps: Step[] = [
  {
    id: 'step-1',
    stepNumber: 'ÉTAPE 01',
    title: 'Collecter',
    description: 'Acquisition des données sources de terrain, inventaires documentaires et consolidation des référentiels cartographiques initiaux.',
    order: 1
  },
  {
    id: 'step-2',
    stepNumber: 'ÉTAPE 02',
    title: 'Traiter',
    description: 'Contrôle de conformité géométrique, intégration SIG structurée, apurement des données et harmonisation géoréférencée.',
    order: 2
  },
  {
    id: 'step-3',
    stepNumber: 'ÉTAPE 03',
    title: 'Analyser',
    description: "Croisement spatial multicritère, confrontation aux réglementations d'urbanisme et qualification des impacts environnementaux.",
    order: 3
  },
  {
    id: 'step-4',
    stepNumber: 'ÉTAPE 04',
    title: 'Valoriser',
    description: 'Restitution sous forme de rapports limpides, cartographies de haute lisibilité et recommandations stratégiques directes.',
    order: 4
  }
];

export const initialApproachCards: ApproachCard[] = [
  {
    id: 'app-card-1',
    type: 'public',
    title: 'Collectivités et acteurs publics',
    description: "Un appui technique indépendant pour étayer les choix d'aménagement, sécuriser les documents de planification et valoriser le patrimoine foncier et environnemental auprès des citoyens.",
    points: ["Éclairage objectif et d'intérêt général", 'Supports de concertation communicants', 'Sécurisation juridique et technique'],
    icon: 'account_balance'
  },
  {
    id: 'app-card-2',
    type: 'private',
    title: 'Aménageurs et acteurs privés',
    description: "Une réactivité opérationnelle pour sécuriser la faisabilité technique de vos investissements, lever les contraintes de site et optimiser l'insertion spatiale de vos programmes.",
    points: ['Réduction des aléas techniques en amont', "Optimisation des délais d'instruction", 'Rentabilité et durabilité des opérations'],
    icon: 'domain'
  }
];

export const initialPrinciples: Principle[] = [
  {
    id: 'principle-1',
    number: '01 / PRINCIPE',
    title: 'Comprendre',
    description: "Immersion complète dans l'histoire, le contexte physique et la trajectoire du site."
  },
  {
    id: 'principle-2',
    number: '02 / PRINCIPE',
    title: 'Analyser',
    description: 'Croisement méticuleux des données pour révéler potentiels et vulnérabilités.'
  },
  {
    id: 'principle-3',
    number: '03 / PRINCIPE',
    title: 'Restituer',
    description: 'Livrables opérationnels, visuellement intelligibles et directement exploitables.'
  }
];

export const initialContactInfo: ContactInfo = {
  address: '14 rue Camille Saint-Saëns, 92500 Rueil-Malmaison',
  email: 'adfi@infracite-ing.fr',
  phone: '0961273358',
  displayPhone: '09 61 27 33 58',
  hours: 'Du Lundi au Vendredi : 08h30 – 18h30'
};

export const initialLegalInfo: LegalInfo = {
  companyName: 'InfraCité Ingénierie',
  legalForm: 'Société par Actions Simplifiée (SAS)',
  capital: '1 000 €',
  siren: '999 744 915',
  rcs: 'Nanterre',
  headquarters: '14 rue Camille Saint-Saëns, 92500 Rueil-Malmaison',
  publicationDirector: 'Wilfried N.',
  technicalContact: 'adfi@infracite-ing.fr',
  standardPhone: '09 61 27 33 58',
  rgpdNotice: "Plateforme conçue et hébergée dans le respect du RGPD.",
  professionalDisclaimer: "Les missions de délimitation foncière et de topographie réglementée sont exclusivement confiées à des professionnels habilités (Géomètres-experts)."
};

export const initialMessages: Message[] = [
  {
    id: 'msg-1',
    ref: 'MSG-2026-0511-04',
    name: 'Laurent Marchand',
    company: 'CA Val de Seine',
    email: 'laurent.marchand@agglo-valdeseine.fr',
    phone: '01 39 22 45 10',
    subject: "Étude d'opportunité aménagement pôle gare & intermodalité",
    message: "« Bonjour l'équipe InfraCité,\n\nDans le cadre de l'actualisation de notre Schéma Directeur des Mobilités Actives et du projet de réaménagement du secteur de la gare centrale (liaison RER / réseau de bus en site propre), la Direction de l'Aménagement recherche un bureau d'études capable d'assurer une mission conjointe :\n\n- Diagnostic géotechnique et VRD : analyse de charge des dalles existantes, gestion des réseaux enterrés d'assainissement unitaire et contraintes de perméabilisation des sols.\n- Modélisation spatiale et SIG : intégration des flux piétons / cyclistes aux heures de pointe et calage topographique précis des emprises foncières sous statut SNCF Réseau et Domaine Public Communal.\n- Scénarios d'opportunité : élaboration de trois variantes d'aménagement avec estimation financière prévisionnelle pour présentation devant le comité de pilotage des élus en octobre.\n\nNous avons pris connaissance de vos récentes interventions similaires sur le pôle multimodal de Saint-Quentin et souhaiterions convenir d'un rendez-vous technique de cadrage d'ici la semaine prochaine.\n\nBien cordialement,\nLaurent Marchand · Directeur Aménagement & Mobilités »",
    status: 'new',
    priority: 'high',
    clientType: 'public',
    createdAt: 'Aujourd’hui à 09:42',
    domains: ['01 · INFRA', '04 · URBA'],
    attachmentName: 'CCTP_Pre-cadrage_Pole_Gare_V1.pdf',
    attachmentSize: '3.4 Mo',
    attachmentDate: '10/05/2026',
    deadline: 'Avant fin Q3 2026 (Phase 1)',
    budgetEstimate: 'Consultation restreinte < 90k€',
    replies: []
  },
  {
    id: 'msg-2',
    ref: 'MSG-2026-0510-02',
    name: 'Sophie Vanderberg',
    company: 'Cabinet UrbanConseil',
    email: 'sophie.vanderberg@urbanconseil.fr',
    phone: '06 44 12 90 33',
    subject: 'Production cartographique SIG & cadastre multi-sources',
    message: "Demande de chiffrage pour une mission d'assemblage parcellaire et d'analyse de contraintes PLUi sur une emprise de 14 hectares située en lisière boisée. Besoin d'un MNT géoréférencé et de fiches parcelles individuelles.",
    status: 'new',
    priority: 'high',
    clientType: 'private',
    createdAt: 'Hier à 16:30',
    domains: ['02 · GÉOMATIQUE'],
    deadline: 'Fin Juin 2026',
    budgetEstimate: '18 000 € HT',
    replies: []
  },
  {
    id: 'msg-3',
    ref: 'MSG-2026-0509-01',
    name: 'Marc Delamare',
    company: 'SEM Aménagement IdF',
    email: 'm.delamare@sem-idf-amenagement.com',
    phone: '01 48 30 11 00',
    subject: 'Diagnostic technique et contraintes environnementales friche',
    message: "Confirmation de bonne réception de vos éléments de méthodologie pour l'étude de faisabilité de reconversion de la friche industrielle des Saules. Nous présentons votre offre en commission technique le 22 mai.",
    status: 'read',
    priority: 'normal',
    clientType: 'sem',
    createdAt: 'Il y a 3 jours',
    domains: ['01 · INFRA', '03 · ENV'],
    deadline: 'Septembre 2026',
    budgetEstimate: '35 000 € HT',
    replies: [
      {
        id: 'rep-1',
        author: 'Wilfried N.',
        content: "Merci Marc pour ce retour encourageant. Nos équipes se tiennent à disposition pour toute question complémentaire de la commission.",
        sentAt: '09/05/2026 18:10'
      }
    ]
  },
  {
    id: 'msg-4',
    ref: 'MSG-2026-0508-03',
    name: 'Hélène Rousseau',
    company: 'Ville de Rueil-Malmaison',
    email: 'h.rousseau@mairie-rueil.fr',
    phone: '01 47 32 65 00',
    subject: 'Assistance technique et conseil trame verte et bleue',
    message: "Échange préliminaire sur le dimensionnement des ouvrages d'infiltration des eaux pluviales et la perméabilité des sols sur le futur éco-quartier des coteaux.",
    status: 'read',
    priority: 'normal',
    clientType: 'public',
    createdAt: '08 Mai à 14:12',
    domains: ['03 · ENV', '04 · TERRITOIRES'],
    replies: []
  },
  {
    id: 'msg-5',
    ref: 'MSG-2026-0504-01',
    name: 'Julien Blanchard',
    company: 'Groupe Nexity Aménagement',
    email: 'j.blanchard@nexity.fr',
    phone: '06 18 90 22 14',
    subject: 'Étude de faisabilité et diagnostic environnemental ZAC des Coteaux',
    message: "Mission finalisée et validée. Merci à toute l'équipe pour la clarté des livrables cartographiques qui ont fait l'unanimité auprès des services instructeurs.",
    status: 'replied',
    priority: 'normal',
    clientType: 'private',
    createdAt: '04 Mai à 10:05',
    domains: ['01 · INFRA', '04 · URBA'],
    replies: [
      {
        id: 'rep-2',
        author: 'Wilfried N.',
        content: "Ravi de cette collaboration, Julien. Les dossiers de récolement finaux sont archivés sur notre serveur sécurisé.",
        sentAt: '04/05/2026 15:30'
      }
    ]
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Wilfried N.',
    email: 'wilfried.n@infracite-ing.fr',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lastLogin: 'Aujourd’hui à 11:38'
  },
  {
    id: 'usr-2',
    name: 'Camille B.',
    email: 'c.bernard@infracite-ing.fr',
    role: 'EDITOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lastLogin: 'Hier à 17:15'
  },
  {
    id: 'usr-3',
    name: 'Alexandre T.',
    email: 'a.tessier@infracite-ing.fr',
    role: 'VIEWER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    lastLogin: '05 Mai à 09:20'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    action: 'Mise à jour des mentions légales et numéro SIREN',
    details: 'Vérification conformité RGPD et coordonnées Nanterre',
    author: 'Wilfried N. (Super Admin)',
    category: 'Mentions',
    timestamp: 'Aujourd’hui 11:38'
  },
  {
    id: 'log-2',
    action: 'Actualisation des tags de compétences · Domaine 02 Géomatique',
    details: 'Ajout des index QGIS 3.34 et PostGIS Spatial',
    author: 'Camille B. (Éditeur)',
    category: 'Domaines',
    timestamp: 'Hier à 14:15'
  },
  {
    id: 'log-3',
    action: 'Refonte des chiffres clés dans l’aside "InfraCité en bref"',
    details: 'Section d’accueil : actualisation des ratios et années d’expertise',
    author: 'Wilfried N. (Super Admin)',
    category: 'Accueil',
    timestamp: '12 Mai 09:40'
  },
  {
    id: 'log-4',
    action: 'Déploiement de la version de production v2.4.0-PROD',
    details: 'Build statique optimisé et purge du cache CDN Cloudflare Edge',
    author: 'Système automatique',
    category: 'Système',
    timestamp: '10 Mai 18:00'
  }
];

export const initialSiteSettings: SiteSettings = {
  siteName: 'InfraCité Ingénierie',
  siteDescription: 'Bureau d’études en ingénierie, géomatique, environnement et aménagement du territoire.',
  maintenanceMode: false,
  allowContactSubmission: true,
  enablePromoCarousel: false,
  lastDeployedAt: 'Aujourd’hui à 11:42',
  systemVersion: 'v2.5.0-PROD'
};
