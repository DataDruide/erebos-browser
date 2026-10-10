/* Erebos Startseite – I2P-Status-Check */

(function () {
  "use strict";

  const statusBox = document.getElementById("i2p-status");
  const indicator = statusBox.querySelector(".status-indicator");
  const text = statusBox.querySelector(".status-text");

  /**
   * Prüft, ob der lokale I2P-Router erreichbar ist.
   * Der HTTP-Proxy läuft typischerweise auf 127.0.0.1:4444.
   */
  async function checkI2P() {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const response = await fetch("http://127.0.0.1:7070/", {
        method: "HEAD",
        signal: controller.signal,
        mode: "no-cors",
      });

      clearTimeout(timeout);

      setStatus("online", "🟢", "I2P-Router ist erreichbar (127.0.0.1:4444)");
    } catch (err) {
      setStatus(
        "offline",
        "🔴",
        "I2P-Router nicht erreichbar. Bitte i2pd starten."
      );
    }
  }

  function setStatus(state, icon, message) {
    statusBox.classList.remove("online", "offline");
    statusBox.classList.add(state);
    indicator.textContent = icon;
    text.textContent = message;
  }

  // Beim Laden prüfen
  document.addEventListener("DOMContentLoaded", checkI2P);

  // Alle 30 Sekunden neu prüfen
  setInterval(checkI2P, 30000);
})();
