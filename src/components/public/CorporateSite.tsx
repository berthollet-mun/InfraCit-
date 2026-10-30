import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Mail, MapPin, Menu, Phone, UserRound, X } from 'lucide-react';
import './corporate.css';

const images = {
  topographie: '/images/hero-topographie.jpg',
  geomatique: '/images/hero-geomatique.jpg',
  urbanisme: '/images/hero-urbanisme.jpg',
  ingenierie: '/images/hero-ingenierie.jpg',
  environnement: '/images/hero-environnement.jpg',
};

const slides = [
  { image: images.topographie, title: 'Topographie & mesure', note: 'Observer le terrain avec précision', position: 'center' },
  { image: images.geomatique, title: 'Cartographie & SIG', note: 'Donner du sens aux données spatiales', position: 'center' },
  { image: images.urbanisme, title: 'Urbanisme opérationnel', note: 'Comprendre les dynamiques urbaines', position: 'center' },
  { image: images.ingenierie, title: 'Ingénierie & conseil', note: 'Éclairer les choix techniques', position: 'center' },
  { image: images.environnement, title: 'Environnement', note: 'Intégrer les enjeux du vivant', position: 'center' },
];

const navigation = [
  { label: 'Domaines', href: '#domaines' },
  { label: 'Missions', href: '#missions' },
  { label: 'Applications', href: '#applications' },
  { label: 'Approche', href: '#approche' },
];

const domains = [
  {
    number: '01', name: 'Ingénierie', title: 'Études techniques, conseil et expertise',
    description: 'Du diagnostic à l’assistance technique, nous examinons les conditions de réalisation d’un projet pour rendre les décisions plus sûres et les options plus lisibles.',
    tags: ['Études techniques', 'Diagnostic', 'Faisabilité', 'Assistance technique'],
    image: images.ingenierie, alt: 'Ingénieurs consultant des plans sur un chantier d’infrastructure',
  },
  {
    number: '02', name: 'Géomatique', title: 'Topographie, cartographie et SIG',
    description: 'Nous relevons, organisons et représentons l’information spatiale pour construire une connaissance fiable du site, de ses contraintes et de ses possibilités.',
    tags: ['Topographie', 'Cartographie', 'SIG', 'Analyse spatiale'],
    image: images.topographie, alt: 'Topographe utilisant une station totale sur le terrain',
  },
  {
    number: '03', name: 'Environnement', title: 'Études et conseil en environnement',
    description: 'Une lecture attentive des milieux et des données environnementales aide à intégrer les sensibilités du territoire dès les premières réflexions.',
    tags: ['Analyse environnementale', 'Enjeux climatiques', 'Données', 'Aide à la décision'],
    image: images.environnement, alt: 'Bassin versant et zone humide dans un paysage aménagé',
  },
  {
    number: '04', name: 'Territoires', title: 'Aménagement et urbanisme opérationnel',
    description: 'Nous rapprochons les enjeux techniques, spatiaux et d’usage pour accompagner les études d’opportunité et les scénarios d’aménagement.',
    tags: ['Aménagement', 'Urbanisme', 'Analyse territoriale', 'Scénarios'],
    image: images.urbanisme, alt: 'Vue aérienne d’un quartier et de ses espaces publics',
  },
];

const missions = [
  { number: '01', verb: 'Observer', title: 'Diagnostics et analyses préalables', description: 'Recueillir les informations, comprendre les usages et identifier les contraintes techniques, spatiales ou environnementales.', output: 'Diagnostic · Synthèse · Cartographie' },
  { number: '02', verb: 'Évaluer', title: 'Études d’opportunité et de faisabilité', description: 'Comparer les hypothèses, examiner les conditions de mise en œuvre et mettre en évidence les points de vigilance.', output: 'Étude de faisabilité · Scénarios' },
  { number: '03', verb: 'Représenter', title: 'Production cartographique et géomatique', description: 'Transformer des données de terrain en plans, cartes thématiques et supports SIG précis et compréhensibles.', output: 'Plans · Cartes · Données SIG' },
  { number: '04', verb: 'Conseiller', title: 'Conseil et assistance technique', description: 'Formuler des avis argumentés et des synthèses exploitables pour accompagner la décision et la conduite du projet.', output: 'Avis techniques · Notes de synthèse' },
];

const applications = [
  { name: 'Territoires', title: 'Dynamiques territoriales et projets d’aménagement', image: images.urbanisme, alt: 'Vue aérienne d’un territoire urbanisé' },
  { name: 'Urbanisme', title: 'Urbanisme opérationnel', image: images.ingenierie, alt: 'Projet d’infrastructure en cours d’étude' },
  { name: 'Espace', title: 'Connaissance et représentation des sites', image: images.geomatique, alt: 'Analyse géomatique sur des cartes numériques' },
  { name: 'Environnement', title: 'Enjeux environnementaux des territoires', image: images.environnement, alt: 'Paysage de zone humide et bassin versant' },
];

const process = [
  { number: '01', title: 'Collecter', text: 'Relevés, mesures et collecte des données.' },
  { number: '02', title: 'Traiter', text: 'Organisation et mise en forme des informations.' },
  { number: '03', title: 'Analyser', text: 'Croisement des données avec les enjeux du projet.' },
  { number: '04', title: 'Valoriser', text: 'Plans, cartes, synthèses et aide à la décision.' },
];

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#accueil" aria-label="InfraCité Ingénierie — accueil">
      <svg className="brand-mark" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M4 28.5C11 27.7 12.4 13.5 22 13.5S33 27.7 40 28.5" />
        <path d="M4 34C11 33.2 13.7 19 22 19S33 33.2 40 34" />
        <circle cx="22" cy="13.5" r="3.5" />
        <path d="M22 2v5M22 21v5M10 13.5h5M29 13.5h5" />
      </svg>
      <span className="brand-copy"><strong>InfraCité Ingénierie</strong><small>INGÉNIERIE · GÉOMATIQUE</small></span>
    </a>
  );
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <Reveal className="section-head">
      <div className="eyebrow dark"><span className="marker" /> <span>{index} / {label}</span></div>
      <div className="section-head-grid">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </Reveal>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  return (
    <header className={`site-header ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-login" href="#admin"><UserRound size={17} /> Se connecter</a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navigation mobile" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.22 }}>
            {navigation.map((item, index) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item.label}<ArrowUpRight size={19} /></a>)}
            <a href="#contact" onClick={() => setMenuOpen(false)}><span>05</span>Contact<ArrowUpRight size={19} /></a>
            <a href="#admin" onClick={() => setMenuOpen(false)}><span>06</span>Se connecter<UserRound size={19} /></a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => setCurrent(index => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [current, paused, reduceMotion]);
  const changeSlide = (index: number) => setCurrent((index + slides.length) % slides.length);
  return (
    <section id="accueil" className="hero" aria-label="Présentation d’InfraCité Ingénierie" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}>
      <div className="hero-images" aria-hidden="true">
        {slides.map((slide, index) => (
          <div key={slide.image} className={`hero-image ${index === current ? 'active' : ''}`} style={{ backgroundImage: `url("${slide.image}")`, backgroundPosition: slide.position }} />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-grid" aria-hidden="true" />
      <svg className="hero-contour" viewBox="0 0 900 700" fill="none" aria-hidden="true"><path d="M-50 445C157 337 248 430 379 352c150-90 218-59 358-137 88-49 159-53 251-44M-40 503c177-92 294-22 431-97 138-75 214-47 360-126 96-52 158-45 241-32M-37 562c206-97 293-21 459-96 142-64 212-39 349-108 95-48 152-37 217-30M-31 626c201-91 314-29 475-89 151-58 217-37 348-95 83-37 134-32 198-27" /></svg>
      <div className="container hero-content">
        <div className="hero-meta"><div className="eyebrow light"><span className="marker" /> BUREAU D’ÉTUDES · INGÉNIERIE &amp; SCIENCES APPLIQUÉES</div></div>
        <motion.div className="hero-main" initial={reduceMotion ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
          <h1>Des études et des idées au service des <span>territoires</span>.</h1>
          <p>InfraCité Ingénierie accompagne les acteurs publics et privés dans leurs réflexions et leurs projets grâce à une offre pluridisciplinaire d’études et de conseil : ingénierie, topographie, cartographie, géomatique, environnement, aménagement du territoire et urbanisme opérationnel. Nous transformons les données et les enjeux d’un site en analyses lisibles et en outils d’aide à la décision.</p>
          <div className="hero-actions">
            <a className="button button-accent" href="#contact">Parler de votre projet <ArrowRight size={18} /></a>
            <a className="button button-outline" href="#domaines">Découvrir nos domaines <ArrowRight size={18} /></a>
          </div>
        </motion.div>
        <div className="hero-bottom">
          <div className="slide-controls">
            <div className="slide-caption"><span>DISCIPLINE EN OBSERVATION</span><strong>{slides[current].title}</strong></div>
            <div className="slide-nav">
              <button type="button" aria-label="Image précédente" onClick={() => changeSlide(current - 1)}><ChevronLeft size={18} /></button>
              <div className="slide-index" aria-label={`Image ${current + 1} sur ${slides.length}`}>
                {slides.map((slide, index) => <button key={slide.title} type="button" className={index === current ? 'active' : ''} onClick={() => changeSlide(index)} aria-label={`Afficher ${slide.title}`} aria-current={index === current ? 'true' : undefined}><span>0{index + 1}</span><i>{index === current && !reduceMotion && !paused && <b key={current} />}</i></button>)}
              </div>
              <button type="button" aria-label="Image suivante" onClick={() => changeSlide(current + 1)}><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Brief() {
  const items = [
    ['01', 'Ingénierie', 'Études techniques, conseil et expertise opérationnelle pour infrastructures viabilisées et ouvrages.'],
    ['02', 'Géomatique', 'Topographie fine, cartographie thématique et modélisation en systèmes d’information géographique.'],
    ['03', 'Territoires', 'Aménagement territorial, urbanisme opérationnel et programmation spatiale concertée.'],
    ['04', 'Environnement', 'Études d’impact environnemental, résilience climatique et valorisation analytique des données de site.'],
  ];
  return (
    <section id="en-bref" className="brief-section">
      <div className="container">
        <Reveal className="brief-panel">
          <div className="brief-intro"><div><div className="eyebrow dark">REPÈRES INSTITUTIONNELS</div><h2>Pour les maîtres d’ouvrage publics et privés</h2></div><div className="brief-badges"><span>◈ &nbsp; 100% Indépendant</span><span>◷ &nbsp; Réactivité &lt; 48h</span><span>◎ &nbsp; Géoréférencement RGF93 / IGN</span></div></div>
          <div className="brief-list">{items.map(item => <div className="brief-item" key={item[0]}><span>{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></div>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Domains() {
  return (
    <section id="domaines" className="section domains-section">
      <div className="container">
        <SectionHead index="01" label="DOMAINES D’INTERVENTION" title="Une lecture transversale des enjeux techniques et territoriaux." intro="InfraCité associe études, conseil et traitement de l’information pour comprendre les sites, examiner les possibilités d’aménagement et préparer les décisions." />
        <div className="domain-list">
          {domains.map((domain, index) => (
            <Reveal className={`domain-row ${index % 2 ? 'reverse' : ''}`} key={domain.number}>
              <div className="domain-image-wrap"><img src={domain.image} alt={domain.alt} loading="lazy" /><span className="image-corner"><span className="marker" /> IC / {domain.number}</span></div>
              <div className="domain-copy"><span className="domain-label">{domain.number} / {domain.name}</span><h3>{domain.title}</h3><p>{domain.description}</p><ul>{domain.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a href="#contact" className="text-link">Échanger sur ce domaine <ArrowUpRight size={16} /></a></div>
            </Reveal>
          ))}
        </div>
        <p className="domain-note">Les activités réglementées réservées aux professionnels habilités relèvent de leur compétence exclusive.</p>
      </div>
    </section>
  );
}

function Missions() {
  return (
    <section id="missions" className="section missions-section">
      <div className="container">
        <SectionHead index="02" label="NOS PRESTATIONS" title="Des analyses ciblées, des réponses adaptées." intro="Chaque mission commence par une question précise et se conclut par une restitution utile à l’action." />
        <div className="mission-grid">{missions.map((mission, index) => <Reveal key={mission.number} delay={index * 0.08} className="mission-card"><div className="mission-top"><span>{mission.number} / {mission.verb}</span><span className="mission-cross">+</span></div><h3>{mission.title}</h3><p>{mission.description}</p><div className="mission-output"><span>RESTITUTIONS POSSIBLES</span><strong>{mission.output}</strong></div></Reveal>)}</div>
      </div>
    </section>
  );
}

function Applications() {
  return (
    <section id="applications" className="section applications-section">
      <div className="container">
        <SectionHead index="03" label="CHAMPS D’APPLICATION" title="Des problématiques variées, une même exigence de clarté." />
        <div className="application-grid">{applications.map((application, index) => <Reveal key={application.name} className="application-card" delay={index * 0.07}><img src={application.image} alt={application.alt} loading="lazy" /><div className="application-shade" /><div className="application-copy"><span>0{index + 1} / {application.name}</span><h3>{application.title}</h3><ArrowUpRight size={20} /></div></Reveal>)}</div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process-section" id="methode">
      <div className="container">
        <SectionHead index="04" label="DU TERRAIN À LA DÉCISION" title="De la connaissance du terrain à une décision éclairée." />
        <div className="process-grid">{process.map((step, index) => <Reveal className="process-step" key={step.number} delay={index * 0.09}><span className="process-number">{step.number}</span><span className="process-node" /><h3>{step.title}</h3><p>{step.text}</p></Reveal>)}</div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approche" className="section approach-section">
      <div className="container approach-inner">
        <Reveal className="approach-lead"><div className="eyebrow light"><span className="marker" /> 05 / NOTRE APPROCHE</div><h2>Rigueur d’analyse,<br />lisibilité des résultats,<br /><em>utilité des conseils.</em></h2><p>Chaque territoire a ses spécificités. Nous définissons la bonne question avec le commanditaire, réunissons les données pertinentes et présentons des conclusions accessibles et exploitables.</p></Reveal>
        <div className="approach-cards"><Reveal className="approach-card"><span>01 / ACTEURS PUBLICS</span><h3>Collectivités et acteurs publics</h3><p>Documenter les enjeux d’aménagement, apprécier les orientations et préparer les décisions au service des territoires.</p><ArrowUpRight size={21} /></Reveal><Reveal className="approach-card" delay={0.1}><span>02 / ACTEURS PRIVÉS</span><h3>Aménageurs et acteurs privés</h3><p>Comprendre le potentiel d’un site, son contexte technique et environnemental et structurer une réflexion d’aménagement.</p><ArrowUpRight size={21} /></Reveal></div>
        <div className="approach-principles">{[['01', 'Comprendre', 'Écouter le besoin et qualifier les enjeux.'], ['02', 'Analyser', 'Croiser les données et expliciter les hypothèses.'], ['03', 'Restituer', 'Fournir des documents clairs pour décider.']].map(item => <Reveal key={item[0]} className="principle"><span>{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></Reveal>)}</div>
      </div>
    </section>
  );
}

function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const organisation = String(values.get('organisation') || '').trim();
    const email = String(values.get('email') || '').trim();
    const phone = String(values.get('phone') || '').trim();
    const subject = String(values.get('subject') || '').trim();
    const message = String(values.get('message') || '').trim();
    setFormState('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, organisation, email, phone, subject, message }) });
      if (!response.ok) throw new Error('Envoi impossible');
      form.reset();
      setFormState('sent');
    } catch {
      setFormState('error');
    }
  };
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <Reveal className="contact-copy"><div className="eyebrow dark"><span className="marker" /> 06 / CONTACT</div><h2>Parlons de<br /><em>votre projet.</em></h2><p>Étude technique, topographie, cartographie, environnement ou urbanisme opérationnel : présentez-nous votre besoin pour définir ensemble un périmètre d’intervention adapté.</p><div className="contact-details"><a href="mailto:adfi@infracite-ing.fr"><Mail size={19} /><span><small>E-MAIL</small>adfi@infracite-ing.fr</span></a><a href="tel:+33961273358"><Phone size={19} /><span><small>TÉLÉPHONE</small>09 61 27 33 58</span></a><div><MapPin size={19} /><span><small>ADRESSE</small>14 rue Camille Saint-Saëns<br />92500 Rueil-Malmaison</span></div></div></Reveal>
        <Reveal className="contact-form-wrap" delay={0.12}><div className="form-heading"><span>NOUS CONTACTER</span><strong>Décrivez votre besoin</strong></div><form onSubmit={submit}><div className="form-two"><label>Nom <input name="name" autoComplete="name" required placeholder="Votre nom" /></label><label>Société / organisme <input name="organisation" autoComplete="organization" placeholder="Votre structure" /></label></div><div className="form-two"><label>E-mail <input name="email" type="email" autoComplete="email" required placeholder="vous@organisation.fr" /></label><label>Téléphone <input name="phone" type="tel" autoComplete="tel" placeholder="Votre numéro" /></label></div><label>Type de besoin <select name="subject" required defaultValue=""><option value="" disabled>Choisir un domaine</option><option>Ingénierie</option><option>Topographie / géomatique</option><option>Environnement</option><option>Aménagement / urbanisme</option><option>Autre demande</option></select></label><label>Message <textarea name="message" rows={5} required placeholder="Parlez-nous du site, de la mission et de vos délais…" /></label><div className="form-foot"><button className="button button-dark" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'} <ArrowUpRight size={18} /></button></div>{formState === 'sent' && <p className="form-status" role="status">Votre demande a été enregistrée. Nous reviendrons vers vous rapidement.</p>}{formState === 'error' && <p className="form-status form-status-error" role="alert">La demande n’a pas pu être envoyée. Réessayez ou écrivez-nous par e-mail.</p>}</form></Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer"><div className="container"><div className="footer-cta"><div><span>UN PROJET À FAIRE AVANCER ?</span><h2>Parlons de votre territoire.</h2><p>Des données de terrain aux décisions, construisons ensemble une réponse claire et adaptée.</p></div><a href="#contact">Démarrer un échange <ArrowUpRight size={19} /></a></div><div className="footer-grid"><div className="footer-brand"><Brand light /><p>Études, ingénierie et géomatique au service des projets et des territoires.</p></div><nav aria-label="Navigation de pied de page"><h3>EXPLORER</h3>{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}<a href="#contact">Contact</a></nav><div className="footer-expertise"><h3>EXPERTISES</h3><span>Ingénierie</span><span>Topographie &amp; SIG</span><span>Aménagement</span><span>Environnement</span></div><div className="footer-contact"><h3>NOUS JOINDRE</h3><a href="mailto:adfi@infracite-ing.fr">adfi@infracite-ing.fr</a><a href="tel:+33961273358">09 61 27 33 58</a><p>14 rue Camille Saint-Saëns<br />92500 Rueil-Malmaison</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} InfraCité Ingénierie · SAS · SIREN 999 744 915 · RCS Nanterre</span><span>Visuels d’illustration créés pour cette maquette.</span><a href="#accueil">Retour en haut ↑</a></div></div></footer>
  );
}

export function CorporateSite() {
  useEffect(() => {
    const key = 'infracite_visit_recorded';
    if (sessionStorage.getItem(key)) return;
    fetch('/api/visit', { method: 'POST' }).then((response) => { if (response.ok) sessionStorage.setItem(key, '1'); }).catch(() => {});
  }, []);
  return <div className="corporate-site"><a className="skip-link" href="#contenu">Aller au contenu</a><Header /><main id="contenu"><Hero /><Brief /><Domains /><Missions /><Applications /><Process /><Approach /><Contact /></main><Footer /></div>;
}
