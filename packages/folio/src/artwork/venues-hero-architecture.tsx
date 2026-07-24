// Etched hero backdrop for the venues index — SVG VERBATIM from
// folio-venues-proof.html (.hero-architecture). Artwork is consumer content:
// the design system takes it as a slot.
export function VenuesHeroArchitecture() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative — the proof renders it inside .hero-architecture[aria-hidden=true]
    <svg viewBox="0 0 1200 760">
      <defs>
        <pattern
          id="hero-stone"
          width="46"
          height="29"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-18)"
        >
          <path d="M0 1h46M0 28h46M13 1v13M36 15v13M0 15h46" />
        </pattern>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="1" y2="0">
          <stop stop-color="#080a09" />
          <stop offset=".35" stop-color="#080a09" stop-opacity=".72" />
          <stop offset="1" stop-color="#080a09" stop-opacity="0" />
        </linearGradient>
      </defs>
      <g className="hero-building">
        <path d="M500 542 975 390 975 216 500 67 235 227 235 399Z" fill="url(#hero-stone)" />
        <path d="M235 227 500 67 975 216 711 376Z" />
        <path d="M235 399 500 542 975 390M500 67v475M235 227 711 376 975 216M711 376v166" />
        <path d="M303 378v-73l52-31 52 17v118M449 423v-73l52-31 52 17v130M595 470v-73l52-31 52 17v130M741 423v-73l52-31 52 17v70M887 377v-73l52-31 36 12" />
        <path className="hero-red" d="M221 401 500 554 989 396" />
      </g>
    </svg>
  );
}
