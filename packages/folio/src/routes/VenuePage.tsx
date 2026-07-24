import {
  CutawayPlate,
  DeadStory,
  FactDrawers,
  MeasuredRoom,
  MuseumHeading,
  PlaceAtlas,
  PlaceNav,
  ShowLayoutPlate,
  ShowLedger,
  useJourney,
  useJourneyReveals,
  VenueStoryOpening,
  VenueTimeline,
} from '@orman/design';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getJson } from '../app/api';
import { OrmanShell } from '../app/OrmanShell';
import { RecordMissing } from '../app/RecordMissing';
import { atlasArtwork, markerArtwork, staticArtwork } from '../artwork/registry';
import type { VenueRecord } from '../contracts/venue';

// Reveal-on-scroll targets, verbatim from the proof's target list.
const REVEAL_SELECTORS = [
  '.dead-venue-story>header',
  '.dead-story-copy',
  '.dead-story-register',
  '.venue-exhibits>.museum-heading',
  '.venue-exhibit-stack>*',
  '.measured-room>.museum-heading',
  '.measurement-sheet',
  '.venue-timeline>.museum-heading',
  '.timeline-track',
  '.venue-show-ledger>header',
  '.show-chapter',
  '.venue-archive>.museum-heading',
  '.archive-drawers',
] as const;

// D6: cross-record links in record content route to the show record. The
// target date is data — the ledger chapter's datetime.
function mapShowHref(href: string, showDate: string | undefined): string {
  if (!href.includes('folio-proof.html') || !showDate) return href;
  const hash = href.includes('#') ? `#${href.split('#')[1]}` : '';
  return `/shows/${showDate}${hash}`;
}

function VenueRecordView({ data }: { data: VenueRecord }) {
  const navigate = useNavigate();
  const chapterAnchors = useMemo(
    () => (data.placeNav?.chapters ?? []).map((chapter) => chapter.anchor),
    [data],
  );
  useJourney(chapterAnchors);
  useJourneyReveals(REVEAL_SELECTORS);
  // Pre-paint for the same reason as useJourney: the dot-rail mode must be
  // the nav's FIRST painted state, or its mode-switch transition fires.
  useLayoutEffect(() => {
    document.body.classList.add('venue-detail-page');
    return () => document.body.classList.remove('venue-detail-page');
  }, []);

  const ledgerShowDate = data.showLedger?.chapter.date.datetime;

  const sections = data.structure.map((key) => {
    switch (key) {
      case 'storyOpening':
        return (
          data.storyOpening && (
            <VenueStoryOpening
              key={key}
              id="top-story"
              titleId="venue-story-title"
              kicker={data.storyOpening.kicker}
              title={data.storyOpening.title}
              roman={data.storyOpening.roman}
              paragraphs={data.storyOpening.paragraphs}
              art={{
                artwork: staticArtwork(data.storyOpening.art.artwork, { idPrefix: 'story-' }),
                caption: data.storyOpening.art.caption,
                captionId: 'building-art-caption',
              }}
              footer={data.storyOpening.footer}
            />
          )
        );
      case 'deadStory':
        return (
          data.deadStory && (
            <DeadStory
              key={key}
              id="dead-at-barton"
              titleId="dead-story-title"
              roman={data.deadStory.roman}
              kicker={data.deadStory.kicker}
              title={data.deadStory.title}
              paragraphs={data.deadStory.paragraphs}
              register={data.deadStory.register}
            />
          )
        );
      case 'exhibits':
        return (
          data.exhibits && (
            <section
              key={key}
              className="venue-exhibits"
              id="exhibits"
              aria-labelledby="exhibits-title"
            >
              <MuseumHeading
                kicker={data.exhibits.heading.kicker}
                title={data.exhibits.heading.title}
                titleId="exhibits-title"
                lede={data.exhibits.heading.lede}
              />
              <div className="venue-exhibit-stack" data-exhibit-stack>
                <PlaceAtlas
                  id="place"
                  titleId="atlas-title"
                  plate={data.exhibits.atlas.plate}
                  controls={data.exhibits.atlas.controls}
                  renderArtwork={atlasArtwork(data.exhibits.atlas.artwork) ?? (() => null)}
                  addressCard={data.exhibits.atlas.addressCard}
                  caption={data.exhibits.atlas.caption}
                />
                <CutawayPlate
                  id="building-plate"
                  plate={data.exhibits.buildingPlate.plate}
                  controls={data.exhibits.buildingPlate.controls}
                  controlsAriaLabel="Venue drawing layer"
                  markers={data.exhibits.buildingPlate.markers}
                  renderArtwork={markerArtwork(data.exhibits.buildingPlate.artwork) ?? (() => null)}
                  inspectorCue={data.exhibits.buildingPlate.inspectorCue}
                  caption={data.exhibits.buildingPlate.caption}
                />
                <ShowLayoutPlate
                  titleId="show-layout-title"
                  plate={data.exhibits.showLayout.plate}
                  lede={data.exhibits.showLayout.lede}
                  artwork={staticArtwork(data.exhibits.showLayout.artwork)}
                  entries={data.exhibits.showLayout.key.map((entry) => ({
                    ...entry,
                    link: entry.link && {
                      ...entry.link,
                      href: mapShowHref(entry.link.href, ledgerShowDate),
                    },
                  }))}
                  footer={data.exhibits.showLayout.footer}
                />
              </div>
            </section>
          )
        );
      case 'measuredRoom':
        return (
          data.measuredRoom && (
            <MeasuredRoom
              key={key}
              id="architecture"
              titleId="measured-title"
              heading={data.measuredRoom.heading}
              planDrawing={{
                header: data.measuredRoom.planDrawing.header,
                artwork: staticArtwork(data.measuredRoom.planDrawing.artwork),
                legend: data.measuredRoom.planDrawing.legend,
              }}
              dimensions={data.measuredRoom.dimensions}
            />
          )
        );
      case 'timeline':
        return (
          data.timeline && (
            <VenueTimeline
              key={key}
              id="timeline"
              titleId="timeline-title"
              heading={data.timeline.heading}
              entries={data.timeline.entries}
            />
          )
        );
      case 'showLedger':
        return (
          data.showLedger && (
            <ShowLedger
              key={key}
              id="shows"
              titleId="show-ledger-title"
              heading={data.showLedger.heading}
              chapter={{
                ...data.showLedger.chapter,
                enter: {
                  text: data.showLedger.chapter.enter.label.replace(/\s+\S+$/, ''),
                  glyph: data.showLedger.chapter.enter.label.split(/\s+/).at(-1) ?? '',
                  href: mapShowHref(data.showLedger.chapter.enter.href, ledgerShowDate),
                },
              }}
            />
          )
        );
      case 'facts':
        return (
          data.facts && (
            <FactDrawers
              key={key}
              id="facts"
              titleId="archive-title"
              heading={data.facts.heading}
              drawers={data.facts.drawers}
            />
          )
        );
      default:
        return null;
    }
  });

  return (
    <OrmanShell
      active="venues"
      onSearchSubmit={(query) => navigate(`/venues?query=${encodeURIComponent(query)}#browse`)}
    >
      {data.placeNav && (
        <PlaceNav ariaLabel={`${data.name} record`} chapters={data.placeNav.chapters} />
      )}
      {data.structure.length === 0 && (
        // The floor: a venue with nothing authored yet still loads — its
        // identity line is the whole record until the story arrives as data.
        <MuseumHeading kicker={data.place} title={data.name} titleId="venue-identity" lede="" />
      )}
      {sections}
    </OrmanShell>
  );
}

export function VenuePage() {
  const { slug } = useParams();
  const [data, setData] = useState<VenueRecord | null>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    let alive = true;
    setData(null);
    setMissing(false);
    getJson<VenueRecord>(`/api/venues/${slug}`)
      .then((json) => {
        if (alive) setData(json);
      })
      .catch(() => {
        if (alive) setMissing(true);
      });
    return () => {
      alive = false;
    };
  }, [slug]);
  if (missing) return <RecordMissing />;
  // One-shot paint (see VenuesIndexPage).
  if (!data) return null;
  return <VenueRecordView data={data} />;
}
