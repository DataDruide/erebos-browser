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
          const peers = stats.discovery?.peer_count || 0;
          const routes = stats.router?.routes_total || 0;
          const sector = stats.default_sector || "standard";
          details.textContent = `Peers: ${peers} | ` +
            `Routes: ${routes} | ` +
            `Sektor: ${sector}`;
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

  /**
   * Laedt die Mitglieder-Liste aus dem Daemon und rendert sie.
   */
  async function loadMembers() {
    const grid = document.getElementById("members-grid");
    if (!grid) return;

    try {
      const data = await API.getMembers();
      if (!data.success || !data.members || data.members.length === 0) {
        grid.innerHTML =
          '<p class="members-empty">Noch keine Peers bekannt.</p>';
        return;
      }

      grid.innerHTML = data.members
        .map((m) => {
          const initial = (m.peer_id || "?").charAt(0).toUpperCase();
          const trust = m.is_trusted ? "trusted" : "untrusted";
          return `
            <div class="member-card ${trust}">
              <div class="member-avatar">${initial}</div>
              <div class="member-info">
                <strong>${m.peer_id}</strong>
                <span>Reputation: ${m.reputation.toFixed(2)}</span>
                <span class="member-status">${
                  m.is_online ? "🟢 online" : "⚫ offline"
                }</span>
              </div>
            </div>`;
        })
        .join("");
    } catch (err) {
      console.error("[Erebos] loadMembers fehlgeschlagen:", err);
      grid.innerHTML =
        '<p class="members-error">Mitglieder konnten nicht geladen werden.</p>';
    }
  }

  // Initialisierung
  document.addEventListener("DOMContentLoaded", () => {
    updateNetworkStatus();
    setInterval(updateNetworkStatus, 30000);

    loadMembers();
    setInterval(loadMembers, 30000);

    const resolveBtn = document.getElementById("resolve-btn");
    if (resolveBtn) resolveBtn.addEventListener("click", resolveErebosDomain);

    const routeBtn = document.getElementById("route-btn");
    if (routeBtn) routeBtn.addEventListener("click", testRouting);
  });
})();
