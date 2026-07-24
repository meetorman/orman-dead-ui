import { NotImplementedNotice } from '@orman/design';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

// The one new behavior in Phase 1: a quick top-of-page notice for undesigned
// destinations. Auto-hides; re-triggering restarts the timer.
const NOTICE_MS = 2400;

const NoticeContext = createContext<{ show: () => void }>({ show: () => {} });

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const show = useCallback(() => {
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), NOTICE_MS);
  }, []);
  const value = useMemo(() => ({ show }), [show]);
  return (
    <NoticeContext.Provider value={value}>
      {children}
      {visible && <NotImplementedNotice />}
    </NoticeContext.Provider>
  );
}

export function useNotice() {
  return useContext(NoticeContext);
}
