import type { Html, Stat } from './common';

// GET /api/venues — the venues index (register of places).
export type VenuesIndex = {
  hero: {
    // ["Register of places", "Archive division 03"] — semantically a 2-tuple,
    // typed string[] because JSON module imports widen arrays.
    kicker: string[];
    title: string; // "Venues."
    deck: string; // "\n" = authored <br>
    lede: string;
    stats: Stat[];
    typeRegister: string[]; // ["Club","Theater",…]
  };
  finder: {
    heading: { kicker: string; title: string };
    searchLabel: string;
    searchPlaceholder: string;
    filters: { id: string; label: string }[]; // id = data-venue-filter value
    browseCue: { label: string; href: string };
  };
  directory: {
    heading: { kicker: string; title: string };
    totalOnFile: number;
    shownByDefault: number;
    letters: {
      letter: string; // "A"
      anchor: string; // "letter-a"
      venues: VenueRow[];
    }[];
    footer: { mark: string; note: Html; register: { label: string; href: string } };
  };
};

export type VenueRow = {
  sequence: string; // "001" — zero-padded, verbatim
  slug: string | null; // app route slug when the record is designed (barton-hall), else null
  href: string; // proof href, verbatim
  name: string;
  place: string; // "San Francisco, CA"
  type: string; // display type, e.g. "Ballroom"
  showCount: string; // "13 shows" — verbatim display string
  searchText: string; // data-name attribute, verbatim
  filterType: string; // data-type attribute, verbatim
};
