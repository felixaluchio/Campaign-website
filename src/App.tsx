import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { JoinMovement } from './pages/JoinMovement';
import { EventsHub } from './pages/EventsHub';
import { EventDetail } from './pages/EventDetail';
import { SearchHub } from './pages/SearchHub';
import { Contact } from './pages/Contact';
import { ReportIssue } from './pages/ReportIssue';
import { CommunicationPreferences } from './pages/CommunicationPreferences';
import { TrackMessage } from './pages/TrackMessage';


import { DigitalEngagement } from './pages/DigitalEngagement';
import { AdminDashboard } from './pages/AdminDashboard';

// Legal pages
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfUse } from './pages/legal/TermsOfUse';
import { CookiePolicy } from './pages/legal/CookiePolicy';
import { Accessibility } from './pages/legal/Accessibility';

// Error pages
import { NotFound } from './pages/errors/NotFound';
import { AccessDenied } from './pages/errors/AccessDenied';
import { ServerError } from './pages/errors/ServerError';
import { Offline } from './pages/errors/Offline';

export default function App() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (pathname === '/meet-phyllis' || pathname === '/about') {
      setTimeout(() => {
        const element = document.getElementById('meet-phyllis');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else if (pathname === '/vision-manifesto' || pathname === '/vision' || pathname === '/manifesto') {
      setTimeout(() => {
        const element = document.getElementById('vision');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        
        {/* Main Section Route Aliases */}
        <Route path="meet-phyllis" element={<Home />} />
        <Route path="about" element={<Home />} />
        <Route path="vision-manifesto" element={<Home />} />
        <Route path="vision" element={<Home />} />
        <Route path="manifesto" element={<Home />} />
        
        {/* Movement & Volunteer Routes */}
        <Route path="join-the-movement" element={<JoinMovement />} />
        <Route path="get-involved" element={<JoinMovement />} />
        
        {/* Events Routes */}
        <Route path="news" element={<Navigate to="/events" replace />} />
        <Route path="news/:slug" element={<Navigate to="/events" replace />} />
        <Route path="events" element={<EventsHub />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="search" element={<SearchHub />} />
        
        {/* Engagement Routes */}
        <Route path="contact" element={<Contact />} />
        <Route path="report-issue" element={<ReportIssue />} />
        <Route path="communication-preferences" element={<CommunicationPreferences />} />
        <Route path="track-message" element={<TrackMessage />} />
        <Route path="digital-engagement" element={<DigitalEngagement />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        
        {/* Legal Routes */}
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfUse />} />
        <Route path="terms-of-use" element={<TermsOfUse />} />
        <Route path="cookies" element={<CookiePolicy />} />
        <Route path="accessibility" element={<Accessibility />} />
        
        {/* Explicit Error Routes */}
        <Route path="403" element={<AccessDenied />} />
        <Route path="500" element={<ServerError />} />
        <Route path="offline" element={<Offline />} />
        
        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}


