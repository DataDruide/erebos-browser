/* Erebos Network Client - Verbindet Browser mit Erebos-Network.
 *
 * Der Client spricht mit dem lokalen Erebos-Network-Daemon
 * (Python) und fragt Routing-Entscheidungen ab.
 */

"use strict";

const EREBOS_NETWORK_URL = "http://127.0.0.1:9050";

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
        mode: "no-cors",
      });
      clearTimeout(timeout);
      return true;
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

      const response = await fetch(
        `${EREBOS_NETWORK_URL}/route?${params}`,
        { mode: "cors" }
      );
      return await response.json();
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
      const response = await fetch(
        `${EREBOS_NETWORK_URL}/resolve?name=${encodeURIComponent(domain)}`,
        { mode: "cors" }
      );
      const data = await response.json();
      return data.address || null;
    } catch (err) {
      return null;
    }
  },

  /**
   * Gibt Statistiken zurück.
   * @returns {Promise<object>}
   */
  async getStats() {
    try {
      const response = await fetch(`${EREBOS_NETWORK_URL}/stats`, {
        mode: "cors",
      });
      return await response.json();
    } catch (err) {
      return { error: String(err) };
    }
  },
};

window.ErebosNetworkClient = ErebosNetworkClient;
