import type { Html, PlateMarker, Ref, SpecPair, Stat } from './common';

// GET /api/shows/:date (canonical, day_sequence 1) and /api/shows/:date/:seq —
// one show record, served by the API from the database.
//
// v2 (structure-driven): `structure` lists the sections this page carries, in
// order; the page renders exactly that. Sparse shows are the floor — a derived
// hero (date · venue) and the setlist ledger, nothing else. Barton Hall's
// composed record carries every section below and renders byte-identically to
// the retired fixture.
export type ShowRecord = {
  date: string; // "1977-05-08"
  seq: number; // day_sequence (multi-show dates: 2, 3, …)
  canonicalPath: string; // "/shows/1977-05-08" or "/shows/1966-07-16/2"
  siblings?: { seq: number; venueName: string; path: string }[];
  structure: string[]; // ordered section keys, e.g. ["hero","setlist"]
  hero?: {
    // semantically a 2-tuple; string[] because JSON widens
    kicker: string[];
    date: { day: string; monthYear: string }; // "08", "May\n1977"
    title: string; // "\n" = authored <br>
    subtitle?: string; // the <span> line of the lockup
    deck?: string;
    lede?: Html;
    ledeCitations?: Ref[];
    plate?: { src: string; alt: string; credit: string; source: { label: string; href: string } };
  };
  contents?: Stat[]; // the folio-stats band (anchor hrefs)
  caption?: { top: string; text: string; cue: { label: string; href: string } };
  storyLeaf?: {
    number: string; // "I."
    register: string;
    title: string;
    rule: string[]; // semantically ["08","05","77"]
    paragraphs: { text: Html; citations: Ref[] }[];
    foot: string[]; // semantically a 2-tuple
  };
  setlist?: {
    heading: { number: string; register: string; title: string };
    summary: { value: string; label: string }[];
    // id semantically 'I'|'II'|'E'; string because JSON widens literals
    sets: { id: string; anchor: string; name: string; meta: string; playLabel: string }[];
    defaultTrackIndex?: number;
    // absent => no recording on file: the ledger renders static
    recording?: { archiveBase: string; sourceStamp: { label: string; id: string; small: string } };
    tracks: Track[];
    ledgerAriaLabel: string;
    annotation?: { kicker: string; sourceLabel: Html; playLabel: string; pauseLabel: string };
  };
  lineup?: {
    heading: { number: string; register: string; title: string };
    summary: { value?: string; label: string }[];
    intro: string;
    ledgerTitle: string[]; // semantically a 2-tuple
    people: Person[];
  };
  transport?: {
    overlineNote: string; // e.g. "Betty board · 2-track"
    nowPlayingLabel: string;
    locationLine: Html; // "May 8, 1977 <i>·</i> Barton Hall…"
    seekScale: string[];
    sourceStamp: { label: string; id: string; small: string };
    soundLabel: string;
    mutedLabel: string;
    queueLabel: string;
  };
  venueSchematic?: {
    heading: { number: string; register: string; title: string };
    location: { name: string; place: string };
    intro: string;
    plate: { label: string; title: string };
    controls: { id: string; label: string; defaultActive?: boolean }[]; // data-venue-view
    artwork: string;
    markers: PlateMarker[];
    inspectorKey: { className: string; label: string }[];
    caption: { fig: string; text: string; small: string };
  };
};

export type Track = {
  set: string; // semantically 'I'|'II'|'E'; JSON widens literals
  pos?: number; // absent for tape rows
  tape?: boolean;
  segue?: boolean;
  title: string;
  duration?: string; // "6:45"; absent when no recording covers the row
  file?: string; // archive filename; absent when no recording covers the row
  page?: string; // song-record href, verbatim
  note: string;
  refs?: string[]; // ref labels only; hrefs derive from the site refHrefBase
  summary?: string; // performanceSummaries override, when present
  notable?: boolean;
};

export type Person = {
  id: string; // data-lineup-person value
  index: string; // "01"
  name: string;
  role: string;
  // Dossier-heading role when it differs from the ledger role (e.g. Lesh:
  // ledger "Bass · vocals" vs dossier "Electric bass · vocals").
  dossierRole?: string;
  dossier?: Dossier; // absent on floor pages (no equipment record yet)
};

// The standard dossier body; Garcia's deep rig dossier is richer.
export type Dossier = {
  fileLine: string; // "Lineup file 02 · Guitar"
  status: { className: string; label: string }; // className semantically ''|'audible'|'research'
  kind: string; // semantically 'rig'|'standard'
  standard?: {
    gearLabel: string;
    title: string; // "\n" = authored <br>, second line in <span>
    copy: string;
    futureRecord: string;
    evidence: { term: string; value: Html }[];
  };
  rig?: RigDossier;
};

export type RigDossier = {
  instrumentPlate: {
    plateLine: string;
    title: Html; // "Travis Bean <em>TB500</em>"
    instruction: string;
    image: { src: string; alt: string };
    hotspots: (Omit<PlateMarker, 'x' | 'y'> & {
      xPct: number;
      yPct: number;
      shortLabel: string;
      sticker?: boolean;
    })[];
    inspector: {
      defaultIndex: string;
      defaultTitle: string;
      defaultDescription: string;
      roleTerm: string;
      roleDefault: string;
      mattersTerm: string;
      mattersDefault: string;
      cue: string;
    };
    caption: { fig: string; text: string };
  };
  equipmentPlates: {
    gearLabel: string;
    title: string;
    lede: string;
    cards: {
      className: string; // effect-card / preamp-card / power-card / speaker-card
      placeholder: { label: string; glyph: string };
      tier: { className: string; label: string };
      kicker: string;
      title: string;
      copy: string;
      specs: SpecPair[];
      history?: { label: string; text: Html };
    }[];
  };
  notes: {
    number: string; // "A."
    gearLabel: string;
    title: string;
    copy?: string;
    specs?: SpecPair[];
    footnote?: string;
    openQuestion?: { label: string; text: string };
  }[];
  boundaries: {
    gearLabel: string;
    title: string; // "\n" = authored <br>
    copy: string;
    bullets: Html[];
  };
  inferenceNote: string;
  sources: { label: string; links: { label: string; href: string }[] };
};
