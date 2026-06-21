// Auto-import config from old SilverApp if available
(function autoImport() {
  const cfg = loadConfig();
  if (cfg.token) return; // Already configured

  // Try to read from old config via backend
  fetch('http://127.0.0.1:8051/health').then(r => r.json()).then(() => {
    // Backend is running, import old config
    try {
      const fs = require('fs');
      const path = require('path');
      const oldCfg = path.join(process.env.USERPROFILE || '', '.silverapp', 'config.json');
      // Can't use require in renderer, use fetch to backend instead
    } catch {}
  }).catch(() => {});
})();
