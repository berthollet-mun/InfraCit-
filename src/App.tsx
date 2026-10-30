import { useEffect, useState } from 'react';
import { CorporateSite } from './components/public/CorporateSite';
import { AdminPortal } from './components/admin/AdminPortal';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const onHashChange = () => setAdminOpen(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (adminOpen) {
    return <AdminPortal onReturnToSite={() => { window.location.hash = ''; setAdminOpen(false); }} />;
  }

  return <CorporateSite />;
}
