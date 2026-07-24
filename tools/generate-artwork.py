#!/usr/bin/env python3
"""Generate the cutaway + atlas artwork TSX mechanically from the proof HTML.

The SVGs are far too large to transcribe by hand without error (the byte
verifier caught exactly that). This reads the proof regions and emits TSX:
- class= -> className=
- cutaway: plate-marker groups removed (component renders them from fixture
  data); every id + url(#...)/aria-labelledby reference templated with the
  idPrefix; marker JSX + interaction shell appended.
- atlas: layer aria-hidden driven by the activeView prop.
Also patches the show-floor + plan files' svg body if drift is detected? No —
those are small and hand-maintained; this tool owns ONLY cutaway + atlas.
"""

import re

PROOF = '/home/ring/orman-dead-web/design/folio-venue-proof.html'
ART = '/home/ring/orman-dead-web/web/packages/folio/src/artwork'

CUTAWAY_IDS = [
    'venue-model-title', 'venue-model-desc', 'venue-floor-wash', 'venue-roof-wash',
    'venue-stone-pattern', 'venue-crowd-pattern', 'venue-hatch-pattern',
    'venue-floor-clip', 'venue-rough', 'venue-glow',
]


def region(html: str, start_needle: str, close_tag: str = '</svg>') -> str:
    start = html.index(start_needle)
    svg_start = html.index('<svg', start)
    svg_end = html.index(close_tag, svg_start) + len(close_tag)
    return html[svg_start:svg_end]


def to_jsx(svg: str) -> str:
    out = svg.replace(' class="', ' className="')
    # ensure void svg elements self-close (proof mostly self-closes already)
    out = re.sub(r'<(path|circle|rect|stop|ellipse|line)(\b[^>]*?)(?<!/)>', r'<\1\2/>', out)
    return out


def indent(text: str, pad: str) -> str:
    return '\n'.join(pad + line if line.strip() else line for line in text.splitlines())


def build_cutaway(html: str) -> str:
    svg = region(html, '<div class="hall-model')
    svg = re.sub(r'\s*<g className="plate-marker.*?</g>', '', to_jsx(svg), flags=re.S)
    # template ids + references with the prefix
    for name in CUTAWAY_IDS:
        svg = svg.replace(f'id="{name}"', f'id={{`${{p}}{name}`}}')
        svg = svg.replace(f'url(#{name})', f'url(#${{p}}{name})')
    svg = re.sub(r'(filter|fill|clip-path)="url\(#\$\{p\}([a-z-]+)\)"', r'\1={`url(#${p}\2)`}', svg)
    svg = svg.replace(
        'aria-labelledby="venue-model-title venue-model-desc"',
        'aria-labelledby={`${p}venue-model-title ${p}venue-model-desc`}',
    )
    # markers slot: insert between the labels group and the compass group
    marker_jsx = """      {markers?.map((marker) => (
        <g
          key={marker.id}
          className={marker.id === activeMarkerId ? 'plate-marker active' : 'plate-marker'}
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
"""
    svg = svg.replace('<g className="drawing-compass"',
                      marker_jsx + '      <g className="drawing-compass"')
    body = indent(svg, '    ')
    return f"""// Barton Hall axonometric cutaway — SVG GENERATED VERBATIM from the proof by
// web/tools/generate-artwork.py (do not hand-edit the drawing; regenerate).
// The five plate markers render from fixture data; ids are prefix-templated so
// two instances (story art + plate) can share a page, as the proof does.
export type CutawayMarker = {{
  id: string;
  number: string;
  x: number;
  y: number;
  ariaLabel: string;
}};

export function BartonHallCutaway({{
  idPrefix = '',
  markers,
  activeMarkerId,
  onMarkerSelect,
}}: {{
  idPrefix?: string;
  markers?: CutawayMarker[];
  activeMarkerId?: string;
  onMarkerSelect?: (id: string) => void;
}}) {{
  const p = idPrefix;
  return (
{body}
  );
}}
"""


def build_atlas(html: str) -> str:
    svg = to_jsx(region(html, '<div class="atlas-map'))
    svg = svg.replace(
        '<g className="map-region" data-map-layer="region"',
        '<g className="map-region" data-map-layer="region" '
        "aria-hidden={activeView !== 'region' ? 'true' : undefined}",
    )
    svg = svg.replace(
        '<g className="map-campus" data-map-layer="campus" aria-hidden="true"',
        '<g className="map-campus" data-map-layer="campus" '
        "aria-hidden={activeView !== 'campus' ? 'true' : undefined}",
    )
    body = indent(svg, '    ')
    return f"""// Barton Hall place atlas (region + campus layers) — SVG GENERATED VERBATIM
// from the proof by web/tools/generate-artwork.py (do not hand-edit; regenerate).
export function BartonHallAtlas({{ activeView }}: {{ activeView: string }}) {{
  return (
{body}
  );
}}
"""


def main() -> None:
    html = open(PROOF, encoding='utf-8').read()
    with open(f'{ART}/barton-hall-cutaway.tsx', 'w', encoding='utf-8') as f:
        f.write(build_cutaway(html))
    with open(f'{ART}/barton-hall-atlas.tsx', 'w', encoding='utf-8') as f:
        f.write(build_atlas(html))
    print('generated cutaway + atlas')


if __name__ == '__main__':
    main()


HALL_IDS = [
    'hall-model-title', 'hall-model-desc', 'hall-floor-wash', 'hall-roof-wash',
    'hall-stone-pattern', 'hall-crowd-pattern', 'hall-hatch-pattern',
    'hall-floor-clip', 'hall-rough', 'hall-glow', 'setlist-tablet', 'setlist-stone',
]


def build_hall_schematic() -> None:
    """Show-page venue schematic (folio-proof.html .venue-model svg)."""
    html = open('/home/ring/orman-dead-web/design/folio-proof.html', encoding='utf-8').read()
    svg = region(html, '<div class="venue-model view-show" data-venue-model>')
    svg = re.sub(r'\s*<g className="hall-marker.*?</g>', '', to_jsx(svg), flags=re.S)
    for name in HALL_IDS:
        svg = svg.replace(f'id="{name}"', f'id="{name}"')  # single instance: ids stay verbatim
    marker_jsx = """      {markers?.map((marker) => (
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
"""
    svg = svg.replace('<g className="hall-compass"', marker_jsx + '      <g className="hall-compass"')
    body = indent(svg, '    ')
    out = f"""// Barton Hall show-page schematic — SVG GENERATED VERBATIM from folio-proof.html
// by web/tools/generate-artwork.py (do not hand-edit; regenerate).
export type HallMarker = {{
  id: string;
  number: string;
  x: number;
  y: number;
  ariaLabel: string;
}};

export function BartonHallSchematic({{
  markers,
  activeMarkerId,
  onMarkerSelect,
}}: {{
  markers?: HallMarker[];
  activeMarkerId?: string;
  onMarkerSelect?: (id: string) => void;
}}) {{
  return (
{body}
  );
}}
"""
    with open(f'{ART}/barton-hall-schematic.tsx', 'w', encoding='utf-8') as f:
        f.write(out)
    print('generated schematic')


build_hall_schematic()
