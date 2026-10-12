# Erebos Browser

> **Anonymer Browser für I2P und Deepweb** – basiert auf Firefox ESR 128
> (via Mullvad Browser `base-browser-128.10.1esr-14.5-1`).

[![Lint JS](https://github.com/DataDruide/erebos-browser/actions/workflows/lint-js.yml/badge.svg)](https://github.com/DataDruide/erebos-browser/actions/workflows/lint-js.yml)
[![Docs](https://github.com/DataDruide/erebos-browser/actions/workflows/docs-browser.yml/badge.svg)](https://github.com/DataDruide/erebos-browser/actions/workflows/docs-browser.yml)

**Erebos** ist ein auf Privatsphäre und Anonymität optimierter Browser, der
standardmäßig das **I2P-Netzwerk** nutzt. Er kombiniert die
Fingerprint-Härtung des Tor Browsers mit der dezentralen Architektur von I2P
und ist für den Einsatz im Deepweb, in zensurresistenten Umgebungen und für
anonyme Kommunikation gedacht.

## Warum Erebos?

Bestehende Browser im Anonymitätsbereich haben jeweils Kompromisse:

| Browser | Stärke | Schwäche |
|---|---|---|
| Tor Browser | Beste Anonymität | Zentrales Tor-Netz, langsam |
| Mullvad Browser | Gute Härtung | Benötigt VPN (zentral) |
| Brave/Firefox | Schnell | Nicht anonym |

**Erebos** schließt die Lücke: **Tor-typische Härtung + I2P als dezentrales Netzwerk.**

## Features

### Netzwerk
- I2P als Standard-Proxy (HTTP 127.0.0.1:4444, SOCKS 127.0.0.1:4447)
- DNS-Leak-Schutz
- WebRTC-Leak-Schutz
- HTTPS-Only-Modus

### Anonymität
- Fingerprint-Härtung (resistFingerprinting)
- Letterboxing (einheitliche Fenstergrößen)
- Spoof English (einheitliche Sprache)
- First-Party-Isolation
- Tracker-Blockierung

### Privatsphäre
- Telemetrie deaktiviert
- Auto-Updates deaktiviert
- Sponsored Content aus
- Startseite: about:blank
- Sanitize on Shutdown

## Installation

### Voraussetzungen

- **I2P-Router** – entweder i2pd (leichtgewichtig) oder Java I2P
- **Betriebssystem:** macOS 14+, Linux (64-bit), Windows 10+

### I2P installieren

macOS (Homebrew):
    brew install i2pd
    brew services start i2pd

Linux (Debian/Ubuntu):
    sudo apt install i2pd
    sudo systemctl enable --now i2pd

Windows: i2pd releases von GitHub

Prüfen, dass I2P läuft:
    curl http://127.0.0.1:7070/

### Erebos bauen

    git clone https://github.com/DataDruide/erebos-browser.git
    cd erebos-browser
    ./mach bootstrap
    ./mach build

## Entwicklung

### Wichtige Dateien

| Datei | Zweck |
|---|---|
| browser/branding/erebos/pref/firefox-branding.js | I2P-Proxy + Datenschutz-Prefs |
| browser/branding/erebos/configure.sh | App-Name, Vendor |
| browser/config/mozconfig | Build-Flags |

### Upstream-Updates einspielen

    git fetch upstream
    git merge upstream/base-browser-128.10.1esr-14.5-1

## Contributing

Beiträge sind willkommen! Bitte lies zuerst CONTRIBUTING.md.

## Sicherheit

Sicherheitslücken bitte nicht als öffentliches Issue melden, sondern
per E-Mail an den Maintainer. Siehe SECURITY.md.

## Lizenz

Lizenziert unter der Mozilla Public License 2.0 – siehe LICENSE.

Erebos basiert auf:
- Firefox ESR 128 (MPL 2.0)
- Mullvad Browser (MPL 2.0)
- Tor Browser (MPL 2.0)

## Danksagung

- Mozilla für Firefox
- Tor Project für die Fingerprint-Härtung
- Mullvad für die Base-Browser-Vorlage
- I2P-Community für das dezentrale Netzwerk

---

**Erebos** – *Aus der Dunkelheit ins Netz.*
