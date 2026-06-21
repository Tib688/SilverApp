// Load bot avatar
async function loadBotAvatar() {
  const token = getToken();
  if (!token) return;
  const me = await discordGet('/users/@me');
  if (me.error) return;
  const url = getBotAvatar(me, 256);
  if (!url) return;
  const img = document.getElementById('botAvatarImg');
  const ph = document.getElementById('botAvatarPlaceholder');
  const wrap = document.getElementById('botAvatar');
  img.onload = () => { img.style.display = 'block'; ph.style.display = 'none'; wrap.classList.add('loaded'); };
  img.src = url;
}

// Check trusted session on load
async function checkSession() {
  const cfg = loadConfig();
  if (!cfg.token) return;
  if (cfg.trustedSession) {
    // Auto-login
    if (cfg.sessionType === 'owner') {
      silver.navigate('dashboard');
      return;
    } else if (cfg.sessionType === 'tester') {
      silver.navigate('tester');
      return;
    }
  }
  loadBotAvatar();
}

// Enter key
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') login();
});

// Login
async function login() {
  const discordId = document.getElementById('discordId').value.trim();
  const code = document.getElementById('loginCode').value.trim();
  const status = document.getElementById('loginStatus');

  if (!discordId) { status.className = 'login-status error'; status.textContent = 'Discord ID requis'; return; }

  const cfg = loadConfig();

  // Owner
  if (discordId === OWNER_ID) {
    if (!cfg.token) {
      status.className = 'login-status info';
      status.textContent = 'Import du token...';
      try {
        const imported = await fetch(`${BACKEND}/import-config`).then(r => r.json());
        if (imported.token) {
          cfg.token = imported.token;
          saveConfig(cfg);
          loadBotAvatar();
          status.className = 'login-status success';
          status.textContent = 'Token importe ! Reclique sur Se connecter.';
          return;
        }
      } catch {}
      status.className = 'login-status error';
      status.textContent = 'Token non configure. Verifie ~/.silverapp/config.json';
      return;
    }

    // Send pass
    if (!code || code.toLowerCase().replace(/\s/g, '') === 'sendpass') {
      status.className = 'login-status info'; status.textContent = 'Envoi du code en DM...';
      const loginCode = String(Math.floor(100000 + Math.random() * 900000));
      cfg._loginCode = loginCode;
      cfg._loginBlocked = false;
      saveConfig(cfg);

      const dm = await discordPost('/users/@me/channels', { recipient_id: discordId });
      if (dm.id) {
        await discordPost(`/channels/${dm.id}/messages`, {
          embeds: [{
            title: 'Silver App - Tentative de connexion',
            description: `Quelqu'un essaie de se connecter en tant qu'Owner.\n\nTon code :\n# **${loginCode}**\n\nSi ce n'est **PAS toi**, reponds \`non\`.`,
            color: 0xC0C5D0,
            footer: { text: 'Silver Bot App v2' }
          }]
        });
        status.className = 'login-status success';
        status.textContent = 'Code envoye en DM ! Verifie Discord.';

        // Watch for "non" response
        watchForBlock(dm.id, discordId);
      } else {
        status.className = 'login-status error';
        status.textContent = 'Erreur DM - verifie que tes DMs sont ouverts';
      }
      return;
    }

    // Verify code
    if (cfg._loginBlocked) {
      status.className = 'login-status error'; status.textContent = 'Acces bloque. Relance l\'app.'; return;
    }
    if (code === cfg._loginCode) {
      cfg._loginCode = '';
      cfg.trustedSession = true;
      cfg.sessionType = 'owner';
      saveConfig(cfg);
      silver.navigate('dashboard');
    } else {
      status.className = 'login-status error'; status.textContent = 'Code invalide';
    }
    return;
  }

  // Tester
  if (!code) { status.className = 'login-status error'; status.textContent = 'Code d\'invitation requis'; return; }

  const rows = await dbQuery('SELECT * FROM tester_codes WHERE code = %s', [code.toUpperCase()]);
  if (!rows.length) { status.className = 'login-status error'; status.textContent = 'Code invalide'; return; }

  const row = rows[0];
  if (row.used_at && row.discord_id && String(row.discord_id) !== discordId) {
    status.className = 'login-status error'; status.textContent = 'Code deja utilise par quelqu\'un d\'autre'; return;
  }

  await dbQuery('UPDATE tester_codes SET used_at = NOW(), discord_id = %s WHERE code = %s', [parseInt(discordId), code.toUpperCase()]);

  cfg.trustedSession = true;
  cfg.sessionType = 'tester';
  cfg.testerCode = code.toUpperCase();
  cfg.testerName = row.label || 'Testeur';
  cfg.testerDiscordId = discordId;
  saveConfig(cfg);
  silver.navigate('tester');
}

async function watchForBlock(dmId, userId) {
  for (let i = 0; i < 12; i++) {
    await new Promise(r => setTimeout(r, 5000));
    const cfg = loadConfig();
    if (!cfg._loginCode) return;
    const msgs = await discordGet(`/channels/${dmId}/messages?limit=5`);
    if (Array.isArray(msgs)) {
      for (const m of msgs) {
        if (m.author?.id === userId && ['non', 'no', 'n', 'bloque', 'block'].includes(m.content?.trim().toLowerCase())) {
          cfg._loginCode = '';
          cfg._loginBlocked = true;
          saveConfig(cfg);
          await discordPost(`/channels/${dmId}/messages`, {
            embeds: [{ title: 'Acces bloque', description: 'La tentative de connexion a ete bloquee.', color: 0xE74C3C }]
          });
          document.getElementById('loginStatus').className = 'login-status error';
          document.getElementById('loginStatus').textContent = 'Acces bloque par l\'owner';
          return;
        }
      }
    }
  }
}

// Forgot code
function toggleForgot() {
  document.getElementById('forgotPanel').classList.toggle('visible');
}

async function submitForgot() {
  const did = document.getElementById('forgotId').value.trim();
  const username = document.getElementById('forgotUsername').value.trim();
  const status = document.getElementById('forgotStatus');

  if (!did || !username) { status.className = 'login-status error'; status.textContent = 'Remplis les deux champs'; return; }

  await dbQuery('INSERT INTO forgot_code_requests (discord_id, username) VALUES (%s, %s)', [did, username]);
  status.className = 'login-status success';
  status.textContent = 'Demande envoyee ! L\'owner sera notifie.';
  document.getElementById('forgotId').value = '';
  document.getElementById('forgotUsername').value = '';
}

// Auto-import config from backend
async function importConfig() {
  const cfg = loadConfig();
  if (cfg.token) return;
  for (let i = 0; i < 10; i++) {
    try {
      const r = await fetch(`${BACKEND}/import-config`);
      const old = await r.json();
      if (old.token) {
        cfg.token = old.token;
        saveConfig(cfg);
        loadBotAvatar();
        return;
      }
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
}

// Init
importConfig().then(() => checkSession());
