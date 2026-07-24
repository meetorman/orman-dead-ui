// Show-night floor plan — SVG VERBATIM from folio-venue-proof.html (.show-floor-map).
export function BartonHallShowFloor() {
  return (
    <svg
      viewBox="0 0 1000 500"
      role="img"
      aria-label="Diagrammatic show-night floor plan for the Grateful Dead at Barton Hall on May 8, 1977"
    >
      <defs>
        <pattern id="night-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0v26" />
        </pattern>
        <pattern id="night-crowd" width="15" height="15" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.2" />
          <path d="M4 7v5M1 10h6" />
        </pattern>
      </defs>
      <rect className="night-grid" x="25" y="25" width="950" height="450" fill="url(#night-grid)" />
      <path className="night-shell" d="M95 72h810l29 29v298l-29 29H95l-29-29V101Z" />
      <path className="night-audience" d="M185 117h575v266H185Z" fill="url(#night-crowd)" />
      <path className="night-aisle" d="M416 117h74v266h-74Z" />
      <g className="night-stage">
        <path d="M774 117h104v266H774Z" />
        <path d="M764 107v286" />
        <circle cx="798" cy="198" r="7" />
        <circle cx="828" cy="224" r="7" />
        <circle cx="799" cy="254" r="7" />
        <circle cx="833" cy="285" r="7" />
        <circle cx="800" cy="316" r="7" />
        <circle cx="854" cy="255" r="7" />
      </g>
      <g className="night-tape">
        <path d="M358 230h34v42h-34Z" />
        <path d="M363 235h24M363 244h24M363 253h14" />
      </g>
      <g className="night-labels">
        <text x="797" y="92">
          STAGE
        </text>
        <text x="323" y="407">
          GENERAL ADMISSION FLOOR
        </text>
        <text x="330" y="221">
          TWO-TRACK POSITION
        </text>
        <text x="79" y="57">
          WEST
        </text>
        <text x="872" y="57">
          EAST
        </text>
      </g>
      <g className="night-marker" transform="translate(824 252)">
        <circle r="18" />
        <circle r="4" />
        <text x="27" y="4">
          01 · BAND
        </text>
      </g>
      <g className="night-marker" transform="translate(375 251)">
        <circle r="18" />
        <circle r="4" />
        <text x="27" y="4">
          02 · RECORDING
        </text>
      </g>
      <g className="night-marker" transform="translate(282 164)">
        <circle r="18" />
        <circle r="4" />
        <text x="27" y="4">
          03 · AUDIENCE
        </text>
      </g>
      <g className="night-registration">
        <path d="M40 40h36M58 22v36M924 40h36M942 22v36M40 460h36M58 442v36M924 460h36M942 442v36" />
        <text x="65" y="470">
          SHOW 1977–05–08 · LAYOUT LAYER
        </text>
        <text x="751" y="470">
          POSITIONS DIAGRAMMATIC
        </text>
      </g>
    </svg>
  );
}
