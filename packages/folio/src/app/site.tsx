import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import type { SiteChrome } from '../contracts/site';
import { getJson } from './api';

// Site chrome (nav, rails, headers, footer, refHrefBase) is data, fetched once
// before first paint — the app holds rendering until it arrives so every page
// keeps the proofs' one-shot-paint semantics.

const SiteContext = createContext<SiteChrome | null>(null);

export function useSite(): SiteChrome {
  const chrome = useContext(SiteContext);
  if (!chrome) throw new Error('useSite requires <SiteProvider>');
  return chrome;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [chrome, setChrome] = useState<SiteChrome | null>(null);
  useEffect(() => {
    let alive = true;
    getJson<SiteChrome>('/api/site').then((json) => {
      if (alive) setChrome(json);
    });
    return () => {
      alive = false;
    };
  }, []);
  if (!chrome) return null;
  return <SiteContext.Provider value={chrome}>{children}</SiteContext.Provider>;
}
