<div align="center">

# mcmesh-web

**Zero-build WebUI dashboard, 3D voxel/contraption inspectors, and live world telemetry pages for mcmesh.**

[![CI](https://github.com/mcmeshsolutions/web/actions/workflows/ci.yml/badge.svg)](https://github.com/mcmeshsolutions/web/actions/workflows/ci.yml)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Zero--Build-F7DF1E.svg?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[Pages & Routes](#pages--routes) | [Design Philosophy](#design-philosophy) | [Local Preview](#local-preview) | [Testing](#testing)

</div>

---

## Overview

`mcmesh-web` contains the self-contained frontend pages embedded directly into [gatewayd](https://github.com/mcmeshsolutions/gatewayd). There is no bundler, no `node_modules` runtime dependency, and no build step: every page is a single, self-contained HTML5 document with adaptive light/dark theming and direct integration with the `gatewayd` HTTP/SSE API.

## Pages & Routes

| File | Gateway Route | Purpose |
|---|---|---|
| [`index.html`](./index.html) | `/` | Public landing page with server connection instructions and onboarding |
| [`panel.html`](./panel.html) | `/panel` | Operator and world owner control panel (worlds, leases, members, quotas, S3, tokens) |
| [`status.html`](./status.html) | `/status` | Live public world status card (supports English and Polish browser locales) |
| [`invite.html`](./invite.html) | `/join/:code` | 1-click invite redemption and modpack onboarding page |
| [`voxel.html`](./voxel.html) | `/view/:id` | Interactive 3D voxel world revision viewer |
| [`isomap.html`](./isomap.html) | `/isomap/:id` | Isometric chunk/region map and spatial activity viewer |
| [`contraption.html`](./contraption.html) | `/contraption` | 3D Create contraption web inspector |
| [`timeline.html`](./timeline.html) | `/timeline/:id` | Interactive world revision timeline and diff scrubber |
| [`digest.html`](./digest.html) | `/digest/:id` | Regional build activity and session digest viewer |
| [`quests.html`](./quests.html) | `/quests/:id` | Live FTB Quests progression dependency tree |

## Design Philosophy

- **Zero Runtime Dependencies:** Every view ships as a single static HTML file embedded into the `gatewayd` binary (`include_str!`), guaranteeing instant cold starts and air-gapped reliability.
- **System-Native Light & Dark Mode:** Uses CSS custom properties with `prefers-color-scheme` media queries.
- **Live SSE Telemetry:** Connects directly to `gatewayd` Server-Sent Events streams for real-time lease, player, and revision updates.

## Local Preview

Since all pages are static HTML5 files, you can preview the layout locally with any HTTP server, or point them at a running `gatewayd` instance:

```bash
python3 -m http.server 8000
```

For full API-backed functionality, run [`gatewayd serve`](https://github.com/mcmeshsolutions/gatewayd#quickstart).

## Testing

The test suite uses Node.js's built-in test runner (`node:test`) to validate HTML5 structure, metadata, CSS brace balance, and inline JavaScript syntax across all pages:

```bash
node --test tests/test_web.mjs
```

## Ecosystem

| Repository | Description |
|---|---|
| [mcmeshsolutions/gatewayd](https://github.com/mcmeshsolutions/gatewayd) | Coordination gateway daemon, CAS store, and relay |
| [mcmeshsolutions/mod](https://github.com/mcmeshsolutions/mod) | Minecraft NeoForge 1.21.1 client and host mod |
| [mcmeshsolutions/web](https://github.com/mcmeshsolutions/web) | WebUI panel, 3D voxel viewer, and spatial inspectors (this repo) |
| [mcmeshsolutions/deploy](https://github.com/mcmeshsolutions/deploy) | Docker Compose, systemd, Caddy TLS, and homelab templates |
| [mcmeshsolutions/docs](https://github.com/mcmeshsolutions/docs) | OpenAPI 3.1.0 spec, JSON schemas, and mod API docs |

---

<div align="center">
<sub>Not affiliated with Mojang or Microsoft.</sub>
</div>
