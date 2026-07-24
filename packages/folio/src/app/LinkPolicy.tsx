import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useNotice } from './notice';
import { isDesignedPath, LAN_INTERNAL_HOSTS } from './routes';

function scrollToHash(hash: string): boolean {
  const target = document.querySelector(hash);
  if (!target) return false;
  // Proof semantics: double-rAF before the scroll (hash restore behavior).
  requestAnimationFrame(() =>
    requestAnimationFrame(() => target.scrollIntoView({ block: 'start' })),
  );
  return true;
}

// One capture-phase click policy for the whole app (plan §Routing):
// designed hrefs navigate client-side; real external links keep working as in
// the proofs; everything else shows the notice. Components stay dumb <a>s.
export function LinkPolicy() {
  const navigate = useNavigate();
  const { show } = useNotice();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = new URL(anchor.href, location.href);

      if (url.origin !== location.origin) {
        // Internal-but-undesigned services → notice; the wider web stays real.
        if (LAN_INTERNAL_HOSTS.has(url.host)) {
          event.preventDefault();
          show();
        }
        return;
      }

      const rawHref = anchor.getAttribute('href') ?? '';
      if (rawHref.startsWith('#')) {
        // In-page anchor: valid targets scroll (CSS smooth), dead ones notice.
        if (!document.querySelector(rawHref)) {
          event.preventDefault();
          show();
        }
        return;
      }

      event.preventDefault();
      if (!isDesignedPath(url.pathname)) {
        show();
        return;
      }
      if (url.pathname === location.pathname && url.hash) {
        if (!scrollToHash(url.hash)) show();
        return;
      }
      navigate(url.pathname + url.search + url.hash);
      if (url.hash) scrollToHash(url.hash);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate, show]);

  return null;
}
