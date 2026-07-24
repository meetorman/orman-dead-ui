#!/usr/bin/env python3
"""Byte-verify artwork TSX transcriptions against the proof HTML.

For each artwork, compares the multiset of `d="..."` path attributes (and
`points`/`cx`/`cy` circle centers) between a region of the proof HTML and the
transcribed TSX. Marker groups excluded where markers are component-rendered.

Usage: verify-artwork.py  (config baked in; exits nonzero on any mismatch)
"""

import re
import sys
from collections import Counter

PROOF = '/home/ring/orman-dead-web/design/folio-venue-proof.html'
ART = '/home/ring/orman-dead-web/web/packages/folio/src/artwork'


def region(html: str, start_needle: str, end_needle: str) -> str:
    start = html.index(start_needle)
    end = html.index(end_needle, start)
    return html[start:end]


def strip_marker_groups(svg: str) -> str:
    # Remove <g class="plate-marker"...>...</g> groups (component renders them).
    return re.sub(r'<g class="plate-marker[^"]*"[^>]*>.*?</g>', '', svg, flags=re.S)


def paths(text: str) -> Counter:
    return Counter(re.findall(r'\bd="([^"]+)"', text))


def circles(text: str) -> Counter:
    return Counter(re.findall(r'<circle[^>]*?cx="([^"]+)"[^>]*?cy="([^"]+)"', text))


def compare(name: str, proof_text: str, tsx_path: str) -> bool:
    tsx = open(tsx_path, encoding='utf-8').read()
    ok = True
    for label, extract in (('paths', paths), ('circle centers', circles)):
        want, got = extract(proof_text), extract(tsx)
        if want != got:
            ok = False
            missing = want - got
            extra = got - want
            print(f'FAIL {name} {label}:')
            for value in list(missing)[:4]:
                print(f'  missing: {str(value)[:90]}')
            for value in list(extra)[:4]:
                print(f'  extra:   {str(value)[:90]}')
    if ok:
        print(f'OK   {name}: {sum(paths(proof_text).values())} paths, '
              f'{sum(circles(proof_text).values())} circles')
    return ok


def main() -> int:
    html = open(PROOF, encoding='utf-8').read()
    checks = [
        ('cutaway', strip_marker_groups(region(html, '<div class="hall-model', '</div>')),
         f'{ART}/barton-hall-cutaway.tsx'),
        ('atlas', region(html, '<div class="atlas-map', '</div>'), f'{ART}/barton-hall-atlas.tsx'),
        ('show-floor', region(html, '<div class="show-floor-map', '</div>'),
         f'{ART}/barton-hall-show-floor.tsx'),
        ('plan', region(html, '<div class="plan-drawing', '</svg>'),
         f'{ART}/barton-hall-plan.tsx'),
    ]
    result = 0
    for name, proof_text, tsx_path in checks:
        try:
            if not compare(name, proof_text, tsx_path):
                result = 1
        except FileNotFoundError:
            print(f'SKIP {name}: {tsx_path} not written yet')
            result = 1
    return result


if __name__ == '__main__':
    sys.exit(main())
