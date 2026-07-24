import type { Html, PlateMarker, SpecPair } from './common';

// GET /api/venues/:slug — one venue record, served by the API from the
// database, in the RENDERED proof's final section order: storyOpening →
// deadStory → exhibits(atlas, buildingPlate, showLayout) → measuredRoom →
// timeline → showLedger → facts.
//
// v2 (structure-driven): every section is optional; `structure` lists what
// this venue's record carries, in order. A blank venue is the floor — it
// still loads, rendering only the derived identity (name · place).
export type VenueRecord = {
  slug: string;
  name: string; // derived identity (always present)
  place: string; // "Ithaca, New York" (always present; '' when unlocated)
  structure: string[]; // ordered section keys; [] = blank venue
  placeNav?: {
    // "01 / 07 · Barton Hall" is derived (position/count live in the app);
    // the record carries the chapter labels + anchors in order.
    chapters: { anchor: string; label: string; short: string }[];
  };
  storyOpening?: {
    kicker: string; // "Barton Hall · Cornell University · Ithaca, New York"
    title: string;
    roman: string; // "I."
    paragraphs: Html[]; // dropcap applies to the first
    art: { caption: string; artwork: string }; // artwork = folio artwork-registry key
    footer: string[]; // ["Opened 1915", …]
  };
  deadStory?: {
    roman: string;
    kicker: string;
    title: string; // "\n" = authored <br>
    paragraphs: Html[];
    register: SpecPair[];
  };
  exhibits?: {
    heading: { kicker: string; title: string; lede: string };
    atlas: {
      plate: { label: string; title: string };
      controls: { id: string; label: string; defaultActive?: boolean }[]; // data-map-view
      artwork: string;
      addressCard: {
        kicker: string;
        title: string;
        lines: string; // "\n"-joined address block
        facts: SpecPair[];
        note: string;
      };
      caption: { fig: string; text: string; small: string };
    };
    buildingPlate: {
      plate: { label: string; title: string };
      controls: { id: string; label: string; defaultActive?: boolean }[]; // data-plate-view
      artwork: string;
      markers: PlateMarker[];
      inspectorCue: string;
      caption: { fig: string; text: string; small: string };
    };
    showLayout: {
      plate: { label: string; title: string };
      lede: string;
      artwork: string;
      key: {
        number: string;
        title: string;
        copy: string;
        link?: { label: string; href: string };
      }[];
      footer: { label: string; text: string };
    };
  };
  measuredRoom?: {
    heading: { kicker: string; title: string; lede: string };
    planDrawing: {
      header: { label: string; title: string };
      artwork: string;
      // Semantically a 2-tuple [original, current], typed string[] because
      // JSON module imports widen arrays.
      legend: string[];
    };
    dimensions: {
      primary: { kicker: string; value: string; note: string }; // value "\n"-broken
      register: SpecPair[];
      document: { kicker: string; title: string; small: Html; href: string };
    };
  };
  timeline?: {
    heading: { kicker: string; title: string; lede: string };
    entries: { time: string; number: string; title: string; copy: string; dead?: boolean }[];
  };
  showLedger?: {
    heading: { kicker: string; title: string; ordinal: string };
    chapter: {
      // monthYear/weekday are "\n"-broken; datetime is the <time datetime> attr
      date: { datetime?: string; day: string; monthYear: string; weekday: string };
      kicker: string;
      title: string;
      copy: Html; // contains song links, verbatim hrefs
      enter: { label: string; href: string };
      nightRegister: { kicker: string; facts: SpecPair[] };
      passages: { kicker: string; title: string; small: string; href: string }[];
    };
  };
  facts?: {
    heading: { kicker: string; title: string; lede: string };
    drawers: { kicker: string; title: string; copy: string; stamp: string }[];
  };
};
