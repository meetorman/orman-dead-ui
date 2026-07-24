import { AppShell, CollectionIcons, GlobalHeader, Rail, SiteFooter } from '@orman/design';
import type { ReactNode } from 'react';

const collectionIcons = CollectionIcons as Record<string, ReactNode>;

import { useNotice } from './notice';
import { useSite } from './site';

type Collection = 'shows' | 'songs' | 'venues' | 'heads' | 'rigs';

export type OrmanShellProps = {
  active?: Collection;
  footer?: boolean;
  onSearchSubmit?: (query: string) => void;
  children: ReactNode;
};

// App-level chrome — all of it data from /api/site ("labels and chrome" come
// from the API; this component just wires it to the shell components).
export function OrmanShell({ active, footer = true, onSearchSubmit, children }: OrmanShellProps) {
  const { show } = useNotice();
  const site = useSite();
  return (
    <AppShell
      rail={
        <Rail
          mark={site.rail.mark}
          items={site.nav.map((item) => ({
            ordinal: item.ordinal,
            label: item.label,
            sublabel: item.sublabel,
            href: item.href,
            icon: collectionIcons[item.id],
            active: item.id === active,
          }))}
          vista={site.rail.vista}
        />
      }
    >
      <GlobalHeader
        search={site.globalHeader.search}
        utility={site.globalHeader.utility}
        moonAriaLabel={site.globalHeader.moonAriaLabel}
        onSearchSubmit={onSearchSubmit ?? (() => show())}
        onMoonClick={() => show()}
      />
      {children}
      {footer && (
        <SiteFooter
          mark={site.siteFooter.mark}
          epigraph={site.siteFooter.epigraph}
          links={site.siteFooter.links}
        />
      )}
    </AppShell>
  );
}
