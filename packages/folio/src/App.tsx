import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { LinkPolicy } from './app/LinkPolicy';
import { NoticeProvider, useNotice } from './app/notice';
import { OrmanShell } from './app/OrmanShell';
import { SiteProvider } from './app/site';
import { ShowPage } from './routes/ShowPage';
import { VenuePage } from './routes/VenuePage';
import { VenuesIndexPage } from './routes/VenuesIndexPage';

// Home is intentionally empty (no design exists yet) — the shell + working
// nav is the deliverable.
function HomePage() {
  return <OrmanShell>{null}</OrmanShell>;
}

function NotFoundPage() {
  const { show } = useNotice();
  useEffect(() => show(), [show]);
  return <OrmanShell>{null}</OrmanShell>;
}

export function App() {
  return (
    <BrowserRouter>
      <NoticeProvider>
        <SiteProvider>
          <LinkPolicy />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/venues" element={<VenuesIndexPage />} />
            <Route path="/venues/:slug" element={<VenuePage />} />
            <Route path="/shows/:date" element={<ShowPage />} />
            <Route path="/shows/:date/:seq" element={<ShowPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SiteProvider>
      </NoticeProvider>
    </BrowserRouter>
  );
}
