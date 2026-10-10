/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * AboutErebos - Registriert about:erebos
 *
 * Zeigt die Erebos-Startseite mit:
 * - Logo
 * - I2P-Status
 * - Wichtige eepSites
 * - Kurzanleitung
 */

const { XPCOMUtils } = ChromeUtils.importESModule(
  "resource://gre/modules/XPCOMUtils.sys.mjs"
);

const ABOUT_PAGE = "chrome://browser/content/erebos/erebos.html";

export function AboutErebos() {}

AboutErebos.prototype = {
  classDescription: "Erebos About Page",
  classID: Components.ID("{8f3c1a2e-4b5d-4e6f-9a7b-1c2d3e4f5a6b}"),
  contractID: "@mozilla.org/network/protocol/about;1?what=erebos",
  QueryInterface: ChromeUtils.generateQI(["nsIAboutModule"]),

  newChannel(aURI, aLoadInfo) {
    let uri = Services.io.newURI(ABOUT_PAGE);
    let channel = Services.io.newChannelFromURIWithLoadInfo(uri, aLoadInfo);
    channel.originalURI = aURI;
    return channel;
  },

  getURIFlags() {
    return Ci.nsIAboutModule.ALLOW_SCRIPT | Ci.nsIAboutModule.URI_SAFE_FOR_UNTRUSTED_CONTENT;
  },
};
