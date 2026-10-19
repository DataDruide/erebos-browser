# Contributing zu Erebos

Danke, dass du beitragen willst! Erebos ist ein Community-Projekt.

## Wie du beitragen kannst

- Bug-Reports: Issues öffnen
- Feature-Requests: Issues öffnen
- Dokumentation: Pull Requests
- Code: Pull Requests
- Übersetzungen: Pull Requests

## Entwicklungs-Setup

1. Fork das Repository
2. Clone deinen Fork:
   git clone git@github.com:DEIN-NAME/erebos-browser.git
   cd erebos-browser
3. Upstream hinzufügen:
   git remote add upstream https://github.com/DataDruide/erebos-browser.git
4. Branch anlegen:
   git checkout -b feature/mein-feature

## Commit-Konventionen

Wir nutzen Conventional Commits:

- feat:     neues Feature
- fix:      Bugfix
- docs:     Doku
- style:    Formatierung
- refactor: Code-Umstrukturierung
- perf:     Performance
- test:     Tests
- chore:    Wartung

Beispiel:
    feat(i2p): add SOCKS proxy support for I2P

## Pull Request Prozess

1. Branch von main erstellen
2. Änderungen committen (klare Messages)
3. Tests laufen lassen (falls vorhanden)
4. PR öffnen mit Beschreibung:
   - Was ändert sich?
   - Warum?
   - Wie testen?

## Code-Style

- Firefox-Standards befolgen
- ESLint nutzen (falls konfiguriert)
- Kommentare auf Englisch (Code) oder Deutsch (Doku)

## Fragen?

Öffne ein Issue mit dem Label question.

## Building the Erebos browser

The browser is a Firefox/Mullvad fork. The standard Firefox build
instructions apply, but with the Erebos branding:

```bash
cd /path/to/mullvad-browser
./mach bootstrap       # first time only, installs build dependencies
./mach build           # builds the browser (20-90 min depending on CPU)
./mach run             # runs the build
```

After changes in ```browser/branding/erebos/``` or
```browser/components/erebos/```, a rebuild is required (```./mach build```).
After changes in ```browser/app/profile/firefox.js``` or other
JavaScript-only files, ```./mach run``` is often enough.

## Where the Erebos-specific code lives

| Path | What it contains |
|---|---|
| ```browser/branding/erebos/``` | Branding, default prefs (```pref/firefox-branding.js```), icons |
| ```browser/components/erebos/``` | Erebos UI components (about:erebos, network client) |
| ```browser/components/erebos/content/``` | HTML/CSS/JS for the Erebos UI |

**Important:** ```firefox-branding.js``` sets the proxy defaults (i2pd on
ports 4444/4447). If you need a different SOCKS proxy, see
```KNOWN_ISSUES.md``` for the workaround.

## Related repositories

- **```erebos-network```** — the Python daemon that provides the API
  (status, governance, routing) and the peer/tunnel code.
  https://github.com/DataDruide/erebos-network
- **```erebos-browser```** — this repository.

The daemon and the browser are independent — you can build the browser
without the daemon, and vice versa. But ```about:erebos``` needs the daemon
on ```127.0.0.1:9050``` to show live data.

## Known issues

See ```KNOWN_ISSUES.md``` for documented bugs and workarounds. Currently:
proxy settings are overridden on every browser start.

## Building the Erebos browser

The browser is a Firefox/Mullvad fork. The standard Firefox build
instructions apply, but with the Erebos branding:

```bash
cd /path/to/mullvad-browser
./mach bootstrap       # first time only, installs build dependencies
./mach build           # builds the browser (20-90 min depending on CPU)
./mach run             # runs the build
```

After changes in `browser/branding/erebos/` or
`browser/components/erebos/`, a rebuild is required (`./mach build`).
After changes in `browser/app/profile/firefox.js` or other
JavaScript-only files, `./mach run` is often enough.

## Where the Erebos-specific code lives

| Path | What it contains |
|---|---|
| `browser/branding/erebos/` | Branding, default prefs (`pref/firefox-branding.js`), icons |
| `browser/components/erebos/` | Erebos UI components (about:erebos, network client) |
| `browser/components/erebos/content/` | HTML/CSS/JS for the Erebos UI |

**Important:** `firefox-branding.js` sets the proxy defaults (i2pd on
ports 4444/4447). If you need a different SOCKS proxy, see
`KNOWN_ISSUES.md` for the workaround.

## Related repositories

- **`erebos-network`** — the Python daemon that provides the API
  (status, governance, routing) and the peer/tunnel code.
  https://github.com/DataDruide/erebos-network
- **`erebos-browser`** — this repository.

The daemon and the browser are independent — you can build the browser
without the daemon, and vice versa. But `about:erebos` needs the daemon
on `127.0.0.1:9050` to show live data.

## Known issues

See `KNOWN_ISSUES.md` for documented bugs and workarounds. Currently:
proxy settings are overridden on every browser start.
