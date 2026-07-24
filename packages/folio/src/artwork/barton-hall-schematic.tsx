// Barton Hall show-page schematic — SVG GENERATED VERBATIM from folio-proof.html
// by web/tools/generate-artwork.py (do not hand-edit; regenerate).
export type HallMarker = {
  id: string;
  number: string;
  x: number;
  y: number;
  ariaLabel: string;
};

export function BartonHallSchematic({
  markers,
  activeMarkerId,
  onMarkerSelect,
}: {
  markers?: HallMarker[];
  activeMarkerId?: string;
  onMarkerSelect?: (id: string) => void;
}) {
  return (
    <svg viewBox="0 0 1200 720" role="img" aria-labelledby="hall-model-title hall-model-desc">
      <title id="hall-model-title">Axonometric cutaway study of Barton Hall</title>
      <desc id="hall-model-desc">
        An interactive architectural drawing showing the fieldstone shell, roof trusses, audience
        floor, stage, and recording position.
      </desc>
      <defs>
        <linearGradient id="hall-floor-wash" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#c09a76" stop-opacity=".06" />
          <stop offset="1" stop-color="#5a3a2c" stop-opacity=".16" />
        </linearGradient>
        <linearGradient id="hall-roof-wash" x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#c09a76" stop-opacity=".17" />
          <stop offset="1" stop-color="#2b211b" stop-opacity=".04" />
        </linearGradient>
        <pattern
          id="hall-stone-pattern"
          width="43"
          height="28"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-18)"
        >
          <path
            d="M0 1h43M0 27h43M12 1v12M34 14v13M0 14h43"
            fill="none"
            stroke="#c09a76"
            stroke-opacity=".13"
            stroke-width="1"
          />
        </pattern>
        <pattern
          id="hall-crowd-pattern"
          width="20"
          height="18"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(18)"
        >
          <circle cx="5" cy="5" r="1.5" fill="#c09a76" fill-opacity=".55" />
          <path d="M5 8v5M2 11h6" stroke="#c09a76" stroke-opacity=".24" stroke-width="1" />
        </pattern>
        <pattern
          id="hall-hatch-pattern"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(35)"
        >
          <path d="M0 0v8" stroke="#c09a76" stroke-opacity=".2" stroke-width="1" />
        </pattern>
        <clipPath id="hall-floor-clip">
          <path d="M205 451 681 606 978 426 502 271Z" />
        </clipPath>
        <filter id="hall-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".012 .08"
            numOctaves="2"
            seed="8"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale=".8" />
        </filter>
        <filter id="hall-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="hall-registration" aria-hidden="true">
        <path d="M48 58h48M72 34v48M1104 58h48M1128 34v48M48 642h48M72 618v48M1104 642h48M1128 618v48" />
        <path d="M72 682h220M908 682h220" />
        <text x="72" y="705">
          PLATE IV · AXONOMETRIC RECONSTRUCTION
        </text>
        <text x="914" y="705">
          DIAGRAMMATIC · NOT TO SCALE
        </text>
      </g>

      <g className="hall-interior-layer" filter="url(#hall-rough)">
        <path className="hall-floor" d="M170 470 690 640 1020 440 500 270Z" />
        <path className="hall-floor-inset" d="M205 451 681 606 978 426 502 271Z" />

        <g className="hall-bleachers">
          <path d="M247 416 671 554 702 535 278 397Z" />
          <path d="M276 388 700 526M292 377 716 515M308 366 732 504" />
          <path d="M557 299 955 429 928 446 530 316Z" />
          <path d="M575 288 973 418M591 278 989 408M607 267 1005 397" />
        </g>

        <g className="hall-trusses">
          <path d="M222 347 387 172 552 455M306 375 471 200 636 482M390 402 555 227 720 510M474 430 639 255 804 537M558 457 723 282 888 565M642 485 807 310 972 592" />
          <path
            className="hall-truss-ties"
            d="M222 347 552 455M306 375 636 482M390 402 720 510M474 430 804 537M558 457 888 565M642 485 972 592"
          />
        </g>
      </g>

      <g className="hall-show-layer" filter="url(#hall-rough)">
        <g className="hall-audience" clip-path="url(#hall-floor-clip)">
          <path d="M250 416 574 522 836 363 512 257Z" fill="url(#hall-crowd-pattern)" />
          <path className="hall-center-aisle" d="M448 424 504 442 766 283 711 266Z" />
        </g>
        <g className="hall-stage">
          <path className="hall-stage-deck" d="M571 570 671 603 963 426 863 393Z" />
          <path className="hall-stage-face" d="M571 570v22l100 33 292-177v-22L671 603Z" />
          <path
            className="hall-stage-line"
            d="M603 562 703 595M640 540l100 33M677 518l100 33M714 496l100 33M751 473l100 33M788 451l100 33"
          />
          <circle cx="755" cy="509" r="7" />
          <circle cx="787" cy="489" r="7" />
          <circle cx="821" cy="469" r="7" />
          <circle cx="853" cy="450" r="7" />
          <circle cx="878" cy="465" r="7" />
          <circle cx="909" cy="444" r="7" />
          <path className="hall-stage-accent" d="M567 567 670 601 965 422" />
        </g>
        <g className="hall-recording-position">
          <path d="M455 429v-27l17-10 17 6v27l-17 10Z" />
          <path d="m462 402 10 4 10-6M466 420h13" />
        </g>
      </g>

      <g className="hall-shell-layer" filter="url(#hall-rough)">
        <path className="hall-wall hall-wall-back" d="M500 270 1020 440 1020 300 500 130Z" />
        <path className="hall-wall hall-wall-end" d="M690 640 1020 440 1020 300 855 325 690 500Z" />
        <path className="hall-wall hall-wall-cut" d="M170 470 690 640 690 500 170 330Z" />
        <path className="hall-wall hall-wall-cut" d="M170 470 500 270 500 130 335 155 170 330Z" />
        <path
          className="hall-stone"
          d="M500 270 1020 440 1020 300 500 130ZM690 640 1020 440 1020 300 855 325 690 500Z"
        />
        <path className="hall-roof hall-roof-solid" d="M500 130 1020 300 855 325 335 155Z" />
        <path className="hall-roof hall-roof-cut" d="M170 330 690 500 855 325 335 155Z" />
        <path className="hall-ridge" d="M335 155 855 325" />
        <path
          className="hall-edge"
          d="M170 470 690 640 1020 440 1020 300 855 325 690 500 170 330 335 155 500 130 1020 300M500 130 500 270M170 470 500 270 1020 440M335 155 855 325"
        />
        <g className="hall-windows">
          <path d="M579 174v61l50 16v-61ZM668 203v61l50 16v-61ZM757 232v61l50 16v-61ZM846 261v61l50 16v-61ZM935 290v61l50 16v-61" />
          <path d="M735 489v61l51-31v-61ZM821 437v61l51-31v-61ZM907 385v61l51-31v-61" />
        </g>
      </g>

      <g className="hall-labels" aria-hidden="true">
        <path d="M161 292h-77" />
        <text x="80" y="283">
          WEST GABLE
        </text>
        <path d="M1012 459h108" />
        <text x="1017" y="482">
          FIELDSTONE SHELL
        </text>
        <path d="M866 329h173" />
        <text x="947" y="318">
          RIDGE
        </text>
      </g>

      {markers?.map((marker) => (
        <g
          key={marker.id}
          className={marker.id === activeMarkerId ? 'hall-marker active' : 'hall-marker'}
          data-venue-part={marker.id}
          tabIndex={0}
          role="button"
          aria-label={marker.ariaLabel}
          onClick={() => onMarkerSelect?.(marker.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onMarkerSelect?.(marker.id);
            }
          }}
        >
          <circle cx={marker.x} cy={marker.y} r="15" />
          <circle cx={marker.x} cy={marker.y} r="4" />
          <path d={`M${marker.x - 15} ${marker.y}h-26`} />
          <text x={marker.x + 12} y={marker.y + 4}>
            {marker.number}
          </text>
        </g>
      ))}
      <g className="hall-compass" aria-hidden="true" transform="translate(104 546)">
        <circle r="38" />
        <path d="M0-30 7-6 0 0-7-6ZM0 30l5-19-5-6-5 6Z" />
        <text x="-4" y="-46">
          N
        </text>
      </g>
      <g className="hall-scale" aria-hidden="true">
        <path d="M84 620h160M84 615v10M164 615v10M244 615v10" />
        <text x="84" y="642">
          0
        </text>
        <text x="151" y="642">
          50
        </text>
        <text x="226" y="642">
          100 FT
        </text>
      </g>
    </svg>
  );
}
