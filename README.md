# orman-dead-ui

The Grateful Dead archive's UI — the folio SPA (`packages/folio`) plus the Playwright
parity harness that proves it. **API-served, no content in code**: pages fetch same-origin
`/api/...` from [orman-dead-api](https://github.com/meetorman/orman-dead-api) (:8735),
which composes every record from the database. One React component per page type; the
only difference between Barton Hall and a Tuesday night in 1983 is what the API returns.

- Components come from **@orman/design**
  ([orman-dead-theme](https://github.com/meetorman/orman-dead-theme)), consumed as a local
  `link:` dependency on `/home/ring/orman-dead-theme/packages/design` until the release
  workflow exists.
- Contracts in `packages/folio/src/contracts/` are the API's source of truth;
  `pnpm contracts` proves live composed output still satisfies them.
- The three folio proofs under `design/` are the frozen visual spec; parity goldens are
  captured from them and the suite proves the app is pixel-indiscernible (113 shots,
  3 viewports, `maxDiffPixels: 0`).

## Ports (all LAN-bound)

| Port | What | How |
|---|---|---|
| 8735 | **orman-dead-api + the built app** (SPA, media, design assets) | systemd --user `orman-dead-api` (orman-dead-api repo) |
| 8752 | Proofs static server (golden-capture source, this repo root) | booted by the parity suite |
| 8760 | orman.design component reference (HMR) | systemd --user `orman-design` (theme repo) |
| 8761 | Dev server (proxies `/api` + `/data/media` → :8735) | `pnpm dev` |
| 4173 | `vite preview` (built output; same proxies) | `pnpm preview` |

## Commands

```bash
pnpm install          # workspace + @orman/design link
pnpm dev              # app on :8761
pnpm build            # packages/folio/dist — what the API serves
pnpm contracts        # composed API output satisfies the TS contracts (tsc gate)
pnpm parity           # 113-shot pixel gate vs goldens (PARITY_TARGET=app)
pnpm smoke            # interaction suite (incl. floor pages: sparse shows, blank venues)
pnpm test             # smoke + parity
PARITY_APP_ORIGIN=http://127.0.0.1:4173 pnpm parity   # gate the production build
pnpm parity:capture   # re-capture goldens FROM THE PROOFS (PARITY_TARGET=proof)
```

Goldens live in `tests/goldens/` — gitignored (~122MB regenerable); only
`tests/goldens/meta.json` is committed (pins the Playwright version they were captured
with). `parity:capture` serves this repo root on :8752; the proofs reference
`/data/media/...`, which resolves through the gitignored `data/media` symlink into the
orman-dead-api repo.

After `pnpm build`, the live site updates immediately — the API serves `dist/` from disk,
no restart needed.
