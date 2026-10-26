import { useState, useEffect } from 'react';
import { useAppStore, appStore } from './lib/store';

// Typed Mock Data
import {
  heroData,
  domainsData,
  servicesData,
  applicationsData,
  stepsData,
  approachData,
  contactData,
  legalData
} from './data/mock';

// Public Showcase Components (Phase 1 Frontend with Auralis Visual Identity)
import { PromoCarousel } from './components/public/PromoCarousel';
import { PublicHeader } from './components/public/PublicHeader';
import { HeroSection } from './components/public/HeroSection';
import { DomainesSection } from './components/public/DomainesSection';
import { PrestationsSection } from './components/public/PrestationsSection';
import { ApplicationsSection } from './components/public/ApplicationsSection';
import { ProcessSection } from './components/public/ProcessSection';
import { ApprocheSection } from './components/public/ApprocheSection';
import { ContactSection } from './components/public/ContactSection';
import { PublicFooter } from './components/public/PublicFooter';
import { MaintenanceNotice } from './components/public/MaintenanceNotice';

// Admin Components (Phase 2 & 3 Administration Back-Office)
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminSidebar, AdminTab } from './components/admin/AdminSidebar';
import { AdminTopBar } from './components/admin/AdminTopBar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminCarrousels } from './components/admin/AdminCarrousels';
import { AdminDomaines } from './components/admin/AdminDomaines';
import { AdminPrestations } from './components/admin/AdminPrestations';
import { AdminApplications } from './components/admin/AdminApplications';
import { AdminEtapes } from './components/admin/AdminEtapes';
import { AdminApproche } from './components/admin/AdminApproche';
import { AdminAccueil } from './components/admin/AdminAccueil';
import { AdminContact } from './components/admin/AdminContact';
import { AdminMentions } from './components/admin/AdminMentions';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminParametres } from './components/admin/AdminParametres';
import { AdminUtilisateurs } from './components/admin/AdminUtilisateurs';
import { AdminAudit } from './components/admin/AdminAudit';

type ViewMode = 'public' | 'admin-login' | 'admin';

export default function App() {
  const state = useAppStore();
  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [currentAdminTab, setCurrentAdminTab] = useState<AdminTab>('dashboard');
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  // Synchronize hash routing for #admin
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        if (state.currentUser) {
          setViewMode('admin');
        } else {
          setViewMode('admin-login');
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [state.currentUser]);

  const handleOpenAdmin = () => {
    if (state.currentUser) {
      setViewMode('admin');
    } else {
      setViewMode('admin-login');
    }
  };

  const handleLoginSuccess = () => {
    setViewMode('admin');
  };

  const handleLogout = () => {
    appStore.logout();
    setViewMode('admin-login');
  };

  const handleReturnToPublic = () => {
    setViewMode('public');
    window.location.hash = '';
  };

  const unreadCount = state.messages.filter((m) => m.status === 'new').length;

  // View: Login Page
  if (viewMode === 'admin-login') {
    return (
      <AdminLogin
        onSuccess={handleLoginSuccess}
        onReturnHome={handleReturnToPublic}
      />
    );
  }

  // View: Admin Back-Office
  if (viewMode === 'admin') {
    return (
      <div className="bg-[#F2F5F3] font-sans text-[#10272F] min-h-screen flex antialiased">
        <AdminSidebar
          currentTab={currentAdminTab}
          onSelectTab={(tab) => {
            setCurrentAdminTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onReturnToPublic={handleReturnToPublic}
          unreadCount={unreadCount}
        />

        <div className="pl-72 flex-1 flex flex-col min-h-screen">
          <AdminTopBar
            currentTab={currentAdminTab}
            currentUser={state.currentUser}
            onLogout={handleLogout}
            searchQuery={adminSearchQuery}
            onSearchChange={setAdminSearchQuery}
          />

          <main className="w-full pt-16 bg-[#F2F5F3] min-h-screen flex-1 pb-12">
            {currentAdminTab === 'dashboard' && (
              <AdminDashboard
                state={state}
                onNavigateTab={setCurrentAdminTab}
                onPreviewPublic={handleReturnToPublic}
              />
            )}
            {currentAdminTab === 'carrousels' && (
              <AdminCarrousels slides={state.carouselSlides} />
            )}
            {currentAdminTab === 'domaines' && (
              <AdminDomaines domains={state.domains} />
            )}
            {currentAdminTab === 'prestations' && (
              <AdminPrestations services={state.services} />
            )}
            {currentAdminTab === 'applications' && (
              <AdminApplications applications={state.applications} />
            )}
            {currentAdminTab === 'etapes' && (
              <AdminEtapes steps={state.steps} />
            )}
            {currentAdminTab === 'approche' && (
              <AdminApproche cards={state.approachCards} principles={state.principles} />
            )}
            {currentAdminTab === 'accueil' && (
              <AdminAccueil hero={state.heroContent} />
            )}
            {currentAdminTab === 'contact' && (
              <AdminContact contactInfo={state.contactInfo} />
            )}
            {currentAdminTab === 'mentions' && (
              <AdminMentions legalInfo={state.legalInfo} />
            )}
            {currentAdminTab === 'messages' && (
              <AdminMessages messages={state.messages} />
            )}
            {currentAdminTab === 'parametres' && (
              <AdminParametres settings={state.settings} />
            )}
            {currentAdminTab === 'utilisateurs' && (
              <AdminUtilisateurs users={state.users} currentUser={state.currentUser} />
            )}
            {currentAdminTab === 'audit' && (
              <AdminAudit logs={state.auditLogs} />
            )}
          </main>
        </div>
      </div>
    );
  }

  // View: Public Showcase Website (Phase 1 Frontend Auralis Style)
  return (
    <div className="relative min-h-screen flex flex-col bg-[#F9F9F8] text-[#10272F] selection:bg-[#0B6E78] selection:text-white">
      {/* Maintenance banner if active */}
      {state.settings.maintenanceMode && (
        <MaintenanceNotice onAccessAdmin={handleOpenAdmin} />
      )}

      {/* Floating Pill Header (Single Clean AppBar - Style Auralis Dribbble) */}
      <PublicHeader onOpenAdmin={handleOpenAdmin} unreadCount={unreadCount} />

      {/* Public Landing Page Sections using typed mock.ts data */}
      <main className="flex-1">
        <HeroSection data={heroData} />

        {/* Optional Promotional Carousel Banner (Positioned as a distinct featured card when enabled in Admin, avoiding any collision with the floating navbar) */}
        {state.settings.enablePromoCarousel && (
          <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 mb-16">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <PromoCarousel slides={state.carouselSlides} />
            </div>
          </section>
        )}

        <DomainesSection domains={domainsData} />
        <PrestationsSection services={servicesData} />
        <ApplicationsSection applications={applicationsData} />
        <ProcessSection steps={stepsData} />
        <ApprocheSection data={approachData} />
        <ContactSection data={contactData} />
      </main>

      {/* Public Footer */}
      <PublicFooter data={legalData} />
    </div>
  );
}
