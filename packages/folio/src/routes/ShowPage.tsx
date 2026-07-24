import {
  AppShell,
  FolioCaption,
  FolioPlayerProvider,
  FolioRail,
  FolioStats,
  GlobalHeader,
  LineupSection,
  SectionIcons,
  SetlistSection,
  ShowHero,
  StoryLeaf,
  Transport,
  VenueSchematic,
} from '@orman/design';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getJson } from '../app/api';
import { useNotice } from '../app/notice';
import { RecordMissing } from '../app/RecordMissing';
import { useSite } from '../app/site';
import { markerArtwork } from '../artwork/registry';
import type { ShowRecord } from '../contracts/show';

// Proof rail-sync: setlist sub-anchors collapse onto #setlist.
const SETLIST_HASHES = new Set(['#setlist', '#set-one', '#set-two', '#encore']);

function ShowRecordView({ data }: { data: ShowRecord }) {
  const { show } = useNotice();
  const site = useSite();
  const [activeHash, setActiveHash] = useState(() => location.hash || '#top');

  useLayoutEffect(() => {
    document.body.classList.add('folio-show-page');
    return () => document.body.classList.remove('folio-show-page');
  }, []);

  useEffect(() => {
    const sync = () => setActiveHash(location.hash || '#top');
    addEventListener('hashchange', sync);
    return () => removeEventListener('hashchange', sync);
  }, []);

  // Proof hash restore: double-rAF scroll to the arrival hash.
  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (!target) return;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' })),
    );
  }, []);

  const collapsed = SETLIST_HASHES.has(activeHash) ? '#setlist' : activeHash;

  const sections = data.structure.map((key) => {
    switch (key) {
      case 'hero':
        return (
          data.hero && (
            <ShowHero
              key={key}
              titleId="folio-title"
              kicker={data.hero.kicker}
              date={data.hero.date}
              title={data.hero.title}
              subtitle={data.hero.subtitle}
              deck={data.hero.deck}
              lede={data.hero.lede}
              ledeCitations={data.hero.ledeCitations}
              plate={data.hero.plate}
            />
          )
        );
      case 'contents':
        return (
          data.contents && (
            <FolioStats
              key={key}
              id="contents"
              ariaLabel="Contents of this show record"
              stats={data.contents.map((stat) => ({
                value: stat.value,
                label: stat.label,
                href: stat.href ?? '#',
              }))}
            />
          )
        );
      case 'caption':
        return (
          data.caption && (
            <FolioCaption
              key={key}
              top={data.caption.top}
              text={data.caption.text}
              cue={{
                text: data.caption.cue.label.replace(/\s+\S+$/, ''),
                glyph: data.caption.cue.label.split(/\s+/).at(-1) ?? '',
                href: data.caption.cue.href,
              }}
            />
          )
        );
      case 'storyLeaf':
        return (
          data.storyLeaf && (
            <StoryLeaf
              key={key}
              id="testimony"
              titleId="story-title"
              number={data.storyLeaf.number}
              register={data.storyLeaf.register}
              title={data.storyLeaf.title}
              rule={data.storyLeaf.rule}
              paragraphs={data.storyLeaf.paragraphs}
              foot={data.storyLeaf.foot}
            />
          )
        );
      case 'setlist':
        return (
          data.setlist && (
            <SetlistSection
              key={key}
              id="setlist"
              titleId="setlist-title"
              heading={data.setlist.heading}
              summary={data.setlist.summary}
              sets={data.setlist.sets}
              annotation={data.setlist.annotation}
            />
          )
        );
      case 'lineup':
        return (
          data.lineup && (
            <LineupSection
              key={key}
              id="lineup"
              titleId="lineup-title"
              heading={data.lineup.heading}
              summary={data.lineup.summary}
              intro={data.lineup.intro}
              ledgerTitle={data.lineup.ledgerTitle}
              people={data.lineup.people}
            />
          )
        );
      case 'venueSchematic':
        return (
          data.venueSchematic && (
            <VenueSchematic
              key={key}
              id="venue"
              titleId="venue-title"
              heading={data.venueSchematic.heading}
              location={data.venueSchematic.location}
              intro={data.venueSchematic.intro}
              plate={data.venueSchematic.plate}
              controls={data.venueSchematic.controls}
              markers={data.venueSchematic.markers}
              renderArtwork={markerArtwork(data.venueSchematic.artwork) ?? (() => null)}
              inspectorKey={data.venueSchematic.inspectorKey}
              caption={data.venueSchematic.caption}
            />
          )
        );
      case 'transport':
        return (
          data.transport && (
            <Transport
              key={key}
              overlineNote={data.transport.overlineNote}
              nowPlayingLabel={data.transport.nowPlayingLabel}
              locationLine={data.transport.locationLine}
              seekScale={data.transport.seekScale}
              sourceStamp={data.transport.sourceStamp}
              soundLabel={data.transport.soundLabel}
              mutedLabel={data.transport.mutedLabel}
              queueLabel={data.transport.queueLabel}
            />
          )
        );
      default:
        return null;
    }
  });

  return (
    <FolioPlayerProvider
      config={{
        tracks: data.setlist?.tracks ?? [],
        archiveBase: data.setlist?.recording?.archiveBase ?? '',
        defaultIndex: data.setlist?.defaultTrackIndex ?? 0,
        setNames: Object.fromEntries((data.setlist?.sets ?? []).map((set) => [set.id, set.name])),
        refHrefBase: site.refHrefBase,
      }}
    >
      <AppShell
        rail={
          <FolioRail
            mark={site.folioRail.mark}
            items={site.showRailSections.map((section) => ({
              target: section.target,
              label: section.label,
              icon: SectionIcons[section.target],
              active: collapsed === `#${section.target}`,
            }))}
            quote={site.folioRail.quote}
            nightImgSrc={site.folioRail.nightImgSrc}
          />
        }
      >
        <GlobalHeader
          variant="folio"
          search={site.globalHeaderFolio.search}
          utility={site.globalHeaderFolio.utility}
          moonAriaLabel={site.globalHeaderFolio.moonAriaLabel}
          onSearchSubmit={() => show()}
          onMoonClick={() => show()}
        />
        {sections}
      </AppShell>
    </FolioPlayerProvider>
  );
}

export function ShowPage() {
  const { date, seq } = useParams();
  const [data, setData] = useState<ShowRecord | null>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    let alive = true;
    setData(null);
    setMissing(false);
    getJson<ShowRecord>(seq ? `/api/shows/${date}/${seq}` : `/api/shows/${date}`)
      .then((json) => {
        if (alive) setData(json);
      })
      .catch(() => {
        if (alive) setMissing(true);
      });
    return () => {
      alive = false;
    };
  }, [date, seq]);
  if (missing) return <RecordMissing />;
  // One-shot paint (see VenuesIndexPage).
  if (!data) return null;
  return <ShowRecordView data={data} />;
}
