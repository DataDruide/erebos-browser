/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// This file contains branding-specific prefs.

pref("startup.homepage_override_url", "");
pref("startup.homepage_welcome_url", "about:welcome");
pref("startup.homepage_welcome_url.additional", "");
// Interval: Time between checks for a new version (in seconds)
pref("app.update.interval", 21600); // 6 hours
// Give the user x seconds to react before showing the big UI. default=192 hours
pref("app.update.promptWaitTime", 691200);
// app.update.url.manual: URL user can browse to manually if for some reason
// all update installation attempts fail.
// app.update.url.details: a default value for the "More information about this
// update" link supplied in the "An update is available" page of the update
// wizard.
#if MOZ_UPDATE_CHANNEL == beta
  pref("app.update.url.manual", "https://www.mozilla.org/%LOCALE%/firefox/beta?reason=manual-update");
  pref("app.update.url.details", "https://www.mozilla.org/%LOCALE%/firefox/beta/notes");
  pref("app.releaseNotesURL", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%beta/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=whatsnew");
  pref("app.releaseNotesURL.aboutDialog", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%beta/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=about-dialog");
#elifdef MOZ_ESR
  pref("app.update.url.manual", "https://www.mozilla.org/%LOCALE%/firefox/enterprise?reason=manual-update");
  pref("app.update.url.details", "https://www.mozilla.org/%LOCALE%/firefox/organizations/notes");
  pref("app.releaseNotesURL", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=whatsnew");
  pref("app.releaseNotesURL.aboutDialog", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=about-dialog");
#else
  pref("app.update.url.manual", "https://www.mozilla.org/%LOCALE%/firefox/new?reason=manual-update");
  pref("app.update.url.details", "https://www.mozilla.org/%LOCALE%/firefox/notes");
  pref("app.releaseNotesURL", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=whatsnew");
  pref("app.releaseNotesURL.aboutDialog", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=about-dialog");
#endif
pref("app.releaseNotesURL.prompt", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%/releasenotes/?utm_source=firefox-browser&utm_medium=firefox-desktop&utm_campaign=updateprompt");

// The number of days a binary is permitted to be old
// without checking for an update.  This assumes that
// app.update.checkInstallTime is true.
pref("app.update.checkInstallTime.days", 63);

// Give the user x seconds to reboot before showing a badge on the hamburger
// button. default=4 days
pref("app.update.badgeWaitTime", 345600);

// Number of usages of the web console.
// If this is less than 5, then pasting code into the web console is disabled
pref("devtools.selfxss.count", 0);

// ===== EREBOS BROWSER =====
// Anonymer Browser für I2P und Deepweb

// I2P-Netzwerk als Standard
pref("network.proxy.type", 1);
pref("network.proxy.http", "127.0.0.1");
pref("network.proxy.http_port", 4444);
pref("network.proxy.ssl", "127.0.0.1");
pref("network.proxy.ssl_port", 4444);
pref("network.proxy.socks", "127.0.0.1");
pref("network.proxy.socks_port", 4447);
pref("network.proxy.socks_version", 5);
pref("network.proxy.socks_remote_dns", true);
pref("network.proxy.no_proxies_on", "");
pref("network.proxy.share_proxy_settings", true);
pref("network.proxy.allow_hijacking_localhost", false);

// DNS-Leak-Schutz
pref("network.trr.mode", 3);
pref("network.dns.disablePrefetch", true);
pref("network.dns.disablePrefetchFromHTTPS", true);
pref("network.prefetch-next", false);
pref("network.predictor.enabled", false);
pref("network.predictor.enable-prefetch", false);

// WebRTC-Leak-Schutz
pref("media.peerconnection.enabled", false);
pref("media.peerconnection.ice.default_address_only", true);
pref("media.peerconnection.ice.no_host", true);
pref("media.navigator.enabled", false);

// Startseite
pref("browser.startup.homepage", "about:blank");
pref("browser.startup.page", 0);
pref("browser.newtabpage.enabled", false);
pref("browser.newtabpage.activity-stream.showSponsored", false);
pref("browser.newtabpage.activity-stream.showSponsoredTopSites", false);

// Suche
pref("browser.search.suggest.enabled", false);
pref("browser.urlbar.suggest.searches", false);
pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);

// Telemetrie aus
pref("toolkit.telemetry.enabled", false);
pref("toolkit.telemetry.unified", false);
pref("toolkit.telemetry.archive.enabled", false);
pref("toolkit.telemetry.server", "data:,");
pref("datareporting.healthreport.uploadEnabled", false);
pref("datareporting.policy.dataSubmissionEnabled", false);
pref("app.shield.optoutstudies.enabled", false);
pref("browser.discovery.enabled", false);
pref("browser.crashReports.unsubmittedCheck.enabled", false);

// Updates aus
pref("app.update.enabled", false);
pref("app.update.auto", false);

// Fingerprint-Härtung (Tor-typisch)
pref("privacy.resistFingerprinting", true);
pref("privacy.resistFingerprinting.letterboxing", true);
pref("privacy.resistFingerprinting.block_mozAddonManager", true);
pref("privacy.resistFingerprinting.reduceTimerPrecision.microseconds", 100000);
pref("privacy.resistFingerprinting.reduceTimerPrecision.jitter", true);
pref("privacy.spoof_english", 2);
pref("privacy.trackingprotection.enabled", true);
pref("privacy.trackingprotection.pbmode.enabled", true);

// Cookies & Storage
pref("network.cookie.cookieBehavior", 5);
pref("privacy.firstparty.isolate", true);
pref("privacy.sanitize.sanitizeOnShutdown", true);

// HTTPS-Only
pref("dom.security.https_only_mode", true);

// JS-Beschränkungen
pref("dom.event.clipboardevents.enabled", false);
pref("dom.battery.enabled", false);
pref("device.sensors.enabled", false);
pref("geo.enabled", false);
pref("beacon.enabled", false);

// Sonstiges
pref("extensions.pocket.enabled", false);
pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
pref("browser.newtabpage.activity-stream.telemetry", false);
pref("browser.tabs.crashReporting.sendReport", false);
pref("browser.sessionstore.privacy_level", 2);
