import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AIAssistant } from './AIAssistant';
import { Newsletter } from './shared/Newsletter';
import { Breadcrumbs } from './shared/Breadcrumbs';
import { CookieBanner } from './shared/CookieBanner';
import clsx from 'clsx';

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={clsx("flex-1 flex flex-col", !isHome && "pt-[72px] lg:pt-[88px]")}>
        <Breadcrumbs />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
      <Newsletter />
      <Footer />
      <AIAssistant />
      <CookieBanner />
    </div>
  );
}


