// Erebos Proxy - leitet den gesamten Browser-Traffic über das Erebos-Network
// SOCKS5-Proxy auf 127.0.0.1:4447 (ErebosSocks5Server aus erebos-network)

const EREBOS_PROXY = {
  proxyType: "manual",
  socks: {
    host: "127.0.0.1",
    port: 4447,
    version: 5,
    proxyDNS: true
  }
};

browser.proxy.settings.set({
  value: EREBOS_PROXY,
  scope: "regular"
}).then(() => {
  console.log("[Erebos] Proxy aktiv: SOCKS5 127.0.0.1:4447");
}).catch((error) => {
  console.error("[Erebos] Proxy konnte nicht gesetzt werden:", error);
});
