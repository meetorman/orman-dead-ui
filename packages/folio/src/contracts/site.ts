// GET /api/site — the app chrome as data. Labels, nav, rails, headers, footer,
// and the citation-link base all live in the database ("no content in code").
export type SiteChrome = {
  nav: {
    id: string; // CollectionIcons key: shows|songs|venues|heads|rigs
    ordinal: string;
    label: string;
    sublabel: string;
    href: string;
  }[];
  rail: {
    mark: { href: string; ariaLabel: string; imgSrc: string; imgAlt: string; tagline: string };
    vista: { imgSrc: string; quote: string; attribution: string };
  };
  folioRail: {
    mark: { href: string; ariaLabel: string; imgSrc: string; imgAlt: string; tagline: string };
    quote: { text: string; attribution: string };
    nightImgSrc: string;
  };
  globalHeader: HeaderChrome;
  globalHeaderFolio: HeaderChrome & { search: { name?: string } };
  siteFooter: {
    mark: string;
    epigraph: string;
    links: { label: string; href: string }[];
  };
  showRailSections: { target: string; label: string }[]; // SectionIcons keys
  refHrefBase: string; // citation-chip href base ('' = same-page anchors)
};

type HeaderChrome = {
  search: { id: string; label: string; placeholder: string; name?: string };
  utility: { note: string; links: { label: string; href: string }[] };
  moonAriaLabel: string;
};
