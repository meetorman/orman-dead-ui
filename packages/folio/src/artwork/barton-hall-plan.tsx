// Measured floor plan — SVG VERBATIM from folio-venue-proof.html (.plan-drawing).
export function BartonHallPlan() {
  return (
    <svg
      viewBox="0 0 920 500"
      role="img"
      aria-label="Diagrammatic floor plan showing Barton Hall's original drill floor and current indoor track"
    >
      <defs>
        <pattern id="plan-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0v25" />
        </pattern>
        <pattern id="plan-crowd" width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1" />
        </pattern>
      </defs>
      <rect className="plan-grid" x="25" y="25" width="870" height="450" fill="url(#plan-grid)" />
      <path className="plan-shell" d="M105 82h710l32 32v272l-32 32H105l-32-32V114Z" />
      <path className="plan-track" d="M223 139h474c94 0 94 222 0 222H223c-94 0-94-222 0-222Z" />
      <path
        className="plan-track-inner"
        d="M243 159h434c65 0 65 182 0 182H243c-65 0-65-182 0-182Z"
      />
      <g className="plan-labels">
        <text x="363" y="246">
          CURRENT 200 M
        </text>
        <text x="382" y="264">
          INDOOR TRACK
        </text>
        <text x="88" y="66">
          WEST
        </text>
        <text x="794" y="66">
          EAST
        </text>
      </g>
      <g className="dimension-lines">
        <path d="M105 445h710M105 437v16M815 437v16M46 114v272M38 114h16M38 386h16" />
        <text x="377" y="466">
          ORIGINAL DRILL SHED · 362 FT
        </text>
        <text transform="translate(25 326) rotate(-90)">ORIGINAL WIDTH · 228 FT</text>
      </g>
    </svg>
  );
}
