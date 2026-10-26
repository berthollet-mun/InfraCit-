export interface HeroData {
  eyebrow: string;
  titlePart1: string;
  titleItalic: string;
  lead: string;
  ctaText: string;
  ctaSecondaryText: string;
  carouselImages: Array<{
    url: string;
    caption: string;
    tag: string;
  }>;
  briefCard: {
    title: string;
    tag: string;
    pillars: Array<{
      id: string;
      title: string;
      subtitle: string;
    }>;
    footerNote: string;
  };
}

export interface DomainItem {
  id: string;
  code: string;
  tag: string;
  title: string;
  description: string;
  skills: string[];
  imageUrl: string;
  regulatoryNote?: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  deliverablesTitle: string;
  deliverables: string;
}

export interface ApplicationItem {
  id: string;
  code: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface StepItem {
  id: string;
  stepNumber: string;
  stepWatermark: string;
  title: string;
  description: string;
}

export interface ApproachData {
  sectionTitlePart1: string;
  sectionTitleItalic: string;
  subtitle: string;
  targets: Array<{
    id: string;
    type: 'public' | 'private';
    title: string;
    description: string;
    points: string[];
    icon: string;
  }>;
  principles: Array<{
    id: string;
    number: string;
    title: string;
    description: string;
  }>;
}

export interface ContactData {
  address: string;
  email: string;
  phone: string;
  displayPhone: string;
  hours: string;
  officeName: string;
}

export interface LegalData {
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

export const heroData: HeroData = {
  eyebrow: "BUREAU D'ÉTUDES · INGÉNIERIE ET SCIENCES APPLIQUÉES",
  titlePart1: "Des études et des idées",
  titleItalic: "au service des territoires.",
  lead: "InfraCité Ingénierie accompagne les acteurs publics et privés dans leurs réflexions et leurs projets grâce à une offre pluridisciplinaire d'études et de conseil : ingénierie, topographie, cartographie, géomatique, environnement, aménagement du territoire et urbanisme opérationnel. Nous transformons les données et les enjeux d'un site en analyses lisibles et en outils d'aide à la décision.",
  ctaText: "Parler de votre projet",
  ctaSecondaryText: "Découvrir nos domaines",
  carouselImages: [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85",
      caption: "Relevé altimétrique et analyse topographique en territoire naturel",
      tag: "TOPOGRAPHIE & GÉOMATIQUE"
    },
    {
      url: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=2000&q=85",
      caption: "Dynamiques d'aménagement et modélisation urbaine de précision",
      tag: "URBANISME OPÉRATIONNEL"
    },
    {
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85",
      caption: "Évaluation des sensibilités écologiques et corridors biologiques",
      tag: "TRANSITION ÉCOLOGIQUE"
    }
  ],
  briefCard: {
    title: "InfraCité en bref",
    tag: "Présentation",
    pillars: [
      {
        id: "p1",
        title: "Ingénierie",
        subtitle: "Études techniques, conseil et expertise"
      },
      {
        id: "p2",
        title: "Géomatique",
        subtitle: "Topographie, cartographie et systèmes d’information géographique"
      },
      {
        id: "p3",
        title: "Territoires",
        subtitle: "Aménagement du territoire et urbanisme opérationnel"
      },
      {
        id: "p4",
        title: "Environnement",
        subtitle: "Études environnementales et valorisation des données"
      }
    ],
    footerNote: "Pour les maîtres d'ouvrage publics et privés"
  }
};

export const domainsData: DomainItem[] = [
  {
    id: "domain-01",
    code: "01",
    tag: "01 — INGÉNIERIE",
    title: "Études techniques, conseil et expertise",
    description: "Assistance technique opérationnelle, diagnostics d’infrastructures, modélisation des contraintes et rédaction des pièces d'aide à la décision pour concevoir des aménagements durables et fiables.",
    skills: ["Diagnostics préalables", "Études de faisabilité", "Assistance technique"],
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "domain-02",
    code: "02",
    tag: "02 — GÉOMATIQUE",
    title: "Topographie, cartographie et SIG",
    description: "Acquisition, traitement, analyse spatiale et valorisation cartographique des données de terrain. Structuration de bases de données géoréférencées fiables au service des projets d’infrastructure et d’aménagement.",
    skills: ["Topographie technique", "Cartographie thématique", "SIG & Données spatiales"],
    regulatoryNote: "* Les activités réglementées réservées aux professionnels habilités ne font pas partie de ces prestations.",
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "domain-03",
    code: "03",
    tag: "03 — ENVIRONNEMENT",
    title: "Études environnementales et valorisation des données",
    description: "Évaluation des sensibilités écologiques, intégration paysagère, analyse multicritère des vulnérabilités environnementales et qualification rigoureuse des données d'impact territorial.",
    skills: ["Études d'impact", "Sensibilités environnementales", "Transition écologique"],
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "domain-04",
    code: "04",
    tag: "04 — TERRITOIRES",
    title: "Aménagement du territoire et urbanisme opérationnel",
    description: "Accompagnement stratégique dans la requalification des espaces, prospective territoriale, programmation urbaine et analyse des trames foncières pour façonner des lieux de vie équilibrés.",
    skills: ["Urbanisme opérationnel", "Projets de territoire", "Programmation"],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  }
];

export const servicesData: ServiceItem[] = [
  {
    id: "serv-01",
    code: "01 / OBSERVER",
    title: "Diagnostics et analyses préalables",
    description: "Recueil exhaustif des données existantes, observations de terrain, identification des contraintes physiques, réglementaires et environnementales propres au site.",
    deliverablesTitle: "Restitutions possibles :",
    deliverables: "Synthèse documentaire, diagnostic, cartographie et note d'analyse."
  },
  {
    id: "serv-02",
    code: "02 / ÉVALUER",
    title: "Études d'opportunité et de faisabilité",
    description: "Comparaison de scénarios d’aménagement, appréciation technique des contraintes de faisabilité, études de cohérence spatiale et évaluation des risques projet.",
    deliverablesTitle: "Restitutions possibles :",
    deliverables: "Étude de faisabilité, analyse multicritère et recommandations."
  },
  {
    id: "serv-03",
    code: "03 / REPRÉSENTER",
    title: "Production cartographique et géomatique",
    description: "Modélisation cartographique de précision, intégration des couches SIG complexes, sémiologie graphique haut de gamme pour rendre les données techniques compréhensibles par tous.",
    deliverablesTitle: "Restitutions possibles :",
    deliverables: "Plans, cartes, bases de données géographiques et supports SIG."
  },
  {
    id: "serv-04",
    code: "04 / CONSEILLER",
    title: "Conseil et assistance technique",
    description: "Éclairage indépendant pour orienter les arbitrages des maîtres d’ouvrage, préparation des dossiers techniques d'aménagement et formulation d'avis argumentés.",
    deliverablesTitle: "Restitutions possibles :",
    deliverables: "Avis techniques, notes de synthèse et dossiers d'aide à la décision."
  }
];

export const applicationsData: ApplicationItem[] = [
  {
    id: "app-01",
    code: "APPLICATION / 01",
    title: "Dynamiques territoriales",
    description: "Analyse de morphologie urbaine, mobilités, désenclavement et mutations d'échelles intercommunales.",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80",
    tags: ["Morphologie urbaine", "Mobilités", "Intercommunalités"]
  },
  {
    id: "app-02",
    code: "APPLICATION / 02",
    title: "Urbanisme opérationnel",
    description: "Reconversion de friches, intégration paysagère, programmation de ZAC et optimisation du parcellaire.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    tags: ["Friches", "ZAC", "Parcellaire"]
  },
  {
    id: "app-03",
    code: "APPLICATION / 03",
    title: "Connaissance et représentation des sites",
    description: "Modèles d'élévation, atlas thématiques précis et inventaires géolocalisés des réseaux et des sols.",
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80",
    tags: ["MNT", "Atlas thématique", "Réseaux VRD"]
  },
  {
    id: "app-04",
    code: "APPLICATION / 04",
    title: "Enjeux environnementaux des territoires",
    description: "Corridors biologiques, zones humides, vulnérabilité climatique et diagnostics de résilience locale.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    tags: ["Biodiversité", "Zones humides", "Résilience"]
  }
];

export const stepsData: StepItem[] = [
  {
    id: "step-01",
    stepNumber: "ÉTAPE 01",
    stepWatermark: "01",
    title: "Collecter",
    description: "Acquisition des données sources de terrain, inventaires documentaires et consolidation des référentiels cartographiques initiaux."
  },
  {
    id: "step-02",
    stepNumber: "ÉTAPE 02",
    stepWatermark: "02",
    title: "Traiter",
    description: "Contrôle de conformité géométrique, intégration SIG structurée, apurement des données et harmonisation géoréférencée."
  },
  {
    id: "step-03",
    stepNumber: "ÉTAPE 03",
    stepWatermark: "03",
    title: "Analyser",
    description: "Croisement spatial multicritère, confrontation aux réglementations d'urbanisme et qualification des impacts environnementaux."
  },
  {
    id: "step-04",
    stepNumber: "ÉTAPE 04",
    stepWatermark: "04",
    title: "Valoriser",
    description: "Restitution sous forme de rapports limpides, cartographies de haute lisibilité et recommandations stratégiques directes."
  }
];

export const approachData: ApproachData = {
  sectionTitlePart1: "Rigueur d'analyse, lisibilité des résultats,",
  sectionTitleItalic: "utilité des conseils.",
  subtitle: "Nous adaptons nos livrables aux exigences concrètes de gouvernance des projets, qu'il s'agisse de débats publics ou de montages d'opérations privées.",
  targets: [
    {
      id: "target-public",
      type: "public",
      title: "Collectivités et acteurs publics",
      description: "Un appui technique indépendant pour étayer les choix d'aménagement, sécuriser les documents de planification et valoriser le patrimoine foncier et environnemental auprès des citoyens.",
      points: [
        "Éclairage objectif et d'intérêt général",
        "Supports de concertation communicants"
      ],
      icon: "Landmark"
    },
    {
      id: "target-private",
      type: "private",
      title: "Aménageurs et acteurs privés",
      description: "Une réactivité opérationnelle pour sécuriser la faisabilité technique de vos investissements, lever les contraintes de site et optimiser l'insertion spatiale de vos programmes.",
      points: [
        "Réduction des aléas techniques en amont",
        "Optimisation des délais d'instruction"
      ],
      icon: "Building2"
    }
  ],
  principles: [
    {
      id: "p-01",
      number: "01 / PRINCIPE",
      title: "Comprendre",
      description: "Immersion complète dans l'histoire, le contexte physique et la trajectoire du site."
    },
    {
      id: "p-02",
      number: "02 / PRINCIPE",
      title: "Analyser",
      description: "Croisement méticuleux des données pour révéler potentiels et vulnérabilités."
    },
    {
      id: "p-03",
      number: "03 / PRINCIPE",
      title: "Restituer",
      description: "Livrables opérationnels, visuellement intelligibles et directement exploitables."
    }
  ]
};

export const contactData: ContactData = {
  officeName: "InfraCité Ingénierie",
  address: "14 rue Camille Saint-Saëns, 92500 Rueil-Malmaison",
  email: "adfi@infracite-ing.fr",
  phone: "0961273358",
  displayPhone: "09 61 27 33 58",
  hours: "Du Lundi au Vendredi : 08h30 – 18h30"
};

export const legalData: LegalData = {
  companyName: "InfraCité Ingénierie",
  legalForm: "Société par Actions Simplifiée (SAS)",
  capital: "1 000 €",
  siren: "999 744 915",
  rcs: "Nanterre",
  headquarters: "14 rue Camille Saint-Saëns, 92500 Rueil-Malmaison",
  publicationDirector: "Wilfried N.",
  technicalContact: "adfi@infracite-ing.fr",
  standardPhone: "09 61 27 33 58",
  rgpdNotice: "Plateforme conçue et hébergée dans le respect du RGPD.",
  professionalDisclaimer: "Les missions de délimitation foncière et de topographie réglementée sont exclusivement confiées à des professionnels habilités (Géomètres-experts)."
};
