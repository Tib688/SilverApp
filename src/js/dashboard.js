// Clock
setInterval(() => {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleTimeString('fr-FR');
}, 1000);

// Page system
let currentPage = 'overview';

function showPage(name) {
  currentPage = name;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${name}'`)) n.classList.add('active');
  });
  const content = document.getElementById('content');
  content.innerHTML = '<div class="loading"><div class="spinner"></div> Chargement...</div>';

  const loader = pageLoaders[name];
  if (loader) loader(content);
  else content.innerHTML = `<div class="coming-soon fade-in"><div class="icon">—</div><p>Coming soon</p></div>`;
}

// Page loaders
const pageLoaders = {
  overview: loadOverview,
  moderation: loadModeration,
  tickets: loadTickets,
  leaderboard: loadLeaderboard,
  members: loadMembers,
  suggestions: loadSuggestions,
  database: loadDatabase,
  control: loadControl,
  botinfo: loadBotInfo,
  chat: loadChat,
  testlab: loadTestLab,
  bugs: loadBugs,
  tasks: loadTasks,
  announcements: loadAnnouncements,
  forgot: loadForgotCodes,
  settings: loadSettings,
};

// ═══ OVERVIEW ════════════════════════════════════════════════════════════════

async function loadOverview(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Vue d'ensemble</h2><p>Donnees en temps reel</p></div>
    <div class="stats-grid" id="statsGrid"></div>
    <div id="serversSection"></div>
  `;

  // Stats cards (instant with -)
  const statInfo = [
    { label: 'Serveurs', color: 'var(--blue)', id: 'st0' },
    { label: 'Utilisateurs', color: 'var(--accent)', id: 'st1' },
    { label: 'XP Total', color: 'var(--purple)', id: 'st2' },
    { label: 'Messages', color: 'var(--cyan)', id: 'st3' },
    { label: 'Warns', color: 'var(--gold)', id: 'st4' },
    { label: 'Tickets', color: 'var(--red)', id: 'st5' },
    { label: 'Ouverts', color: 'var(--green)', id: 'st6' },
    { label: 'Suggestions', color: '#c084fc', id: 'st7' },
  ];

  document.getElementById('statsGrid').innerHTML = statInfo.map(s => `
    <div class="card stat-card slide-in" style="animation-delay:${statInfo.indexOf(s) * 0.03}s">
      <div class="stat-bar" style="background:${s.color}"></div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-value" id="${s.id}">-</div>
    </div>
  `).join('');

  // Load data async
  const [guilds, users, xp, msgs, warns, tickets, open, suggestions] = await Promise.all([
    discordGet('/users/@me/guilds').then(r => Array.isArray(r) ? r : []),
    dbScalar('SELECT COUNT(DISTINCT user_id) FROM user_xp'),
    dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp'),
    dbScalar('SELECT COALESCE(SUM(messages_count),0) FROM global_user_stats'),
    dbScalar('SELECT COUNT(*) FROM warnings'),
    dbScalar('SELECT COUNT(*) FROM tickets'),
    dbScalar("SELECT COUNT(*) FROM tickets WHERE status='open'"),
    dbScalar('SELECT COUNT(*) FROM suggestions'),
  ]);

  // Animate values
  const vals = [guilds.length, users, xp, msgs, warns, tickets, open, suggestions];
  vals.forEach((v, i) => animateValue(`st${i}`, 0, v, 400));

  // Banner pills
  document.getElementById('pillServers').textContent = guilds.length;
  document.getElementById('pillWarns').textContent = warns;
  document.getElementById('pillTickets').textContent = tickets;

  // Servers
  if (guilds.length) {
    let html = sectionHeader(`Serveurs (${guilds.length})`);
    html += '<div class="card">';
    guilds.forEach(g => {
      const icon = g.icon
        ? `<img src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=64">`
        : g.name[0].toUpperCase();
      html += `
        <div class="server-item">
          <div class="server-icon">${typeof icon === 'string' && icon.length === 1 ? icon : icon}</div>
          <div class="server-info">
            <div class="name">${esc(g.name)}</div>
            <div class="id">${g.id}</div>
          </div>
        </div>`;
    });
    html += '</div>';
    document.getElementById('serversSection').innerHTML = html;
  }

  // Bot identity for sidebar
  const me = await discordGet('/users/@me');
  if (me && !me.error) {
    const url = getBotAvatar(me, 128);
    if (url) document.getElementById('sidebarAvatar').innerHTML = `<img src="${url}">`;
    document.getElementById('welcomeSub').textContent = `Owner · ${me.username}`;
  }
}

// ═══ MODERATION ══════════════════════════════════════════════════════════════

async function loadModeration(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Moderation</h2><p>Avertissements</p></div><div id="modContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery('SELECT id, guild_id, user_id, mod_id, reason, created_at FROM warnings ORDER BY created_at DESC LIMIT 50');
  if (!rows.length) { document.getElementById('modContent').innerHTML = '<div class="coming-soon"><div class="icon">—</div><p>Aucun avertissement</p></div>'; return; }

  const userIds = [...new Set(rows.flatMap(r => [r.user_id, r.mod_id]).filter(Boolean))];
  const userCache = await fetchUsersBatch(userIds);

  document.getElementById('modContent').innerHTML = buildTable(['ID', 'User', 'Moderateur', 'Raison', 'Date'],
    rows.map(r => [`#${r.id}`, avatarCell(r.user_id, userCache), avatarCell(r.mod_id, userCache), (r.reason || '').slice(0, 40), fmtDate(r.created_at)]));
}

// ═══ TICKETS ═════════════════════════════════════════════════════════════════

async function loadTickets(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Tickets</h2><p>Support</p></div><div id="tickContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery('SELECT ticket_id, guild_id, user_id, status, created_at FROM tickets ORDER BY created_at DESC LIMIT 50');
  if (!rows.length) { document.getElementById('tickContent').innerHTML = '<div class="coming-soon"><div class="icon">—</div><p>Aucun ticket</p></div>'; return; }
  document.getElementById('tickContent').innerHTML = buildTable(['ID', 'User', 'Statut', 'Date'],
    rows.map(r => [`#${r.ticket_id}`, r.user_id, `<span class="badge badge-${r.status === 'open' ? 'green' : 'red'}">${r.status}</span>`, fmtDate(r.created_at)]));
}

// ═══ LEADERBOARD ═════════════════════════════════════════════════════════════

async function loadLeaderboard(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Leaderboard</h2><p>Classement XP</p></div><div id="lbContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery('SELECT user_id, SUM(xp) as xp, SUM(chat_xp) as chat_xp, SUM(voice_xp) as voice_xp, SUM(messages_count) as msgs FROM user_xp GROUP BY user_id ORDER BY xp DESC LIMIT 20');
  if (!rows.length) { document.getElementById('lbContent').innerHTML = '<div class="coming-soon"><div class="icon">—</div><p>Aucune donnee XP</p></div>'; return; }

  const userIds = rows.map(r => r.user_id).filter(Boolean);
  const userCache = await fetchUsersBatch(userIds);

  document.getElementById('lbContent').innerHTML = buildTable(['#', 'User', 'XP', 'Chat', 'Voice', 'Messages'],
    rows.map((r, i) => [i < 3 ? ['🥇','🥈','🥉'][i] : i+1, avatarCell(r.user_id, userCache), r.xp || 0, r.chat_xp || 0, r.voice_xp || 0, r.msgs || 0]));
}

// ═══ MEMBERS ═════════════════════════════════════════════════════════════════

async function loadMembers(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Recherche Membre</h2><p>Profil par User ID</p></div>
    <div style="display:flex;gap:8px;margin-bottom:16px">
      <input type="text" id="memberSearch" placeholder="User ID Discord..." style="max-width:300px" inputmode="numeric">
      <button class="btn btn-primary" onclick="searchMember()">Rechercher</button>
      <button class="btn btn-secondary" onclick="showFavorites()">★ Favoris</button>
    </div>
    <div id="memberResult"></div>`;
}

async function searchMember() {
  const uid = document.getElementById('memberSearch').value.trim();
  if (!uid) return;
  const res = document.getElementById('memberResult');
  res.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  const [gstats, warns, gxp] = await Promise.all([
    dbQuery('SELECT guild_id, xp, chat_xp, voice_xp, messages_count, voice_minutes FROM user_xp WHERE user_id = %s', [uid]),
    dbQuery('SELECT id, guild_id, reason, created_at FROM warnings WHERE user_id = %s ORDER BY created_at DESC', [uid]),
    dbScalar('SELECT COALESCE(global_xp,0) FROM global_user_profile WHERE user_id = %s', [uid]),
  ]);

  const user = await discordGet(`/users/${uid}`);
  const username = user?.username || uid;
  const avatar = user && !user.error ? getUserAvatar(uid, user.avatar, 128) : null;
  const level = Math.floor(Math.sqrt((gxp || 0) / 100));

  let html = `<div class="card fade-in" style="display:flex;align-items:center;gap:16px;margin-bottom:16px;padding:18px">`;
  if (avatar) html += `<img src="${avatar}" style="width:56px;height:56px;border-radius:50%">`;
  html += `<div><div style="font-size:18px;font-weight:700;color:var(--bright)">${esc(username)}</div>
    <div style="font-size:11px;color:var(--dim)">Niveau ${level} · XP: ${gxp || 0} · ${warns.length} warn(s)</div></div></div>`;

  if (gstats.length) {
    html += sectionHeader(`Activite par serveur (${gstats.length})`);
    html += buildTable(['Serveur', 'XP', 'Chat', 'Voice', 'Messages', 'Vocal'],
      gstats.map(g => [g.guild_id, g.xp||0, g.chat_xp||0, g.voice_xp||0, g.messages_count||0, `${g.voice_minutes||0}m`]));
  }
  if (warns.length) {
    html += sectionHeader(`Avertissements (${warns.length})`);
    html += buildTable(['ID', 'Serveur', 'Raison', 'Date'],
      warns.map(w => [`#${w.id}`, w.guild_id, (w.reason||'').slice(0,40), fmtDate(w.created_at)]));
  }
  res.innerHTML = html;
}

async function showFavorites() {
  const res = document.getElementById('memberResult');
  const favs = await dbQuery('SELECT discord_id, username, added_at FROM member_favorites ORDER BY added_at DESC');
  if (!favs.length) { res.innerHTML = '<div class="coming-soon"><div class="icon">★</div><p>Aucun favori</p></div>'; return; }
  let html = sectionHeader(`Favoris (${favs.length})`);
  html += '<div class="card">';
  favs.forEach(f => {
    html += `<div class="server-item"><span style="font-size:16px;color:var(--gold)">★</span>
      <div class="server-info"><div class="name">${esc(f.username || String(f.discord_id))}</div><div class="id">${f.discord_id}</div></div>
      <button class="btn btn-secondary" style="padding:6px 12px;font-size:11px" onclick="document.getElementById('memberSearch').value='${f.discord_id}';searchMember()">Voir</button></div>`;
  });
  html += '</div>';
  res.innerHTML = html;
}

// ═══ SUGGESTIONS ═════════════════════════════════════════════════════════════

async function loadSuggestions(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Suggestions</h2><p>Idees des membres</p></div><div id="sugContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery('SELECT id, user_id, content, status, created_at FROM suggestions ORDER BY created_at DESC LIMIT 30');
  if (!rows.length) { document.getElementById('sugContent').innerHTML = '<div class="coming-soon"><div class="icon">—</div><p>Aucune suggestion</p></div>'; return; }
  document.getElementById('sugContent').innerHTML = buildTable(['ID', 'User', 'Contenu', 'Statut', 'Date'],
    rows.map(r => [`#${r.id}`, r.user_id, esc((r.content||'').slice(0,40)), `<span class="badge badge-${r.status === 'approved' ? 'green' : r.status === 'rejected' ? 'red' : 'gold'}">${r.status}</span>`, fmtDate(r.created_at)]));
}

// ═══ DATABASE ════════════════════════════════════════════════════════════════

async function loadDatabase(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Base de donnees</h2><p>MySQL en direct</p></div><div id="dbContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const tables = ['guild_config','warnings','welcome_config','ticket_config','tickets','role_panels','antispam_config','reminders','autoroles','suggestions','user_xp','global_user_profile','level_rewards','global_user_stats','notification_config','guild_customization'];
  let total = 0;
  const data = [];
  for (const t of tables) {
    const c = await dbScalar(`SELECT COUNT(*) FROM \`${t}\``);
    data.push([t, c]);
    total += c;
  }
  data.sort((a, b) => b[1] - a[1]);

  let html = `<div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:20px">
    <div class="card stat-card"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">Total lignes</div><div class="stat-value">${total}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">Tables</div><div class="stat-value">${tables.length}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Type</div><div class="stat-value" style="font-size:16px">MySQL</div></div>
  </div>`;
  html += buildTable(['Table', 'Lignes', 'Proportion'], data.map(([name, count]) => {
    const pct = total > 0 ? Math.round(count / total * 100) : 0;
    return [name, count, `<div style="display:flex;align-items:center;gap:8px"><div style="width:100px;height:4px;background:var(--bg2);border-radius:2px;overflow:hidden"><div style="width:${pct}%;height:100%;background:var(--accent);border-radius:2px"></div></div><span style="font-size:10px;color:var(--muted)">${pct}%</span></div>`];
  }));
  document.getElementById('dbContent').innerHTML = html;
}

// ═══ PARAMETRES ═════════════════════════════════════════════════════════════

async function loadSettings(el) {
  const cfg = await fetch(`${BACKEND}/import-config`).then(r => r.json());
  const testers = await dbQuery("SELECT id, code, discord_id, discord_username, created_at FROM tester_codes ORDER BY created_at DESC");

  el.innerHTML = `
    <div class="page-header fade-in"><h2>Parametres</h2><p>Configuration de Silver App</p></div>
    <div class="settings-grid fade-in">

      <!-- Token -->
      <div class="card settings-section">
        <div class="control-section-title">Token Bot Discord</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="password" id="settingsToken" value="${esc(cfg.token || '')}" style="flex:1;font-family:monospace;font-size:11px">
          <button class="btn btn-secondary" onclick="document.getElementById('settingsToken').type=document.getElementById('settingsToken').type==='password'?'text':'password'">👁</button>
          <button class="btn btn-primary" onclick="settingsSaveToken()">Sauver</button>
        </div>
        <div id="settingsTokenStatus" class="control-status"></div>
      </div>

      <!-- MySQL -->
      <div class="card settings-section">
        <div class="control-section-title">MySQL</div>
        <div class="settings-info-grid">
          <div><span class="settings-label">Host</span><span class="settings-value">163.5.159.107:3306</span></div>
          <div><span class="settings-label">User</span><span class="settings-value">u15187_Ete17ZQbC1</span></div>
          <div><span class="settings-label">Database</span><span class="settings-value">s15187_DBs</span></div>
          <div><span class="settings-label">Status</span><span class="settings-value" id="settingsDbStatus"><span class="dot dot-green" style="width:6px;height:6px"></span> Connecte</span></div>
        </div>
      </div>

      <!-- Gestion testeurs -->
      <div class="card settings-section" style="grid-column:1/-1">
        <div class="control-section-title">Gestion des testeurs</div>
        <div style="display:flex;gap:8px;margin-bottom:12px;align-items:center">
          <input type="text" id="settingsNewTesterName" placeholder="Pseudo Discord (optionnel)" style="max-width:200px">
          <input type="text" id="settingsNewTesterId" placeholder="Discord ID (optionnel)" style="max-width:180px">
          <button class="btn btn-primary" onclick="settingsGenerateCode()">Generer un code</button>
        </div>
        <div id="settingsCodeResult"></div>
        <div id="settingsTesterList" style="margin-top:12px">
          ${testers.length ? testers.map(t => `
            <div class="server-item">
              <div class="server-icon" style="font-size:11px;width:28px;height:28px">${(t.discord_username || '?')[0].toUpperCase()}</div>
              <div class="server-info">
                <div class="name">${esc(t.discord_username || 'Testeur')}</div>
                <div class="id">${t.discord_id || '—'} · Code: <code>${esc(t.code)}</code></div>
              </div>
              <button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="settingsCopyInvite('${esc(t.code)}','${esc(t.discord_username || '')}')">Copier invite</button>
              <button class="btn btn-danger" style="padding:4px 10px;font-size:10px" onclick="settingsDeleteTester(${t.id})">Suppr</button>
            </div>
          `).join('') : '<div style="font-size:12px;color:var(--muted)">Aucun testeur</div>'}
        </div>
      </div>

      <!-- App info -->
      <div class="card settings-section">
        <div class="control-section-title">Application</div>
        <div class="settings-info-grid">
          <div><span class="settings-label">Version</span><span class="settings-value">v2.0.0</span></div>
          <div><span class="settings-label">Framework</span><span class="settings-value">Electron</span></div>
          <div><span class="settings-label">Backend</span><span class="settings-value">FastAPI :8051</span></div>
          <div><span class="settings-label">GitHub</span><span class="settings-value">Tib688/SilverApp</span></div>
        </div>
      </div>

      <!-- Owner -->
      <div class="card settings-section">
        <div class="control-section-title">Owner</div>
        <div class="settings-info-grid">
          <div><span class="settings-label">Discord ID</span><span class="settings-value">1504594533521031219</span></div>
          <div><span class="settings-label">Pseudo</span><span class="settings-value">Tib</span></div>
          <div><span class="settings-label">Role</span><span class="settings-value"><span class="badge badge-blue">Owner</span></span></div>
        </div>
      </div>

    </div>`;

  // Check DB health
  try {
    const h = await fetch(`${BACKEND}/health`).then(r => r.json());
    if (h.status !== 'ok') document.getElementById('settingsDbStatus').innerHTML = '<span class="dot dot-red" style="width:6px;height:6px"></span> Erreur';
  } catch { document.getElementById('settingsDbStatus').innerHTML = '<span class="dot dot-red" style="width:6px;height:6px"></span> Hors ligne'; }
}

async function settingsSaveToken() {
  const token = document.getElementById('settingsToken').value.trim();
  try {
    const cfg = await fetch(`${BACKEND}/import-config`).then(r => r.json());
    cfg.token = token;
    const cfgPath = 'C:\\\\Users\\\\thiba.TIB\\\\.silverapp\\\\config.json';
    await fetch(`${BACKEND}/save-config`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cfg) });
    ctrlStatus('settingsTokenStatus', 'Token sauvegarde !', true);
  } catch (e) {
    ctrlStatus('settingsTokenStatus', 'Erreur sauvegarde', false);
  }
}

async function settingsGenerateCode() {
  const username = document.getElementById('settingsNewTesterName').value.trim();
  const discordId = document.getElementById('settingsNewTesterId').value.trim();
  const code = 'SILVER-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  await dbQuery("INSERT INTO tester_codes (code, discord_id, discord_username, created_at) VALUES (%s,%s,%s,NOW())",
    [code, discordId || null, username || null]);

  const githubLink = 'https://github.com/Tib688/SilverApp/releases';
  const invitation = `Silver App - Invitation Testeur\nUtilisateur: ${username || discordId || 'Nouveau testeur'}\nCode: ${code}\nTelecharger: ${githubLink}`;
  try { await navigator.clipboard.writeText(invitation); } catch {}

  document.getElementById('settingsCodeResult').innerHTML = `
    <div class="card slide-in" style="padding:12px;border-color:var(--green);margin-bottom:8px">
      <div style="font-size:12px;color:var(--green);font-weight:700">Code genere et copie !</div>
      <div style="font-size:14px;color:var(--bright);font-family:monospace;margin-top:4px">${code}</div>
    </div>`;
  setTimeout(() => loadSettings(document.getElementById('content')), 2000);
}

function settingsCopyInvite(code, username) {
  const githubLink = 'https://github.com/Tib688/SilverApp/releases';
  const invitation = `Silver App - Invitation Testeur\nUtilisateur: ${username || 'Testeur'}\nCode: ${code}\nTelecharger: ${githubLink}`;
  navigator.clipboard.writeText(invitation);
}

async function settingsDeleteTester(id) {
  await dbQuery("DELETE FROM tester_codes WHERE id=%s", [id]);
  loadSettings(document.getElementById('content'));
}

// ═══ CODES OUBLIES ══════════════════════════════════════════════════════════

async function loadForgotCodes(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Codes oublies</h2><p>Demandes de recuperation de code testeur</p></div>
    <div id="forgotList"><div class="loading"><div class="spinner"></div></div></div>`;
  forgotLoadList();
}

async function forgotLoadList() {
  const listEl = document.getElementById('forgotList');
  const rows = await dbQuery("SELECT id, discord_id, discord_username, status, created_at FROM forgot_code_requests ORDER BY created_at DESC LIMIT 50");
  if (!rows.length) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">🔑</div><p>Aucune demande</p></div>'; return; }

  listEl.innerHTML = rows.map(r => {
    const isPending = r.status === 'pending';
    return `<div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:${isPending ? 'var(--gold)' : 'var(--green)'}"></div>
        <div class="bug-item-title">${esc(r.discord_username || r.discord_id)}</div>
        <span class="badge ${isPending ? 'badge-gold' : 'badge-green'}">${isPending ? 'En attente' : 'Traite'}</span>
        <div class="bug-item-actions">
          ${isPending ? `<button class="btn btn-primary" style="padding:4px 10px;font-size:10px" onclick="forgotGenerate(${r.id},'${r.discord_id}','${esc(r.discord_username || '')}')">Generer code</button>` : ''}
        </div>
      </div>
      <div class="bug-item-meta">ID: ${r.discord_id} · ${fmtDateTime(r.created_at)}</div>
    </div>`;
  }).join('');
}

async function forgotGenerate(requestId, discordId, username) {
  const code = 'SILVER-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  await dbQuery("UPDATE forgot_code_requests SET status='resolved' WHERE id=%s", [requestId]);
  await dbQuery("UPDATE tester_codes SET code=%s WHERE discord_id=%s", [code, discordId]);

  const githubLink = 'https://github.com/Tib688/SilverApp/releases';
  const invitation = `Silver App - Code Testeur\nUtilisateur: ${username || discordId}\nNouveau code: ${code}\nTelecharger: ${githubLink}`;

  try { await navigator.clipboard.writeText(invitation); } catch {}

  const listEl = document.getElementById('forgotList');
  listEl.insertAdjacentHTML('afterbegin', `
    <div class="card slide-in" style="margin-bottom:10px;padding:14px;border-color:var(--green)">
      <div style="font-size:12px;color:var(--green);font-weight:700;margin-bottom:6px">Nouveau code genere et copie !</div>
      <div style="font-size:13px;color:var(--bright);font-family:monospace;background:var(--bg);padding:8px 12px;border-radius:6px;margin-bottom:6px">${code}</div>
      <div style="font-size:10px;color:var(--muted)">Invitation copiee dans le presse-papier</div>
    </div>`);

  setTimeout(forgotLoadList, 3000);
}

// ═══ ANNONCES TESTEURS ══════════════════════════════════════════════════════

async function loadAnnouncements(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Annonces</h2><p>Publier des annonces pour les testeurs</p></div>
    <div class="fade-in">
      <button class="btn btn-primary" onclick="announceShowForm()" style="margin-bottom:14px">+ Nouvelle annonce</button>
    </div>
    <div id="announceFormContainer"></div>
    <div id="announceList"><div class="loading"><div class="spinner"></div></div></div>`;
  announceLoadList();
}

function announceShowForm() {
  const c = document.getElementById('announceFormContainer');
  if (c.innerHTML) { c.innerHTML = ''; return; }
  c.innerHTML = `
    <div class="card slide-in" style="margin-bottom:14px;padding:16px">
      <div class="control-section-title">Nouvelle annonce</div>
      <input type="text" id="announceTitle" placeholder="Titre de l'annonce">
      <textarea id="announceContent" placeholder="Contenu de l'annonce..." rows="4" style="margin-top:8px;resize:vertical"></textarea>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="btn btn-primary" onclick="announceSubmit()">Publier</button>
        <button class="btn btn-secondary" onclick="document.getElementById('announceFormContainer').innerHTML=''">Annuler</button>
      </div>
    </div>`;
}

async function announceSubmit() {
  const title = document.getElementById('announceTitle').value.trim();
  const content = document.getElementById('announceContent').value.trim();
  if (!title) return;
  await dbQuery("INSERT INTO tester_announcements (author_id, author_name, title, content, created_at) VALUES (%s,%s,%s,%s,NOW())",
    ['1504594533521031219', 'Tib (Owner)', title, content]);
  document.getElementById('announceFormContainer').innerHTML = '';
  announceLoadList();
}

async function announceLoadList() {
  const listEl = document.getElementById('announceList');
  const rows = await dbQuery("SELECT id, author_name, title, content, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 30");
  if (!rows.length) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">📢</div><p>Aucune annonce</p></div>'; return; }

  listEl.innerHTML = rows.map(r => `
    <div class="card announce-card slide-in" style="margin-bottom:10px">
      <div class="announce-header">
        <div class="announce-title">${esc(r.title)}</div>
        <button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="announceDelete(${r.id})">Supprimer</button>
      </div>
      ${r.content ? `<div class="announce-body">${esc(r.content).replace(/\n/g, '<br>')}</div>` : ''}
      <div class="announce-meta">${esc(r.author_name || '?')} · ${fmtDateTime(r.created_at)}</div>
    </div>
  `).join('');
}

async function announceDelete(id) {
  await dbQuery("DELETE FROM tester_announcements WHERE id=%s", [id]);
  announceLoadList();
}

// ═══ TACHES TESTEURS ════════════════════════════════════════════════════════

let tasksFilter = 'all';

async function loadTasks(el) {
  const testers = await dbQuery("SELECT code, discord_id, discord_username FROM tester_codes ORDER BY created_at DESC");
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Taches Testeurs</h2><p>Creer et suivre les taches</p></div>
    <div class="bugs-toolbar fade-in">
      <button class="btn btn-primary" onclick="taskShowForm()">+ Nouvelle tache</button>
      <div class="bugs-filters">
        <button class="btn btn-secondary bugs-filter-btn active" onclick="taskFilter('all',this)">Toutes</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="taskFilter('todo',this)">A faire</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="taskFilter('in_progress',this)">En cours</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="taskFilter('done',this)">Terminees</button>
      </div>
    </div>
    <div id="taskFormContainer"></div>
    <div id="taskStats" class="fade-in"></div>
    <div id="tasksList"><div class="loading"><div class="spinner"></div></div></div>`;
  window._taskTesters = testers;
  tasksFilter = 'all';
  taskLoadList();
}

function taskShowForm() {
  const c = document.getElementById('taskFormContainer');
  if (c.innerHTML) { c.innerHTML = ''; return; }
  const testers = window._taskTesters || [];
  c.innerHTML = `
    <div class="card slide-in" style="margin-bottom:14px;padding:16px">
      <div class="control-section-title">Nouvelle tache</div>
      <input type="text" id="taskTitle" placeholder="Titre de la tache">
      <textarea id="taskDesc" placeholder="Description..." rows="2" style="margin-top:8px;resize:vertical"></textarea>
      <div style="display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap">
        <select id="taskAssignee" style="max-width:180px">
          <option value="">Non assignee</option>
          ${testers.map(t => `<option value="${t.discord_id || t.code}">${esc(t.discord_username || t.code)}</option>`).join('')}
        </select>
        <select id="taskPriority" style="max-width:130px">
          <option value="low">Basse</option>
          <option value="medium" selected>Moyenne</option>
          <option value="high">Haute</option>
          <option value="urgent">Urgente</option>
        </select>
        <button class="btn btn-primary" onclick="taskSubmit()">Creer</button>
        <button class="btn btn-secondary" onclick="document.getElementById('taskFormContainer').innerHTML=''">Annuler</button>
      </div>
    </div>`;
}

async function taskSubmit() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const assignee = document.getElementById('taskAssignee').value;
  const priority = document.getElementById('taskPriority').value;
  if (!title) return;
  await dbQuery("INSERT INTO tester_tasks (title, description, assigned_to, priority, status, created_by, created_at) VALUES (%s,%s,%s,%s,'todo',%s,NOW())",
    [title, desc, assignee || null, priority, '1504594533521031219']);
  document.getElementById('taskFormContainer').innerHTML = '';
  taskLoadList();
}

async function taskLoadList() {
  const listEl = document.getElementById('tasksList');
  const statsEl = document.getElementById('taskStats');
  let query = "SELECT id, title, description, assigned_to, priority, status, created_at FROM tester_tasks";
  if (tasksFilter !== 'all') query += ` WHERE status='${tasksFilter}'`;
  query += " ORDER BY FIELD(priority,'urgent','high','medium','low'), created_at DESC LIMIT 100";
  const rows = await dbQuery(query);

  // Stats
  const allTasks = await dbQuery("SELECT status, COUNT(*) as c FROM tester_tasks GROUP BY status");
  const counts = { todo: 0, in_progress: 0, done: 0 };
  allTasks.forEach(r => { if (counts[r.status] !== undefined) counts[r.status] = r.c; });
  const total = counts.todo + counts.in_progress + counts.done;
  const pct = total > 0 ? Math.round(counts.done / total * 100) : 0;

  statsEl.innerHTML = `<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:14px">
    <div class="card stat-card"><div class="stat-bar" style="background:var(--gold)"></div><div class="stat-label">A faire</div><div class="stat-value">${counts.todo}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">En cours</div><div class="stat-value">${counts.in_progress}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Terminees</div><div class="stat-value">${counts.done}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--accent)"></div><div class="stat-label">Completion</div><div class="stat-value">${pct}%</div></div>
  </div>`;

  if (!rows.length) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">📋</div><p>Aucune tache</p></div>'; return; }

  const prioColors = { low: 'var(--blue)', medium: 'var(--gold)', high: 'var(--red)', urgent: '#ff2d55' };
  const statusLabels = { todo: 'A faire', in_progress: 'En cours', done: 'Termine' };
  const statusBadges = { todo: 'badge-gold', in_progress: 'badge-blue', done: 'badge-green' };

  listEl.innerHTML = rows.map(r => {
    const tester = (window._taskTesters || []).find(t => t.discord_id === r.assigned_to || t.code === r.assigned_to);
    const assignName = tester ? (tester.discord_username || tester.code) : (r.assigned_to || 'Non assignee');
    const nextStatus = r.status === 'todo' ? 'in_progress' : r.status === 'in_progress' ? 'done' : null;
    return `<div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:${prioColors[r.priority] || 'var(--muted)'}"></div>
        <div class="bug-item-title">${esc(r.title)}</div>
        <span class="badge ${statusBadges[r.status] || 'badge-gold'}">${statusLabels[r.status] || r.status}</span>
        <div class="bug-item-actions">
          ${nextStatus ? `<button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="taskSetStatus(${r.id},'${nextStatus}')">${nextStatus === 'in_progress' ? 'Demarrer' : 'Terminer'}</button>` : ''}
          ${r.status !== 'done' ? `<button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="taskDelete(${r.id})">Suppr</button>` : ''}
        </div>
      </div>
      ${r.description ? `<div class="bug-item-desc">${esc(r.description)}</div>` : ''}
      <div class="bug-item-meta">Assignee : ${esc(assignName)} · ${r.priority} · ${fmtDate(r.created_at)}</div>
    </div>`;
  }).join('');
}

function taskFilter(f, btn) {
  tasksFilter = f;
  document.querySelectorAll('.bugs-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  taskLoadList();
}

async function taskSetStatus(id, status) {
  await dbQuery("UPDATE tester_tasks SET status=%s WHERE id=%s", [status, id]);
  taskLoadList();
}

async function taskDelete(id) {
  await dbQuery("DELETE FROM tester_tasks WHERE id=%s", [id]);
  taskLoadList();
}

// ═══ BUGS REPORTS ═══════════════════════════════════════════════════════════

async function loadBugs(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Bugs Reports</h2><p>Signaler et suivre les bugs</p></div>
    <div class="bugs-toolbar fade-in">
      <button class="btn btn-primary" onclick="bugShowForm()">+ Signaler un bug</button>
      <div class="bugs-filters">
        <button class="btn btn-secondary bugs-filter-btn active" onclick="bugFilter('all')">Tous</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="bugFilter('open')">Ouverts</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="bugFilter('fixed')">Fixes</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="bugFilter('closed')">Fermes</button>
      </div>
    </div>
    <div id="bugFormContainer"></div>
    <div id="bugsList"><div class="loading"><div class="spinner"></div></div></div>`;
  bugLoadList('all');
}

function bugShowForm() {
  const container = document.getElementById('bugFormContainer');
  if (container.innerHTML) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <div class="card bug-form slide-in" style="margin-bottom:14px">
      <div class="control-section-title">Nouveau bug</div>
      <input type="text" id="bugTitle" placeholder="Titre du bug">
      <textarea id="bugDesc" placeholder="Description detaillee..." rows="3" style="margin-top:8px;resize:vertical"></textarea>
      <div style="display:flex;gap:8px;margin-top:8px;align-items:center">
        <select id="bugSeverity" style="max-width:160px">
          <option value="low">Basse</option>
          <option value="medium" selected>Moyenne</option>
          <option value="high">Haute</option>
          <option value="critical">Critique</option>
        </select>
        <button class="btn btn-primary" onclick="bugSubmit()">Soumettre</button>
        <button class="btn btn-secondary" onclick="document.getElementById('bugFormContainer').innerHTML=''">Annuler</button>
      </div>
      <div id="bugFormStatus" class="control-status"></div>
    </div>`;
}

async function bugSubmit() {
  const title = document.getElementById('bugTitle').value.trim();
  const desc = document.getElementById('bugDesc').value.trim();
  const severity = document.getElementById('bugSeverity').value;
  if (!title) { document.getElementById('bugFormStatus').textContent = 'Titre requis'; return; }
  await dbQuery("INSERT INTO tester_bugs (reporter_id, reporter_name, title, description, severity, status, created_at) VALUES (%s, %s, %s, %s, %s, 'open', NOW())",
    ['1504594533521031219', 'Tib (Owner)', title, desc, severity]);
  document.getElementById('bugFormContainer').innerHTML = '';
  bugLoadList('all');
}

async function bugLoadList(filter) {
  const listEl = document.getElementById('bugsList');
  let query = "SELECT id, reporter_name, title, description, severity, status, created_at FROM tester_bugs";
  if (filter && filter !== 'all') query += ` WHERE status='${filter}'`;
  query += " ORDER BY created_at DESC LIMIT 50";
  const rows = await dbQuery(query);
  if (!rows.length) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">🐛</div><p>Aucun bug signale</p></div>'; return; }

  listEl.innerHTML = rows.map(r => {
    const sevColors = { low: 'var(--blue)', medium: 'var(--gold)', high: 'var(--red)', critical: '#ff2d55' };
    const statusBadge = r.status === 'open' ? 'badge-gold' : r.status === 'fixed' ? 'badge-green' : 'badge-red';
    return `<div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:${sevColors[r.severity] || 'var(--muted)'}"></div>
        <div class="bug-item-title">${esc(r.title)}</div>
        <span class="badge ${statusBadge}">${r.status}</span>
        <div class="bug-item-actions">
          ${r.status === 'open' ? `<button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="bugSetStatus(${r.id},'fixed')">Fixer</button>` : ''}
          ${r.status !== 'closed' ? `<button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="bugSetStatus(${r.id},'closed')">Fermer</button>` : ''}
          ${r.status === 'closed' ? `<button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="bugSetStatus(${r.id},'open')">Rouvrir</button>` : ''}
        </div>
      </div>
      ${r.description ? `<div class="bug-item-desc">${esc(r.description)}</div>` : ''}
      <div class="bug-item-meta">${esc(r.reporter_name || '?')} · ${r.severity} · ${fmtDate(r.created_at)}</div>
    </div>`;
  }).join('');
}

function bugFilter(filter) {
  document.querySelectorAll('.bugs-filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  bugLoadList(filter);
}

async function bugSetStatus(id, status) {
  await dbQuery("UPDATE tester_bugs SET status=%s WHERE id=%s", [status, id]);
  const activeFilter = document.querySelector('.bugs-filter-btn.active');
  bugLoadList(activeFilter ? activeFilter.textContent.toLowerCase().replace('tous','all').replace('ouverts','open').replace('fixes','fixed').replace('fermes','closed') : 'all');
}

// ═══ TEST LAB ═══════════════════════════════════════════════════════════════

let testlabCommands = [];
let testlabMessages = [];

async function loadTestLab(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Test Lab</h2><p>Simulateur de commandes bot — environnement sandbox</p></div>
    <div class="testlab-layout fade-in">
      <div class="testlab-sidebar">
        <div class="testlab-sidebar-header">Commandes</div>
        <input type="text" id="testlabSearch" placeholder="Rechercher..." oninput="testlabFilter()" style="margin:8px;width:calc(100% - 16px)">
        <div class="testlab-cmd-list" id="testlabCmdList">
          <div class="loading"><div class="spinner"></div></div>
        </div>
        <div class="testlab-cmd-count" id="testlabCmdCount"></div>
      </div>
      <div class="testlab-main">
        <div class="testlab-chat" id="testlabChat">
          <div class="testlab-welcome">
            <div class="testlab-welcome-icon">⚗</div>
            <div class="testlab-welcome-title">Silver Bot — Test Lab</div>
            <div class="testlab-welcome-sub">Tape une commande avec / pour tester le bot</div>
          </div>
        </div>
        <div class="testlab-input-bar">
          <span class="testlab-slash">/</span>
          <input type="text" id="testlabInput" placeholder="commande args..." onkeydown="testlabKeydown(event)" autocomplete="off">
          <button class="btn btn-primary" onclick="testlabSend()">Envoyer</button>
        </div>
        <div class="testlab-suggestions" id="testlabSuggestions"></div>
      </div>
    </div>`;

  const res = await fetch(`${BACKEND}/testlab/commands`);
  testlabCommands = await res.json();
  testlabMessages = [];
  renderTestlabCmdList(testlabCommands);
}

function renderTestlabCmdList(cmds) {
  const list = document.getElementById('testlabCmdList');
  const count = document.getElementById('testlabCmdCount');
  count.textContent = `${cmds.length} commande${cmds.length > 1 ? 's' : ''}`;
  list.innerHTML = cmds.map(c => `
    <div class="testlab-cmd-item" onclick="testlabInsertCmd('${esc(c.name)}')">
      <span class="testlab-cmd-name">/${esc(c.name)}</span>
      <span class="testlab-cmd-desc">${esc(c.description)}</span>
    </div>
  `).join('');
}

function testlabFilter() {
  const q = document.getElementById('testlabSearch').value.toLowerCase();
  const filtered = testlabCommands.filter(c => c.name.includes(q) || c.description.toLowerCase().includes(q));
  renderTestlabCmdList(filtered);
}

function testlabInsertCmd(name) {
  const input = document.getElementById('testlabInput');
  input.value = name + ' ';
  input.focus();
}

function testlabKeydown(e) {
  if (e.key === 'Enter') testlabSend();
  if (e.key === 'Tab') {
    e.preventDefault();
    testlabAutocomplete();
  }
  setTimeout(testlabShowSuggestions, 10);
}

function testlabAutocomplete() {
  const input = document.getElementById('testlabInput');
  const val = input.value.trim().toLowerCase();
  const match = testlabCommands.find(c => c.name.startsWith(val));
  if (match) input.value = match.name + ' ';
}

function testlabShowSuggestions() {
  const val = document.getElementById('testlabInput').value.trim().toLowerCase();
  const sugEl = document.getElementById('testlabSuggestions');
  if (!val) { sugEl.innerHTML = ''; return; }
  const matches = testlabCommands.filter(c => c.name.startsWith(val)).slice(0, 5);
  if (!matches.length) { sugEl.innerHTML = ''; return; }
  sugEl.innerHTML = matches.map(c => `<div class="testlab-suggestion-item" onclick="testlabInsertCmd('${esc(c.name)}')">${esc('/' + c.name)} <span style="color:var(--muted)">${esc(c.description)}</span></div>`).join('');
}

async function testlabSend() {
  const input = document.getElementById('testlabInput');
  let cmd = input.value.trim();
  if (!cmd) return;
  if (!cmd.startsWith('/')) cmd = '/' + cmd;
  input.value = '';
  document.getElementById('testlabSuggestions').innerHTML = '';

  testlabMessages.push({ type: 'user', content: cmd });
  renderTestlabChat();

  try {
    const res = await fetch(`${BACKEND}/testlab/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: cmd, username: 'Tib' }),
    });
    const data = await res.json();
    testlabMessages.push({ type: 'bot', content: data.content, embed: data.embed });
  } catch (e) {
    testlabMessages.push({ type: 'bot', content: `Erreur: ${e.message}`, embed: null });
  }
  renderTestlabChat();
}

function renderTestlabChat() {
  const chat = document.getElementById('testlabChat');
  chat.innerHTML = testlabMessages.map(m => {
    if (m.type === 'user') {
      return `<div class="testlab-msg testlab-msg-user">
        <div class="testlab-msg-avatar">T</div>
        <div class="testlab-msg-body">
          <div class="testlab-msg-name" style="color:var(--accent)">Tib</div>
          <div class="testlab-msg-content">${esc(m.content)}</div>
        </div>
      </div>`;
    }
    let html = '';
    if (m.content) {
      html += `<div class="testlab-msg-content">${esc(m.content)}</div>`;
    }
    if (m.embed) {
      html += renderDiscordEmbed(m.embed);
    }
    return `<div class="testlab-msg testlab-msg-bot">
      <div class="testlab-msg-avatar bot-avatar">⚡</div>
      <div class="testlab-msg-body">
        <div class="testlab-msg-name" style="color:var(--cyan)">Silver Bot</div>
        ${html}
      </div>
    </div>`;
  }).join('');
  chat.scrollTop = chat.scrollHeight;
}

function renderDiscordEmbed(embed) {
  const color = embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#5865F2';
  let html = `<div class="discord-embed" style="border-left-color:${color}">`;
  if (embed.title) html += `<div class="discord-embed-title">${esc(embed.title)}</div>`;
  if (embed.description) html += `<div class="discord-embed-desc">${formatDiscordText(embed.description)}</div>`;
  if (embed.fields && embed.fields.length) {
    html += '<div class="discord-embed-fields">';
    for (const f of embed.fields) {
      html += `<div class="discord-embed-field${f.inline ? ' inline' : ''}">
        <div class="discord-embed-field-name">${esc(f.name)}</div>
        <div class="discord-embed-field-value">${formatDiscordText(f.value)}</div>
      </div>`;
    }
    html += '</div>';
  }
  html += '</div>';
  return html;
}

function formatDiscordText(text) {
  if (!text) return '';
  let s = esc(text);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\n/g, '<br>');
  return s;
}

// ═══ CHAT TESTEURS ══════════════════════════════════════════════════════════

let chatMode = 'general';
let chatDmTarget = null;
let chatTesters = [];
let chatInterval = null;

async function loadChat(el) {
  if (chatInterval) { clearInterval(chatInterval); chatInterval = null; }

  const testers = await dbQuery("SELECT code, discord_id, discord_username, created_at FROM tester_codes ORDER BY created_at DESC");
  chatTesters = testers;

  el.innerHTML = `
    <div class="page-header fade-in"><h2>Chat Testeurs</h2><p>Communication avec les testeurs</p></div>
    <div class="chat-layout fade-in">
      <div class="chat-sidebar">
        <div class="chat-sidebar-item active" onclick="chatSwitchGeneral()">
          <div class="chat-sidebar-icon">💬</div>
          <div class="chat-sidebar-info">
            <div class="chat-sidebar-name">General</div>
            <div class="chat-sidebar-sub">Chat commun</div>
          </div>
        </div>
        <div class="chat-sidebar-divider">Messages prives</div>
        ${testers.map(t => `
          <div class="chat-sidebar-item" id="chatSideItem-${t.discord_id || t.code}" onclick="chatSwitchDm('${t.discord_id || t.code}', '${esc(t.discord_username || t.code)}')">
            <div class="chat-sidebar-avatar" id="chatAvatar-${t.discord_id || t.code}"></div>
            <div class="chat-sidebar-info">
              <div class="chat-sidebar-name">${esc(t.discord_username || t.code)}</div>
              <div class="chat-sidebar-sub" id="chatPresence-${t.discord_id || t.code}">Hors ligne</div>
            </div>
            <div class="chat-sidebar-dot" id="chatDot-${t.discord_id || t.code}"></div>
          </div>
        `).join('')}
      </div>
      <div class="chat-main">
        <div class="chat-header">
          <span id="chatHeaderTitle">💬 General</span>
        </div>
        <div class="chat-messages" id="chatMessages">
          <div class="loading"><div class="spinner"></div></div>
        </div>
        <div class="chat-input-bar">
          <button class="btn btn-secondary chat-attach-btn" onclick="chatAttachFile()" title="Joindre un fichier">📎</button>
          <input type="text" id="chatInput" placeholder="Ecrire un message..." onkeydown="if(event.key==='Enter')chatSend()">
          <button class="btn btn-primary" onclick="chatSend()">Envoyer</button>
          <input type="file" id="chatFileInput" style="display:none" onchange="chatUploadFile(this)">
        </div>
      </div>
    </div>`;

  loadChatPresence();
  loadChatAvatars();
  chatLoadMessages();
  chatInterval = setInterval(chatLoadMessages, 5000);
}

async function loadChatPresence() {
  const presences = await dbQuery("SELECT user_id, status, last_seen FROM user_presence");
  for (const p of presences) {
    const dot = document.getElementById(`chatDot-${p.user_id}`);
    const sub = document.getElementById(`chatPresence-${p.user_id}`);
    if (dot) {
      const online = p.status === 'online';
      dot.innerHTML = `<span class="dot ${online ? 'dot-green dot-pulse' : 'dot-red'}" style="width:6px;height:6px"></span>`;
      if (sub) sub.textContent = online ? 'En ligne' : (p.last_seen ? `Vu ${fmtDate(p.last_seen)}` : 'Hors ligne');
    }
  }
}

async function loadChatAvatars() {
  for (const t of chatTesters) {
    if (!t.discord_id) continue;
    const el = document.getElementById(`chatAvatar-${t.discord_id}`);
    if (!el) continue;
    const user = await discordGet(`/users/${t.discord_id}`);
    if (user && !user.error) {
      const url = getUserAvatar(t.discord_id, user.avatar, 64);
      el.innerHTML = `<img src="${url}">`;
    }
  }
}

function chatSwitchGeneral() {
  chatMode = 'general';
  chatDmTarget = null;
  document.querySelectorAll('.chat-sidebar-item').forEach(e => e.classList.remove('active'));
  document.querySelector('.chat-sidebar-item').classList.add('active');
  document.getElementById('chatHeaderTitle').textContent = '💬 General';
  chatLoadMessages();
}

function chatSwitchDm(targetId, name) {
  chatMode = 'dm';
  chatDmTarget = targetId;
  document.querySelectorAll('.chat-sidebar-item').forEach(e => e.classList.remove('active'));
  const item = document.getElementById(`chatSideItem-${targetId}`);
  if (item) item.classList.add('active');
  document.getElementById('chatHeaderTitle').textContent = `✉ ${name}`;
  chatLoadMessages();
}

async function chatLoadMessages() {
  const container = document.getElementById('chatMessages');
  if (!container) { if (chatInterval) { clearInterval(chatInterval); chatInterval = null; } return; }

  let rows;
  if (chatMode === 'general') {
    rows = await dbQuery("SELECT id, sender_id, sender_name, message, file_url, file_name, created_at FROM tester_chat ORDER BY created_at DESC LIMIT 50");
  } else {
    rows = await dbQuery("SELECT id, sender_id, sender_name, message, file_url, file_name, created_at FROM tester_dms WHERE (sender_id = %s OR receiver_id = %s) ORDER BY created_at DESC LIMIT 50", [chatDmTarget, chatDmTarget]);
  }

  rows.reverse();

  if (!rows.length) {
    container.innerHTML = '<div class="coming-soon" style="height:100%"><div class="icon">💬</div><p>Aucun message</p></div>';
    return;
  }

  const ownerId = '1504594533521031219';
  container.innerHTML = rows.map(r => {
    const isOwner = r.sender_id === ownerId;
    let content = esc(r.message || '');
    if (r.file_url) {
      const ext = (r.file_name || '').split('.').pop().toLowerCase();
      if (['png','jpg','jpeg','gif','webp'].includes(ext)) {
        content += `<div class="chat-file-preview"><img src="${r.file_url}" onclick="window.open('${r.file_url}')"></div>`;
      } else if (['mp4','webm','mov'].includes(ext)) {
        content += `<div class="chat-file-preview"><video src="${r.file_url}" controls style="max-width:300px;border-radius:8px"></video></div>`;
      } else {
        content += `<div class="chat-file-link"><a href="${r.file_url}" target="_blank">📎 ${esc(r.file_name || 'Fichier')}</a></div>`;
      }
    }
    return `<div class="chat-bubble ${isOwner ? 'chat-bubble-owner' : ''}">
      <div class="chat-bubble-header">
        <span class="chat-bubble-name" style="color:${isOwner ? 'var(--accent)' : 'var(--cyan)'}">${esc(r.sender_name || r.sender_id)}</span>
        <span class="chat-bubble-time">${fmtDateTime(r.created_at)}</span>
      </div>
      <div class="chat-bubble-content">${content}</div>
    </div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

function fmtDateTime(d) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt)) return String(d).slice(0, 16);
  return dt.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

async function chatSend() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  const ownerId = '1504594533521031219';

  if (chatMode === 'general') {
    await dbQuery("INSERT INTO tester_chat (sender_id, sender_name, message, created_at) VALUES (%s, %s, %s, NOW())", [ownerId, 'Tib (Owner)', msg]);
  } else {
    await dbQuery("INSERT INTO tester_dms (sender_id, sender_name, receiver_id, message, created_at) VALUES (%s, %s, %s, %s, NOW())", [ownerId, 'Tib (Owner)', chatDmTarget, msg]);
  }
  chatLoadMessages();
}

function chatAttachFile() {
  document.getElementById('chatFileInput').click();
}

async function chatUploadFile(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';

  const form = new FormData();
  form.append('file', file);

  try {
    const res = await fetch(`${BACKEND}/upload`, { method: 'POST', body: form });
    const data = await res.json();
    if (data.error) return;

    const ownerId = '1504594533521031219';
    if (chatMode === 'general') {
      await dbQuery("INSERT INTO tester_chat (sender_id, sender_name, message, file_url, file_name, created_at) VALUES (%s, %s, %s, %s, %s, NOW())", [ownerId, 'Tib (Owner)', '', data.url, data.name]);
    } else {
      await dbQuery("INSERT INTO tester_dms (sender_id, sender_name, receiver_id, message, file_url, file_name, created_at) VALUES (%s, %s, %s, %s, %s, %s, NOW())", [ownerId, 'Tib (Owner)', chatDmTarget, '', data.url, data.name]);
    }
    chatLoadMessages();
  } catch (e) {}
}

// ═══ BOT INFO ═══════════════════════════════════════════════════════════════

async function loadBotInfo(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Bot Info</h2><p>Informations en direct depuis Discord</p></div>
    <div id="botInfoContent"><div class="loading"><div class="spinner"></div> Chargement...</div></div>`;

  const [bot, guilds] = await Promise.all([
    discordGet('/users/@me'),
    discordGet('/users/@me/guilds'),
  ]);

  if (bot.error) {
    document.getElementById('botInfoContent').innerHTML = '<div class="coming-soon"><div class="icon">●</div><p>Impossible de contacter l\'API Discord</p></div>';
    return;
  }

  const guildList = Array.isArray(guilds) ? guilds : [];
  const avatar = getBotAvatar(bot, 256);
  const created = new Date(Number((BigInt(bot.id) >> 22n) + 1420070400000n));

  let html = `<div class="botinfo-header card fade-in">
    <img src="${avatar}" class="botinfo-avatar">
    <div class="botinfo-identity">
      <div class="botinfo-name">${esc(bot.username)}</div>
      <div class="botinfo-tag">${bot.discriminator !== '0' ? '#' + bot.discriminator : ''}</div>
      <div class="botinfo-id">${bot.id}</div>
    </div>
    <div class="botinfo-badges">
      ${bot.bot ? '<span class="badge badge-blue">BOT</span>' : ''}
      ${bot.verified ? '<span class="badge badge-green">Verifie</span>' : ''}
      <span class="badge badge-purple">${guildList.length} serveur${guildList.length > 1 ? 's' : ''}</span>
    </div>
  </div>`;

  html += `<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-top:14px">
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Serveurs</div><div class="stat-value">${guildList.length}</div></div>
    <div class="card stat-card slide-in" style="animation-delay:.03s"><div class="stat-bar" style="background:var(--accent)"></div><div class="stat-label">Cree le</div><div class="stat-value" style="font-size:13px">${created.toLocaleDateString('fr-FR')}</div></div>
    <div class="card stat-card slide-in" style="animation-delay:.06s"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">API</div><div class="stat-value" style="font-size:14px">v10</div></div>
    <div class="card stat-card slide-in" style="animation-delay:.09s"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Statut</div><div class="stat-value" style="font-size:14px">En ligne</div></div>
  </div>`;

  // Servers detail
  if (guildList.length) {
    html += sectionHeader(`Serveurs (${guildList.length})`);
    html += '<div class="botinfo-servers">';
    for (const g of guildList) {
      const icon = g.icon
        ? `<img src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=64">`
        : `<span>${g.name[0].toUpperCase()}</span>`;
      const isOwner = g.owner ? '<span class="badge badge-gold" style="font-size:9px">Owner</span>' : '';
      const perms = BigInt(g.permissions || 0);
      const isAdmin = (perms & 0x8n) !== 0n ? '<span class="badge badge-red" style="font-size:9px">Admin</span>' : '';
      html += `<div class="card botinfo-server-card slide-in">
        <div class="server-icon">${icon}</div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="server-info-name">${esc(g.name)}</span>${isOwner}${isAdmin}
          </div>
          <div style="font-size:9px;color:var(--muted)">${g.id}</div>
        </div>
      </div>`;
    }
    html += '</div>';
  }

  document.getElementById('botInfoContent').innerHTML = html;
}

// ═══ CONTROL BOT ════════════════════════════════════════════════════════════

let controlGuilds = [];
let controlChannels = [];

async function loadControl(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Controle Bot</h2><p>Actions directes sur le bot et les channels</p></div>
    <div class="control-grid fade-in">

      <!-- Guild/Channel selector -->
      <div class="card control-selector">
        <div class="control-section-title">Cible</div>
        <select id="ctrlGuild" onchange="controlGuildChanged()"><option value="">Chargement...</option></select>
        <select id="ctrlChannel" style="margin-top:8px"><option value="">Selectionner un channel</option></select>
      </div>

      <!-- Annonce / Embed -->
      <div class="card control-panel">
        <div class="control-section-title">Envoyer une annonce</div>
        <input type="text" id="ctrlEmbedTitle" placeholder="Titre de l'embed">
        <textarea id="ctrlEmbedDesc" placeholder="Description..." rows="3" style="margin-top:6px;resize:vertical"></textarea>
        <input type="text" id="ctrlEmbedColor" placeholder="Couleur hex (ex: #5865F2)" style="margin-top:6px" value="#5865F2">
        <button class="btn btn-primary" style="margin-top:10px;width:100%" onclick="controlSendEmbed()">Envoyer l'embed</button>
        <div id="ctrlEmbedStatus" class="control-status"></div>
      </div>

      <!-- Slowmode -->
      <div class="card control-panel">
        <div class="control-section-title">Slowmode</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="number" id="ctrlSlowmode" placeholder="Secondes (0 = off)" min="0" max="21600" style="flex:1">
          <button class="btn btn-primary" onclick="controlSlowmode()">Appliquer</button>
        </div>
        <div id="ctrlSlowStatus" class="control-status"></div>
      </div>

      <!-- Purge -->
      <div class="card control-panel">
        <div class="control-section-title">Purge messages</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="number" id="ctrlPurge" placeholder="Nombre (2-100)" min="2" max="100" style="flex:1">
          <button class="btn btn-red" onclick="controlPurge()">Purger</button>
        </div>
        <div id="ctrlPurgeStatus" class="control-status"></div>
      </div>

      <!-- Topic -->
      <div class="card control-panel">
        <div class="control-section-title">Changer le topic</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="ctrlTopic" placeholder="Nouveau topic..." style="flex:1">
          <button class="btn btn-primary" onclick="controlTopic()">Modifier</button>
        </div>
        <div id="ctrlTopicStatus" class="control-status"></div>
      </div>

      <!-- Nickname -->
      <div class="card control-panel">
        <div class="control-section-title">Nickname du bot</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input type="text" id="ctrlNick" placeholder="Nouveau pseudo (vide = reset)" style="flex:1">
          <button class="btn btn-primary" onclick="controlNickname()">Changer</button>
        </div>
        <div id="ctrlNickStatus" class="control-status"></div>
      </div>

    </div>`;

  controlGuilds = await discordGet('/users/@me/guilds');
  if (!Array.isArray(controlGuilds)) controlGuilds = [];
  const sel = document.getElementById('ctrlGuild');
  sel.innerHTML = '<option value="">-- Serveur --</option>' + controlGuilds.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('');
}

async function controlGuildChanged() {
  const guildId = document.getElementById('ctrlGuild').value;
  const chanSel = document.getElementById('ctrlChannel');
  if (!guildId) { chanSel.innerHTML = '<option value="">Selectionner un channel</option>'; return; }
  chanSel.innerHTML = '<option value="">Chargement...</option>';
  controlChannels = await discordGet(`/guilds/${guildId}/channels`);
  if (!Array.isArray(controlChannels)) controlChannels = [];
  const textChannels = controlChannels.filter(c => c.type === 0).sort((a, b) => a.position - b.position);
  chanSel.innerHTML = '<option value="">-- Channel --</option>' + textChannels.map(c => `<option value="${c.id}">#${esc(c.name)}</option>`).join('');
}

function getSelectedChannel() {
  return document.getElementById('ctrlChannel').value;
}

function getSelectedGuild() {
  return document.getElementById('ctrlGuild').value;
}

function ctrlStatus(id, msg, ok) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.color = ok ? 'var(--green)' : 'var(--red)';
  setTimeout(() => el.textContent = '', 4000);
}

async function controlSendEmbed() {
  const ch = getSelectedChannel();
  if (!ch) return ctrlStatus('ctrlEmbedStatus', 'Selectionne un channel', false);
  const title = document.getElementById('ctrlEmbedTitle').value.trim();
  const desc = document.getElementById('ctrlEmbedDesc').value.trim();
  if (!title && !desc) return ctrlStatus('ctrlEmbedStatus', 'Titre ou description requis', false);
  const colorHex = document.getElementById('ctrlEmbedColor').value.replace('#', '');
  const color = parseInt(colorHex, 16) || 0x5865F2;
  const res = await discordPost(`/channels/${ch}/messages`, { embeds: [{ title, description: desc, color }] });
  ctrlStatus('ctrlEmbedStatus', res.error ? `Erreur: ${res.error}` : 'Embed envoye !', !res.error);
}

async function controlSlowmode() {
  const ch = getSelectedChannel();
  if (!ch) return ctrlStatus('ctrlSlowStatus', 'Selectionne un channel', false);
  const val = parseInt(document.getElementById('ctrlSlowmode').value) || 0;
  const res = await discordPatch(`/channels/${ch}`, { rate_limit_per_user: val });
  ctrlStatus('ctrlSlowStatus', res.error ? `Erreur: ${res.error}` : `Slowmode: ${val}s`, !res.error);
}

async function controlPurge() {
  const ch = getSelectedChannel();
  if (!ch) return ctrlStatus('ctrlPurgeStatus', 'Selectionne un channel', false);
  const count = parseInt(document.getElementById('ctrlPurge').value);
  if (!count || count < 2 || count > 100) return ctrlStatus('ctrlPurgeStatus', 'Entre 2 et 100', false);
  const msgs = await discordGet(`/channels/${ch}/messages?limit=${count}`);
  if (!Array.isArray(msgs) || !msgs.length) return ctrlStatus('ctrlPurgeStatus', 'Aucun message', false);
  const ids = msgs.map(m => m.id);
  const res = await discordPost(`/channels/${ch}/messages/bulk-delete`, { messages: ids });
  ctrlStatus('ctrlPurgeStatus', res.error ? `Erreur: ${res.error}` : `${ids.length} messages supprimes`, !res.error);
}

async function controlTopic() {
  const ch = getSelectedChannel();
  if (!ch) return ctrlStatus('ctrlTopicStatus', 'Selectionne un channel', false);
  const topic = document.getElementById('ctrlTopic').value;
  const res = await discordPatch(`/channels/${ch}`, { topic });
  ctrlStatus('ctrlTopicStatus', res.error ? `Erreur: ${res.error}` : 'Topic modifie !', !res.error);
}

async function controlNickname() {
  const guildId = getSelectedGuild();
  if (!guildId) return ctrlStatus('ctrlNickStatus', 'Selectionne un serveur', false);
  const nick = document.getElementById('ctrlNick').value.trim() || null;
  const res = await discordPatch(`/guilds/${guildId}/members/@me`, { nick });
  ctrlStatus('ctrlNickStatus', res.error ? `Erreur: ${res.error}` : nick ? `Pseudo: ${nick}` : 'Pseudo reset', !res.error);
}

// ═══ HELPERS ═════════════════════════════════════════════════════════════════

const _userCacheGlobal = {};

async function fetchUsersBatch(userIds) {
  const results = {};
  const toFetch = userIds.filter(id => {
    if (_userCacheGlobal[id]) { results[id] = _userCacheGlobal[id]; return false; }
    return true;
  });
  const fetches = toFetch.map(async id => {
    const u = await discordGet(`/users/${id}`);
    if (u && !u.error) { _userCacheGlobal[id] = u; results[id] = u; }
  });
  await Promise.all(fetches);
  return results;
}

function avatarCell(userId, cache) {
  if (!userId) return '—';
  const user = cache[userId];
  if (!user) return `<span style="font-size:11px;color:var(--dim)">${userId}</span>`;
  const url = getUserAvatar(userId, user.avatar, 32);
  return `<div style="display:flex;align-items:center;gap:8px"><img src="${url}" style="width:22px;height:22px;border-radius:50%"><span style="font-size:12px;color:var(--bright)">${esc(user.username)}</span></div>`;
}

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s || '';
  return d.innerHTML;
}

function fmtDate(d) {
  if (!d) return '—';
  const s = String(d);
  return s.length > 11 ? s.slice(11, 16) : s.slice(0, 10);
}

function sectionHeader(text) {
  return `<div class="section-header"><div class="bar"></div><h3>${text}</h3><div class="line"></div></div>`;
}

function buildTable(headers, rows) {
  let html = '<div class="card" style="padding:0;overflow:hidden"><table style="width:100%;border-collapse:collapse">';
  html += '<thead><tr>' + headers.map(h => `<th style="text-align:left;padding:10px 14px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;background:var(--bg2);border-bottom:1px solid var(--border)">${h}</th>`).join('') + '</tr></thead>';
  html += '<tbody>';
  rows.forEach((row, i) => {
    const bg = i % 2 === 0 ? 'transparent' : 'var(--bg2)';
    html += '<tr style="transition:background .1s">';
    row.forEach(val => html += `<td style="padding:10px 14px;font-size:12px;border-bottom:1px solid rgba(255,255,255,.02);background:${bg}">${val}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function animateValue(id, start, end, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  if (end === 0) { el.textContent = '0'; return; }
  const steps = 15;
  const increment = (end - start) / steps;
  let current = start;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    current += increment;
    el.textContent = Math.round(current).toLocaleString('fr-FR');
    if (step >= steps) { clearInterval(timer); el.textContent = end.toLocaleString('fr-FR'); }
  }, duration / steps);
}

// Init
showPage('overview');
