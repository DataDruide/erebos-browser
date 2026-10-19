# Known Issues

## Proxy settings are overridden on every browser start

**Affected versions:** all current builds (v0.2.1 and earlier)

**Symptom:** When using the Erebos browser with a SOCKS proxy other than
i2pd (e.g. Tor on port 9052), the proxy settings are lost on every
browser restart. `about:config` changes work until the browser is closed,
then `prefs.js` and `user.js` are reset to the branding defaults.

**Root cause:** `browser/branding/erebos/pref/firefox-branding.js` sets
`network.proxy.*` as default preferences on every start. These defaults
override any `user_pref` entries in `prefs.js` or `user.js` that were
written outside the browser's own settings UI.

**Workaround:**
1. Open `about:config`
2. Set `network.proxy.type` = `1`
3. Set `network.proxy.socks_port` = your proxy port (e.g. `9052`)
4. Set `network.proxy.socks_remote_dns` = `true`
5. Set `network.trr.mode` = `5` (disable DoH)
6. Clear DNS cache in `about:networking#dns`
7. Restart the browser (settings persist only if made via `about:config`)

**Long-term fix:** The branding defaults should only apply if no
`user_pref` exists for the respective key. This requires a change in
`firefox-branding.js` or the startup logic that applies branding prefs.

**Status:** documented, not fixed.
