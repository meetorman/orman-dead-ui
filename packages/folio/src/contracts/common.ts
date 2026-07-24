// Shared contract conventions — these define the future API's shape (we work
// backwards from the rendered proofs; nothing here is fitted to the existing DB).
//
// Text conventions:
// - `Html` fields carry a CONSTRAINED inline-HTML subset transcribed verbatim from
//   the proofs: em, strong, b, i, br, span, a. Nothing else. Components render them
//   with dangerouslySetInnerHTML — fidelity beats purity here, and the strings are
//   our own fixtures (later: our own API).
// - Plain `string` fields are plain text. A literal "\n" marks a purely typographic
//   line break the proof authored as <br> INSIDE one field; components map it back.
// - Typographic characters are preserved byte-for-byte: ’ · — – × …
// - `href` values are the PROOF's original hrefs, verbatim. The folio link policy
//   decides at click time what navigates, opens externally, or shows the notice.

export type Html = string;

export type Ref = {
  // e.g. "c11" or "b78–95" (en-dash preserved)
  label: string;
  href: string;
};

export type SpecPair = {
  term: Html;
  value: Html;
  // Small annotation line under the value (e.g. dimension-register `small`)
  note?: Html;
};

export type Stat = {
  value: string;
  label: string;
  href?: string;
};

// A selectable numbered marker on an annotated figure. Coordinates are the
// artwork's own coordinate space (SVG user units of the plate drawing, or
// percentages for image hotspots — the artwork decides).
export type MarkerDetail = {
  index: string; // inspector index line, e.g. "01 · Open span"
  title: string;
  copy: string;
  // [term, value] pairs. Semantically 2-tuples, but typed string[][] because
  // TypeScript widens arrays when importing JSON modules (fixtures are JSON).
  facts: string[][];
  // Per-selection inspector footnote (instrument plate renders it into
  // .instrument-inspector-note; absent for plates without one).
  note?: string;
};

export type PlateMarker = {
  id: string; // data-venue-part / data-instrument-part value, verbatim
  number: string; // "01"…
  x: number;
  y: number;
  ariaLabel: string;
  defaultActive?: boolean;
  detail: MarkerDetail;
};
