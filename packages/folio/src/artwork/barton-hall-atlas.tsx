// Barton Hall place atlas (region + campus layers) — SVG GENERATED VERBATIM
// from the proof by web/tools/generate-artwork.py (do not hand-edit; regenerate).
export function BartonHallAtlas({ activeView }: { activeView: string }) {
  return (
    <svg viewBox="0 0 1100 610" role="img" aria-labelledby="atlas-map-title atlas-map-desc">
      <title id="atlas-map-title">Schematic location map for Barton Hall</title>
      <desc id="atlas-map-desc">
        An etched regional map of Ithaca and a campus plan locating Barton Hall on Statler Drive.
      </desc>
      <defs>
        <pattern id="map-grid" width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0v34" />
        </pattern>
        <pattern
          id="map-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(28)"
        >
          <path d="M0 0v7" />
        </pattern>
        <filter id="map-rough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".006 .04"
            numOctaves="2"
            seed="12"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale=".7" />
        </filter>
      </defs>
      <rect className="map-grid" width="1100" height="610" fill="url(#map-grid)" />
      <g
        className="map-region"
        data-map-layer="region"
        aria-hidden={activeView !== 'region' ? 'true' : undefined}
        filter="url(#map-rough)"
      >
        <g className="contours">
          <path d="M-40 88C85 24 224 44 316 117s191 78 296 18 250-67 528 31" />
          <path d="M-25 127c118-58 224-42 321 26s211 81 319 24 255-53 517 48" />
          <path d="M-16 171c126-48 219-29 315 35s213 83 326 32 255-36 500 62" />
          <path d="M-28 224c139-43 240-24 335 38s194 76 303 42 256-17 514 73" />
          <path d="M-40 280c149-37 257-16 350 36s191 69 303 47 266 4 517 88" />
          <path d="M-27 337c148-27 263-5 355 42s193 61 304 48 260 20 489 96" />
          <path d="M-44 399c161-21 269 2 364 42s190 51 302 49 250 35 495 102" />
        </g>
        <path
          className="cayuga"
          d="M519-35c-18 60-25 131-15 197 9 60 3 134-19 201-18 54-17 108 6 151 14 27 27 68 22 114h76c-8-43 2-84 18-119 24-51 29-106 13-163-18-65-18-130-7-196 11-68 2-131-17-185Z"
        />
        <g className="regional-roads">
          <path d="M168 500 402 419 544 409 717 326 965 240" />
          <path d="M224 173 383 268 535 408 704 515 915 571" />
          <path d="M83 355 271 350 440 383 535 408 788 409 1011 458" />
        </g>
        <g className="regional-labels">
          <text x="540" y="73" className="water-label">
            CAYUGA LAKE
          </text>
          <text x="398" y="467">
            ITHACA
          </text>
          <text x="695" y="345">
            CORNELL
          </text>
          <text x="138" y="527">
            ROUTE 13
          </text>
          <text x="812" y="399">
            ROUTE 366
          </text>
          <text x="736" y="558">
            NY 79
          </text>
        </g>
        <path className="route-mark" d="M410 449c54-35 99-41 133-38 48 4 84-12 134-59" />
        <g className="barton-pin" transform="translate(692 335)">
          <circle r="25" />
          <circle r="7" />
          <path d="M0-39V-71M-8-60 0-71l8 11" />
          <text x="38" y="-6">
            BARTON HALL
          </text>
          <text x="38" y="12">
            ITHACA, NEW YORK
          </text>
        </g>
        <g className="map-compass" transform="translate(1010 95)">
          <circle r="42" />
          <path d="M0-34 8-7 0 0-8-7ZM0 33l5-20-5-7-5 7Z" />
          <text x="-4" y="-52">
            N
          </text>
        </g>
      </g>
      <g
        className="map-campus"
        data-map-layer="campus"
        aria-hidden={activeView !== 'campus' ? 'true' : undefined}
      >
        <g className="campus-contours">
          <path d="M20 105c190-52 345-36 506 20s335 62 566-17" />
          <path d="M8 160c189-45 341-27 504 28s337 56 586-21" />
          <path d="M-7 216c181-38 337-17 501 34s339 49 617-28" />
          <path d="M-19 275c181-31 337-10 498 36s342 43 640-29" />
          <path d="M-27 337c177-24 329-6 495 39s347 39 660-29" />
        </g>
        <g className="campus-roads">
          <path d="M94 126 1003 488" />
          <path d="M225 526 456 38" />
          <path d="M488 563 699 89" />
          <path d="M783 594 909 157" />
          <path d="M149 310 924 310" />
        </g>
        <g className="campus-buildings">
          <path d="M208 117 334 165 295 252 168 203Z" />
          <path d="M364 190 500 242 451 351 315 300Z" />
          <path className="barton-building" d="M531 229 771 321 688 507 448 416Z" />
          <path d="M772 182 905 233 858 337 725 286Z" />
          <path d="M780 380 931 437 891 527 740 469Z" />
          <path d="M186 345 340 404 292 511 138 452Z" />
        </g>
        <g className="campus-labels">
          <text x="176" y="148">
            STATLER HALL
          </text>
          <text x="339" y="235">
            TEAGLE HALL
          </text>
          <text x="530" y="353" className="barton-text">
            BARTON HALL
          </text>
          <text x="776" y="227">
            SCHOELLKOPF
          </text>
          <text x="790" y="427">
            CRESCENT
          </text>
          <text x="142" y="397">
            ENGINEERING QUAD
          </text>
          <text x="517" y="91">
            GARDEN AVE
          </text>
          <text x="779" y="566">
            STATLER DRIVE
          </text>
        </g>
        <g className="barton-pin campus-pin" transform="translate(612 365)">
          <circle r="24" />
          <circle r="6" />
          <path d="M0-37V-64" />
        </g>
        <g className="map-scale">
          <path d="M69 546h210M69 540v12M174 540v12M279 540v12" />
          <text x="69" y="570">
            0
          </text>
          <text x="156" y="570">
            500
          </text>
          <text x="254" y="570">
            1,000 FT
          </text>
        </g>
      </g>
      <g className="map-registration">
        <path d="M28 28h42M49 7v42M1030 28h42M1051 7v42M28 582h42M49 561v42M1030 582h42M1051 561v42" />
        <text x="42" y="592">
          ORMAN DEAD · PLACE ATLAS
        </text>
        <text x="850" y="592">
          ORIENTATION STUDY
        </text>
      </g>
    </svg>
  );
}
