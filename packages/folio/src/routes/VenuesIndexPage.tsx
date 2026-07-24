import { Directory, Finder, IndexHero } from '@orman/design';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getJson } from '../app/api';
import { OrmanShell } from '../app/OrmanShell';
import { VenuesHeroArchitecture } from '../artwork/venues-hero-architecture';
import type { VenuesIndex } from '../contracts/venues';

// Filtering reproduces the proof's semantics exactly: a row matches when the
// query is a substring of its data-name (case-insensitive) AND the active
// type chip matches its data-type ('all' passes everything). Rows hide via
// [hidden]; letter headings stay; the count and empty state react.
function rowMatches(searchText: string, filterType: string, query: string, activeType: string) {
  const q = query.trim().toLowerCase();
  const matchesText = !q || searchText.toLowerCase().includes(q);
  const matchesType = activeType === 'all' || filterType === activeType;
  return matchesText && matchesType;
}

export function VenuesIndexPage() {
  const [data, setData] = useState<VenuesIndex | null>(null);
  const [query, setQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    getJson<VenuesIndex>('/api/venues').then((json) => {
      if (alive) setData(json);
    });
    return () => {
      alive = false;
    };
  }, []);

  // Proof behavior: '/' focuses the finder unless already typing in a field.
  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName ?? '';
      if (event.key !== '/' || ['INPUT', 'TEXTAREA'].includes(tag)) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, []);

  const groups = useMemo(
    () =>
      (data?.directory.letters ?? []).map((letter) => ({
        letter: letter.letter,
        anchor: letter.anchor,
        rows: letter.venues.map((venue) => ({
          sequence: venue.sequence,
          // D6: designed records route in-app; everything else keeps the proof
          // href and meets the link policy.
          href: venue.slug ? `/venues/${venue.slug}` : venue.href,
          name: venue.name,
          place: venue.place,
          type: venue.type,
          showCount: venue.showCount,
          searchText: venue.searchText,
          filterType: venue.filterType,
          hidden: !rowMatches(venue.searchText, venue.filterType, query, activeType),
        })),
      })),
    [data, query, activeType],
  );
  const shownCount = groups.reduce(
    (count, group) => count + group.rows.filter((row) => !row.hidden).length,
    0,
  );

  // D4: the global-search submit pipes into the finder and scrolls the
  // register into view — designed behavior on this page, kept.
  const pipeGlobalSearch = (globalQuery: string) => {
    setQuery(globalQuery);
    document.querySelector('#browse')?.scrollIntoView({ behavior: 'smooth' });
  };

  // One-shot paint like the proof's single parse: hold until the record is
  // ready (fixture is local-fast; revisit if a real API adds latency).
  if (!data) return null;

  return (
    <OrmanShell active="venues" onSearchSubmit={pipeGlobalSearch}>
      <IndexHero
        titleId="venues-title"
        architecture={<VenuesHeroArchitecture />}
        kicker={data.hero.kicker}
        title={data.hero.title}
        deck={data.hero.deck}
        lede={data.hero.lede}
        stats={data.hero.stats}
        registerLabel="Venue types"
        register={data.hero.typeRegister}
      />
      <Finder
        headingId="finder-title"
        heading={data.finder.heading}
        searchId="venue-search"
        searchLabel={data.finder.searchLabel}
        searchPlaceholder={data.finder.searchPlaceholder}
        filters={data.finder.filters}
        browseCue={{
          text: data.finder.browseCue.label.replace(/\s+\S+$/, ''),
          glyph: data.finder.browseCue.label.split(/\s+/).at(-1) ?? '',
          href: data.finder.browseCue.href,
        }}
        query={query}
        activeType={activeType}
        onQueryChange={setQuery}
        onTypeChange={setActiveType}
        inputRef={searchRef}
      />
      <Directory
        sectionId="browse"
        headingId="directory-title"
        heading={data.directory.heading}
        shownCount={shownCount}
        totalOnFile={data.directory.totalOnFile}
        alpha={data.directory.letters.map((letter) => ({
          label: letter.letter,
          anchor: letter.anchor,
        }))}
        groups={groups}
        emptyText="No rooms match this search."
        emptyVisible={shownCount === 0}
        footer={{
          mark: data.directory.footer.mark,
          note: data.directory.footer.note,
          register: data.directory.footer.register,
        }}
      />
    </OrmanShell>
  );
}
