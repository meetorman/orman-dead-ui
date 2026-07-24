#!/usr/bin/env python3
"""Extract proof-CSS rules into per-component files, verbatim.

Usage:
  extract-css.py <source.css> <out.css> <prefix> [<prefix> ...]

Copies every top-level rule whose selector list has ANY selector starting with
one of the prefixes (after trimming), preserving source order. Rules inside
@media blocks are copied wrapped in the same condition. Rules are never
rewritten — migration is a move, not a rewrite; pixel parity is the test.

A grouped selector that mixes matching and non-matching selectors is copied
whole (CSS can't split it without changing tie-break order) and reported.
"""

import re
import sys


def scope_selector(selector: str, scope: str) -> str:
    """Prefix one selector with a page-scope class.

    body/html-rooted selectors get the class ON the root element; everything
    else is nested under it. Keeps per-file rule order; raises specificity
    uniformly so cross-file ties with the other proof family cannot occur.
    """
    selector = selector.strip()
    if selector.startswith('body'):
        return selector.replace('body', f'body{scope}', 1)
    if selector.startswith('html'):
        return selector.replace('html', f'html{scope}', 1)
    return f'body{scope} {selector}'


def apply_scope(header: str, scope: str) -> str:
    return ','.join(scope_selector(part, scope) for part in header.split(','))


def parse_blocks(css: str):
    """Yield (kind, header, body) for top-level blocks; kind in {rule, at}."""
    i, n = 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j == -1:
            break
        header = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == '{':
                depth += 1
            elif css[k] == '}':
                depth -= 1
            k += 1
        body = css[j + 1 : k - 1]
        if header:
            yield ('at' if header.startswith('@') else 'rule', header, body)
        i = k


def selector_matches(header: str, prefixes: list[str]) -> tuple[bool, bool]:
    """(any_selector_matches, all_selectors_match)"""
    selectors = [s.strip() for s in header.split(',')]
    hits = [any(s.startswith(p) for p in prefixes) for s in selectors]
    return any(hits), all(hits)


def main() -> int:
    args = sys.argv[1:]
    scope = None
    if '--scope' in args:
        i = args.index('--scope')
        scope = args[i + 1]
        args = args[:i] + args[i + 2:]
    source, out, *prefixes = args
    css = open(source, encoding='utf-8').read()
    # strip comments (proof css has almost none; keeps parsing simple)
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)

    picked: list[str] = []
    mixed: list[str] = []
    for kind, header, body in parse_blocks(css):
        if kind == 'rule':
            any_hit, all_hit = selector_matches(header, prefixes)
            if any_hit:
                out_header = apply_scope(header, scope) if scope else header
                picked.append(f'{out_header}{{{body}}}')
                if not all_hit:
                    mixed.append(header)
        elif header.startswith('@media'):
            inner = []
            for ikind, iheader, ibody in parse_blocks(body):
                if ikind != 'rule':
                    inner.append(f'{iheader}{{{ibody}}}')  # nested at-rule: keep if parent matched? skip
                    inner.pop()
                    continue
                any_hit, all_hit = selector_matches(iheader, prefixes)
                if any_hit:
                    out_iheader = apply_scope(iheader, scope) if scope else iheader
                    inner.append(f'{out_iheader}{{{ibody}}}')
                    if not all_hit:
                        mixed.append(f'{header} :: {iheader}')
            if inner:
                picked.append(header + '{\n' + '\n'.join(inner) + '\n}')
        elif header.startswith('@keyframes'):
            # keyframes are opt-in by name-as-prefix (e.g. "@keyframes reel-turn")
            if any(header.startswith(p) for p in prefixes):
                picked.append(f'{header}{{{body}}}')

    with open(out, 'w', encoding='utf-8') as f:
        f.write(f'/* Extracted VERBATIM from {source.split("/")[-1]} — do not hand-edit rules;\n')
        f.write('   the proofs are the spec. Extraction: web/tools/extract-css.py */\n')
        f.write('\n'.join(picked) + '\n')

    print(f'{out}: {len(picked)} blocks')
    for m in mixed:
        print(f'  MIXED-GROUP (copied whole): {m}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
