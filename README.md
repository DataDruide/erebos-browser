# Erebos Browser

> **Anonymer Browser fuer I2P und Deepweb mit Post-Quanten-Kryptographie**

[![Lint JS](https://github.com/DataDruide/erebos-browser/actions/workflows/lint-js.yml/badge.svg)](https://github.com/DataDruide/erebos-browser/actions/workflows/lint-js.yml)
[![Docs](https://github.com/DataDruide/erebos-browser/actions/workflows/docs-browser.yml/badge.svg)](https://github.com/DataDruide/erebos-browser/actions/workflows/docs-browser.yml)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://www.mozilla.org/en-US/MPL/2.0/)

Erebos ist ein auf Privatsphaere und Anonymitaet optimierter Browser,
der standardmaessig das I2P-Netzwerk nutzt und mit dem
Erebos-Network verbunden ist.

## Was macht Erebos anders?

| Feature | Tor Browser | Mullvad Browser | Erebos |
|---------|-------------|-----------------|--------|
| I2P-Integration | Nein | Nein | Ja |
| Post-Quanten-Krypto | Nein | Nein | Ja |
| Adaptive Sektoren | Nein | Nein | Ja |
| Mixnet | Nein | Nein | Ja |
| Network-Integration | Nein | Nein | Ja |

## Features

### Netzwerk
- I2P als Standard-Proxy (HTTP 127.0.0.1:4444, SOCKS 4447)
- DNS-Leak-Schutz
- WebRTC-Leak-Schutz
- HTTPS-Only-Modus

### Anonymitaet
- Fingerprint-Haertung
- Letterboxing
- Spoof English
- First-Party-Isolation

### Network-Integration
- about:erebos mit Live-Network-Status
- Sektor-Auswahl (fast/standard/high/mixnet)
- Routing-Test
- .erebos-Domain-Aufloesung

### Post-Quanten
- ML-KEM-1024 (NIST Level 5)
- SLH-DSA-SHA2-256s
- Threefish-512

## Installation

### I2P installieren

macOS:

    brew install i2pd
    brew services start i2pd

Linux:

    sudo apt install i2pd
    sudo systemctl enable --now i2pd

### Erebos-Network starten

    cd ~/Documents/GitHub/erebos-network
    .venv/bin/python -m erebos_network --serve --port 9050

### Erebos bauen

    git clone https://github.com/DataDruide/erebos-browser.git
    cd erebos-browser
    ./mach bootstrap
    ./mach build

## Verwendung

1. I2P starten
2. Erebos-Network starten
3. Erebos-Browser starten
4. about:erebos oeffnen
5. Network-Status pruefen

## Repository-Struktur

    browser/
        branding/
            erebos/          # Erebos-Branding
        components/
            erebos/          # about:erebos
                content/
                    erebos.html
                    network-client.js
                    network-ui.js
        config/
            mozconfig
        base/
            content/
                default-bookmarks.html

## Dokumentation

- [Erebos-Network](https://github.com/DataDruide/erebos-network)
- [ARCHITECTURE.md](https://github.com/DataDruide/erebos-network/blob/main/docs/ARCHITECTURE.md)
- [THREAT_MODEL.md](https://github.com/DataDruide/erebos-network/blob/main/docs/THREAT_MODEL.md)
- [PQ_CRYPTO.md](https://github.com/DataDruide/erebos-network/blob/main/docs/PQ_CRYPTO.md)

## Lizenz

MPL 2.0 - siehe LICENSE

## Danksagung

- Mozilla fuer Firefox
- Tor Project fuer Fingerprint-Haertung
- Mullvad fuer Base-Browser-Vorlage
- I2P-Community fuer das Netzwerk
- NIST fuer Post-Quanten-Standards

Erebos - Aus der Dunkelheit ins Netz.
