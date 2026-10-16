/* Erebos Network Client - Verbindet Browser mit Erebos-Network.
 *
 * Der Client spricht mit dem lokalen Erebos-Network-Daemon
 * (Python) und fragt Routing-Entscheidungen ab.
 */

"use strict";

const EREBOS_NETWORK_URL = "http://127.0.0.1:9050";

/**
 * Holt JSON vom Daemon und entfernt Server-seitiges Padding.
 *
 * Der Erebos-Network-Daemon pad-ed JSON-Antworten auf 256-Byte-Buckets
 * mit trailing whitespace. Der Daemon sendet den Header
 * "X-Erebos-Original-Size" mit der Laenge VOR dem Padding. Wir schneiden
 * den Body auf diese Laenge zurueck und parsen erst dann.
 *
 * Fallback: Fehlt der Header (aeltere Daemon-Version), wird der volle
 * Text geparst — JSON ignoriert trailing whitespace von sich aus.
 *
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise<object>}
 */
async function fetchJsonUnpadded(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const err = new Error(`HTTP ${response.status}`);
    err.status = response.status;
    throw err;
  }
  const headerVal = response.headers.get("X-Erebos-Original-Size");
  const origSize = headerVal ? parseInt(headerVal, 10) : 0;
  const text = await response.text();
  const clean = origSize > 0 ? text.slice(0, origSize) : text;
  return JSON.parse(clean);
}

/**
 * Erebos Network Client
 */
const ErebosNetworkClient = {
  /**
   * Prüft, ob das Erebos-Network erreichbar ist.
   * @returns {Promise<boolean>}
   */
  async isAvailable() {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(`${EREBOS_NETWORK_URL}/status`, {
        signal: controller.signal,
        mode: "cors",
      });
      clearTimeout(timeout);
      return response.ok;
    } catch (err) {
      return false;
    }
  },

  /**
   * Fragt den Router nach einer Route.
   * @param {string} target - Ziel-URL
   * @param {string} [sector] - Optional: Sektor (fast/standard/high/mixnet)
   * @returns {Promise<object>}
   */
  async route(target, sector = null) {
    try {
      const params = new URLSearchParams({ target });
      if (sector) params.append("sector", sector);

      return await fetchJsonUnpadded(
        `${EREBOS_NETWORK_URL}/route?${params}`,
        { mode: "cors" }
      );
    } catch (err) {
      console.error("Erebos route error:", err);
      return { success: false, error: String(err) };
    }
  },

  /**
   * Löst eine .erebos-Domain auf.
   * @param {string} domain - z.B. "forum.erebos"
   * @returns {Promise<string|null>}
   */
  async resolveDomain(domain) {
    try {
      const data = await fetchJsonUnpadded(
        `${EREBOS_NETWORK_URL}/resolve?name=${encodeURIComponent(domain)}`,
        { mode: "cors" }
      );
      return data.address || null;
    } catch (err) {
      return null;
    }
  },

  /**
   * Gibt Statistiken zurück.
   * @returns {Promise<object>}
   */
  /**
   * Laedt die Liste der bekannten Peers (Community-Mitglieder).
   * @returns {Promise<{success: boolean, count: number, members: Array}>}
   */
  async getMembers() {
    try {
      return await fetchJsonUnpadded(
        `${EREBOS_NETWORK_URL}/api/community/members`,
        { mode: "cors" }
      );
    } catch (err) {
      console.error("[Erebos] getMembers fehlgeschlagen:", err);
      return { success: false, count: 0, members: [] };
    }
  },

  async getGovernance() {
    try {
      return await fetchJsonUnpadded(
        `${EREBOS_NETWORK_URL}/api/community/governance`,
        { mode: "cors" }
      );
    } catch (err) {
      return { success: false, count: 0, proposals: [] };
    }
  },

  async getStats() {
    try {
      return await fetchJsonUnpadded(`${EREBOS_NETWORK_URL}/stats`, {
        mode: "cors",
      });
    } catch (err) {
      return { error: String(err) };
    }
  },
};

window.ErebosNetworkClient = ErebosNetworkClient;
