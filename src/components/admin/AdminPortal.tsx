import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Archive, ArrowRight, ArrowUpRight, BarChart3, Check, ChevronRight, Globe2, Inbox, LayoutDashboard, LockKeyhole, LogOut, Mail, RefreshCw, Search, UsersRound } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Brand } from '../public/CorporateSite';
import './admin-portal.css';

type MessageStatus = 'new' | 'read' | 'archived';
type Tab = 'dashboard' | 'messages';
type Filter = 'all' | 'new' | 'archived';
type Period = 'week' | 'month' | 'currentMonth' | 'custom';
type DateRange = { from: string; to: string };

interface ContactMessage {
  id: string;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

interface DashboardData {
  from: string;
  to: string;
  totalVisits: number;
  totalMessages: number;
  unreadMessages: number;
  archivedMessages: number;
  days: { date: string; visits: number; messages: number }[];
  recentMessages: ContactMessage[];
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error || 'Une erreur est survenue. Réessayez.');
  return body as T;
}

function dateLabel(value: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(value).toLocaleDateString('fr-FR', options || { day: '2-digit', month: 'short', year: 'numeric' });
}

function periodRange(period: Exclude<Period, 'custom'>): DateRange {
  const now = new Date();
  const to = now.toISOString().slice(0, 10);
  const start = new Date(now);
  if (period === 'currentMonth') start.setUTCDate(1);
  else start.setUTCDate(start.getUTCDate() - (period === 'week' ? 6 : 29));
  return { from: start.toISOString().slice(0, 10), to };
}

function Login({ onLogin, onReturnToSite }: { onLogin: (email: string) => void; onReturnToSite: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const session = await request<{ email: string }>('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setPassword('');
      onLogin(session.email);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-top"><Brand /><button type="button" onClick={onReturnToSite}>Retour au site <ArrowUpRight size={17} /></button></div>
      <main className="admin-login-main">
        <motion.div className="admin-login-intro" initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22, 1, .36, 1] }}><span className="admin-kicker">ESPACE PRIVÉ / INFRACITÉ</span><h1>Bienvenue dans<br /><span>votre espace.</span></h1><div className="admin-login-lines" aria-hidden="true"><i /><i /><i /></div></motion.div>
        <motion.div className="admin-login-card" initial={reduceMotion ? false : { opacity: 0, y: 30, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .75, delay: .12, ease: [0.22, 1, .36, 1] }}><div className="admin-login-card-top"><span className="admin-login-icon"><LockKeyhole size={22} /></span><span>ACCÈS ADMINISTRATEUR</span></div><h2>Se connecter</h2><p>Entrez vos identifiants pour accéder au tableau de bord.</p><form onSubmit={submit}><label htmlFor="admin-email">Adresse e-mail</label><input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Votre adresse e-mail" /><label htmlFor="admin-password">Mot de passe</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Votre mot de passe" />{error && <div className="admin-login-error" role="alert">{error}</div>}<button className="admin-primary-button" type="submit" disabled={loading}>{loading ? 'Connexion…' : 'Se connecter'} <ArrowRight size={18} /></button></form></motion.div>
      </main>
      <div className="admin-login-bottom">© {new Date().getFullYear()} InfraCité Ingénierie <span>Ingénierie · Géomatique · Territoires</span></div>
    </div>
  );
}

export function AdminPortal({ onReturnToSite }: { onReturnToSite: () => void }) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('dashboard');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loadingData, setLoadingData] = useState(false);
  const [period, setPeriod] = useState<Period>('week');
  const [range, setRange] = useState<DateRange>(() => periodRange('week'));
  const [customFrom, setCustomFrom] = useState(range.from);
  const [customTo, setCustomTo] = useState(range.to);
  const [rangeError, setRangeError] = useState('');
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    request<{ email: string }>('/api/admin/session')
      .then((session) => setEmail(session.email))
      .catch(() => setEmail(null))
      .finally(() => setCheckingSession(false));
  }, []);

  async function refresh() {
    setLoadingData(true);
    setError('');
    try {
      const [statistics, inbox] = await Promise.all([
        request<DashboardData>(`/api/admin/dashboard?from=${range.from}&to=${range.to}`),
        request<ContactMessage[]>('/api/admin/messages'),
      ]);
      setDashboard(statistics);
      setMessages(inbox);
      setSelectedId((current) => current && inbox.some((item) => item.id === current) ? current : inbox[0]?.id || null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Chargement impossible.');
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => { if (email) void refresh(); }, [email, range.from, range.to]);

  async function logout() {
    try { await request<null>('/api/admin/logout', { method: 'POST' }); } catch { /* The local session may already have expired. */ }
    setConfirmLogout(false);
    setEmail(null);
    setDashboard(null);
    setMessages([]);
  }

  async function changeStatus(id: string, status: MessageStatus) {
    try {
      await request<ContactMessage>(`/api/admin/messages/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Mise à jour impossible.');
    }
  }

  function selectMessage(message: ContactMessage) {
    setSelectedId(message.id);
    if (message.status === 'new') void changeStatus(message.id, 'read');
  }

  function choosePeriod(next: Exclude<Period, 'custom'>) {
    setPeriod(next);
    setRange(periodRange(next));
    setRangeError('');
  }

  function applyCustomRange() {
    const from = Date.parse(`${customFrom}T12:00:00Z`);
    const to = Date.parse(`${customTo}T12:00:00Z`);
    if (!customFrom || !customTo || Number.isNaN(from) || Number.isNaN(to) || to < from || (to - from) / 86400000 > 366) {
      setRangeError('Choisissez une période valide de 366 jours maximum.');
      return;
    }
    setRangeError('');
    setRange({ from: customFrom, to: customTo });
  }

  const filteredMessages = useMemo(() => messages.filter((message) => {
    if (filter !== 'all' && message.status !== filter) return false;
    const search = query.trim().toLowerCase();
    return !search || [message.name, message.organisation, message.subject, message.email].some((value) => value.toLowerCase().includes(search));
  }), [messages, filter, query]);
  const selectedMessage = messages.find((message) => message.id === selectedId) || null;
  const chartDays = useMemo(() => {
    const days = dashboard?.days || [];
    if (days.length <= 31) return days;
    const grouped: DashboardData['days'] = [];
    for (let index = 0; index < days.length; index += 7) {
      const week = days.slice(index, index + 7);
      grouped.push({ date: week[0].date, visits: week.reduce((sum, day) => sum + day.visits, 0), messages: week.reduce((sum, day) => sum + day.messages, 0) });
    }
    return grouped;
  }, [dashboard]);
  const maxVisits = Math.max(1, ...chartDays.map((day) => day.visits));

  if (checkingSession) return <div className="admin-loading">Ouverture de l’espace administrateur…</div>;
  if (!email) return <Login onLogin={setEmail} onReturnToSite={onReturnToSite} />;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar"><div><div className="admin-sidebar-brand"><Brand /></div><span className="admin-sidebar-label">NAVIGATION</span><nav aria-label="Navigation de l’administration"><button type="button" className={tab === 'dashboard' ? 'active' : ''} onClick={() => setTab('dashboard')}><LayoutDashboard size={19} /> Tableau de bord</button><button type="button" className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}><Mail size={19} /> Messages {messages.filter((message) => message.status === 'new').length > 0 && <span className="admin-nav-badge">{messages.filter((message) => message.status === 'new').length}</span>}</button><button type="button" onClick={() => setConfirmLogout(true)}><LogOut size={19} /> Déconnexion</button></nav><span className="admin-sidebar-label admin-sidebar-label-secondary">ACCÈS RAPIDE</span><button type="button" className="admin-sidebar-link" onClick={onReturnToSite}><Globe2 size={19} /> Voir le site public <ArrowUpRight size={15} /></button></div><div className="admin-sidebar-footer"><span className="admin-avatar">SU</span><div><strong>Administrateur</strong><small>{email}</small></div></div></aside>
      <div className="admin-workspace"><header className="admin-topbar"><div className="admin-breadcrumb">ESPACE ADMIN <ChevronRight size={14} /> <strong>{tab === 'dashboard' ? 'TABLEAU DE BORD' : 'MESSAGES'}</strong></div><div className="admin-topbar-actions"><button type="button" onClick={() => void refresh()} disabled={loadingData}><RefreshCw size={17} className={loadingData ? 'spinning' : ''} /> Actualiser</button></div></header>
        <main className="admin-content">{error && <div className="admin-error" role="alert">{error}</div>}
          {tab === 'dashboard' ? <>
            <div className="admin-page-heading"><div><span className="admin-kicker">VUE D’ENSEMBLE</span><h1>Tableau de bord<span>.</span></h1><p>Les chiffres du site et les demandes de contact, mis à jour depuis ce serveur.</p></div><span className="admin-period">{dateLabel(range.from)} — {dateLabel(range.to)}</span></div>
            <div className="admin-date-controls"><div className="admin-date-presets" role="group" aria-label="Filtrer le tableau de bord par période"><button type="button" className={period === 'week' ? 'active' : ''} onClick={() => choosePeriod('week')}>7 derniers jours</button><button type="button" className={period === 'month' ? 'active' : ''} onClick={() => choosePeriod('month')}>30 derniers jours</button><button type="button" className={period === 'currentMonth' ? 'active' : ''} onClick={() => choosePeriod('currentMonth')}>Ce mois</button><button type="button" className={period === 'custom' ? 'active' : ''} onClick={() => { setPeriod('custom'); setRangeError(''); }}>Personnalisé</button></div>{period === 'custom' && <div className="admin-custom-range"><label>Du <input type="date" value={customFrom} max={customTo} onChange={(event) => setCustomFrom(event.target.value)} /></label><label>Au <input type="date" value={customTo} min={customFrom} onChange={(event) => setCustomTo(event.target.value)} /></label><button type="button" onClick={applyCustomRange}>Appliquer <ArrowRight size={16} /></button></div>}{rangeError && <p className="admin-range-error" role="alert">{rangeError}</p>}</div>
            <div className="admin-stat-grid"><div className="admin-stat-card"><span className="admin-stat-icon purple"><UsersRound size={21} /></span><span>Visites du site</span><strong>{dashboard?.totalVisits ?? '—'}</strong><small>Sur la période sélectionnée</small></div><div className="admin-stat-card"><span className="admin-stat-icon gold"><Inbox size={21} /></span><span>Messages reçus</span><strong>{dashboard?.totalMessages ?? '—'}</strong><small>Demandes envoyées depuis Contact</small></div><div className="admin-stat-card"><span className="admin-stat-icon lilac"><Mail size={21} /></span><span>À consulter</span><strong>{dashboard?.unreadMessages ?? '—'}</strong><small>Messages non lus</small></div><div className="admin-stat-card"><span className="admin-stat-icon charcoal"><Archive size={21} /></span><span>Archivés</span><strong>{dashboard?.archivedMessages ?? '—'}</strong><small>Demandes classées</small></div></div>
            <div className="admin-dashboard-grid"><section className="admin-panel admin-chart-panel"><div className="admin-panel-head"><div><span className="admin-kicker">AUDIENCE</span><h2>Évolution des visites</h2></div><BarChart3 size={22} /></div><div className="admin-chart">{chartDays.map((day, index) => <div className="admin-chart-day" key={day.date} title={`${dateLabel(day.date)} : ${day.visits} visite${day.visits > 1 ? 's' : ''}`}><span>{day.visits}</span><div className="admin-chart-track"><i style={{ height: `${Math.max(4, day.visits / maxVisits * 100)}%` }} /></div><small>{chartDays.length <= 7 || index === 0 || index === chartDays.length - 1 || index % 7 === 0 ? dateLabel(day.date, { day: '2-digit', month: 'short' }) : ' '}</small></div>)}</div><div className="admin-chart-foot"><span><i /> Visites {dashboard && dashboard.days.length > 31 ? '· regroupées par semaine' : '· par jour'}</span><span>Une visite est comptée par session du navigateur.</span></div></section><section className="admin-panel admin-summary-panel"><div className="admin-panel-head"><div><span className="admin-kicker">CONTACT</span><h2>Demandes récentes</h2></div><Mail size={22} /></div>{dashboard?.recentMessages.length ? <div className="admin-recent-list">{dashboard.recentMessages.map((message) => <button key={message.id} type="button" onClick={() => { setSelectedId(message.id); setTab('messages'); }}><span className="admin-recent-avatar">{message.name.slice(0, 2).toUpperCase()}</span><span><strong>{message.name}</strong><small>{message.subject}</small></span><time>{dateLabel(message.createdAt, { day: '2-digit', month: 'short' })}</time></button>)}</div> : <div className="admin-empty"><Inbox size={28} /><p>Aucune demande sur cette période.</p></div>}<button type="button" className="admin-panel-link" onClick={() => setTab('messages')}>Ouvrir la messagerie <ArrowRight size={17} /></button></section></div>
            <div className="admin-insight"><span className="admin-insight-icon"><Globe2 size={24} /></span><div><strong>Site public connecté</strong><p>Les visites et les nouveaux messages apparaissent ici après actualisation.</p></div><button type="button" onClick={onReturnToSite}>Voir le site <ArrowUpRight size={17} /></button></div>
          </> : <>
            <div className="admin-page-heading"><div><span className="admin-kicker">BOÎTE DE RÉCEPTION</span><h1>Messages<span>.</span></h1><p>Consultez et classez les demandes reçues depuis le formulaire du site.</p></div><span className="admin-period">{messages.length} DEMANDE{messages.length > 1 ? 'S' : ''}</span></div>
            <div className="admin-message-tools"><div className="admin-filter-group"><button type="button" className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tous <span>{messages.length}</span></button><button type="button" className={filter === 'new' ? 'active' : ''} onClick={() => setFilter('new')}>Non lus <span>{messages.filter((message) => message.status === 'new').length}</span></button><button type="button" className={filter === 'archived' ? 'active' : ''} onClick={() => setFilter('archived')}>Archivés</button></div><label className="admin-search"><Search size={17} /><input type="search" placeholder="Rechercher un message" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
            <div className="admin-inbox"><div className="admin-inbox-list">{filteredMessages.length ? filteredMessages.map((message) => <button type="button" key={message.id} className={`admin-message-item ${selectedId === message.id ? 'selected' : ''}`} onClick={() => selectMessage(message)}><span className="admin-message-avatar">{message.name.slice(0, 2).toUpperCase()}</span><span className="admin-message-list-copy"><span><strong>{message.name}</strong>{message.status === 'new' && <i aria-label="Non lu" />}</span><small>{message.organisation || message.email}</small><b>{message.subject}</b><em>{message.message}</em></span><time>{dateLabel(message.createdAt, { day: '2-digit', month: 'short' })}</time></button>) : <div className="admin-empty"><Inbox size={27} /><p>Aucun message dans cette catégorie.</p></div>}</div><div className="admin-message-detail">{selectedMessage ? <><div className="admin-detail-top"><span className="admin-kicker">DEMANDE REÇUE LE {dateLabel(selectedMessage.createdAt).toUpperCase()}</span><span className={`admin-status ${selectedMessage.status}`}>{selectedMessage.status === 'new' ? 'NOUVEAU' : selectedMessage.status === 'archived' ? 'ARCHIVÉ' : 'LU'}</span></div><h2>{selectedMessage.subject}</h2><div className="admin-sender"><span className="admin-message-avatar">{selectedMessage.name.slice(0, 2).toUpperCase()}</span><div><strong>{selectedMessage.name}</strong><span>{selectedMessage.organisation || 'Particulier / autre organisation'}</span></div></div><div className="admin-message-meta"><span>E-MAIL <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></span>{selectedMessage.phone && <span>TÉLÉPHONE <a href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a></span>}</div><div className="admin-message-body">{selectedMessage.message}</div><div className="admin-detail-actions"><a className="admin-primary-button" href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Re: ${selectedMessage.subject}`)}`}>Répondre par e-mail <ArrowUpRight size={17} /></a>{selectedMessage.status === 'archived' ? <button type="button" onClick={() => void changeStatus(selectedMessage.id, 'read')}><Check size={17} /> Restaurer</button> : <button type="button" onClick={() => void changeStatus(selectedMessage.id, 'archived')}><Archive size={17} /> Archiver</button>}</div></> : <div className="admin-empty"><Mail size={30} /><p>Sélectionnez un message pour le lire.</p></div>}</div></div>
          </>}
        </main>
      </div>
      {confirmLogout && <div className="admin-confirm-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmLogout(false); }}><div className="admin-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-confirm-title"><span className="admin-confirm-icon"><LogOut size={24} /></span><h2 id="admin-confirm-title">Se déconnecter ?</h2><p>Voulez-vous vraiment vous déconnecter de l’espace administrateur ?</p><div className="admin-confirm-actions"><button type="button" onClick={() => setConfirmLogout(false)}>Annuler</button><button type="button" className="admin-confirm-logout" onClick={() => void logout()}>Se déconnecter</button></div></div></div>}
    </div>
  );
}
