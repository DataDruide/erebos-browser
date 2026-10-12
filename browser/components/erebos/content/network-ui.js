/* Erebos Network UI - UI-Integration für about:erebos.
 *
 * Zeigt Network-Status, Sektor-Auswahl und .erebos-Domain-Auflösung.
 */

"use strict";

(function () {
  const API = window.ErebosNetworkClient;
  if (!API) {
    console.error("ErebosNetworkClient nicht geladen");
    return;
  }

  /**
   * Aktualisiert den Network-Status auf der Seite.
   */
  async function updateNetworkStatus() {
    const statusBox = document.getElementById("network-status");
    if (!statusBox) return;

    const indicator = statusBox.querySelector(".status-indicator");
    const text = statusBox.querySelector(".status-text");

    try {
      const available = await API.isAvailable();
      if (available) {
        statusBox.classList.remove("offline");
        statusBox.classList.add("online");
        indicator.textContent = "🟢";
        text.textContent = "Erebos-Network erreichbar";

        // Statistiken laden
        const stats = await API.getStats();
        const details = document.getElementById("network-details");
        if (details) {
          details.textContent = `Peers: ${stats.peer_count || 0} | ` +
            `Routes: ${stats.routes_total || 0} | ` +
            `Sektor: ${stats.default_sector || "standard"}`;
        }
      } else {
        throw new Error("Nicht erreichbar");
      }
    } catch (err) {
      statusBox.classList.remove("online");
      statusBox.classList.add("offline");
      indicator.textContent = "🔴";
      text.textContent = "Erebos-Network nicht erreichbar";
      const details = document.getElementById("network-details");
      if (details) {
        details.textContent = "Starte den Erebos-Network-Daemon auf 127.0.0.1:9050";
      }
    }
  }

  /**
   * Auflösung einer .erebos-Domain.
   */
  async function resolveErebosDomain() {
    const input = document.getElementById("erebos-domain-input");
    const result = document.getElementById("erebos-domain-result");
    if (!input || !result) return;

    const domain = input.value.trim();
    if (!domain) {
      result.textContent = "Bitte eine Domain eingeben (z.B. forum.erebos)";
      return;
    }

    result.textContent = "Auflösung läuft…";
    const address = await API.resolveDomain(domain);

    if (address) {
      result.textContent = `✅ ${domain} → ${address}`;
      result.classList.add("success");
    } else {
      result.textContent = `❌ ${domain} nicht gefunden`;
      result.classList.remove("success");
    }
  }

  /**
   * Sektor-Auswahl.
   */
  function getSelectedSector() {
    const select = document.getElementById("sector-select");
    return select ? select.value : "standard";
  }

  /**
   * Routing-Test.
   */
  async function testRouting() {
    const input = document.getElementById("route-target-input");
    const result = document.getElementById("route-result");
    if (!input || !result) return;

    const target = input.value.trim();
    if (!target) {
      result.textContent = "Bitte eine URL eingeben";
      return;
    }

    result.textContent = "Routing läuft…";
    const sector = getSelectedSector();
    const response = await API.route(target, sector);

    if (response.success !== false) {
      result.innerHTML = `
        <strong>Ziel:</strong> ${response.target || target}<br>
        <strong>Typ:</strong> ${response.route_type || "unbekannt"}<br>
        <strong>Sektor:</strong> ${response.sector || sector}<br>
        <strong>Hops:</strong> ${response.hops || "?"}<br>
        <strong>Proxy:</strong> ${response.proxy || "direkt"}
      `;
      result.classList.add("success");
    } else {
      result.textContent = `❌ Fehler: ${response.error || "unbekannt"}`;
      result.classList.remove("success");
    }
  }

  // Initialisierung
  document.addEventListener("DOMContentLoaded", () => {
    updateNetworkStatus();
    setInterval(updateNetworkStatus, 30000);

    const resolveBtn = document.getElementById("resolve-btn");
    if (resolveBtn) resolveBtn.addEventListener("click", resolveErebosDomain);

    const routeBtn = document.getElementById("route-btn");
    if (routeBtn) routeBtn.addEventListener("click", testRouting);
  });
})();
