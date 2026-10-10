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
