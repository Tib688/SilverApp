// ═══ i18n ═══════════════════════════════════════════════════════════════════

const i18n = {
  fr: {
    home: 'Accueil', overview: "Vue d'ensemble", leaderboard: 'Leaderboard', members: 'Membres',
    compare: 'Comparateur', stats: 'Statistiques', control: 'Controle Bot', botinfo: 'Bot Info',
    uptime: 'Uptime', chat: 'Chat Testeurs', bugs: 'Bugs Reports', tasks: 'Taches',
    announcements: 'Annonces', suggestions: 'Suggestions', testlab: 'Test Lab',
    forgot: 'Codes oublies', database: 'Base de donnees', logs: 'Logs', history: 'Historique',
    changelog: 'Changelog', settings: 'Parametres', channels: 'Stats Channels', serverlist: 'Serveurs',
    analytics: 'Analytics', botprofile: 'Bot Profil', console: 'Console',
    compact: 'Mode compact', backup: 'Backup', restore: 'Restaurer',
    activityChart: 'Activite', commandsChart: 'Commandes', growthChart: 'Croissance',
    last7d: '7 derniers jours', last30d: '30 derniers jours',
    botName: 'Nom du bot', botAvatar: 'Avatar', botStatus: 'Statut',
    statusMessages: 'Messages de statut', addStatus: 'Ajouter', removeStatus: 'Retirer',
    applyChanges: 'Appliquer', currentRotation: 'Rotation actuelle',
    autoRefresh: 'Auto-refresh', exportBackup: 'Exporter backup', importBackup: 'Importer backup',
    update: 'Mise a jour', upToDate: 'A jour', newUpdate: 'Nouvelle version disponible',
    embedBuilder: 'Embed Builder', heatmap: 'Heatmap', quickActions: 'Actions rapides',
    preview: 'Apercu', sendEmbed: 'Envoyer', saveTemplate: 'Sauver template', loadTemplate: 'Charger template',
    noActivity: 'Aucune activite', exportCsv: 'Exporter CSV', favorites: 'Favoris',
    addFav: 'Ajouter aux favoris', removeFav: 'Retirer des favoris',
    shortcuts: 'Raccourcis clavier', memberProfile: 'Profil membre',
    welcome: 'Welcome, Tib !', ownerSub: 'Owner', realtime: 'Donnees en temps reel',
    servers: 'Serveurs', users: 'Membres', testers: 'Testeurs', openBugs: 'Bugs ouverts',
    xpTotal: 'XP Total', messages: 'Messages', level: 'Niveau', warns: 'Avertissements',
    search: 'Rechercher', favorites: 'Favoris', noData: 'Aucune donnee', loading: 'Chargement...',
    online: 'En ligne', offline: 'Hors ligne', created: 'Cree le', disconnect: 'Se deconnecter',
    disconnectDesc: 'Se deconnecter supprime le token local et revient a l\'ecran de connexion.',
    appearance: 'Apparence', darkMode: 'Mode sombre', lightMode: 'Mode clair',
    maintenance: 'Mode Maintenance', activeMaint: 'Desactiver maintenance',
    enableMaint: 'Activer maintenance', sessions: 'Sessions actives', owner: 'Owner',
    application: 'Application', testerMgmt: 'Gestion des testeurs', token: 'Token Bot Discord',
    save: 'Sauver', generate: 'Generer un code', delete: 'Suppr', copyInvite: 'Copier invite',
    noTester: 'Aucun testeur', codeCopied: 'Code genere et copie !', mysql: 'MySQL',
    totalRows: 'Total lignes', tables: 'Tables', proportion: 'Proportion',
    approve: 'Approuver', reject: 'Rejeter', pending: 'En attente', approved: 'Approuve',
    rejected: 'Rejete', submit: 'Soumettre', cancel: 'Annuler', send: 'Envoyer',
    newAnnounce: '+ Nouvelle annonce', newBug: '+ Signaler un bug', newTask: '+ Nouvelle tache',
    all: 'Tous', open: 'Ouverts', fixed: 'Fixes', closed: 'Fermes',
    todo: 'A faire', inProgress: 'En cours', done: 'Terminees', completion: 'Completion',
    fix: 'Fixer', close: 'Fermer', reopen: 'Rouvrir', start: 'Demarrer', finish: 'Terminer',
    assigned: 'Assignee', general: 'General', privateMsgs: 'Messages prives',
    madeBy: 'Made by', info: 'Infos', framework: 'Framework',
    joinDiscord: 'Rejoindre le serveur Discord', exportPdf: 'Export PDF',
    language: 'Langue', channelStats: 'Statistiques par channel',
    selectServer: '-- Serveur --', selectChannel: '-- Channel --',
    msgCount: 'Messages', activeUsers: 'Membres actifs', topChannels: 'Top Channels',
    secPrincipal: 'Principal', secControle: 'Controle', secTesteurs: 'Testeurs', secSysteme: 'Systeme',
  },
  en: {
    home: 'Home', overview: 'Overview', leaderboard: 'Leaderboard', members: 'Members',
    compare: 'Compare', stats: 'Statistics', control: 'Bot Control', botinfo: 'Bot Info',
    uptime: 'Uptime', chat: 'Testers Chat', bugs: 'Bug Reports', tasks: 'Tasks',
    announcements: 'Announcements', suggestions: 'Suggestions', testlab: 'Test Lab',
    forgot: 'Forgotten Codes', database: 'Database', logs: 'Logs', history: 'History',
    changelog: 'Changelog', settings: 'Settings', channels: 'Channel Stats', serverlist: 'Servers',
    analytics: 'Analytics', botprofile: 'Bot Profile', console: 'Console',
    compact: 'Compact mode', backup: 'Backup', restore: 'Restore',
    activityChart: 'Activity', commandsChart: 'Commands', growthChart: 'Growth',
    last7d: 'Last 7 days', last30d: 'Last 30 days',
    botName: 'Bot name', botAvatar: 'Avatar', botStatus: 'Status',
    statusMessages: 'Status messages', addStatus: 'Add', removeStatus: 'Remove',
    applyChanges: 'Apply', currentRotation: 'Current rotation',
    autoRefresh: 'Auto-refresh', exportBackup: 'Export backup', importBackup: 'Import backup',
    update: 'Update', upToDate: 'Up to date', newUpdate: 'New version available',
    embedBuilder: 'Embed Builder', heatmap: 'Heatmap', quickActions: 'Quick actions',
    preview: 'Preview', sendEmbed: 'Send', saveTemplate: 'Save template', loadTemplate: 'Load template',
    noActivity: 'No activity', exportCsv: 'Export CSV', favorites: 'Favorites',
    addFav: 'Add to favorites', removeFav: 'Remove from favorites',
    shortcuts: 'Keyboard shortcuts', memberProfile: 'Member profile',
    welcome: 'Welcome, Tib!', ownerSub: 'Owner', realtime: 'Real-time data',
    servers: 'Servers', users: 'Users', testers: 'Testers', openBugs: 'Open bugs',
    xpTotal: 'Total XP', messages: 'Messages', level: 'Level', warns: 'Warnings',
    search: 'Search', favorites: 'Favorites', noData: 'No data', loading: 'Loading...',
    online: 'Online', offline: 'Offline', created: 'Created', disconnect: 'Disconnect',
    disconnectDesc: 'Disconnecting removes the local token and returns to the login screen.',
    appearance: 'Appearance', darkMode: 'Dark mode', lightMode: 'Light mode',
    maintenance: 'Maintenance Mode', activeMaint: 'Disable maintenance',
    enableMaint: 'Enable maintenance', sessions: 'Active sessions', owner: 'Owner',
    application: 'Application', testerMgmt: 'Tester management', token: 'Discord Bot Token',
    save: 'Save', generate: 'Generate code', delete: 'Delete', copyInvite: 'Copy invite',
    noTester: 'No tester', codeCopied: 'Code generated and copied!', mysql: 'MySQL',
    totalRows: 'Total rows', tables: 'Tables', proportion: 'Proportion',
    approve: 'Approve', reject: 'Reject', pending: 'Pending', approved: 'Approved',
    rejected: 'Rejected', submit: 'Submit', cancel: 'Cancel', send: 'Send',
    newAnnounce: '+ New announcement', newBug: '+ Report a bug', newTask: '+ New task',
    all: 'All', open: 'Open', fixed: 'Fixed', closed: 'Closed',
    todo: 'To do', inProgress: 'In progress', done: 'Done', completion: 'Completion',
    fix: 'Fix', close: 'Close', reopen: 'Reopen', start: 'Start', finish: 'Finish',
    assigned: 'Assigned to', general: 'General', privateMsgs: 'Private messages',
    madeBy: 'Made by', info: 'Info', framework: 'Framework',
    joinDiscord: 'Join the Discord server', exportPdf: 'Export PDF',
    language: 'Language', channelStats: 'Channel statistics',
    selectServer: '-- Server --', selectChannel: '-- Channel --',
    msgCount: 'Messages', activeUsers: 'Active users', topChannels: 'Top Channels',
    secPrincipal: 'Main', secControle: 'Control', secTesteurs: 'Testers', secSysteme: 'System',
  },
};

let currentLang = localStorage.getItem('silverapp_lang') || 'fr';
function t(key) { return (i18n[currentLang] || i18n.fr)[key] || (i18n.fr)[key] || key; }

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('silverapp_lang', lang);
  updateStaticUI();
  const content = document.getElementById('content');
  const loader = pageLoaders[currentPage];
  if (loader) loader(content);
}

function updateStaticUI() {
  document.querySelectorAll('.nav-item').forEach(n => {
    const m = n.getAttribute('onclick')?.match(/showPage\('(\w+)'\)/);
    if (m) {
      const icon = n.querySelector('.icon');
      if (icon) n.innerHTML = icon.outerHTML + ' ' + t(m[1]);
    }
  });
  const secKeys = ['secPrincipal', 'secControle', 'secTesteurs', 'secSysteme'];
  document.querySelectorAll('.nav-section').forEach((s, i) => { if (secKeys[i]) s.textContent = t(secKeys[i]); });
  const wt = document.getElementById('welcomeTitle');
  if (wt) wt.textContent = t('welcome');
  const ws = document.getElementById('welcomeSub');
  if (ws && _botInfoCache) ws.textContent = t('ownerSub') + ' · ' + _botInfoCache.username;
  updateBreadcrumbs(currentPage);
}

// Clock
setInterval(() => {
  const el = document.getElementById('clock');
  if (el) {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.innerHTML = `<span style="color:#707088">${h}</span><span style="color:#404058;animation:pulse 1s infinite">:</span><span style="color:#707088">${m}</span><span style="color:#404058">:</span><span style="color:#505068">${s}</span>`;
  }
}, 1000);

// Page system
let currentPage = 'overview';
let pageLoadId = 0;

function showPage(name) {
  currentPage = name;
  pageLoadId++;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${name}'`)) n.classList.add('active');
  });
  const content = document.getElementById('content');

  content.classList.add('page-out');
  setTimeout(() => {
    content.innerHTML = renderSkeleton();
    content.classList.remove('page-out');
    updateBreadcrumbs(name);
    const banner = document.querySelector('.welcome-banner');
    const crumbs = document.getElementById('breadcrumbs');
    if (name === 'home') {
      if (banner) banner.style.display = 'none';
      if (crumbs) crumbs.style.display = 'none';
    } else {
      if (banner) banner.style.display = '';
      if (crumbs) crumbs.style.display = '';
    }

    const loader = pageLoaders[name];
    if (loader) loader(content);
    else content.innerHTML = `<div class="coming-soon fade-in"><div class="icon">—</div><p>Coming soon</p></div>`;
  }, 150);
}

// Page loaders
const pageLoaders = {
  home: loadHome,
  overview: loadOverview,
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
  history: loadHistory,
  compare: loadCompare,
  stats: loadStats,
  channels: loadChannels,
  changelog: loadChangelog,
  update: loadUpdate,
  serverlist: loadServerList,
  analytics: loadAnalytics,
  botprofile: loadBotProfile,
  console: loadConsole,
  embedbuilder: loadEmbedBuilder,
  heatmap: loadHeatmap,
  logs: loadLogs,
  uptime: loadUptime,
};

// ═══ HOME ═══════════════════════════════════════════════════════════════════

async function loadHome(el) {
  const [bot, guilds, testers, openBugs, pendingSug, totalXp] = await Promise.all([
    _botInfoCache || discordGet('/users/@me'),
    getCachedGuilds(),
    dbScalar('SELECT COUNT(*) FROM tester_codes'),
    dbScalar("SELECT COUNT(*) FROM tester_bugs WHERE status='open'"),
    dbScalar("SELECT COUNT(*) FROM tester_suggestions WHERE status='pending'"),
    dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp'),
  ]);
  if (bot && !bot.error && !_botInfoCache) _botInfoCache = bot;
  const b = _botInfoCache || {};
  const avatar = b.id ? getBotAvatar(b, 256) : '';
  if (b.id) {
    const sbAv = document.getElementById('sidebarAvatar');
    if (sbAv) sbAv.innerHTML = `<img src="${getBotAvatar(b, 128)}">`;
  }
  const created = b.id ? new Date(Number((BigInt(b.id) >> 22n) + 1420070400000n)) : null;
  const uptime = created ? Math.floor((Date.now() - created.getTime()) / 86400000) : '?';

  el.innerHTML = `
    <div class="fade-in" style="display:flex;flex-direction:column;align-items:center;padding-top:30px">

      <div style="position:relative;margin-bottom:20px">
        ${avatar ? `<img src="${avatar}" style="width:96px;height:96px;border-radius:50%;border:3px solid var(--accent);box-shadow:0 0 30px rgba(139,149,176,.15)">` : '<div style="width:96px;height:96px;border-radius:50%;background:var(--card);border:3px solid var(--accent)"></div>'}
        <span class="dot dot-green dot-pulse" style="position:absolute;bottom:4px;right:4px;width:14px;height:14px;border:3px solid var(--bg)"></span>
      </div>

      <h1 style="font-size:28px;font-weight:800;color:var(--bright);letter-spacing:-.03em">${esc(b.username || 'Silver Bot')}</h1>
      <p style="font-size:12px;color:var(--dim);margin-top:2px">Made by <span style="color:var(--accent);font-weight:600">Tib</span> · v2.3</p>

      <div style="display:flex;gap:8px;margin-top:16px">
        <span class="badge badge-green" style="padding:5px 14px;font-size:11px">En ligne</span>
        ${b.bot ? '<span class="badge badge-blue" style="padding:5px 14px;font-size:11px">BOT</span>' : ''}
        <span class="badge badge-purple" style="padding:5px 14px;font-size:11px">${guilds.length} serveur${guilds.length > 1 ? 's' : ''}</span>
      </div>

      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:100%;max-width:600px;margin-top:28px">
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Serveurs</div><div class="stat-value">${guilds.length}</div></div>
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Testeurs</div><div class="stat-value">${testers}</div></div>
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--red)"></div><div class="stat-label">Bugs</div><div class="stat-value">${openBugs}</div></div>
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">XP Total</div><div class="stat-value" style="font-size:18px">${totalXp.toLocaleString('fr-FR')}</div></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;max-width:600px;margin-top:14px">
        <div class="card" style="text-align:center;cursor:pointer;padding:18px" onclick="showPage('overview')">
          <div style="font-size:22px;margin-bottom:6px;opacity:.5"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg></div>
          <div style="font-size:12px;font-weight:600;color:var(--bright)">Vue d'ensemble</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">Donnees en direct</div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;padding:18px" onclick="showPage('leaderboard')">
          <div style="font-size:22px;margin-bottom:6px;opacity:.5"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg></div>
          <div style="font-size:12px;font-weight:600;color:var(--bright)">Leaderboard</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">Classement XP</div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;padding:18px" onclick="showPage('chat')">
          <div style="font-size:22px;margin-bottom:6px;opacity:.5"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></div>
          <div style="font-size:12px;font-weight:600;color:var(--bright)">Chat</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">Testeurs</div>
        </div>
      </div>

      <div class="card" style="width:100%;max-width:600px;margin-top:14px;padding:16px">
        <div style="font-size:11px;font-weight:700;color:var(--dim);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Infos</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div style="display:flex;justify-content:space-between"><span style="font-size:11px;color:var(--muted)">Bot ID</span><span style="font-size:11px;color:var(--bright);font-weight:600;cursor:pointer" onclick="navigator.clipboard.writeText('${b.id || ''}');this.textContent='Copie !';setTimeout(()=>this.textContent='${b.id || '?'}',1500)">${b.id || '?'}</span></div>
          <div style="display:flex;justify-content:space-between"><span style="font-size:11px;color:var(--muted)">Cree le</span><span style="font-size:11px;color:var(--bright);font-weight:600">${created ? created.toLocaleDateString('fr-FR') : '?'}</span></div>
          <div style="display:flex;justify-content:space-between"><span style="font-size:11px;color:var(--muted)">Suggestions</span><span style="font-size:11px;color:var(--gold);font-weight:600">${pendingSug} en attente</span></div>
          <div style="display:flex;justify-content:space-between"><span style="font-size:11px;color:var(--muted)">Framework</span><span style="font-size:11px;color:var(--bright);font-weight:600">Electron + FastAPI</span></div>
        </div>
      </div>

      <div style="margin-top:20px;cursor:pointer;opacity:.5;transition:opacity .2s" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='.5'" onclick="silver.openExternal('https://discord.gg/SPfXUehuRK')" title="Rejoindre le serveur Discord">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--bright)"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
      </div>
      <p style="font-size:9px;color:var(--muted);margin-top:10px">Silver App v2.3 · Electron · FastAPI · MySQL</p>
    </div>`;
}

// ═══ OVERVIEW ════════════════════════════════════════════════════════════════

async function loadOverview(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Vue d'ensemble</h2><p>Donnees en temps reel</p></div>
    <div class="stats-grid" id="statsGrid"></div>
    <div id="serversSection"></div>
  `;

  const statInfo = [
    { label: 'Serveurs', color: 'var(--blue)', id: 'st0' },
    { label: 'Membres', color: 'var(--accent)', id: 'st1' },
    { label: 'XP Total', color: 'var(--purple)', id: 'st2' },
    { label: 'Messages', color: 'var(--cyan)', id: 'st3' },
    { label: 'Testeurs', color: 'var(--green)', id: 'st4' },
    { label: 'Bugs ouverts', color: 'var(--red)', id: 'st5' },
  ];

  document.getElementById('statsGrid').innerHTML = statInfo.map(s => `
    <div class="card stat-card slide-in" style="animation-delay:${statInfo.indexOf(s) * 0.03}s">
      <div class="stat-bar" style="background:${s.color}"></div>
      <div class="stat-label">${s.label}</div>
      <div class="stat-value" id="${s.id}">-</div>
    </div>
  `).join('');

  const [guilds, xp, msgs, testers, bugs] = await Promise.all([
    getCachedGuilds(),
    dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp'),
    dbScalar('SELECT COALESCE(SUM(messages_count),0) FROM user_xp'),
    dbScalar('SELECT COUNT(*) FROM tester_codes'),
    dbScalar("SELECT COUNT(*) FROM tester_bugs WHERE status='open'"),
  ]);

  let totalMembers = 0;
  const guildDetails = await Promise.all(guilds.map(g => discordGet(`/guilds/${g.id}?with_counts=true`)));
  guildDetails.forEach(g => { if (g && !g.error) totalMembers += g.approximate_member_count || 0; });

  const vals = [guilds.length, totalMembers, xp, msgs, testers, bugs];
  vals.forEach((v, i) => animateValue(`st${i}`, 0, v, 400));

  document.getElementById('pillServers').textContent = guilds.length;
  document.getElementById('pillWarns').textContent = testers;
  document.getElementById('pillTickets').textContent = bugs;

  if (guilds.length) {
    const detailMap = {};
    guildDetails.forEach((d, i) => { if (d && !d.error) detailMap[guilds[i].id] = d; });
    let html = sectionHeader(`Serveurs (${guilds.length})`);
    html += '<div class="card">';
    guilds.forEach(g => {
      const icon = g.icon
        ? `<img src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=64">`
        : g.name[0].toUpperCase();
      const detail = detailMap[g.id];
      const members = detail ? detail.approximate_member_count || 0 : '?';
      const online = detail ? detail.approximate_presence_count || 0 : '?';
      html += `
        <div class="server-item" style="cursor:pointer" onclick="showServerDetail('${g.id}','${esc(g.name).replace(/'/g,"\\'")}')">
          <div class="server-icon">${typeof icon === 'string' && icon.length === 1 ? icon : icon}</div>
          <div class="server-info">
            <div class="name">${esc(g.name)}</div>
            <div class="id"><span style="color:var(--green)">●</span> ${online} en ligne · ${members} membres</div>
          </div>
        </div>`;
    });
    html += '</div>';
    document.getElementById('serversSection').innerHTML = html;
  }

  // Bot identity for sidebar (cached)
  if (!_botInfoCache) {
    const me = await discordGet('/users/@me');
    if (me && !me.error) _botInfoCache = me;
  }
  if (_botInfoCache) {
    const url = getBotAvatar(_botInfoCache, 128);
    if (url) document.getElementById('sidebarAvatar').innerHTML = `<img src="${url}">`;
    document.getElementById('welcomeSub').textContent = `Owner · ${_botInfoCache.username}`;
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
  el.innerHTML = `<div class="page-header fade-in"><h2>Leaderboard</h2><p>Classement XP</p></div>
    <div class="lb-columns fade-in">
      <div><div class="control-section-title">Top Membres</div><div id="lbMembers"><div class="loading"><div class="spinner"></div></div></div></div>
      <div><div class="control-section-title">Top Serveurs</div><div id="lbServers"><div class="loading"><div class="spinner"></div></div></div></div>
    </div>`;

  const [memberRows, serverRows, guilds] = await Promise.all([
    dbQuery('SELECT CAST(user_id AS CHAR) AS user_id, SUM(xp) as xp, SUM(messages_count) as msgs FROM user_xp GROUP BY user_id ORDER BY xp DESC LIMIT 50'),
    dbQuery('SELECT CAST(guild_id AS CHAR) AS guild_id, SUM(xp) as xp FROM user_xp GROUP BY guild_id ORDER BY xp DESC'),
    getCachedGuilds(),
  ]);
  const guildMap = {};
  guilds.forEach(g => guildMap[String(g.id).trim()] = g);
  const activeServers = serverRows.filter(r => guildMap[String(r.guild_id).trim()]);

  if (activeServers.length) {
    document.getElementById('lbServers').innerHTML = buildTable(['#', 'Serveur', 'XP Total'],
      activeServers.map((r, i) => {
        const g = guildMap[String(r.guild_id).trim()];
        const icon = g.icon ? `<img src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=32" style="width:26px;height:26px;border-radius:50%">` : '';
        const name = esc(g.name);
        const rank = `<span style="font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--dim)'}">#${i+1}</span>`;
        const cell = `<div style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="navigator.clipboard.writeText('${r.guild_id}');this.querySelector('.lb-copy').textContent='Copie !';setTimeout(()=>this.querySelector('.lb-copy').textContent='',1500)">
          ${icon}<span style="font-size:12px;color:var(--bright)">${name}</span>
          <span class="lb-copy" style="font-size:9px;color:var(--muted)"></span>
        </div>`;
        return [rank, cell, (r.xp || 0).toLocaleString('fr-FR')];
      }));
  } else {
    document.getElementById('lbServers').innerHTML = '<div class="coming-soon" style="height:150px"><p>Aucune donnee</p></div>';
  }

  // Render members: show table with placeholders first, then fill avatars
  if (memberRows.length && !memberRows[0]?.error) {
    document.getElementById('lbMembers').innerHTML = buildTable(['#', 'Membre', 'XP', 'Msgs'],
      memberRows.map((r, i) => {
        const rank = `<span style="font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--dim)'}">#${i+1}</span>`;
        const cell = `<div id="lbUser-${r.user_id}" style="display:flex;align-items:center;gap:8px;cursor:pointer" onclick="navigator.clipboard.writeText('${r.user_id}');this.querySelector('.lb-copy').textContent='Copie !';setTimeout(()=>this.querySelector('.lb-copy').textContent='',1500)">
          <div style="width:26px;height:26px;border-radius:50%;background:var(--bg2)"></div>
          <span style="font-size:12px;color:var(--dim)">...</span>
          <span class="lb-copy" style="font-size:9px;color:var(--muted)"></span>
        </div>`;
        return [rank, cell, (r.xp || 0).toLocaleString('fr-FR'), r.msgs || 0];
      }));

    // Fill avatars in parallel
    await Promise.all(memberRows.map(async r => {
      const cached = _userCacheGlobal[r.user_id];
      const u = cached || await discordGet(`/users/${r.user_id}`);
      const el = document.getElementById(`lbUser-${r.user_id}`);
      if (!el) return;
      if (u && !u.error) {
        if (!cached) _userCacheGlobal[r.user_id] = u;
        const url = getUserAvatar(r.user_id, u.avatar, 32);
        el.innerHTML = `<img src="${url}" style="width:26px;height:26px;border-radius:50%">
          <span style="font-size:12px;color:var(--bright)">${esc(u.username)}</span>
          <span class="lb-copy" style="font-size:9px;color:var(--muted)"></span>`;
      }
    }));
  } else {
    document.getElementById('lbMembers').innerHTML = '<div class="coming-soon" style="height:150px"><p>Aucune donnee</p></div>';
  }
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
    dbQuery('SELECT CAST(guild_id AS CHAR) AS guild_id, xp, chat_xp, voice_xp, messages_count, voice_minutes FROM user_xp WHERE user_id = %s', [uid]),
    dbQuery('SELECT id, guild_id, reason, created_at FROM warnings WHERE user_id = %s ORDER BY created_at DESC', [uid]),
    dbScalar('SELECT COALESCE(global_xp,0) FROM global_user_profile WHERE user_id = %s', [uid]),
  ]);

  const user = await discordGet(`/users/${uid}`);
  const username = user?.username || uid;
  const avatar = user && !user.error ? getUserAvatar(uid, user.avatar, 128) : null;
  const level = Math.floor(Math.sqrt((gxp || 0) / 100));

  const isFav = await dbScalar('SELECT COUNT(*) FROM member_favorites WHERE discord_id = %s', [uid]);

  const created = new Date(Number((BigInt(uid) >> 22n) + 1420070400000n));
  const createdStr = created.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  const banner = user && !user.error && user.banner ? `https://cdn.discordapp.com/banners/${uid}/${user.banner}.${user.banner.startsWith('a_') ? 'gif' : 'png'}?size=600` : null;

  let html = `<div class="card fade-in member-profile" style="margin-bottom:16px;padding:0;overflow:hidden;cursor:pointer" onclick="this.querySelector('.member-details').classList.toggle('open')">
    ${banner ? `<div style="height:80px;background:url('${banner}') center/cover;border-radius:var(--radius) var(--radius) 0 0"></div>` : ''}
    <div style="display:flex;align-items:center;gap:16px;padding:18px">
      ${avatar ? `<img src="${avatar}" style="width:56px;height:56px;border-radius:50%;${banner ? 'margin-top:-40px;border:3px solid var(--card)' : ''}">` : ''}
      <div style="flex:1">
        <div style="font-size:18px;font-weight:700;color:var(--bright)">${esc(username)}</div>
        <div style="font-size:11px;color:var(--dim)">Niveau ${level} · XP: ${(gxp || 0).toLocaleString('fr-FR')} · ${warns.length} warn(s)</div>
      </div>
      <button class="fav-btn ${isFav ? 'is-fav' : ''}" style="background:none;border:none;font-size:24px;cursor:pointer;padding:8px" onclick="event.stopPropagation();toggleFav('${uid}','${esc(username)}',this)">${isFav ? '★' : '☆'}</button>
    </div>
    <div class="member-details">
      <div class="member-detail-grid">
        <div><span class="settings-label">Discord ID</span><span class="settings-value" style="cursor:pointer" onclick="event.stopPropagation();navigator.clipboard.writeText('${uid}');this.textContent='Copie !';setTimeout(()=>this.textContent='${uid}',1500)">${uid}</span></div>
        <div><span class="settings-label">Compte cree le</span><span class="settings-value">${createdStr}</span></div>
        <div><span class="settings-label">Niveau</span><span class="settings-value">${level}</span></div>
        <div><span class="settings-label">XP Global</span><span class="settings-value">${(gxp || 0).toLocaleString('fr-FR')}</span></div>
        <div><span class="settings-label">Serveurs actifs</span><span class="settings-value">${gstats.length}</span></div>
        <div><span class="settings-label">Avertissements</span><span class="settings-value">${warns.length}</span></div>
        ${user && !user.error ? `<div><span class="settings-label">Pseudo global</span><span class="settings-value">${esc(user.global_name || user.username)}</span></div>` : ''}
      </div>
    </div>
  </div>`;

  if (gstats.length) {
    const guilds = await getCachedGuilds();
    const guildMap = {};
    guilds.forEach(g => guildMap[String(g.id).trim()] = g);
    const activeGstats = gstats.filter(g => guildMap[String(g.guild_id).trim()]);

    html += sectionHeader(`Activite par serveur (${activeGstats.length})`);
    html += buildTable(['Serveur', 'XP', 'Chat', 'Voice', 'Messages', 'Vocal'],
      activeGstats.map(g => {
        const guild = guildMap[String(g.guild_id).trim()];
        const icon = guild.icon ? `<img src="https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=32" style="width:20px;height:20px;border-radius:6px">` : '';
        const name = esc(guild.name);
        const cell = `<div style="display:flex;align-items:center;gap:8px">${icon}<span style="font-size:12px;color:var(--bright)">${name}</span></div>`;
        return [cell, (g.xp||0).toLocaleString('fr-FR'), g.chat_xp||0, g.voice_xp||0, g.messages_count||0, `${g.voice_minutes||0}m`];
      }));
  }
  if (warns.length) {
    html += sectionHeader(`Avertissements (${warns.length})`);
    html += buildTable(['ID', 'Serveur', 'Raison', 'Date'],
      warns.map(w => [`#${w.id}`, w.guild_id, (w.reason||'').slice(0,40), fmtDate(w.created_at)]));
  }
  res.innerHTML = html;
}

async function toggleFav(uid, username, btn) {
  const exists = await dbScalar('SELECT COUNT(*) FROM member_favorites WHERE discord_id = %s', [uid]);
  if (exists) {
    await dbQuery('DELETE FROM member_favorites WHERE discord_id = %s', [uid]);
    if (btn) { btn.textContent = '☆'; btn.classList.remove('is-fav'); }
  } else {
    await dbQuery('INSERT INTO member_favorites (discord_id, username, added_at) VALUES (%s, %s, NOW())', [uid, username]);
    if (btn) {
      btn.textContent = '★';
      btn.classList.add('is-fav', 'fav-pop');
      setTimeout(() => btn.classList.remove('fav-pop'), 500);
      const r = btn.getBoundingClientRect();
      spawnConfetti(r.left + r.width / 2, r.top);
    }
  }
}

async function showFavorites() {
  const res = document.getElementById('memberResult');
  res.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  const favs = await dbQuery('SELECT CAST(discord_id AS CHAR) AS discord_id, username, added_at FROM member_favorites ORDER BY added_at DESC');
  if (!favs.length || favs[0]?.error) { res.innerHTML = '<div class="coming-soon"><div class="icon">★</div><p>Aucun favori</p></div>'; return; }

  const userIds = favs.map(f => f.discord_id).filter(Boolean);
  const userCache = await fetchUsersBatch(userIds);

  const favData = await Promise.all(favs.map(async f => {
    const [xp, warns] = await Promise.all([
      dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp WHERE user_id = %s', [f.discord_id]),
      dbScalar('SELECT COUNT(*) FROM warnings WHERE user_id = %s', [f.discord_id]),
    ]);
    return { ...f, xp, warns };
  }));

  let html = sectionHeader(`Favoris (${favs.length})`);
  for (const f of favData) {
    const user = userCache[f.discord_id];
    const username = user ? user.username : (f.username || f.discord_id);
    const avatar = user ? getUserAvatar(f.discord_id, user.avatar, 128) : null;
    const level = Math.floor(Math.sqrt((f.xp || 0) / 100));

    html += `<div class="card fade-in" style="display:flex;align-items:center;gap:14px;padding:14px;margin-bottom:8px;cursor:pointer" onclick="document.getElementById('memberSearch').value='${f.discord_id}';searchMember()">
      ${avatar ? `<img src="${avatar}" style="width:44px;height:44px;border-radius:50%">` : '<div style="width:44px;height:44px;border-radius:50%;background:var(--bg2);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--dim)">?</div>'}
      <div style="flex:1">
        <div style="font-size:14px;font-weight:700;color:var(--bright)">${esc(username)}</div>
        <div style="font-size:10px;color:var(--dim)">Niveau ${level} · XP: ${(f.xp || 0).toLocaleString('fr-FR')} · ${f.warns} warn(s)</div>
      </div>
      <span style="font-size:18px;color:var(--gold)">★</span>
    </div>`;
  }
  res.innerHTML = html;
}

// ═══ SUGGESTIONS ═════════════════════════════════════════════════════════════

async function loadSuggestions(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Suggestions</h2><p>Idees et demandes d'ajouts des testeurs</p></div>
    <div id="sugContent"><div class="loading"><div class="spinner"></div></div></div>`;

  const rows = await dbQuery("SELECT id, reporter_name, title, description, status, created_at FROM tester_suggestions ORDER BY created_at DESC LIMIT 50");
  if (!rows.length || rows[0]?.error) { document.getElementById('sugContent').innerHTML = '<div class="coming-soon"><div class="icon">💡</div><p>Aucune suggestion</p></div>'; return; }

  document.getElementById('sugContent').innerHTML = rows.map(r => {
    const statusBadge = r.status === 'approved' ? 'badge-green' : r.status === 'rejected' ? 'badge-red' : 'badge-gold';
    const statusLabel = r.status === 'approved' ? 'Approuve' : r.status === 'rejected' ? 'Rejete' : 'En attente';
    return `<div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:var(--purple)"></div>
        <div class="bug-item-title">${esc(r.title)}</div>
        <span class="badge ${statusBadge}">${statusLabel}</span>
        <div class="bug-item-actions">
          ${r.status === 'pending' ? `
            <button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="sugSetStatus(${r.id},'approved')">Approuver</button>
            <button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="sugSetStatus(${r.id},'rejected')">Rejeter</button>
          ` : ''}
        </div>
      </div>
      ${r.description ? `<div class="bug-item-desc">${esc(r.description)}</div>` : ''}
      <div class="bug-item-meta">${esc(r.reporter_name || '?')} · ${fmtDateTime(r.created_at)}</div>
    </div>`;
  }).join('');
}

async function sugSetStatus(id, status) {
  await dbQuery("UPDATE tester_suggestions SET status=%s WHERE id=%s", [status, id]);
  loadSuggestions(document.getElementById('content'));
}

// ═══ DATABASE ════════════════════════════════════════════════════════════════

async function loadDatabase(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Base de donnees</h2><p>MySQL en direct</p></div><div id="dbContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const tables = ['guild_config','warnings','welcome_config','ticket_config','tickets','role_panels','antispam_config','reminders','autoroles','suggestions','user_xp','global_user_profile','level_rewards','global_user_stats','notification_config','guild_customization'];
  const counts = await Promise.all(tables.map(t => dbScalar(`SELECT COUNT(*) FROM \`${t}\``)));
  let total = 0;
  const data = tables.map((t, i) => { total += counts[i]; return [t, counts[i]]; });
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
  let testers = await dbQuery("SELECT code, CAST(discord_id AS CHAR) AS discord_id, label AS discord_username, created_at FROM tester_codes ORDER BY created_at DESC");
  if (testers.length && testers[0]?.error) testers = [];

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
              <div class="server-icon tester-avatar-slot" id="testerAv-${String(t.discord_id || t.code)}" style="width:32px;height:32px;font-size:12px">${(t.discord_username || '?')[0].toUpperCase()}</div>
              <div class="server-info" style="flex:1">
                <div class="name">${esc(t.discord_username || 'Testeur')}</div>
                <div class="id">${t.discord_id || '—'} · Code: <code>${esc(t.code)}</code></div>
              </div>
              <button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="settingsCopyInvite('${esc(t.code)}','${esc(t.discord_username || '')}')">Copier invite</button>
              <button class="btn btn-danger" style="padding:4px 10px;font-size:10px" onclick="settingsDeleteTester('${esc(t.code)}')">Suppr</button>
            </div>
          `).join('') : '<div style="font-size:12px;color:var(--muted)">Aucun testeur</div>'}
        </div>
      </div>

      <!-- Apparence -->
      <div class="card settings-section">
        <div class="control-section-title">${t('appearance')}</div>
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px">
          ${Object.keys(themeColors).map(name => `<div class="theme-dot" style="background:${themeColors[name].accent}" onclick="applyTheme('${name}')" title="${name}"></div>`).join('')}
        </div>
        <div style="display:flex;gap:8px">
          <button id="lightModeBtn" class="btn btn-secondary" style="flex:1" onclick="toggleLightMode()">${(localStorage.getItem('silverapp_mode')||'dark') === 'light' ? t('darkMode') : t('lightMode')}</button>
          <button id="glassBtn" class="btn btn-secondary" style="flex:1" onclick="toggleGlass()">${localStorage.getItem('silverapp_glass') === 'true' ? 'Liquid Glass: ON' : 'Liquid Glass: OFF'}</button>
          <button class="btn btn-secondary" style="flex:1" onclick="exportCurrentPage()">${t('exportPdf')}</button>
        </div>
      </div>

      <!-- Langue -->
      <div class="card settings-section">
        <div class="control-section-title">${t('language')}</div>
        <div style="display:flex;gap:8px">
          <button class="btn ${currentLang === 'fr' ? 'btn-primary' : 'btn-secondary'}" style="flex:1" onclick="setLang('fr')">Francais</button>
          <button class="btn ${currentLang === 'en' ? 'btn-primary' : 'btn-secondary'}" style="flex:1" onclick="setLang('en')">English</button>
        </div>
      </div>

      <!-- Maintenance -->
      <div class="card settings-section">
        <div class="control-section-title">Mode Maintenance</div>
        <button id="maintBtn" class="${maintenanceMode ? 'btn btn-danger' : 'btn btn-primary'}" style="width:100%" onclick="toggleMaintenance()">${maintenanceMode ? 'Desactiver maintenance' : 'Activer maintenance'}</button>
        <div id="maintStatus" class="control-status"></div>
      </div>

      <!-- Session tracker -->
      <div class="card settings-section" style="grid-column:1/-1">
        <div class="control-section-title">Sessions actives</div>
        <div id="settingsSessions"><div class="loading"><div class="spinner"></div></div></div>
      </div>

      <!-- Backup -->
      <div class="card settings-section">
        <div class="control-section-title">Backup & Restore</div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-primary" style="flex:1" onclick="backupExport()">${t('exportBackup')}</button>
          <button class="btn btn-secondary" style="flex:1" onclick="backupImport()">${t('importBackup')}</button>
        </div>
        <p style="font-size:10px;color:var(--muted);margin-top:8px">${currentLang === 'fr' ? 'Exporte la config, les preferences et les donnees en JSON.' : 'Exports config, preferences and data as JSON.'}</p>
      </div>

      <!-- Compact + Notifs -->
      <div class="card settings-section">
        <div class="control-section-title">Options</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button id="compactBtn" class="btn btn-secondary" style="flex:1" onclick="toggleCompact()">${t('compact')}: ${_compactMode ? 'ON' : 'OFF'}</button>
          <button id="desktopNotifBtn" class="btn btn-secondary" style="flex:1" onclick="toggleDesktopNotifs()">Notifications: ${_desktopNotifs ? 'ON' : 'OFF'}</button>
        </div>
      </div>

      <!-- App info -->
      <div class="card settings-section">
        <div class="control-section-title">Application</div>
        <div class="settings-info-grid">
          <div><span class="settings-label">Version</span><span class="settings-value">v2.3.0</span></div>
          <div><span class="settings-label">Framework</span><span class="settings-value">Electron</span></div>
          <div><span class="settings-label">Backend</span><span class="settings-value">FastAPI</span></div>
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

      <!-- Deconnexion -->
      <div class="card settings-section" style="grid-column:1/-1;border-color:rgba(239,68,68,.15)">
        <div class="control-section-title" style="color:var(--red)">Deconnexion</div>
        <p style="font-size:12px;color:var(--dim);margin-bottom:12px">Se deconnecter supprime le token local et revient a l'ecran de connexion.</p>
        <button class="btn btn-red" style="width:100%" onclick="disconnect()">Se deconnecter</button>
      </div>

    </div>`;

  // Load active sessions
  const sessions = await dbQuery("SELECT CAST(user_id AS CHAR) AS user_id, status, last_seen FROM user_presence WHERE status='online'");
  const sessEl = document.getElementById('settingsSessions');
  if (!sessions.length || sessions[0]?.error) {
    sessEl.innerHTML = '<div style="font-size:12px;color:var(--muted)">Aucune session active</div>';
  } else {
    const sUserCache = await fetchUsersBatch(sessions.map(s => s.user_id));
    sessEl.innerHTML = sessions.map(s => {
      const u = sUserCache[s.user_id];
      const av = u ? getUserAvatar(s.user_id, u.avatar, 32) : null;
      const name = u ? esc(u.username) : s.user_id;
      return `<div class="server-item">
        ${av ? `<img src="${av}" style="width:28px;height:28px;border-radius:50%">` : '<div style="width:28px;height:28px;border-radius:50%;background:var(--bg2)"></div>'}
        <div class="server-info"><div class="name">${name}</div><div class="id"><span class="dot dot-green dot-pulse" style="width:6px;height:6px"></span> En ligne · ${fmtDateTime(s.last_seen)}</div></div>
      </div>`;
    }).join('');
  }

  // Check DB health
  try {
    const h = await fetch(`${BACKEND}/health`).then(r => r.json());
    if (h.status !== 'ok') document.getElementById('settingsDbStatus').innerHTML = '<span class="dot dot-red" style="width:6px;height:6px"></span> Erreur';
  } catch { document.getElementById('settingsDbStatus').innerHTML = '<span class="dot dot-red" style="width:6px;height:6px"></span> Hors ligne'; }

  fetchTesterAvatars(testers);
}

async function fetchTesterAvatars(testers) {
  await Promise.all(testers.filter(t => t.discord_id).map(async t => {
    const did = String(t.discord_id);
    const avEl = document.getElementById(`testerAv-${did}`);
    if (!avEl) return;
    const cached = _userCacheGlobal[did];
    const u = cached || await discordGet(`/users/${did}`);
    if (u && !u.error) {
      if (!cached) _userCacheGlobal[did] = u;
      const url = getUserAvatar(did, u.avatar, 64);
      avEl.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
    }
  }));
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
  await dbQuery("INSERT INTO tester_codes (code, discord_id, label, created_at) VALUES (%s,%s,%s,NOW())",
    [code, discordId || null, username || null]);

  const githubLink = 'https://github.com/Tib688/SilverApp/releases/latest';
  const invitation = `Hey ! Tu as ete invite a tester **Silver Bot** !\n\nPour acceder a l'app :\n\n1. Telecharge **SilverApp.exe** ici :\n${githubLink}\n\n2. Lance l'app\n\n3. Entre ton **Discord ID** et ce code d'invitation :\n\n**Code : ${code}**\n\nA bientot sur Silver Bot !`;
  try { await navigator.clipboard.writeText(invitation); } catch {}

  document.getElementById('settingsCodeResult').innerHTML = `
    <div class="card slide-in" style="padding:12px;border-color:var(--green);margin-bottom:8px">
      <div style="font-size:12px;color:var(--green);font-weight:700">Code genere et copie !</div>
      <div style="font-size:14px;color:var(--bright);font-family:monospace;margin-top:4px">${code}</div>
    </div>`;
  spawnConfetti(window.innerWidth / 2, 200);
  // Refresh tester list
  const updatedTesters = await dbQuery("SELECT code, CAST(discord_id AS CHAR) AS discord_id, label AS discord_username, created_at FROM tester_codes ORDER BY created_at DESC");
  if (updatedTesters.length && !updatedTesters[0]?.error) {
    document.getElementById('settingsTesterList').innerHTML = updatedTesters.map(t => `
      <div class="server-item">
        <div class="server-icon tester-avatar-slot" id="testerAv-${String(t.discord_id || t.code)}" style="width:32px;height:32px;font-size:12px">${(t.discord_username || '?')[0].toUpperCase()}</div>
        <div class="server-info" style="flex:1">
          <div class="name">${esc(t.discord_username || 'Testeur')}</div>
          <div class="id">${t.discord_id || '—'} · Code: <code>${esc(t.code)}</code></div>
        </div>
        <button class="btn btn-secondary" style="padding:4px 10px;font-size:10px" onclick="settingsCopyInvite('${esc(t.code)}','${esc(t.discord_username || '')}')">Copier invite</button>
        <button class="btn btn-danger" style="padding:4px 10px;font-size:10px" onclick="settingsDeleteTester('${esc(t.code)}')">Suppr</button>
      </div>
    `).join('');
    fetchTesterAvatars(updatedTesters);
  }
}

function settingsCopyInvite(code, username) {
  const githubLink = 'https://github.com/Tib688/SilverApp/releases/latest';
  const invitation = `Hey ! Tu as ete invite a tester **Silver Bot** !\n\nPour acceder a l'app :\n\n1. Telecharge **SilverApp.exe** ici :\n${githubLink}\n\n2. Lance l'app\n\n3. Entre ton **Discord ID** et ce code d'invitation :\n\n**Code : ${code}**\n\nA bientot sur Silver Bot !`;
  navigator.clipboard.writeText(invitation);
}

async function settingsDeleteTester(code) {
  await dbQuery("DELETE FROM tester_codes WHERE code=%s", [code]);
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
  const rows = await dbQuery("SELECT id, discord_id, username AS discord_username, status, created_at FROM forgot_code_requests ORDER BY created_at DESC LIMIT 50");
  if (!rows.length || rows[0]?.error) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">🔑</div><p>Aucune demande</p></div>'; return; }

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

  const githubLink = 'https://github.com/Tib688/SilverApp/releases/latest';
  const invitation = `Hey ! Voici ton nouveau code pour **Silver Bot** !\n\n1. Telecharge **SilverApp.exe** ici :\n${githubLink}\n\n2. Lance l'app\n\n3. Entre ton **Discord ID** et ce code :\n\n**Code : ${code}**\n\nA bientot sur Silver Bot !`;

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
  await dbQuery("INSERT INTO tester_announcements (author, title, content, created_at) VALUES (%s,%s,%s,NOW())",
    ['Tib (Owner)', title, content]);
  document.getElementById('announceFormContainer').innerHTML = '';
  announceLoadList();
}

async function announceLoadList() {
  const listEl = document.getElementById('announceList');
  const rows = await dbQuery("SELECT id, author AS author_name, title, content, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 30");
  if (!rows.length || rows[0]?.error) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">📢</div><p>Aucune annonce</p></div>'; return; }

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
  const testers = await dbQuery("SELECT code, CAST(discord_id AS CHAR) AS discord_id, label AS discord_username FROM tester_codes ORDER BY created_at DESC");
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
  await dbQuery("INSERT INTO tester_tasks (title, description, assigned_to, priority, status, created_at) VALUES (%s,%s,%s,%s,'todo',NOW())",
    [title, desc, assignee || null, priority]);
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
  if (status === 'done') spawnConfetti(window.innerWidth / 2, 300);
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
        <button class="btn btn-secondary bugs-filter-btn active" onclick="bugFilter('all',this)">Tous</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="bugFilter('open',this)">Ouverts</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="bugFilter('fixed',this)">Fixes</button>
        <button class="btn btn-secondary bugs-filter-btn" onclick="bugFilter('closed',this)">Fermes</button>
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
  await dbQuery("INSERT INTO tester_bugs (reporter, title, description, severity, status, created_at) VALUES (%s, %s, %s, %s, 'open', NOW())",
    ['Tib (Owner)', title, desc, severity]);
  document.getElementById('bugFormContainer').innerHTML = '';
  bugLoadList('all');
}

async function bugLoadList(filter) {
  const listEl = document.getElementById('bugsList');
  let query = "SELECT id, reporter AS reporter_name, title, description, severity, status, created_at FROM tester_bugs";
  if (filter && filter !== 'all') query += ` WHERE status='${filter}'`;
  query += " ORDER BY created_at DESC LIMIT 50";
  const rows = await dbQuery(query);
  if (!rows.length || rows[0]?.error) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">🐛</div><p>Aucun bug signale</p></div>'; return; }

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

function bugFilter(filter, btn) {
  document.querySelectorAll('.bugs-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  bugLoadList(filter);
}

async function bugSetStatus(id, status) {
  await dbQuery("UPDATE tester_bugs SET status=%s WHERE id=%s", [status, id]);
  if (status === 'fixed') spawnConfetti(window.innerWidth / 2, 300);
  const activeFilter = document.querySelector('.bugs-filter-btn.active');
  bugLoadList(activeFilter ? activeFilter.textContent.toLowerCase().replace('tous','all').replace('ouverts','open').replace('fixes','fixed').replace('fermes','closed') : 'all');
}

// ═══ TEST LAB ═══════════════════════════════════════════════════════════════

let testlabCommands = [];
let testlabMessages = [];

let testlabBotAvatar = null;
let testlabUserAvatar = null;

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

  const [res, bot, owner] = await Promise.all([
    fetch(`${BACKEND}/testlab/commands`),
    discordGet('/users/@me'),
    discordGet('/users/1504594533521031219'),
  ]);
  testlabCommands = await res.json();
  testlabMessages = [];
  testlabBotAvatar = (bot && !bot.error) ? getBotAvatar(bot, 64) : null;
  testlabUserAvatar = (owner && !owner.error) ? getUserAvatar('1504594533521031219', owner.avatar, 64) : null;
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
  const userAv = testlabUserAvatar ? `<img src="${testlabUserAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : 'T';
  const botAv = testlabBotAvatar ? `<img src="${testlabBotAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">` : '⚡';
  chat.innerHTML = testlabMessages.map(m => {
    if (m.type === 'user') {
      return `<div class="testlab-msg testlab-msg-user">
        <div class="testlab-msg-avatar">${userAv}</div>
        <div class="testlab-msg-body">
          <div class="testlab-msg-name" style="color:var(--accent)">Tib</div>
          <div class="testlab-msg-content">${esc(m.content)}</div>
        </div>
      </div>`;
    }
    let html = '';
    if (m.content) html += `<div class="testlab-msg-content">${esc(m.content)}</div>`;
    if (m.embed) html += renderDiscordEmbed(m.embed);
    return `<div class="testlab-msg testlab-msg-bot">
      <div class="testlab-msg-avatar bot-avatar">${botAv}</div>
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

  const testers = await dbQuery("SELECT code, CAST(discord_id AS CHAR) AS discord_id, label AS discord_username, created_at FROM tester_codes ORDER BY created_at DESC");
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
  const presences = await dbQuery("SELECT CAST(user_id AS CHAR) AS user_id, status, last_seen FROM user_presence");
  for (const p of presences) {
    const dot = document.getElementById(`chatDot-${p.user_id}`);
    const sub = document.getElementById(`chatPresence-${p.user_id}`);
    const av = document.getElementById(`chatAvatar-${p.user_id}`);
    if (dot) {
      const online = p.status === 'online';
      dot.innerHTML = `<span class="dot ${online ? 'dot-green dot-pulse' : 'dot-red'}" style="width:6px;height:6px"></span>`;
      if (sub) sub.textContent = online ? 'En ligne' : (p.last_seen ? `Vu ${fmtDate(p.last_seen)}` : 'Hors ligne');
      if (av) { av.classList.remove('status-ring-online', 'status-ring-offline'); av.classList.add('status-ring', online ? 'status-ring-online' : 'status-ring-offline'); }
    }
  }
}

async function loadChatAvatars() {
  await Promise.all(chatTesters.filter(t => t.discord_id).map(async t => {
    const el = document.getElementById(`chatAvatar-${t.discord_id}`);
    if (!el) return;
    const cached = _userCacheGlobal[t.discord_id];
    const user = cached || await discordGet(`/users/${t.discord_id}`);
    if (user && !user.error) {
      if (!cached) _userCacheGlobal[t.discord_id] = user;
      el.innerHTML = `<img src="${getUserAvatar(t.discord_id, user.avatar, 64)}">`;
    }
  }));
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
  try {
    if (chatMode === 'general') {
      rows = await dbQuery("SELECT id, CAST(sender_id AS CHAR) AS sender_id, sender_name, message, file_url, file_name, created_at FROM tester_chat ORDER BY created_at DESC LIMIT 50");
    } else {
      rows = await dbQuery("SELECT id, CAST(sender_id AS CHAR) AS sender_id, sender_name, message, file_url, file_name, created_at FROM tester_dms WHERE (sender_id = %s OR receiver_id = %s) ORDER BY created_at DESC LIMIT 50", [chatDmTarget, chatDmTarget]);
    }
  } catch { rows = []; }

  if (!Array.isArray(rows)) rows = [];
  rows.reverse();

  if (!rows.length) {
    container.innerHTML = '<div class="coming-soon" style="height:100%"><div class="icon">💬</div><p>Aucun message</p></div>';
    return;
  }

  const wasAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
  const ownerId = '1504594533521031219';
  container.innerHTML = rows.map(r => {
    const isOwner = String(r.sender_id) === ownerId;
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
  if (wasAtBottom) container.scrollTop = container.scrollHeight;
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

  let res;
  if (chatMode === 'general') {
    res = await dbQuery("INSERT INTO tester_chat (sender_id, sender_name, message, created_at) VALUES (%s, %s, %s, NOW())", [ownerId, 'Tib (Owner)', msg]);
  } else {
    res = await dbQuery("INSERT INTO tester_dms (sender_id, sender_name, receiver_id, message, created_at) VALUES (%s, %s, %s, %s, NOW())", [ownerId, 'Tib (Owner)', chatDmTarget, msg]);
  }
  if (res && res[0]?.error) console.error('Chat send error:', res[0].error);
  await chatLoadMessages();
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
    getCachedGuilds(),
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
let controlMembers = [];

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

      <!-- Envoyer un message -->
      <div class="card control-panel" style="position:relative">
        <div class="control-section-title">Envoyer un message</div>
        <div style="position:relative">
          <textarea id="ctrlMsgContent" placeholder="Ton message... (@ pour mentionner)" rows="4" style="resize:vertical" oninput="mentionCheck(this)"></textarea>
          <div id="mentionDropdown" style="display:none;position:absolute;bottom:100%;left:0;right:0;max-height:160px;overflow-y:auto;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);z-index:20;box-shadow:0 -4px 16px rgba(0,0,0,.3)"></div>
        </div>
        <button class="btn btn-primary" style="margin-top:10px;width:100%" onclick="controlSendMessage()">Envoyer</button>
        <div id="ctrlMsgStatus" class="control-status"></div>
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

  controlGuilds = await getCachedGuilds();
  if (!Array.isArray(controlGuilds)) controlGuilds = [];
  const sel = document.getElementById('ctrlGuild');
  sel.innerHTML = '<option value="">-- Serveur --</option>' + controlGuilds.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('');
}

async function controlGuildChanged() {
  const guildId = document.getElementById('ctrlGuild').value;
  const chanSel = document.getElementById('ctrlChannel');
  if (!guildId) { chanSel.innerHTML = '<option value="">Selectionner un channel</option>'; controlMembers = []; return; }
  chanSel.innerHTML = '<option value="">Chargement...</option>';
  const [channels, members] = await Promise.all([
    discordGet(`/guilds/${guildId}/channels`),
    discordGet(`/guilds/${guildId}/members?limit=1000`),
  ]);
  controlChannels = Array.isArray(channels) ? channels : [];
  controlMembers = Array.isArray(members) ? members : [];
  const textChannels = controlChannels.filter(c => c.type === 0).sort((a, b) => a.position - b.position);
  chanSel.innerHTML = '<option value="">-- Channel --</option>' + textChannels.map(c => `<option value="${c.id}">#${esc(c.name)}</option>`).join('');
}

function mentionCheck(textarea) {
  const dropdown = document.getElementById('mentionDropdown');
  const val = textarea.value;
  const cursor = textarea.selectionStart;
  const before = val.slice(0, cursor);
  const atMatch = before.match(/@(\w*)$/);
  if (!atMatch || !controlMembers.length) { dropdown.style.display = 'none'; return; }
  const query = atMatch[1].toLowerCase();
  const matches = controlMembers.filter(m => {
    const name = (m.nick || m.user?.global_name || m.user?.username || '').toLowerCase();
    return name.includes(query) && !m.user?.bot;
  }).slice(0, 8);
  if (!matches.length) { dropdown.style.display = 'none'; return; }
  dropdown.style.display = 'block';
  dropdown.innerHTML = matches.map(m => {
    const name = m.nick || m.user?.global_name || m.user?.username || '?';
    const tag = m.user?.username || '';
    const av = m.user?.avatar ? getUserAvatar(m.user.id, m.user.avatar, 32) : null;
    return `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;cursor:pointer;transition:background .1s;font-size:12px" onmousedown="mentionInsert('${m.user.id}','${esc(name).replace(/'/g,"\\'")}')">
      ${av ? `<img src="${av}" style="width:22px;height:22px;border-radius:50%">` : '<div style="width:22px;height:22px;border-radius:50%;background:var(--bg2)"></div>'}
      <span style="color:var(--bright);font-weight:600">${esc(name)}</span>
      <span style="color:var(--muted);font-size:10px">${esc(tag)}</span>
    </div>`;
  }).join('');
}

function mentionInsert(userId, displayName) {
  const textarea = document.getElementById('ctrlMsgContent');
  const dropdown = document.getElementById('mentionDropdown');
  const cursor = textarea.selectionStart;
  const before = textarea.value.slice(0, cursor);
  const after = textarea.value.slice(cursor);
  const newBefore = before.replace(/@\w*$/, `<@${userId}> `);
  textarea.value = newBefore + after;
  textarea.selectionStart = textarea.selectionEnd = newBefore.length;
  dropdown.style.display = 'none';
  textarea.focus();
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

async function controlSendMessage() {
  const ch = getSelectedChannel();
  if (!ch) return ctrlStatus('ctrlMsgStatus', 'Selectionne un channel', false);
  const content = document.getElementById('ctrlMsgContent').value.trim();
  if (!content) return ctrlStatus('ctrlMsgStatus', 'Message vide', false);
  const res = await discordPost(`/channels/${ch}/messages`, { content });
  if (!res.error) document.getElementById('ctrlMsgContent').value = '';
  ctrlStatus('ctrlMsgStatus', res.error ? `Erreur: ${res.error}` : 'Message envoye !', !res.error);
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
let _botInfoCache = null;
let _guildsCache = null;
let _guildsCacheTime = 0;

async function getCachedGuilds() {
  if (_guildsCache && Date.now() - _guildsCacheTime < 60000) return _guildsCache;
  const g = await discordGet('/users/@me/guilds');
  _guildsCache = Array.isArray(g) ? g : [];
  _guildsCacheTime = Date.now();
  return _guildsCache;
}

async function fetchUsersBatch(userIds) {
  const results = {};
  const ids = userIds.map(String);
  const toFetch = ids.filter(id => {
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
  const id = String(userId);
  const user = cache[id];
  if (!user) return `<span style="font-size:11px;color:var(--dim)">${id}</span>`;
  const url = getUserAvatar(id, user.avatar, 32);
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

let _tableCounter = 0;

function buildTable(headers, rows) {
  const tid = `tbl${++_tableCounter}`;
  window['_td_' + tid] = rows;
  let html = `<div class="card" style="padding:0;overflow:hidden"><table id="${tid}" style="width:100%;border-collapse:collapse">`;
  html += '<thead><tr>' + headers.map((h, i) => `<th class="sortable" onclick="sortTable('${tid}',${i})" style="text-align:left;padding:12px 16px;font-size:10px;font-weight:500;color:#555568;text-transform:uppercase;letter-spacing:.8px;background:linear-gradient(180deg,#0c0c16,#0a0a10);border-bottom:.5px solid rgba(200,200,220,.05);cursor:pointer">${h}<span class="sort-icon" style="margin-left:4px;font-size:9px;opacity:.3">↕</span></th>`).join('') + '</tr></thead>';
  html += '<tbody>' + renderTbody(rows) + '</tbody></table></div>';
  return html;
}

function renderTbody(rows) {
  return rows.map((row, i) => {
    const bg = i % 2 === 0 ? 'transparent' : 'rgba(200,200,230,.015)';
    return '<tr style="transition:background .15s" onmouseenter="this.style.background=\'rgba(200,200,230,.03)\'" onmouseleave="this.style.background=\'' + bg + '\'">' + row.map(val => `<td style="padding:12px 16px;font-size:12px;border-bottom:.5px solid rgba(200,200,220,.03);background:${bg};color:#9090a8">${val}</td>`).join('') + '</tr>';
  }).join('');
}

function sortTable(tid, col) {
  const table = document.getElementById(tid);
  const data = window['_td_' + tid];
  if (!table || !data) return;
  const th = table.querySelectorAll('th')[col];
  const asc = th.classList.contains('sort-asc');
  table.querySelectorAll('th').forEach(h => {
    h.classList.remove('sort-asc', 'sort-desc');
    const ic = h.querySelector('.sort-icon');
    if (ic) ic.textContent = '↕';
  });
  const strip = s => String(s).replace(/<[^>]*>/g, '').replace(/\s/g, '').trim();
  const sorted = [...data].sort((a, b) => {
    let va = strip(a[col]), vb = strip(b[col]);
    const na = parseFloat(va.replace(',', '.')), nb = parseFloat(vb.replace(',', '.'));
    if (!isNaN(na) && !isNaN(nb)) return asc ? nb - na : na - nb;
    return asc ? vb.localeCompare(va, 'fr') : va.localeCompare(vb, 'fr');
  });
  th.classList.add(asc ? 'sort-desc' : 'sort-asc');
  th.querySelector('.sort-icon').textContent = asc ? '↓' : '↑';
  table.querySelector('tbody').innerHTML = renderTbody(sorted);
  window['_td_' + tid] = sorted;
}

function animateValue(id, start, end, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  if (end === 0) { el.textContent = '0'; return; }
  const t0 = performance.now();
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function tick(now) {
    const t = Math.min((now - t0) / duration, 1);
    el.textContent = Math.round(start + (end - start) * ease(t)).toLocaleString('fr-FR');
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ═══ HISTORIQUE CONNEXIONS ═══════════════════════════════════════════════════

async function loadHistory(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Historique</h2><p>Connexions et sessions</p></div>
    <div id="historyContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery("SELECT CAST(user_id AS CHAR) AS user_id, status, last_seen FROM user_presence ORDER BY last_seen DESC LIMIT 50");
  if (!rows.length || rows[0]?.error) { document.getElementById('historyContent').innerHTML = '<div class="coming-soon"><div class="icon">⏱</div><p>Aucune connexion</p></div>'; return; }
  const userIds = rows.map(r => r.user_id).filter(Boolean);
  const userCache = await fetchUsersBatch(userIds);
  document.getElementById('historyContent').innerHTML = buildTable(['Membre', 'Statut', 'Derniere activite'],
    rows.map(r => {
      const badge = r.status === 'online' ? '<span class="badge badge-green">En ligne</span>' : '<span class="badge badge-red">Hors ligne</span>';
      return [avatarCell(r.user_id, userCache), badge, fmtDateTime(r.last_seen)];
    }));
}

// ═══ COMPARATEUR MEMBRES ════════════════════════════════════════════════════

async function loadCompare(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Comparateur</h2><p>Comparer deux membres</p></div>
    <div style="display:flex;gap:8px;margin-bottom:16px;align-items:center" class="fade-in">
      <input type="text" id="cmpId1" placeholder="User ID #1" style="max-width:220px" inputmode="numeric">
      <span style="color:var(--muted);font-size:14px;font-weight:700">VS</span>
      <input type="text" id="cmpId2" placeholder="User ID #2" style="max-width:220px" inputmode="numeric">
      <button class="btn btn-primary" onclick="runCompare()">Comparer</button>
    </div>
    <div id="cmpResult"></div>`;
}

async function runCompare() {
  const id1 = document.getElementById('cmpId1').value.trim();
  const id2 = document.getElementById('cmpId2').value.trim();
  if (!id1 || !id2) return;
  document.getElementById('cmpResult').innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  const [u1, u2, xp1, xp2, w1, w2, m1, m2] = await Promise.all([
    discordGet(`/users/${id1}`), discordGet(`/users/${id2}`),
    dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp WHERE user_id=%s', [id1]),
    dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp WHERE user_id=%s', [id2]),
    dbScalar('SELECT COUNT(*) FROM warnings WHERE user_id=%s', [id1]),
    dbScalar('SELECT COUNT(*) FROM warnings WHERE user_id=%s', [id2]),
    dbScalar('SELECT COALESCE(SUM(messages_count),0) FROM user_xp WHERE user_id=%s', [id1]),
    dbScalar('SELECT COALESCE(SUM(messages_count),0) FROM user_xp WHERE user_id=%s', [id2]),
  ]);
  const name1 = u1?.username || id1, name2 = u2?.username || id2;
  const av1 = u1 && !u1.error ? getUserAvatar(id1, u1.avatar, 128) : null;
  const av2 = u2 && !u2.error ? getUserAvatar(id2, u2.avatar, 128) : null;
  const lv1 = Math.floor(Math.sqrt((xp1||0)/100)), lv2 = Math.floor(Math.sqrt((xp2||0)/100));
  const rows = [
    ['Niveau', lv1, lv2], ['XP', (xp1||0).toLocaleString('fr-FR'), (xp2||0).toLocaleString('fr-FR')],
    ['Messages', m1||0, m2||0], ['Warns', w1||0, w2||0],
  ];
  document.getElementById('cmpResult').innerHTML = `
    <div class="cmp-grid fade-in">
      <div class="cmp-player">
        ${av1 ? `<img src="${av1}" style="width:64px;height:64px;border-radius:50%">` : ''}
        <div style="font-size:16px;font-weight:700;color:var(--bright)">${esc(name1)}</div>
      </div>
      <div class="cmp-vs">VS</div>
      <div class="cmp-player">
        ${av2 ? `<img src="${av2}" style="width:64px;height:64px;border-radius:50%">` : ''}
        <div style="font-size:16px;font-weight:700;color:var(--bright)">${esc(name2)}</div>
      </div>
    </div>
    <div class="card" style="margin-top:14px;padding:0;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        ${rows.map(([label, v1, v2]) => {
          const win1 = Number(String(v1).replace(/\s/g,'')) > Number(String(v2).replace(/\s/g,''));
          const win2 = Number(String(v2).replace(/\s/g,'')) > Number(String(v1).replace(/\s/g,''));
          return `<tr>
            <td style="padding:12px 16px;font-size:14px;font-weight:700;color:${win1?'var(--green)':'var(--text)'};text-align:center;width:33%">${v1}</td>
            <td style="padding:12px 16px;font-size:11px;color:var(--muted);text-align:center;text-transform:uppercase;letter-spacing:1px;background:var(--bg2)">${label}</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:700;color:${win2?'var(--green)':'var(--text)'};text-align:center;width:33%">${v2}</td>
          </tr>`;
        }).join('')}
      </table>
    </div>`;
}

// ═══ PING API ═══════════════════════════════════════════════════════════════

async function updatePing() {
  try {
    const t1 = performance.now();
    await fetch(`${BACKEND}/health`);
    const backendMs = Math.round(performance.now() - t1);
    const el1 = document.getElementById('pingBackend');
    if (el1) { el1.textContent = `API: ${backendMs}ms`; el1.style.color = backendMs < 200 ? 'var(--green)' : backendMs < 500 ? 'var(--gold)' : 'var(--red)'; }
  } catch {}
  try {
    const t2 = performance.now();
    await discordGet('/users/@me');
    const discordMs = Math.round(performance.now() - t2);
    const el2 = document.getElementById('pingDiscord');
    if (el2) { el2.textContent = `Discord: ${discordMs}ms`; el2.style.color = discordMs < 300 ? 'var(--green)' : discordMs < 800 ? 'var(--gold)' : 'var(--red)'; }
  } catch {}
}
updatePing();
setInterval(updatePing, 10000);

// ═══ THEME ACCENT ═══════════════════════════════════════════════════════════

const themeColors = {
  silver: { accent: '#8b95b0', silver: '#a8b0c4' },
  blue: { accent: '#60a5fa', silver: '#93bbfc' },
  purple: { accent: '#a78bfa', silver: '#bda4fc' },
  green: { accent: '#34d399', silver: '#6ee7b7' },
  red: { accent: '#f87171', silver: '#fca5a5' },
  gold: { accent: '#fbbf24', silver: '#fcd34d' },
};

function applyTheme(name) {
  const t = themeColors[name];
  if (!t) return;
  document.documentElement.style.setProperty('--accent', t.accent);
  document.documentElement.style.setProperty('--silver', t.silver);
  localStorage.setItem('silverapp_theme', name);
}

(function() {
  const saved = localStorage.getItem('silverapp_theme');
  if (saved && themeColors[saved]) applyTheme(saved);
})();

// ═══ MODE MAINTENANCE ═══════════════════════════════════════════════════════

let maintenanceMode = localStorage.getItem('silverapp_maintenance') === 'true';

async function toggleMaintenance() {
  maintenanceMode = !maintenanceMode;
  localStorage.setItem('silverapp_maintenance', maintenanceMode);
  const btn = document.getElementById('maintBtn');
  if (btn) {
    btn.textContent = maintenanceMode ? 'Desactiver maintenance' : 'Activer maintenance';
    btn.className = maintenanceMode ? 'btn btn-danger' : 'btn btn-primary';
  }
  const status = document.getElementById('maintStatus');
  if (maintenanceMode) {
    const guilds = await getCachedGuilds();
    let sent = 0;
    for (const g of guilds) {
      const channels = await discordGet(`/guilds/${g.id}/channels`);
      if (!Array.isArray(channels)) continue;
      const general = channels.find(c => c.type === 0);
      if (general) {
        await discordPost(`/channels/${general.id}/messages`, { embeds: [{ title: 'Mode Maintenance', description: 'Le bot est en maintenance. Il sera de retour bientot.', color: 0xFBBF24 }] });
        sent++;
      }
    }
    if (status) status.textContent = `Maintenance activee — ${sent} serveur(s) notifie(s)`;
  } else {
    if (status) status.textContent = 'Maintenance desactivee';
  }
  setTimeout(() => { if (status) status.textContent = ''; }, 4000);
}

// ═══ SERVER DETAIL ══════════════════════════════════════════════════════════

async function showServerDetail(guildId, guildName) {
  const content = document.getElementById('content');
  content.innerHTML = `<div class="page-header fade-in"><h2>${esc(guildName)}</h2><p>Details du serveur</p><button class="btn btn-secondary" style="margin-top:8px;padding:6px 14px;font-size:11px" onclick="showPage('overview')">Retour</button></div>
    <div id="serverDetailContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const [guild, channels] = await Promise.all([
    discordGet(`/guilds/${guildId}?with_counts=true`),
    discordGet(`/guilds/${guildId}/channels`),
  ]);
  if (guild.error) { document.getElementById('serverDetailContent').innerHTML = '<div class="coming-soon"><p>Impossible de charger</p></div>'; return; }
  const textCh = Array.isArray(channels) ? channels.filter(c => c.type === 0) : [];
  const voiceCh = Array.isArray(channels) ? channels.filter(c => c.type === 2) : [];
  const catCh = Array.isArray(channels) ? channels.filter(c => c.type === 4) : [];
  const icon = guild.icon ? `<img src="https://cdn.discordapp.com/icons/${guildId}/${guild.icon}.png?size=128" style="width:64px;height:64px;border-radius:16px">` : '';

  let html = `<div class="card fade-in" style="display:flex;align-items:center;gap:16px;padding:18px;margin-bottom:14px">
    ${icon}
    <div style="flex:1">
      <div style="font-size:18px;font-weight:700;color:var(--bright)">${esc(guild.name)}</div>
      <div style="font-size:11px;color:var(--dim)">${guildId} · ${guild.approximate_member_count || '?'} membres</div>
    </div>
  </div>`;
  html += `<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:14px">
    <div class="card stat-card"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Membres</div><div class="stat-value">${guild.approximate_member_count || '?'}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">En ligne</div><div class="stat-value">${guild.approximate_presence_count || '?'}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--accent)"></div><div class="stat-label">Channels</div><div class="stat-value">${textCh.length + voiceCh.length}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">Categories</div><div class="stat-value">${catCh.length}</div></div>
  </div>`;
  if (textCh.length) {
    html += sectionHeader(`Channels texte (${textCh.length})`);
    html += '<div class="card">' + textCh.sort((a,b)=>a.position-b.position).map(c => `<div class="server-item"><span style="color:var(--muted)">#</span><div class="server-info"><div class="name">${esc(c.name)}</div><div class="id">${c.id}</div></div></div>`).join('') + '</div>';
  }
  if (voiceCh.length) {
    html += sectionHeader(`Channels vocaux (${voiceCh.length})`);
    html += '<div class="card">' + voiceCh.sort((a,b)=>a.position-b.position).map(c => `<div class="server-item"><span style="color:var(--muted)">🔊</span><div class="server-info"><div class="name">${esc(c.name)}</div><div class="id">${c.id}</div></div></div>`).join('') + '</div>';
  }
  document.getElementById('serverDetailContent').innerHTML = html;
}

// ═══ RECHERCHE GLOBALE (Ctrl+K) ═════════════════════════════════════════════

let _recentSearches = JSON.parse(localStorage.getItem('silverapp_recent_searches') || '[]');

function openSearch() {
  if (document.getElementById('globalSearchOverlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'globalSearchOverlay';
  overlay.className = 'search-overlay';
  overlay.innerHTML = `<div class="search-box" style="background:linear-gradient(160deg,#0c0c16,#08080e);border:.5px solid rgba(200,200,220,.08);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.6)">
    <div style="display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:.5px solid rgba(200,200,220,.04)">
      <span style="color:#555568;font-size:14px">&#128269;</span>
      <input type="text" id="globalSearchInput" placeholder="${currentLang === 'fr' ? 'Rechercher...' : 'Search...'}" autofocus oninput="globalSearchUpdate()" style="background:none;border:none;color:#c0c0d0;font-size:14px;flex:1;outline:none;padding:0">
      <kbd style="background:rgba(200,200,230,.05);border:.5px solid rgba(200,200,220,.08);border-radius:6px;padding:2px 8px;font-size:10px;color:#555568;font-family:monospace">ESC</kbd>
    </div>
    <div id="globalSearchResults" class="search-results" style="max-height:320px;overflow-y:auto;padding:8px">
      ${_recentSearches.length ? `<div style="padding:6px 12px;font-size:9px;color:#404058;text-transform:uppercase;letter-spacing:1px">${currentLang === 'fr' ? 'Recents' : 'Recent'}</div>` + _recentSearches.slice(0, 5).map(r => `<div class="search-result-item" onclick="document.getElementById('globalSearchOverlay').remove();showPage('${r}')" style="border-radius:10px">${t(r)}</div>`).join('') : `<div style="padding:20px;text-align:center;color:#404058;font-size:11px">${currentLang === 'fr' ? 'Tape pour rechercher' : 'Type to search'}</div>`}
    </div>
  </div>`;
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
  document.body.appendChild(overlay);
  document.getElementById('globalSearchInput').focus();
}

function _addRecentSearch(page) {
  _recentSearches = _recentSearches.filter(r => r !== page);
  _recentSearches.unshift(page);
  _recentSearches = _recentSearches.slice(0, 8);
  localStorage.setItem('silverapp_recent_searches', JSON.stringify(_recentSearches));
}

async function globalSearchUpdate() {
  const q = document.getElementById('globalSearchInput').value.trim().toLowerCase();
  const results = document.getElementById('globalSearchResults');
  if (!q) { results.innerHTML = ''; return; }
  let html = '';
  const pages = [
    ['home','Accueil'],['overview','Vue d\'ensemble'],['analytics','Analytics'],['leaderboard','Leaderboard'],
    ['members','Membres'],['compare','Comparateur'],['stats','Statistiques'],['heatmap','Heatmap'],
    ['serverlist','Serveurs'],['channels','Stats Channels'],['control','Controle Bot'],['botinfo','Bot Info'],
    ['botprofile','Bot Profil'],['embedbuilder','Embed Builder'],['uptime','Uptime'],
    ['chat','Chat Testeurs'],['bugs','Bugs Reports'],['tasks','Taches'],['announcements','Annonces'],
    ['suggestions','Suggestions'],['testlab','Test Lab'],['forgot','Codes oublies'],
    ['database','Base de donnees'],['console','Console'],['logs','Logs'],['history','Historique'],
    ['changelog','Changelog'],['settings','Parametres'],
  ];
  const matchedPages = pages.filter(([,name]) => name.toLowerCase().includes(q));
  if (matchedPages.length) {
    html += `<div style="padding:6px 12px;font-size:9px;color:#404058;text-transform:uppercase;letter-spacing:1px">Pages</div>`;
    html += matchedPages.map(([id, name]) => `<div class="search-result-item" style="border-radius:10px" onclick="_addRecentSearch('${id}');document.getElementById('globalSearchOverlay').remove();showPage('${id}')">${name}</div>`).join('');
  }
  if (/^\d{10,}$/.test(q)) {
    html += `<div class="search-result-item" onclick="document.getElementById('globalSearchOverlay').remove();showPage('members');setTimeout(()=>{document.getElementById('memberSearch').value='${q}';searchMember()},100)">Rechercher membre ${q}</div>`;
  }
  const guilds = await getCachedGuilds();
  const matchedGuilds = guilds.filter(g => g.name.toLowerCase().includes(q)).slice(0, 3);
  matchedGuilds.forEach(g => {
    html += `<div class="search-result-item" onclick="document.getElementById('globalSearchOverlay').remove();showServerDetail('${g.id}','${esc(g.name).replace(/'/g,"\\'")}')">${esc(g.name)}</div>`;
  });
  results.innerHTML = html || '<div style="padding:12px;color:var(--muted);font-size:12px">Aucun resultat</div>';
}

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') { const o = document.getElementById('globalSearchOverlay'); if (o) o.remove(); }
});

// ═══ STATISTIQUES AVANCEES ══════════════════════════════════════════════════

async function loadStats(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Statistiques</h2><p>Analyse detaillee</p></div>
    <div id="statsContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const [totalXp, totalMsgs, totalWarns, topDay, activeGuilds, guilds] = await Promise.all([
    dbScalar('SELECT COALESCE(SUM(xp),0) FROM user_xp'),
    dbScalar('SELECT COALESCE(SUM(messages_count),0) FROM user_xp'),
    dbScalar('SELECT COUNT(*) FROM warnings'),
    dbQuery('SELECT DATE(created_at) as d, COUNT(*) as c FROM warnings GROUP BY d ORDER BY c DESC LIMIT 1'),
    dbScalar('SELECT COUNT(DISTINCT guild_id) FROM user_xp'),
    getCachedGuilds(),
  ]);
  let totalMembers = 0;
  const guildDetails = await Promise.all(guilds.map(g => discordGet(`/guilds/${g.id}?with_counts=true`)));
  guildDetails.forEach(g => { if (g && !g.error) totalMembers += g.approximate_member_count || 0; });
  const activeUsers = await dbScalar('SELECT COUNT(DISTINCT CAST(user_id AS CHAR)) FROM user_xp');
  const avgXp = activeUsers > 0 ? Math.round(totalXp / activeUsers) : 0;
  const avgMsgs = activeUsers > 0 ? Math.round(totalMsgs / activeUsers) : 0;
  const peakDay = topDay.length && !topDay[0]?.error ? topDay[0] : null;

  let html = `<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">XP Total</div><div class="stat-value" style="font-size:18px">${totalXp.toLocaleString('fr-FR')}</div></div>
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">Messages Total</div><div class="stat-value" style="font-size:18px">${totalMsgs.toLocaleString('fr-FR')}</div></div>
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--accent)"></div><div class="stat-label">XP Moyen/User</div><div class="stat-value" style="font-size:18px">${avgXp.toLocaleString('fr-FR')}</div></div>
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Serveurs actifs</div><div class="stat-value">${activeGuilds}</div></div>
  </div>`;
  html += `<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Membres</div><div class="stat-value">${totalMembers}</div></div>
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--gold)"></div><div class="stat-label">Warns Total</div><div class="stat-value">${totalWarns}</div></div>
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--red)"></div><div class="stat-label">Msgs Moyen/User</div><div class="stat-value">${avgMsgs}</div></div>
    <div class="card stat-card slide-in"><div class="stat-bar" style="background:#c084fc"></div><div class="stat-label">Jour le + actif</div><div class="stat-value" style="font-size:12px">${peakDay ? peakDay.d : '—'}</div></div>
  </div>`;

  const xpByGuild = await dbQuery('SELECT CAST(guild_id AS CHAR) AS guild_id, SUM(xp) as xp, SUM(messages_count) as msgs, COUNT(DISTINCT CAST(user_id AS CHAR)) as users FROM user_xp GROUP BY guild_id ORDER BY xp DESC');
  if (xpByGuild.length && !xpByGuild[0]?.error) {
    const guilds = await getCachedGuilds();
    const gm = {}; guilds.forEach(g => gm[String(g.id).trim()] = g);
    const activeGuildRows = xpByGuild.filter(r => gm[String(r.guild_id).trim()]);
    if (activeGuildRows.length) {
      html += sectionHeader('Repartition par serveur');
      html += buildTable(['Serveur', 'XP', 'Messages', 'Membres'],
        activeGuildRows.map(r => {
          const g = gm[String(r.guild_id).trim()];
          const icon = g.icon ? `<img src="https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=32" style="width:20px;height:20px;border-radius:6px">` : '';
          return [`<div style="display:flex;align-items:center;gap:8px">${icon}<span>${esc(g.name)}</span></div>`, (r.xp||0).toLocaleString('fr-FR'), (r.msgs||0).toLocaleString('fr-FR'), r.users||0];
        }));
    }
  }
  document.getElementById('statsContent').innerHTML = html;
}

// ═══ STATS PAR CHANNEL ═════════════════════════════════════════════════════

let channelGuildId = null;

async function loadChannels(el) {
  const guilds = await getCachedGuilds();
  el.innerHTML = `
    <div class="page-header fade-in"><h2>${t('channelStats')}</h2><p>${t('realtime')}</p></div>
    <div style="display:flex;gap:8px;margin-bottom:16px">
      <select id="channelGuildSelect" onchange="channelGuildChanged()" style="max-width:300px">
        <option value="">${t('selectServer')}</option>
        ${guilds.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}
      </select>
    </div>
    <div id="channelContent"></div>`;
}

async function channelGuildChanged() {
  const guildId = document.getElementById('channelGuildSelect').value;
  const container = document.getElementById('channelContent');
  if (!guildId) { container.innerHTML = ''; return; }
  container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

  const channels = await discordGet(`/guilds/${guildId}/channels`);
  if (!Array.isArray(channels)) { container.innerHTML = `<div class="coming-soon"><p>${t('noData')}</p></div>`; return; }

  const textChannels = channels.filter(c => c.type === 0).sort((a, b) => a.position - b.position);
  const voiceChannels = channels.filter(c => c.type === 2).sort((a, b) => a.position - b.position);
  const categories = channels.filter(c => c.type === 4).sort((a, b) => a.position - b.position);
  const catMap = {};
  categories.forEach(c => catMap[c.id] = c.name);

  container.innerHTML = '<div class="loading"><div class="spinner"></div> <span id="channelCountStatus" style="font-size:11px;color:var(--dim)">Comptage des messages...</span></div>';

  const channelData = [];
  for (let i = 0; i < textChannels.length; i++) {
    const ch = textChannels[i];
    const statusEl = document.getElementById('channelCountStatus');
    if (statusEl) statusEl.textContent = `Comptage: #${ch.name} (${i + 1}/${textChannels.length})`;
    try {
      const search = await discordGet(`/guilds/${guildId}/messages/search?channel_id=${ch.id}`);
      const total = search?.total_results || 0;
      const recentMsgs = await discordGet(`/channels/${ch.id}/messages?limit=50`);
      const users = Array.isArray(recentMsgs) ? new Set(recentMsgs.map(m => m.author?.id)).size : 0;
      const recent = Array.isArray(recentMsgs) && recentMsgs.length ? recentMsgs[0] : null;
      channelData.push({ ch, count: total, users, recent });
    } catch { channelData.push({ ch, count: 0, users: 0, recent: null }); }
  }

  channelData.sort((a, b) => b.count - a.count);
  const totalMsgs = channelData.reduce((s, d) => s + d.count, 0);
  const totalUsers = new Set(channelData.flatMap(d => [])).size;
  const mostActive = channelData[0];

  let html = `<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="card stat-card"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Channels texte</div><div class="stat-value">${textChannels.length}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">Channels vocaux</div><div class="stat-value">${voiceChannels.length}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">Categories</div><div class="stat-value">${categories.length}</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">${t('topChannels')}</div><div class="stat-value" style="font-size:13px">${mostActive ? '#' + esc(mostActive.ch.name) : '—'}</div></div>
  </div>`;

  html += sectionHeader(`${t('topChannels')} (${channelData.length})`);
  html += buildTable(['#', 'Channel', 'Categorie', t('msgCount'), t('activeUsers'), 'Activite'],
    channelData.map((d, i) => {
      const cat = d.ch.parent_id ? (catMap[d.ch.parent_id] || '—') : '—';
      const pct = totalMsgs > 0 ? Math.round(d.count / totalMsgs * 100) : 0;
      const bar = `<div style="display:flex;align-items:center;gap:6px"><div style="width:80px;height:4px;background:var(--bg2);border-radius:2px;overflow:hidden"><div style="width:${pct}%;height:100%;background:var(--accent);border-radius:2px"></div></div><span style="font-size:10px;color:var(--muted)">${pct}%</span></div>`;
      const rank = `<span style="font-weight:700;color:${i < 3 ? 'var(--gold)' : 'var(--dim)'}">#${i + 1}</span>`;
      return [rank, `<span style="color:var(--bright)">#${esc(d.ch.name)}</span>`, esc(cat), d.count.toLocaleString('fr-FR'), d.users.toLocaleString('fr-FR'), bar];
    }));

  if (voiceChannels.length) {
    html += sectionHeader(`Channels vocaux (${voiceChannels.length})`);
    html += '<div class="card" style="padding:0;overflow:hidden">';
    voiceChannels.forEach(ch => {
      const cat = ch.parent_id ? (catMap[ch.parent_id] || '') : '';
      html += `<div class="server-item">
        <span style="color:var(--muted);font-size:14px">🔊</span>
        <div class="server-info">
          <div class="name">${esc(ch.name)}</div>
          <div class="id">${cat ? esc(cat) + ' · ' : ''}${ch.id}</div>
        </div>
      </div>`;
    });
    html += '</div>';
  }

  container.innerHTML = html;
}

// ═══ ANALYTICS (Chart.js) ══════════════════════════════════════════════════

const _chartDefaults = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af', font: { size: 11 } } } }, scales: { x: { ticks: { color: '#6b7280', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,.05)' } }, y: { ticks: { color: '#6b7280', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,.05)' }, beginAtZero: true } } };

async function loadAnalytics(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>${t('analytics')}</h2><p>${t('last30d')}</p></div>
    <div class="stats-grid" style="grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      <div class="card fade-in" style="padding:16px;height:280px"><canvas id="chartActivity"></canvas></div>
      <div class="card fade-in" style="padding:16px;height:280px"><canvas id="chartBugs"></canvas></div>
    </div>
    <div class="stats-grid" style="grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      <div class="card fade-in" style="padding:16px;height:280px"><canvas id="chartMessages"></canvas></div>
      <div class="card fade-in" style="padding:16px;height:280px"><canvas id="chartTesters"></canvas></div>
    </div>
    <div class="card fade-in" style="padding:16px;height:300px;margin-bottom:14px"><canvas id="chartGrowth"></canvas></div>`;

  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const labels = days.map(d => d.slice(5));

  const [msgsByDay, bugsByDay, tasksByDay, xpByDay, chatByDay] = await Promise.all([
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_chat WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY d ORDER BY d"),
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_bugs WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY d ORDER BY d"),
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_tasks WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY d ORDER BY d"),
    dbQuery("SELECT DATE(updated_at) as d, SUM(xp) as c FROM user_xp WHERE updated_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY d ORDER BY d"),
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_announcements WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY d ORDER BY d"),
  ]);

  function fillDays(rows) {
    const map = {};
    (Array.isArray(rows) && !rows[0]?.error ? rows : []).forEach(r => {
      const key = String(r.d).slice(0, 10);
      map[key] = Number(r.c) || 0;
    });
    return days.map(d => map[d] || 0);
  }

  const gradient = (ctx, c1, c2) => {
    const g = ctx.createLinearGradient(0, 0, 0, 250);
    g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
  };

  if (typeof Chart === 'undefined') { el.innerHTML += '<div class="coming-soon"><p>Chart.js non charge</p></div>'; return; }

  const ctx1 = document.getElementById('chartActivity');
  if (ctx1) new Chart(ctx1, { type: 'line', data: { labels, datasets: [
    { label: 'Messages Chat', data: fillDays(msgsByDay), borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,.1)', tension: .4, fill: true },
    { label: 'Annonces', data: fillDays(chatByDay), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,.1)', tension: .4, fill: true },
  ]}, options: { ..._chartDefaults, plugins: { ...(_chartDefaults.plugins), title: { display: true, text: currentLang === 'fr' ? 'Activite Testeurs' : 'Tester Activity', color: '#f5f5f5' } } } });

  const ctx2 = document.getElementById('chartBugs');
  if (ctx2) new Chart(ctx2, { type: 'bar', data: { labels, datasets: [
    { label: 'Bugs', data: fillDays(bugsByDay), backgroundColor: 'rgba(239,68,68,.6)', borderRadius: 4 },
    { label: 'Taches', data: fillDays(tasksByDay), backgroundColor: 'rgba(59,130,246,.6)', borderRadius: 4 },
  ]}, options: { ..._chartDefaults, plugins: { ...(_chartDefaults.plugins), title: { display: true, text: currentLang === 'fr' ? 'Bugs & Taches' : 'Bugs & Tasks', color: '#f5f5f5' } } } });

  const ctx3 = document.getElementById('chartMessages');
  const xpData = fillDays(xpByDay);
  if (ctx3) new Chart(ctx3, { type: 'line', data: { labels, datasets: [
    { label: 'XP gagne', data: xpData, borderColor: '#eab308', backgroundColor: 'rgba(234,179,8,.1)', tension: .3, fill: true, pointRadius: 2 },
  ]}, options: { ..._chartDefaults, plugins: { ...(_chartDefaults.plugins), title: { display: true, text: currentLang === 'fr' ? 'XP Gagne par Jour' : 'XP Earned per Day', color: '#f5f5f5' } } } });

  const ctx4 = document.getElementById('chartTesters');
  const [testerActivity] = await Promise.all([
    dbQuery("SELECT sender_name as name, COUNT(*) as c FROM tester_chat GROUP BY sender_name ORDER BY c DESC LIMIT 8"),
  ]);
  const tNames = (Array.isArray(testerActivity) && !testerActivity[0]?.error ? testerActivity : []).map(r => r.name || '?');
  const tCounts = (Array.isArray(testerActivity) && !testerActivity[0]?.error ? testerActivity : []).map(r => Number(r.c));
  const tColors = ['#3b82f6', '#22c55e', '#eab308', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];
  if (ctx4) new Chart(ctx4, { type: 'doughnut', data: { labels: tNames, datasets: [{ data: tCounts, backgroundColor: tColors.slice(0, tNames.length) }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: currentLang === 'fr' ? 'Top Testeurs' : 'Top Testers', color: '#f5f5f5' }, legend: { position: 'right', labels: { color: '#9ca3af', font: { size: 10 } } } } } });

  const ctx5 = document.getElementById('chartGrowth');
  const cumMsgs = fillDays(msgsByDay);
  let acc = 0; const cumulative = cumMsgs.map(v => acc += v);
  if (ctx5) new Chart(ctx5, { type: 'line', data: { labels, datasets: [
    { label: currentLang === 'fr' ? 'Messages cumules' : 'Cumulative messages', data: cumulative, borderColor: '#8b5cf6', backgroundColor: 'rgba(139,92,246,.1)', tension: .4, fill: true, pointRadius: 0 },
  ]}, options: { ..._chartDefaults, plugins: { ...(_chartDefaults.plugins), title: { display: true, text: currentLang === 'fr' ? 'Croissance des Messages' : 'Message Growth', color: '#f5f5f5' } } } });
}

// ═══ BOT PROFILE ══════════════════════════════════════════════════════════

let _botProfileStatuses = [
  { text: '👀 Watching {servers} servers', type: 'streaming' },
  { text: '⚡ {version} — Made by Tib', type: 'streaming' },
];
let _botProfileInterval = 10;

async function loadBotProfile(el) {
  const bot = await discordGet('/users/@me');
  if (bot.error) { el.innerHTML = '<div class="coming-soon"><div class="icon">●</div><p>API Discord inaccessible</p></div>'; return; }
  const avatar = getBotAvatar(bot, 256);
  const saved = JSON.parse(localStorage.getItem('silverapp_bot_statuses') || 'null');
  if (saved) { _botProfileStatuses = saved.statuses || _botProfileStatuses; _botProfileInterval = saved.interval || 10; }

  el.innerHTML = `
    <div class="page-header fade-in"><h2>${t('botprofile')}</h2><p>${currentLang === 'fr' ? 'Personnaliser le profil et le statut du bot' : 'Customize bot profile and status'}</p></div>
    <div class="stats-grid" style="grid-template-columns:1fr 1fr;gap:14px">

      <!-- Profil -->
      <div class="card fade-in" style="padding:20px">
        <div class="control-section-title">${currentLang === 'fr' ? 'Profil du Bot' : 'Bot Profile'}</div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px">
          <div style="position:relative">
            <img src="${avatar}" style="width:80px;height:80px;border-radius:50%;border:3px solid var(--accent)">
            <div id="bpAvatarPreview" style="display:none;position:absolute;inset:0;border-radius:50%;overflow:hidden"><img style="width:100%;height:100%;object-fit:cover"></div>
          </div>
          <div style="flex:1">
            <label style="font-size:11px;color:var(--dim);margin-bottom:4px;display:block">${t('botName')}</label>
            <input type="text" id="bpName" value="${esc(bot.username)}" style="width:100%;margin-bottom:8px">
            <label style="font-size:11px;color:var(--dim);margin-bottom:4px;display:block">${t('botAvatar')}</label>
            <input type="file" id="bpAvatarFile" accept="image/*" style="font-size:11px" onchange="bpPreviewAvatar(this)">
          </div>
        </div>
        <button class="btn btn-primary" style="width:100%" onclick="bpApplyProfile()">${t('applyChanges')}</button>
        <div id="bpProfileStatus" class="control-status"></div>
      </div>

      <!-- Statut actuel -->
      <div class="card fade-in" style="padding:20px">
        <div class="control-section-title">${t('currentRotation')}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
          <span style="font-size:11px;color:var(--dim)">${currentLang === 'fr' ? 'Intervalle (sec)' : 'Interval (sec)'}</span>
          <input type="number" id="bpInterval" value="${_botProfileInterval}" min="5" max="300" style="width:80px">
        </div>
        <div id="bpStatusList" style="margin-bottom:12px"></div>
        <div style="display:flex;gap:8px">
          <input type="text" id="bpNewStatus" placeholder="${currentLang === 'fr' ? 'Nouveau statut... ({servers}, {version})' : 'New status... ({servers}, {version})'}" style="flex:1">
          <select id="bpNewType" style="width:120px">
            <option value="streaming">Streaming</option>
            <option value="playing">Playing</option>
            <option value="watching">Watching</option>
            <option value="listening">Listening</option>
          </select>
          <button class="btn btn-primary" onclick="bpAddStatus()">${t('addStatus')}</button>
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:12px" onclick="bpSaveStatuses()">${currentLang === 'fr' ? 'Sauvegarder la rotation' : 'Save rotation'}</button>
        <div id="bpStatusMsg" class="control-status"></div>
      </div>
    </div>

    <!-- Preview -->
    <div class="card fade-in" style="padding:20px;margin-top:14px">
      <div class="control-section-title">${currentLang === 'fr' ? 'Apercu du statut en direct' : 'Live status preview'}</div>
      <div id="bpPreviewArea" style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg2);border-radius:var(--radius-sm)">
        <img src="${avatar}" style="width:40px;height:40px;border-radius:50%">
        <div>
          <div style="font-weight:600;color:var(--bright);font-size:13px">${esc(bot.username)}</div>
          <div id="bpPreviewStatus" style="font-size:11px;color:var(--accent)"></div>
        </div>
        <span class="dot dot-green dot-pulse" style="margin-left:auto;width:8px;height:8px"></span>
      </div>
    </div>`;

  bpRenderStatusList();
  bpStartPreview();
}

function bpRenderStatusList() {
  const el = document.getElementById('bpStatusList');
  if (!el) return;
  el.innerHTML = _botProfileStatuses.map((s, i) => `
    <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;background:var(--bg2);border-radius:6px;margin-bottom:4px">
      <span style="font-size:10px;color:var(--dim);width:18px">#${i + 1}</span>
      <span style="font-size:10px;padding:2px 6px;border-radius:4px;background:var(--blue);color:#fff">${s.type}</span>
      <span style="flex:1;font-size:12px;color:var(--text);font-family:monospace">${esc(s.text)}</span>
      <button onclick="_botProfileStatuses.splice(${i},1);bpRenderStatusList()" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:14px;padding:2px 6px">×</button>
    </div>`).join('') || `<div style="font-size:11px;color:var(--muted);padding:8px">${currentLang === 'fr' ? 'Aucun statut configure' : 'No status configured'}</div>`;
}

function bpAddStatus() {
  const text = document.getElementById('bpNewStatus')?.value?.trim();
  const type = document.getElementById('bpNewType')?.value || 'streaming';
  if (!text) return;
  _botProfileStatuses.push({ text, type });
  document.getElementById('bpNewStatus').value = '';
  bpRenderStatusList();
}

function bpSaveStatuses() {
  _botProfileInterval = parseInt(document.getElementById('bpInterval')?.value) || 10;
  localStorage.setItem('silverapp_bot_statuses', JSON.stringify({ statuses: _botProfileStatuses, interval: _botProfileInterval }));
  const el = document.getElementById('bpStatusMsg');
  if (el) { el.textContent = currentLang === 'fr' ? 'Rotation sauvegardee ! (Appliquer sur le bot via Nowheberg)' : 'Rotation saved! (Apply on bot via Nowheberg)'; el.style.color = 'var(--green)'; }
}

let _bpPreviewIdx = 0;
let _bpPreviewTimer = null;
function bpStartPreview() {
  clearInterval(_bpPreviewTimer);
  _bpPreviewIdx = 0;
  function tick() {
    if (!_botProfileStatuses.length) return;
    const s = _botProfileStatuses[_bpPreviewIdx % _botProfileStatuses.length];
    _bpPreviewIdx++;
    const el = document.getElementById('bpPreviewStatus');
    if (el) {
      const text = s.text.replace('{servers}', '?').replace('{version}', 'v2.3');
      const prefix = s.type === 'streaming' ? '🟣 Streaming' : s.type === 'playing' ? '🎮 Playing' : s.type === 'watching' ? '👀 Watching' : '🎵 Listening';
      el.textContent = `${prefix}: ${text}`;
      el.style.opacity = '0'; setTimeout(() => { if (el) el.style.opacity = '1'; }, 100);
    }
  }
  tick();
  _bpPreviewTimer = setInterval(tick, (_botProfileInterval || 10) * 1000);
}

function bpPreviewAvatar(input) {
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('bpAvatarPreview');
    if (preview) { preview.style.display = 'block'; preview.querySelector('img').src = e.target.result; }
  };
  reader.readAsDataURL(file);
}

async function bpApplyProfile() {
  const status = document.getElementById('bpProfileStatus');
  const name = document.getElementById('bpName')?.value?.trim();
  const fileInput = document.getElementById('bpAvatarFile');
  const data = {};
  if (name) data.username = name;
  if (fileInput?.files?.[0]) {
    const reader = new FileReader();
    const base64 = await new Promise(resolve => {
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(fileInput.files[0]);
    });
    data.avatar = base64;
  }
  if (!Object.keys(data).length) { if (status) status.textContent = currentLang === 'fr' ? 'Rien a modifier' : 'Nothing to change'; return; }
  if (status) { status.textContent = currentLang === 'fr' ? 'Application...' : 'Applying...'; status.style.color = 'var(--accent)'; }
  const res = await discordPatch('/users/@me', data);
  if (res.error) { if (status) { status.textContent = `Erreur: ${res.error}`; status.style.color = 'var(--red)'; } }
  else { if (status) { status.textContent = currentLang === 'fr' ? 'Profil mis a jour !' : 'Profile updated!'; status.style.color = 'var(--green)'; } }
}

// ═══ CONSOLE BOT ══════════════════════════════════════════════════════════

let _consoleAutoRefresh = null;

async function loadConsole(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>${t('console')}</h2><p>${currentLang === 'fr' ? 'Logs du bot en temps reel' : 'Real-time bot logs'}</p></div>
    <div style="display:flex;gap:8px;margin-bottom:12px;align-items:center">
      <button class="btn btn-primary" onclick="consoleRefresh()">Refresh</button>
      <button class="btn btn-secondary" id="consoleAutoBtn" onclick="consoleToggleAuto()">Auto-refresh: OFF</button>
      <select id="consoleFilter" onchange="consoleRefresh()" style="max-width:150px">
        <option value="">Tout</option>
        <option value="ERROR">Erreurs</option>
        <option value="WARNING">Warnings</option>
        <option value="INFO">Info</option>
      </select>
      <input type="text" id="consoleSearch" placeholder="${currentLang === 'fr' ? 'Rechercher...' : 'Search...'}" style="flex:1" oninput="consoleRefresh()">
      <button class="btn btn-secondary" onclick="consoleClear()">${currentLang === 'fr' ? 'Effacer' : 'Clear'}</button>
    </div>
    <div id="consoleOutput" class="console-output" style="background:#0a0a0a;border:1px solid var(--border);border-radius:var(--radius-sm);padding:12px;font-family:'Fira Code',Consolas,monospace;font-size:11px;line-height:1.7;max-height:500px;overflow-y:auto;color:#d4d4d4;white-space:pre-wrap;word-break:break-all">
      <div class="loading"><div class="spinner"></div></div>
    </div>`;
  consoleRefresh();
}

async function consoleRefresh() {
  const out = document.getElementById('consoleOutput');
  if (!out) return;
  try {
    const res = await fetch(`${BACKEND}/bot/logs?lines=200`).then(r => r.json());
    let lines = res.lines || [];
    const filter = document.getElementById('consoleFilter')?.value;
    const search = document.getElementById('consoleSearch')?.value?.toLowerCase();
    if (filter) lines = lines.filter(l => l.includes(`[${filter}]`));
    if (search) lines = lines.filter(l => l.toLowerCase().includes(search));
    if (!lines.length) { out.innerHTML = `<span style="color:var(--muted)">${currentLang === 'fr' ? 'Aucun log disponible' : 'No logs available'}</span>`; return; }
    out.innerHTML = lines.map(l => {
      let color = '#d4d4d4';
      if (l.includes('[ERROR]')) color = '#ef4444';
      else if (l.includes('[WARNING]')) color = '#eab308';
      else if (l.includes('[INFO]')) color = '#3b82f6';
      return `<div style="color:${color};padding:1px 0">${esc(l)}</div>`;
    }).join('');
    out.scrollTop = out.scrollHeight;
  } catch {
    out.innerHTML = `<span style="color:var(--red)">${currentLang === 'fr' ? 'Impossible de charger les logs' : 'Cannot load logs'}</span>`;
  }
}

function consoleToggleAuto() {
  const btn = document.getElementById('consoleAutoBtn');
  if (_consoleAutoRefresh) {
    clearInterval(_consoleAutoRefresh);
    _consoleAutoRefresh = null;
    if (btn) btn.textContent = 'Auto-refresh: OFF';
  } else {
    _consoleAutoRefresh = setInterval(consoleRefresh, 3000);
    if (btn) btn.textContent = 'Auto-refresh: ON';
  }
}

function consoleClear() {
  const out = document.getElementById('consoleOutput');
  if (out) out.innerHTML = `<span style="color:var(--muted)">Console cleared</span>`;
}

// ═══ BACKUP SYSTEM ═══════════════════════════════════════════════════════

async function backupExport() {
  try {
    const res = await fetch(`${BACKEND}/backup/export`).then(r => r.json());
    const appData = {
      version: '2.2',
      exported_at: new Date().toISOString(),
      config: res.config || {},
      settings: {
        theme: localStorage.getItem('silverapp_theme') || 'default',
        mode: localStorage.getItem('silverapp_mode') || 'dark',
        lang: localStorage.getItem('silverapp_lang') || 'fr',
        glass: localStorage.getItem('silverapp_glass') || 'false',
        sidebar: localStorage.getItem('silverapp_sidebar') || 'false',
        compact: localStorage.getItem('silverapp_compact') || 'false',
        bot_statuses: JSON.parse(localStorage.getItem('silverapp_bot_statuses') || 'null'),
        widgets: JSON.parse(localStorage.getItem('silverapp_widgets') || 'null'),
      },
      tables: res.tables || {},
    };
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `silverapp-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click(); URL.revokeObjectURL(url);
    showNotif(currentLang === 'fr' ? 'Backup' : 'Backup', currentLang === 'fr' ? 'Backup exporte avec succes' : 'Backup exported successfully');
  } catch (e) {
    showNotif('Erreur', e.message);
  }
}

function backupImport() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.version) { showNotif('Erreur', 'Fichier invalide'); return; }
      if (data.settings) {
        if (data.settings.theme) localStorage.setItem('silverapp_theme', data.settings.theme);
        if (data.settings.mode) localStorage.setItem('silverapp_mode', data.settings.mode);
        if (data.settings.lang) localStorage.setItem('silverapp_lang', data.settings.lang);
        if (data.settings.glass) localStorage.setItem('silverapp_glass', data.settings.glass);
        if (data.settings.compact) localStorage.setItem('silverapp_compact', data.settings.compact);
        if (data.settings.bot_statuses) localStorage.setItem('silverapp_bot_statuses', JSON.stringify(data.settings.bot_statuses));
        if (data.settings.widgets) localStorage.setItem('silverapp_widgets', JSON.stringify(data.settings.widgets));
      }
      if (data.config && data.config.token) {
        await fetch(`${BACKEND}/backup/restore-config`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ config: data.config }),
        });
      }
      showNotif(currentLang === 'fr' ? 'Backup' : 'Backup', currentLang === 'fr' ? 'Configuration restauree ! Rechargement...' : 'Config restored! Reloading...');
      setTimeout(() => location.reload(), 1500);
    } catch { showNotif('Erreur', 'Fichier corrompu'); }
  };
  input.click();
}

// ═══ COMPACT MODE ═════════════════════════════════════════════════════════

let _compactMode = localStorage.getItem('silverapp_compact') === 'true';

function toggleCompact() {
  _compactMode = !_compactMode;
  localStorage.setItem('silverapp_compact', _compactMode);
  document.documentElement.setAttribute('data-compact', _compactMode);
  const btn = document.getElementById('compactBtn');
  if (btn) btn.textContent = `${t('compact')}: ${_compactMode ? 'ON' : 'OFF'}`;
}

(function() {
  if (_compactMode) document.documentElement.setAttribute('data-compact', 'true');
})();

// ═══ NOTIFICATIONS DESKTOP ═══════════════════════════════════════════════

let _desktopNotifs = localStorage.getItem('silverapp_desktop_notifs') !== 'false';

function toggleDesktopNotifs() {
  _desktopNotifs = !_desktopNotifs;
  localStorage.setItem('silverapp_desktop_notifs', _desktopNotifs);
  if (_desktopNotifs && 'Notification' in window && Notification.permission === 'default') Notification.requestPermission();
  const btn = document.getElementById('desktopNotifBtn');
  if (btn) btn.textContent = `Notifications: ${_desktopNotifs ? 'ON' : 'OFF'}`;
}

function showDesktopNotif(title, body) {
  if (!_desktopNotifs) return;
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: getBotAvatar(_botInfoCache, 64) || undefined });
  }
}

// ═══ EMBED BUILDER ════════════════════════════════════════════════════════

let _embedTemplates = JSON.parse(localStorage.getItem('silverapp_embed_templates') || '[]');

let _ebMembers = [];

async function loadEmbedBuilder(el) {
  const guilds = await getCachedGuilds();
  el.innerHTML = `
    <div class="page-header fade-in"><h2>${t('embedBuilder')}</h2><p>${currentLang === 'fr' ? 'Creer et envoyer des embeds visuellement' : 'Create and send embeds visually'}</p></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">

      <!-- Editor -->
      <div class="card fade-in" style="padding:18px">
        <div class="control-section-title">${currentLang === 'fr' ? 'Editeur' : 'Editor'}</div>
        <div style="display:grid;gap:10px">
          <div style="display:flex;gap:8px">
            <select id="ebGuild" onchange="ebGuildChanged()" style="flex:1"><option value="">Serveur</option>${guilds.map(g => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select>
            <select id="ebChannel" style="flex:1"><option value="">Channel</option></select>
          </div>
          <input type="text" id="ebTitle" placeholder="Titre" oninput="ebUpdatePreview()">
          <div style="position:relative">
            <textarea id="ebDesc" placeholder="Description (@ pour mentionner, **bold**, *italic*)" rows="4" style="resize:vertical" oninput="ebMentionCheck(this);ebUpdatePreview()"></textarea>
            <div id="ebMentionDropdown" style="display:none;position:absolute;bottom:100%;left:0;right:0;max-height:160px;overflow-y:auto;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);z-index:20;box-shadow:0 -4px 16px rgba(0,0,0,.3)"></div>
          </div>
          <div style="display:flex;gap:8px">
            <input type="color" id="ebColor" value="#3b82f6" style="width:50px;height:34px;border:none;cursor:pointer;border-radius:6px" oninput="ebUpdatePreview()">
            <input type="text" id="ebAuthor" placeholder="Auteur (optionnel)" style="flex:1" oninput="ebUpdatePreview()">
          </div>
          <input type="text" id="ebFooter" placeholder="Footer (optionnel)" oninput="ebUpdatePreview()">
          <input type="text" id="ebVideo" placeholder="URL video YouTube/autre (optionnel)" oninput="ebUpdatePreview()">

          <div class="control-section-title" style="margin-top:4px">${currentLang === 'fr' ? 'Image / Thumbnail' : 'Image / Thumbnail'}</div>
          <div id="ebDropZone" style="border:2px dashed var(--border);border-radius:var(--radius-sm);padding:20px;text-align:center;cursor:pointer;transition:border-color .2s" ondragover="event.preventDefault();this.style.borderColor='var(--accent)'" ondragleave="this.style.borderColor='var(--border)'" ondrop="ebHandleDrop(event)" onclick="document.getElementById('ebFileInput').click()">
            <input type="file" id="ebFileInput" accept="image/*" style="display:none" onchange="ebHandleFile(this.files[0])">
            <div style="font-size:12px;color:var(--dim)">${currentLang === 'fr' ? 'Glisse une image ici, colle (Ctrl+V), ou clique pour choisir' : 'Drag image here, paste (Ctrl+V), or click to browse'}</div>
            <div id="ebUploadPreview" style="margin-top:8px;display:none">
              <img id="ebUploadImg" style="max-width:100%;max-height:120px;border-radius:6px">
              <div style="display:flex;gap:6px;margin-top:6px;justify-content:center">
                <button class="btn btn-secondary" style="font-size:10px;padding:3px 10px" onclick="ebSetAsImage()">${currentLang === 'fr' ? 'Mettre en Image' : 'Set as Image'}</button>
                <button class="btn btn-secondary" style="font-size:10px;padding:3px 10px" onclick="ebSetAsThumbnail()">${currentLang === 'fr' ? 'Mettre en Thumbnail' : 'Set as Thumbnail'}</button>
                <button class="btn btn-secondary" style="font-size:10px;padding:3px 10px;color:var(--red)" onclick="ebClearUpload()">×</button>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:8px">
            <input type="text" id="ebImage" placeholder="URL image" style="flex:1" oninput="ebUpdatePreview()">
            <input type="text" id="ebThumbnail" placeholder="URL thumbnail" style="flex:1" oninput="ebUpdatePreview()">
          </div>

          <div class="control-section-title" style="margin-top:4px">Fields</div>
          <div id="ebFields"></div>
          <button class="btn btn-secondary" style="font-size:11px" onclick="ebAddField()">+ Ajouter un field</button>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="btn btn-primary" style="flex:1" onclick="ebSend()">${t('sendEmbed')}</button>
            <button class="btn btn-secondary" onclick="ebSaveTemplate()">${t('saveTemplate')}</button>
          </div>
          <div id="ebStatus" class="control-status"></div>
          ${_embedTemplates.length ? `
            <div class="control-section-title" style="margin-top:4px">Templates</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">${_embedTemplates.map((t, i) => `
              <button class="btn btn-secondary" style="font-size:10px;padding:4px 10px" onclick="ebLoadTemplate(${i})">${esc(t.name || 'Template ' + (i+1))}</button>
            `).join('')}</div>` : ''}
        </div>
      </div>

      <!-- Preview -->
      <div class="card fade-in" style="padding:18px">
        <div class="control-section-title">${t('preview')}</div>
        <div id="ebPreview" style="background:#2f3136;border-radius:8px;padding:0;overflow:hidden"></div>
      </div>
    </div>`;
  ebUpdatePreview();
  ebInitPaste();
}

let _ebUploadedUrl = null;

function ebHandleDrop(e) {
  e.preventDefault();
  e.currentTarget.style.borderColor = 'var(--border)';
  const file = e.dataTransfer?.files?.[0];
  if (file && file.type.startsWith('image/')) ebHandleFile(file);
}

async function ebHandleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const preview = document.getElementById('ebUploadPreview');
    const img = document.getElementById('ebUploadImg');
    if (preview && img) { img.src = e.target.result; preview.style.display = 'block'; }
  };
  reader.readAsDataURL(file);
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${BACKEND}/upload`, { method: 'POST', body: formData }).then(r => r.json());
    if (res.url) _ebUploadedUrl = res.url;
  } catch {}
}

function ebSetAsImage() {
  if (_ebUploadedUrl) { document.getElementById('ebImage').value = _ebUploadedUrl; ebUpdatePreview(); }
}
function ebSetAsThumbnail() {
  if (_ebUploadedUrl) { document.getElementById('ebThumbnail').value = _ebUploadedUrl; ebUpdatePreview(); }
}
function ebClearUpload() {
  _ebUploadedUrl = null;
  const preview = document.getElementById('ebUploadPreview');
  if (preview) preview.style.display = 'none';
}

function ebInitPaste() {
  document.addEventListener('paste', function _ebPaste(e) {
    if (currentPage !== 'embedbuilder') { document.removeEventListener('paste', _ebPaste); return; }
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        e.preventDefault();
        ebHandleFile(item.getAsFile());
        return;
      }
    }
  });
}

function ebMentionCheck(textarea) {
  const dropdown = document.getElementById('ebMentionDropdown');
  const val = textarea.value;
  const cursor = textarea.selectionStart;
  const before = val.slice(0, cursor);
  const atMatch = before.match(/@(\w*)$/);
  if (!atMatch || !_ebMembers.length) { if (dropdown) dropdown.style.display = 'none'; return; }
  const query = atMatch[1].toLowerCase();
  const matches = _ebMembers.filter(m => {
    const name = (m.nick || m.user?.global_name || m.user?.username || '').toLowerCase();
    return name.includes(query) && !m.user?.bot;
  }).slice(0, 8);
  if (!matches.length) { dropdown.style.display = 'none'; return; }
  dropdown.style.display = 'block';
  dropdown.innerHTML = matches.map(m => {
    const name = m.nick || m.user?.global_name || m.user?.username || '?';
    const tag = m.user?.username || '';
    const av = m.user?.avatar ? getUserAvatar(m.user.id, m.user.avatar, 32) : null;
    return `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;cursor:pointer;transition:background .1s;font-size:12px" onmousedown="ebMentionInsert('${m.user.id}','${esc(name).replace(/'/g,"\\'")}')">
      ${av ? `<img src="${av}" style="width:22px;height:22px;border-radius:50%">` : '<div style="width:22px;height:22px;border-radius:50%;background:var(--bg2)"></div>'}
      <span style="color:var(--bright);font-weight:600">${esc(name)}</span>
      <span style="color:var(--muted);font-size:10px">${esc(tag)}</span>
    </div>`;
  }).join('');
}

function ebMentionInsert(userId, displayName) {
  const textarea = document.getElementById('ebDesc');
  const dropdown = document.getElementById('ebMentionDropdown');
  const cursor = textarea.selectionStart;
  const before = textarea.value.slice(0, cursor);
  const after = textarea.value.slice(cursor);
  const newBefore = before.replace(/@\w*$/, `<@${userId}> `);
  textarea.value = newBefore + after;
  textarea.selectionStart = textarea.selectionEnd = newBefore.length;
  dropdown.style.display = 'none';
  textarea.focus();
  ebUpdatePreview();
}

async function ebGuildChanged() {
  const guildId = document.getElementById('ebGuild')?.value;
  const sel = document.getElementById('ebChannel');
  if (!guildId || !sel) return;
  sel.innerHTML = '<option value="">Chargement...</option>';
  const [channels, members] = await Promise.all([
    discordGet(`/guilds/${guildId}/channels`),
    discordGet(`/guilds/${guildId}/members?limit=1000`),
  ]);
  const text = Array.isArray(channels) ? channels.filter(c => c.type === 0).sort((a, b) => a.position - b.position) : [];
  sel.innerHTML = '<option value="">Channel</option>' + text.map(c => `<option value="${c.id}">#${esc(c.name)}</option>`).join('');
  _ebMembers = Array.isArray(members) ? members : [];
}

let _ebFieldCount = 0;
function ebAddField() {
  const container = document.getElementById('ebFields');
  if (!container) return;
  const idx = _ebFieldCount++;
  const div = document.createElement('div');
  div.style.cssText = 'display:grid;grid-template-columns:1fr 1fr auto;gap:6px;margin-bottom:6px;align-items:start';
  div.innerHTML = `<input type="text" placeholder="Nom" class="eb-field-name" oninput="ebUpdatePreview()"><input type="text" placeholder="Valeur" class="eb-field-value" oninput="ebUpdatePreview()"><button onclick="this.parentElement.remove();ebUpdatePreview()" style="background:none;border:none;color:var(--red);cursor:pointer;font-size:16px;padding:6px">×</button>`;
  container.appendChild(div);
}

function ebGetData() {
  const color = document.getElementById('ebColor')?.value || '#3b82f6';
  const data = {
    title: document.getElementById('ebTitle')?.value || '',
    description: document.getElementById('ebDesc')?.value || '',
    color: parseInt(color.replace('#', ''), 16),
  };
  const author = document.getElementById('ebAuthor')?.value;
  if (author) data.author = { name: author };
  const footer = document.getElementById('ebFooter')?.value;
  if (footer) data.footer = { text: footer };
  const image = document.getElementById('ebImage')?.value;
  if (image) data.image = { url: image };
  const thumb = document.getElementById('ebThumbnail')?.value;
  if (thumb) data.thumbnail = { url: thumb };
  const video = document.getElementById('ebVideo')?.value;
  if (video) data.video = { url: video };
  const fields = [];
  document.querySelectorAll('#ebFields > div').forEach(row => {
    const name = row.querySelector('.eb-field-name')?.value;
    const value = row.querySelector('.eb-field-value')?.value;
    if (name && value) fields.push({ name, value, inline: true });
  });
  if (fields.length) data.fields = fields;
  return data;
}

function ebUpdatePreview() {
  const d = ebGetData();
  const el = document.getElementById('ebPreview');
  if (!el) return;
  const color = document.getElementById('ebColor')?.value || '#3b82f6';
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`(.+?)`/g, '<code style="background:#202225;padding:2px 4px;border-radius:3px;font-size:11px">$1</code>').replace(/&lt;@(\d+)&gt;/g, (_, id) => {
    const m = _ebMembers.find(m => m.user?.id === id);
    const name = m ? (m.nick || m.user?.global_name || m.user?.username) : id;
    return `<span style="background:rgba(88,101,242,.3);color:#dee0fc;padding:0 2px;border-radius:3px;font-weight:500">@${esc(name)}</span>`;
  }).replace(/\n/g, '<br>');
  el.innerHTML = `
    <div style="display:flex">
      <div style="width:4px;background:${color};border-radius:4px 0 0 4px;flex-shrink:0"></div>
      <div style="padding:12px 14px;flex:1;min-width:0">
        ${d.author ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px"><span style="font-size:11px;color:#dcddde;font-weight:600">${esc(d.author.name)}</span></div>` : ''}
        ${d.title ? `<div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px">${esc(d.title)}</div>` : ''}
        ${d.description ? `<div style="font-size:13px;color:#dcddde;line-height:1.5;margin-bottom:8px">${md(d.description)}</div>` : ''}
        ${d.fields ? `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px">${d.fields.map(f => `<div><div style="font-size:11px;font-weight:700;color:#fff">${esc(f.name)}</div><div style="font-size:12px;color:#dcddde">${esc(f.value)}</div></div>`).join('')}</div>` : ''}
        ${d.image ? `<img src="${esc(d.image.url)}" style="max-width:100%;border-radius:4px;margin-top:4px" onerror="this.style.display='none'">` : ''}
        ${d.video ? (() => {
          const ytMatch = d.video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
          return ytMatch ? `<div style="margin-top:8px;border-radius:4px;overflow:hidden"><iframe width="100%" height="200" src="https://www.youtube.com/embed/${ytMatch[1]}" frameborder="0" allowfullscreen style="border-radius:4px"></iframe></div>` : `<a href="${esc(d.video.url)}" style="color:#00aff4;font-size:12px;margin-top:4px;display:block">🎬 ${esc(d.video.url)}</a>`;
        })() : ''}
        ${d.footer ? `<div style="font-size:10px;color:#72767d;margin-top:8px">${esc(d.footer.text)}</div>` : ''}
      </div>
      ${d.thumbnail ? `<img src="${esc(d.thumbnail.url)}" style="width:60px;height:60px;border-radius:4px;margin:12px 12px 0 0;object-fit:cover" onerror="this.style.display='none'">` : ''}
    </div>`;
}

async function ebSend() {
  const channelId = document.getElementById('ebChannel')?.value;
  const status = document.getElementById('ebStatus');
  if (!channelId) { if (status) { status.textContent = currentLang === 'fr' ? 'Selectionne un serveur et un channel' : 'Select a server and channel'; status.style.color = 'var(--red)'; } return; }
  const embed = ebGetData();
  if (!embed.title && !embed.description) { if (status) { status.textContent = currentLang === 'fr' ? 'Ajoute au moins un titre ou une description' : 'Add at least a title or description'; status.style.color = 'var(--red)'; } return; }
  if (status) { status.textContent = currentLang === 'fr' ? 'Envoi...' : 'Sending...'; status.style.color = 'var(--accent)'; }
  const payload = { embeds: [embed] };
  const desc = embed.description || '';
  const mentions = desc.match(/<@\d+>/g);
  if (mentions) payload.content = mentions.join(' ');
  if (embed.video) { payload.content = (payload.content ? payload.content + '\n' : '') + embed.video.url; delete embed.video; }
  const res = await discordPost(`/channels/${channelId}/messages`, payload);
  if (res.error) { if (status) { status.textContent = `Erreur: ${res.error}`; status.style.color = 'var(--red)'; } }
  else { if (status) { status.textContent = currentLang === 'fr' ? 'Embed envoye !' : 'Embed sent!'; status.style.color = 'var(--green)'; } }
}

function ebSaveTemplate() {
  const data = ebGetData();
  const name = prompt(currentLang === 'fr' ? 'Nom du template:' : 'Template name:');
  if (!name) return;
  data.name = name;
  data._color_hex = document.getElementById('ebColor')?.value || '#3b82f6';
  _embedTemplates.push(data);
  localStorage.setItem('silverapp_embed_templates', JSON.stringify(_embedTemplates));
  showNotif('Template', currentLang === 'fr' ? 'Template sauvegarde !' : 'Template saved!');
}

function ebLoadTemplate(idx) {
  const t = _embedTemplates[idx];
  if (!t) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
  set('ebTitle', t.title);
  set('ebDesc', t.description);
  set('ebColor', t._color_hex || '#3b82f6');
  set('ebAuthor', t.author?.name);
  set('ebFooter', t.footer?.text);
  set('ebImage', t.image?.url);
  set('ebThumbnail', t.thumbnail?.url);
  const container = document.getElementById('ebFields');
  if (container) container.innerHTML = '';
  _ebFieldCount = 0;
  (t.fields || []).forEach(f => {
    ebAddField();
    const rows = container.querySelectorAll(':scope > div');
    const last = rows[rows.length - 1];
    if (last) { last.querySelector('.eb-field-name').value = f.name; last.querySelector('.eb-field-value').value = f.value; }
  });
  ebUpdatePreview();
}

// ═══ HEATMAP ACTIVITE ════════════════════════════════════════════════════

async function loadHeatmap(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Heatmap</h2><p>${currentLang === 'fr' ? 'Activite quotidienne sur 90 jours' : 'Daily activity over 90 days'}</p></div>
    <div id="heatmapContent"><div class="loading"><div class="spinner"></div></div></div>`;

  const [chatData, bugData, taskData] = await Promise.all([
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_chat WHERE created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY) GROUP BY d"),
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_bugs WHERE created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY) GROUP BY d"),
    dbQuery("SELECT DATE(created_at) as d, COUNT(*) as c FROM tester_tasks WHERE created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY) GROUP BY d"),
  ]);

  const activityMap = {};
  [chatData, bugData, taskData].forEach(rows => {
    (Array.isArray(rows) && !rows[0]?.error ? rows : []).forEach(r => {
      const key = String(r.d).slice(0, 10);
      activityMap[key] = (activityMap[key] || 0) + Number(r.c);
    });
  });

  const days = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  const maxVal = Math.max(1, ...Object.values(activityMap));
  const getColor = (count) => {
    if (!count) return 'var(--border)';
    const intensity = Math.min(count / maxVal, 1);
    if (intensity < 0.25) return '#0e4429';
    if (intensity < 0.5) return '#006d32';
    if (intensity < 0.75) return '#26a641';
    return '#39d353';
  };

  const weekdays = currentLang === 'fr' ? ['Lun','','Mer','','Ven','','Dim'] : ['Mon','','Wed','','Fri','','Sun'];
  const weeks = Math.ceil(days.length / 7);

  let totalActivity = Object.values(activityMap).reduce((a, b) => a + b, 0);
  let activeDays = Object.keys(activityMap).length;
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (activityMap[days[i]]) streak++; else break;
  }

  let html = `
    <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">${currentLang === 'fr' ? 'Total actions' : 'Total actions'}</div><div class="stat-value">${totalActivity}</div></div>
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">${currentLang === 'fr' ? 'Jours actifs' : 'Active days'}</div><div class="stat-value">${activeDays}/90</div></div>
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">${currentLang === 'fr' ? 'Serie actuelle' : 'Current streak'}</div><div class="stat-value">${streak}j</div></div>
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--gold)"></div><div class="stat-label">${currentLang === 'fr' ? 'Moy/jour' : 'Avg/day'}</div><div class="stat-value">${activeDays ? Math.round(totalActivity / activeDays) : 0}</div></div>
    </div>

    <div class="card fade-in" style="padding:20px;overflow-x:auto">
      <div style="display:flex;gap:3px">
        <div style="display:flex;flex-direction:column;gap:3px;margin-right:6px;justify-content:space-between;padding:2px 0">
          ${weekdays.map(d => `<div style="font-size:9px;color:var(--muted);height:13px;line-height:13px">${d}</div>`).join('')}
        </div>
        <div style="display:flex;gap:3px">`;

  let dayIdx = new Date(days[0]).getDay();
  dayIdx = dayIdx === 0 ? 6 : dayIdx - 1;
  let currentWeek = [];
  for (let i = 0; i < dayIdx; i++) currentWeek.push(null);

  days.forEach((d, i) => {
    currentWeek.push(d);
    if (currentWeek.length === 7 || i === days.length - 1) {
      while (currentWeek.length < 7) currentWeek.push(null);
      html += `<div style="display:flex;flex-direction:column;gap:3px">`;
      currentWeek.forEach(day => {
        if (!day) { html += `<div style="width:13px;height:13px"></div>`; return; }
        const count = activityMap[day] || 0;
        html += `<div style="width:13px;height:13px;border-radius:2px;background:${getColor(count)};cursor:default" title="${day}: ${count} action${count !== 1 ? 's' : ''}"></div>`;
      });
      html += `</div>`;
      currentWeek = [];
    }
  });

  html += `</div></div>
      <div style="display:flex;align-items:center;gap:6px;margin-top:12px;justify-content:flex-end">
        <span style="font-size:10px;color:var(--muted)">${currentLang === 'fr' ? 'Moins' : 'Less'}</span>
        <div style="width:13px;height:13px;border-radius:2px;background:var(--border)"></div>
        <div style="width:13px;height:13px;border-radius:2px;background:#0e4429"></div>
        <div style="width:13px;height:13px;border-radius:2px;background:#006d32"></div>
        <div style="width:13px;height:13px;border-radius:2px;background:#26a641"></div>
        <div style="width:13px;height:13px;border-radius:2px;background:#39d353"></div>
        <span style="font-size:10px;color:var(--muted)">${currentLang === 'fr' ? 'Plus' : 'More'}</span>
      </div>
    </div>`;

  document.getElementById('heatmapContent').innerHTML = html;
}

// ═══ FAVORIS ══════════════════════════════════════════════════════════════

let _favorites = JSON.parse(localStorage.getItem('silverapp_favorites') || '[]');

function toggleFavorite(page) {
  const idx = _favorites.indexOf(page);
  if (idx >= 0) _favorites.splice(idx, 1);
  else _favorites.push(page);
  localStorage.setItem('silverapp_favorites', JSON.stringify(_favorites));
  renderFavorites();
}

function renderFavorites() {
  const container = document.getElementById('favoritesBar');
  if (!container) return;
  if (!_favorites.length) { container.style.display = 'none'; return; }
  container.style.display = 'flex';
  container.innerHTML = _favorites.map(p => `<button class="fav-chip" onclick="showPage('${p}')">${t(p)}</button>`).join('');
}

// ═══ RACCOURCIS CLAVIER ══════════════════════════════════════════════════

const _shortcuts = {
  'ctrl+k': () => { const s = document.querySelector('.search-input'); if (s) s.focus(); },
  'ctrl+1': () => showPage('overview'),
  'ctrl+2': () => showPage('analytics'),
  'ctrl+3': () => showPage('members'),
  'ctrl+4': () => showPage('control'),
  'ctrl+5': () => showPage('chat'),
  'ctrl+6': () => showPage('settings'),
  'ctrl+b': () => showPage('bugs'),
  'ctrl+shift+c': () => showPage('console'),
  'ctrl+shift+e': () => showPage('embedbuilder'),
  'escape': () => {
    const modal = document.querySelector('.server-modal-overlay');
    if (modal) modal.remove();
    const memberModal = document.getElementById('memberProfileModal');
    if (memberModal) memberModal.remove();
    const shortcutModal = document.getElementById('shortcutsModal');
    if (shortcutModal) shortcutModal.remove();
  },
  'shift+?': () => showShortcutsHelp(),
};

document.addEventListener('keydown', e => {
  const tag = e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
    if (e.key === 'Escape') e.target.blur();
    return;
  }
  let key = '';
  if (e.ctrlKey) key += 'ctrl+';
  if (e.shiftKey) key += 'shift+';
  key += e.key.toLowerCase();
  const handler = _shortcuts[key];
  if (handler) { e.preventDefault(); handler(); }
});

function showShortcutsHelp() {
  if (document.getElementById('shortcutsModal')) { document.getElementById('shortcutsModal').remove(); return; }
  const pairs = [
    ['Ctrl+K', currentLang === 'fr' ? 'Recherche' : 'Search'],
    ['Ctrl+1-6', currentLang === 'fr' ? 'Navigation rapide' : 'Quick navigation'],
    ['Ctrl+B', 'Bugs'],
    ['Ctrl+Shift+C', 'Console'],
    ['Ctrl+Shift+E', 'Embed Builder'],
    ['Escape', currentLang === 'fr' ? 'Fermer modal' : 'Close modal'],
    ['Shift+?', currentLang === 'fr' ? 'Aide raccourcis' : 'Shortcuts help'],
  ];
  const modal = document.createElement('div');
  modal.id = 'shortcutsModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `<div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;width:380px;animation:fadeIn .2s ease">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h3 style="color:var(--bright);font-size:15px;margin:0">${t('shortcuts')}</h3>
      <button onclick="this.closest('#shortcutsModal').remove()" style="background:none;border:none;color:var(--dim);font-size:18px;cursor:pointer">×</button>
    </div>
    ${pairs.map(([k, v]) => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)">
      <kbd style="background:var(--bg2);padding:3px 8px;border-radius:4px;font-size:11px;font-family:monospace;color:var(--bright);border:1px solid var(--border)">${k}</kbd>
      <span style="font-size:12px;color:var(--text)">${v}</span>
    </div>`).join('')}
  </div>`;
  document.body.appendChild(modal);
}

// ═══ PROFIL MEMBRE MODAL ════════════════════════════════════════════════

async function showMemberProfile(userId, guildId) {
  if (document.getElementById('memberProfileModal')) document.getElementById('memberProfileModal').remove();
  const modal = document.createElement('div');
  modal.id = 'memberProfileModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center';
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  modal.innerHTML = `<div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:24px;width:420px;animation:fadeIn .2s ease"><div class="loading"><div class="spinner"></div></div></div>`;
  document.body.appendChild(modal);

  const [member, xpData] = await Promise.all([
    guildId ? discordGet(`/guilds/${guildId}/members/${userId}`) : discordGet(`/users/${userId}`),
    dbQuery(`SELECT COALESCE(SUM(xp),0) as xp, COALESCE(SUM(messages_count),0) as msgs, COALESCE(MAX(level),0) as lvl FROM user_xp WHERE CAST(user_id AS CHAR) = '${userId}'`),
  ]);

  const user = member?.user || member;
  if (!user || user.error) { modal.querySelector('div > div').innerHTML = `<p style="color:var(--red)">Membre introuvable</p>`; return; }

  const avatar = getUserAvatar(user.id, user.avatar, 128);
  const xp = xpData?.[0] || {};
  const nick = member?.nick || user.global_name || user.username;
  const roles = member?.roles || [];
  const joinedAt = member?.joined_at ? new Date(member.joined_at).toLocaleDateString('fr-FR') : '—';
  const created = new Date(Number((BigInt(user.id) >> 22n) + 1420070400000n)).toLocaleDateString('fr-FR');

  modal.querySelector('div > div').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:14px">
        <img src="${avatar}" style="width:64px;height:64px;border-radius:50%;border:3px solid var(--accent)">
        <div>
          <div style="font-size:16px;font-weight:700;color:var(--bright)">${esc(nick)}</div>
          <div style="font-size:12px;color:var(--dim)">${esc(user.username)}${user.discriminator && user.discriminator !== '0' ? '#' + user.discriminator : ''}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">${user.id}</div>
        </div>
      </div>
      <button onclick="this.closest('#memberProfileModal').remove()" style="background:none;border:none;color:var(--dim);font-size:20px;cursor:pointer">×</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px">
      <div class="card" style="padding:10px;text-align:center"><div style="font-size:9px;color:var(--muted)">XP</div><div style="font-size:16px;font-weight:700;color:var(--purple)">${(xp.xp || 0).toLocaleString()}</div></div>
      <div class="card" style="padding:10px;text-align:center"><div style="font-size:9px;color:var(--muted)">Messages</div><div style="font-size:16px;font-weight:700;color:var(--blue)">${(xp.msgs || 0).toLocaleString()}</div></div>
      <div class="card" style="padding:10px;text-align:center"><div style="font-size:9px;color:var(--muted)">Niveau</div><div style="font-size:16px;font-weight:700;color:var(--gold)">${xp.lvl || 0}</div></div>
      <div class="card" style="padding:10px;text-align:center"><div style="font-size:9px;color:var(--muted)">Roles</div><div style="font-size:16px;font-weight:700;color:var(--green)">${roles.length}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:11px">
      <div><span style="color:var(--muted)">${currentLang === 'fr' ? 'Rejoint le' : 'Joined'}</span> <span style="color:var(--bright)">${joinedAt}</span></div>
      <div><span style="color:var(--muted)">${currentLang === 'fr' ? 'Cree le' : 'Created'}</span> <span style="color:var(--bright)">${created}</span></div>
    </div>`;
}

// ═══ EXPORT CSV ══════════════════════════════════════════════════════════

function exportTableAsCSV(tableEl, filename) {
  if (!tableEl) return;
  const rows = [];
  tableEl.querySelectorAll('tr').forEach(tr => {
    const cols = [];
    tr.querySelectorAll('th, td').forEach(td => cols.push('"' + td.textContent.replace(/"/g, '""').trim() + '"'));
    rows.push(cols.join(','));
  });
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename || 'export.csv';
  a.click(); URL.revokeObjectURL(url);
  showNotif('Export', currentLang === 'fr' ? 'CSV exporte !' : 'CSV exported!');
}

function addCSVExportButton(containerId, filename) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const table = container.querySelector('table');
  if (!table) return;
  const btn = document.createElement('button');
  btn.className = 'btn btn-secondary';
  btn.style.cssText = 'font-size:10px;padding:4px 10px;margin-top:8px';
  btn.textContent = t('exportCsv');
  btn.onclick = () => exportTableAsCSV(table, filename);
  container.appendChild(btn);
}

// ═══ QUICK ACTIONS (FAB) ════════════════════════════════════════════════

function initQuickActions() {
  if (document.getElementById('fabMenu')) return;
  const fab = document.createElement('div');
  fab.id = 'fabMenu';
  fab.innerHTML = `
    <div id="fabItems" style="display:none;position:absolute;bottom:60px;right:0;background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:6px;box-shadow:0 8px 32px rgba(0,0,0,.4);min-width:180px">
      <div class="fab-item" onclick="showPage('control');fabToggle()">⚡ ${currentLang === 'fr' ? 'Envoyer un message' : 'Send message'}</div>
      <div class="fab-item" onclick="showPage('embedbuilder');fabToggle()">🎨 ${t('embedBuilder')}</div>
      <div class="fab-item" onclick="showPage('bugs');fabToggle()">🐛 ${currentLang === 'fr' ? 'Voir les bugs' : 'View bugs'}</div>
      <div class="fab-item" onclick="showPage('analytics');fabToggle()">📊 ${t('analytics')}</div>
      <div class="fab-item" onclick="showPage('console');fabToggle()">🖥 ${t('console')}</div>
      <div class="fab-item" onclick="showShortcutsHelp();fabToggle()">⌨ ${t('shortcuts')}</div>
    </div>
    <button id="fabBtn" onclick="fabToggle()" style="width:32px;height:32px;border-radius:50%;background:var(--border-light);border:none;color:var(--dim);font-size:14px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.2);transition:all .2s;display:flex;align-items:center;justify-content:center;opacity:.5" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='.5'">+</button>`;
  fab.style.cssText = 'position:fixed;bottom:36px;right:14px;z-index:100';
  document.body.appendChild(fab);
}

function fabToggle() {
  const items = document.getElementById('fabItems');
  const btn = document.getElementById('fabBtn');
  if (!items) return;
  const open = items.style.display !== 'none';
  items.style.display = open ? 'none' : 'block';
  if (btn) { btn.style.transform = open ? '' : 'rotate(45deg)'; btn.style.background = open ? 'var(--accent)' : 'var(--red)'; }
}

setTimeout(initQuickActions, 500);

// ═══ SERVEURS ══════════════════════════════════════════════════════════════

async function loadServerList(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>${t('serverlist')}</h2><p>${currentLang === 'fr' ? 'Tous les serveurs du bot avec liens d\'invitation' : 'All bot servers with invite links'}</p></div>
    <div id="serverListContent"><div class="skeleton-grid">${'<div class="skeleton-card"></div>'.repeat(4)}</div></div>`;

  const guilds = await getCachedGuilds();
  if (!guilds.length) {
    document.getElementById('serverListContent').innerHTML = '<div class="coming-soon"><div class="icon">🌐</div><p>Aucun serveur</p></div>';
    return;
  }

  const details = await Promise.all(guilds.map(g => discordGet(`/guilds/${g.id}?with_counts=true`)));

  const container = document.getElementById('serverListContent');
  container.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px" id="serverCards"></div>`;
  const grid = document.getElementById('serverCards');

  for (let i = 0; i < guilds.length; i++) {
    const g = guilds[i];
    const d = details[i] || {};
    const icon = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=64` : '';
    const members = d.approximate_member_count || '?';
    const online = d.approximate_presence_count || '?';
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.style.cssText = 'padding:16px;display:flex;flex-direction:column;gap:12px';
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:48px;height:48px;border-radius:12px;background:var(--card-hover);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden">
          ${icon ? `<img src="${icon}" width="48" height="48" style="border-radius:12px">` : `<span style="font-size:18px;font-weight:700;color:var(--bright)">${esc(g.name.charAt(0))}</span>`}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;color:var(--bright);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(g.name)}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">
            <span style="color:var(--green)">● ${online}</span> en ligne · ${members} membres
          </div>
        </div>
        ${g.owner ? '<span style="font-size:9px;padding:2px 6px;border-radius:4px;background:var(--gold);color:#000;font-weight:600">OWNER</span>' : ''}
      </div>
      <div style="display:flex;gap:8px;align-items:center" id="invite-${g.id}">
        <div class="spinner" style="width:14px;height:14px;border-width:2px"></div>
        <span style="font-size:11px;color:var(--muted)">${currentLang === 'fr' ? 'Generation du lien...' : 'Generating link...'}</span>
      </div>`;
    grid.appendChild(card);

    // Fetch invite async per server
    (async (guildId) => {
      const inviteEl = document.getElementById(`invite-${guildId}`);
      try {
        const channels = await discordGet(`/guilds/${guildId}/channels`);
        const textChannels = Array.isArray(channels) ? channels.filter(c => c.type === 0) : [];
        if (!textChannels.length) {
          inviteEl.innerHTML = `<span style="font-size:11px;color:var(--red)">${currentLang === 'fr' ? 'Aucun channel texte' : 'No text channel'}</span>`;
          return;
        }
        const invites = await discordGet(`/guilds/${guildId}/invites`);
        const permanent = Array.isArray(invites) ? invites.find(inv => inv.max_age === 0) : null;
        let inviteCode;
        if (permanent) {
          inviteCode = permanent.code;
        } else {
          const created = await discordPost(`/channels/${textChannels[0].id}/invites`, { max_age: 0, max_uses: 0, unique: false });
          inviteCode = created?.code;
        }
        if (inviteCode) {
          const link = `https://discord.gg/${inviteCode}`;
          inviteEl.innerHTML = `
            <input type="text" value="${link}" readonly style="flex:1;background:var(--card-hover);border:1px solid var(--border);color:var(--text);font-size:11px;padding:6px 10px;border-radius:6px;outline:none;font-family:monospace">
            <button onclick="navigator.clipboard.writeText('${link}');this.textContent='✓';setTimeout(()=>this.textContent='${currentLang === 'fr' ? 'Copier' : 'Copy'}',1500)" style="background:var(--blue);color:#fff;border:none;padding:6px 12px;border-radius:6px;font-size:11px;cursor:pointer;white-space:nowrap;font-weight:500">${currentLang === 'fr' ? 'Copier' : 'Copy'}</button>
            <button onclick="silver.openExternal('${link}')" style="background:var(--green);color:#fff;border:none;padding:6px 12px;border-radius:6px;font-size:11px;cursor:pointer;white-space:nowrap;font-weight:500">${currentLang === 'fr' ? 'Rejoindre' : 'Join'}</button>`;
        } else {
          inviteEl.innerHTML = `<span style="font-size:11px;color:var(--red)">${currentLang === 'fr' ? 'Impossible de creer l\'invite' : 'Cannot create invite'}</span>`;
        }
      } catch {
        inviteEl.innerHTML = `<span style="font-size:11px;color:var(--red)">Erreur</span>`;
      }
    })(g.id);
  }
}

// ═══ UPDATE SYSTEM ═════════════════════════════════════════════════════════

const APP_VERSION = '2.3.1';
let _updateInfo = null;
let _updateChecked = false;

async function checkForUpdate() {
  try {
    const res = await fetch('https://api.github.com/repos/Tib688/SilverApp/releases/latest', { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    if (!data.tag_name) return;
    const latest = data.tag_name.replace(/^v/i, '');
    _updateInfo = {
      version: latest,
      name: data.name || `v${latest}`,
      body: data.body || '',
      url: data.html_url,
      download: data.assets?.length ? data.assets[0].browser_download_url : data.html_url,
      date: data.published_at ? new Date(data.published_at).toLocaleDateString('fr-FR') : '',
      isNew: latest !== APP_VERSION,
    };
    _updateChecked = true;
    updateBadge();
  } catch { _updateChecked = true; }
}

function updateBadge() {
  const badge = document.getElementById('updateBadge');
  if (badge && _updateInfo?.isNew) {
    badge.style.display = 'inline-block';
  }
  if (_updateInfo?.isNew) {
    showNotif(t('newUpdate'), `Silver App ${_updateInfo.name}`);
    showDesktopNotif('Silver App', `${t('newUpdate')}: ${_updateInfo.name}`);
  }
}

function loadUpdate(el) {
  const v = _updateInfo;
  const hasUpdate = v && v.isNew;
  el.innerHTML = `
    <div class="page-header fade-in"><h2>${t('update')}</h2><p>Silver App ${APP_VERSION}</p></div>

    <!-- Update status card -->
    <div class="card fade-in" style="padding:24px;margin-bottom:16px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${hasUpdate ? 'rgba(160,144,208,.4)' : 'rgba(48,208,96,.3)'},transparent);"></div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="width:48px;height:48px;border-radius:14px;background:${hasUpdate ? 'rgba(160,144,208,.08)' : 'rgba(48,208,96,.06)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:22px">${hasUpdate ? '⬆' : '✓'}</span>
        </div>
        <div style="flex:1">
          <div style="font-size:16px;font-weight:500;background:var(--chrome-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${hasUpdate ? t('newUpdate') : t('upToDate')}</div>
          <div style="font-size:12px;color:#555568;margin-top:4px">
            ${hasUpdate ? `Version actuelle: <span style="color:#707088">${APP_VERSION}</span> → Derniere: <span style="color:#a090d0">${v.version}</span>` : `Version <span style="color:#30d060">${APP_VERSION}</span> — vous etes a jour`}
          </div>
          ${v?.date ? `<div style="font-size:10px;color:#404058;margin-top:2px">${v.date}</div>` : ''}
        </div>
        ${hasUpdate ? `<button class="btn btn-primary" style="padding:10px 24px;font-size:13px" onclick="silver.openExternal('${v.download}')">Telecharger ${v.name}</button>` : ''}
      </div>
    </div>

    ${hasUpdate && v.body ? `
    <div class="card fade-in" style="padding:20px;margin-bottom:16px">
      <div style="font-size:12px;font-weight:500;color:#707088;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px">Notes de mise a jour</div>
      <div style="font-size:12px;color:#9090a8;line-height:1.8;white-space:pre-wrap">${esc(v.body)}</div>
    </div>` : ''}

    <div style="font-size:12px;font-weight:500;color:#555568;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px">Changelog</div>
    <div id="updateChangelogContent"></div>`;

  loadChangelogInto(document.getElementById('updateChangelogContent'));
}

// ═══ CHANGELOG ══════════════════════════════════════════════════════════════

function loadChangelog(el) { loadChangelogInto(el); }

function loadChangelogInto(el) {
  const logs = [
    { version: 'v2.3', date: '29/06/2026', tag: 'Majeur', color: 'var(--purple)', sections: [
      { title: '🪞 Liquid Chrome Design', items: [
        'Nouveau theme visuel Liquid Chrome — noir profond + argent metallique',
        'Textes en degrade chrome sur les titres, chiffres et noms',
        'Lignes lumineuses en haut des stat cards (reflets metalliques)',
        'Bordures ultra-subtiles (.5px) avec inset shine',
        'Pills Serveurs/Testeurs/Bugs en chrome unifie',
        'Sidebar avec logo metallique et nav items chromes',
        'Coins arrondis 16-18px, espacement genereux',
      ]},
    ]},
    { version: 'v2.2.6', date: '29/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '📝 Changelog complet avec mises a jour mineures et pre-2.0',
      '📋 Bouton copier sur chaque entree du changelog',
      '👥 Affichage membres et en ligne par serveur dans Overview',
      '🔄 Mise a jour des numeros de version partout dans l\'app',
    ]},
    { version: 'v2.2.5', date: '29/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '🔍 Comptage exact des messages via API search Discord',
      '♾️ Plus aucune limite — meme 1 million de messages sont comptes',
    ]},
    { version: 'v2.2.4', date: '29/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '📊 Pagination complete des messages Discord',
      '⏳ Indicateur de progression pendant le comptage',
      '🔢 Nombres formates avec separateurs (5 447 au lieu de 5447)',
    ]},
    { version: 'v2.2.3', date: '29/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '👻 Serveurs quittes masques des stats (donnees conservees en DB)',
      '🔄 Si le bot revient sur un serveur, ses stats reapparaissent',
    ]},
    { version: 'v2.2.2', date: '29/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '🔗 Fix matching guild_id — plus d\'IDs bruts a la place des noms',
      '📈 Source unique user_xp pour XP et messages (donnees fiables)',
      '🧮 Moyennes calculees sur les utilisateurs actifs',
    ]},
    { version: 'v2.2.1', date: '29/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '✨ FAB (bouton +) plus petit et discret',
      '🏗️ Build script avec version dans le nom du setup',
      '📁 Nouveau systeme de dossiers App/latest/versions/',
    ]},
    { version: 'v2.2', date: '29/06/2026', tag: 'Majeur', color: 'var(--purple)', sections: [
      { title: '📊 Analytics & Heatmap', items: [
        'Graphiques Chart.js (activite, bugs, XP, testeurs, croissance)',
        'Heatmap d\'activite style GitHub sur 90 jours',
        'Serie actuelle, jours actifs, moyenne par jour',
        'Doughnut chart des top testeurs',
      ]},
      { title: '🎨 Embed Builder', items: [
        'Editeur visuel d\'embeds Discord avec preview live',
        '@mention autocomplete dans la description',
        'Drag & drop / coller images + URL video YouTube',
        'Systeme de templates sauvegardables',
      ]},
      { title: '🤖 Bot Profil', items: [
        'Changer le nom et l\'avatar du bot depuis l\'app',
        'Editeur de statuts rotatifs (texte, type, intervalle)',
        'Preview live du statut en temps reel',
      ]},
      { title: '🖥️ Console', items: [
        'Terminal integre avec logs du bot en direct',
        'Filtres par niveau + recherche + auto-refresh',
      ]},
      { title: '🔔 Notifications Desktop', items: [
        'Notifications natives Windows/macOS',
        'Alertes bugs, messages, suggestions en temps reel',
      ]},
      { title: '💾 Backup & Restore', items: [
        'Export/import complet en JSON',
      ]},
      { title: '⚡ UI & Experience', items: [
        'Mode compact, Quick Actions (FAB), raccourcis clavier',
        'Profil membre en modal, export CSV, page Serveurs',
      ]},
    ]},
    { version: 'v2.1', date: '23/06/2026', tag: 'Majeur', color: 'var(--green)', sections: [
      { title: '🎨 Interface', items: [
        'Page Home avec branding Silver Bot + lien Discord',
        'Sidebar retractable (mode icones)',
        'Transitions, skeleton loading, parallax 3D, confetti',
        'Breadcrumbs, tableaux triables, bordures gradient',
      ]},
      { title: '🚀 Fonctionnalites', items: [
        'Multi-langue FR/EN',
        'Stats par channel, @mention autocomplete',
        'Bouton deconnexion Owner + Testeur',
      ]},
      { title: '👥 Dashboard Testeur', items: [
        'Pages Home + Overview testeur',
        'Chat et DM repares, Test Lab',
      ]},
      { title: '🖥️ Technique', items: [
        'Support macOS, installeur NSIS, fix BigInt',
      ]},
    ]},
    { version: 'v2.0', date: '21/06/2026', tag: 'Majeur', color: 'var(--blue)', sections: [
      { title: '⚡ Core', items: [
        'Migration complete vers Electron + FastAPI',
        'Dashboard Owner + Testeur sur Nowheberg',
      ]},
      { title: '📋 Modules', items: [
        'Chat testeurs, Test Lab, Bugs, Taches, Annonces',
        'Leaderboard, Suggestions, Bot Info, Controle Bot',
        'Comparateur de membres, Statistiques avancees',
      ]},
      { title: '🎨 Design', items: [
        'Themes couleur, Liquid Glass, recherche Ctrl+K',
        'Mode maintenance, session tracker',
      ]},
    ]},
    { version: 'v1.2', date: '15/06/2026', tag: 'Majeur', color: 'var(--gold)', sections: [
      { title: '🚀 Fonctionnalites', items: [
        'Dashboard web Flask avec login par token',
        'Vue des serveurs et membres du bot',
        'Statistiques basiques (XP, messages)',
        'Envoi de messages via le bot',
      ]},
    ]},
    { version: 'v1.1', date: '05/06/2026', tag: '🔧 Patch', color: 'var(--cyan)', items: [
      '🎨 Amelioration de l\'interface web',
      '⚠️ Ajout des warns et moderation basique',
      '🐛 Correction de bugs de connexion',
    ]},
    { version: 'v1.0', date: '28/05/2026', tag: 'Initial', color: 'var(--accent)', sections: [
      { title: '🎉 Premiere version', items: [
        'Silver Bot cree avec discord.py',
        'Systeme d\'XP et de niveaux',
        'Commandes de moderation (ban, kick, warn)',
        'Dashboard web basique (Flask)',
        'Base de donnees MySQL',
      ]},
    ]},
  ];

  const _clTexts = logs.map(log => {
    let txt = `${log.version} — ${log.date} (${log.tag})\n`;
    if (log.items) log.items.forEach(i => txt += `  - ${i}\n`);
    if (log.sections) log.sections.forEach(s => { txt += `  ${s.title}\n`; s.items.forEach(i => txt += `    - ${i}\n`); });
    return txt;
  });
  window._clTexts = _clTexts;

  el.innerHTML = `<div class="page-header fade-in"><h2>Changelog</h2><p>Historique des mises a jour</p></div>` +
    logs.map((log, idx) => `
      <div class="card fade-in" style="margin-bottom:${log.sections ? 16 : 10}px;padding:${log.sections ? 20 : 14}px;position:relative">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:${log.sections ? 14 : 8}px">
          <span class="badge" style="font-size:${log.sections ? 13 : 11}px;padding:${log.sections ? '5px 14px' : '3px 10px'};background:${log.color};color:#fff;font-weight:600;border-radius:6px">${log.version}</span>
          <span style="font-size:10px;padding:3px 8px;border-radius:4px;background:${log.color}22;color:${log.color};font-weight:500">${log.tag}</span>
          <span style="font-size:11px;color:var(--muted);margin-left:auto">${log.date}</span>
        </div>
        ${log.sections ? log.sections.map(s => `
          <div style="margin-bottom:12px">
            <div style="font-size:12px;font-weight:600;color:var(--bright);margin-bottom:6px">${s.title}</div>
            <ul style="margin:0;padding-left:18px;color:var(--text);font-size:12px;line-height:1.9">
              ${s.items.map(c => `<li>${esc(c)}</li>`).join('')}
            </ul>
          </div>`).join('') : `
          <ul style="margin:0;padding-left:18px;color:var(--text);font-size:12px;line-height:1.9">
            ${log.items.map(c => `<li>${esc(c)}</li>`).join('')}
          </ul>`}
        <button onclick="clCopy(${idx},this)" style="position:absolute;bottom:10px;right:12px;background:none;border:none;color:var(--dim);cursor:pointer;padding:4px;border-radius:4px;transition:color .15s;opacity:.5" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='.5'" title="Copier">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
        </button>
      </div>`).join('');
}

function clCopy(idx, btn) {
  const txt = window._clTexts?.[idx];
  if (!txt) return;
  navigator.clipboard.writeText(txt);
  const svg = btn.innerHTML;
  btn.innerHTML = '<span style="font-size:11px">✓</span>';
  setTimeout(() => btn.innerHTML = svg, 1500);
}

// ═══ LOGS ACTIVITE ══════════════════════════════════════════════════════════

async function loadLogs(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Logs</h2><p>Activite recente</p></div>
    <div id="logsContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const [warns, bugs, tasks, announces] = await Promise.all([
    dbQuery("SELECT 'warn' as type, CAST(user_id AS CHAR) as target, reason as detail, created_at FROM warnings ORDER BY created_at DESC LIMIT 10"),
    dbQuery("SELECT 'bug' as type, reporter AS target, title as detail, created_at FROM tester_bugs ORDER BY created_at DESC LIMIT 10"),
    dbQuery("SELECT 'task' as type, assigned_to as target, title as detail, created_at FROM tester_tasks ORDER BY created_at DESC LIMIT 10"),
    dbQuery("SELECT 'announce' as type, author as target, title as detail, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 10"),
  ]);
  const all = [...(warns[0]?.error ? [] : warns), ...(bugs[0]?.error ? [] : bugs), ...(tasks[0]?.error ? [] : tasks), ...(announces[0]?.error ? [] : announces)]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 30);
  if (!all.length) { document.getElementById('logsContent').innerHTML = '<div class="coming-soon"><div class="icon">📋</div><p>Aucun log</p></div>'; return; }

  const icons = { warn: '⚠', bug: '🐛', task: '📋', announce: '📢' };
  const colors = { warn: 'var(--gold)', bug: 'var(--red)', task: 'var(--blue)', announce: 'var(--green)' };
  document.getElementById('logsContent').innerHTML = all.map(r => `
    <div class="card slide-in" style="display:flex;align-items:center;gap:12px;padding:10px 14px;margin-bottom:4px">
      <div style="width:28px;height:28px;border-radius:50%;background:${colors[r.type]};display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;opacity:.8">${icons[r.type]}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;color:var(--bright);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(r.detail || '—')}</div>
        <div style="font-size:9px;color:var(--muted)">${r.type} · ${esc(String(r.target || '').slice(0,20))} · ${fmtDateTime(r.created_at)}</div>
      </div>
    </div>`).join('');
}

// ═══ MODE CLAIR/SOMBRE ══════════════════════════════════════════════════════

function toggleLightMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('silverapp_mode', next);
  const btn = document.getElementById('lightModeBtn');
  if (btn) btn.textContent = next === 'light' ? 'Mode sombre' : 'Mode clair';
}

(function() {
  const saved = localStorage.getItem('silverapp_mode');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  if (localStorage.getItem('silverapp_glass') === 'true') document.documentElement.setAttribute('data-glass', 'true');
})();

function toggleGlass() {
  const current = document.documentElement.getAttribute('data-glass') === 'true';
  document.documentElement.setAttribute('data-glass', !current);
  localStorage.setItem('silverapp_glass', !current);
  const btn = document.getElementById('glassBtn');
  if (btn) btn.textContent = !current ? 'Liquid Glass: ON' : 'Liquid Glass: OFF';
}

// ═══ NOTIFICATIONS ═════════════════════════════════════════════════════════

let _lastBugCount = null;
let _lastMsgCount = null;
let _lastSugCount = null;

function showNotif(title, body) {
  const notif = document.createElement('div');
  notif.className = 'notif-toast slide-in';
  notif.innerHTML = `<div style="font-size:12px;font-weight:700;color:var(--bright)">${esc(title)}</div><div style="font-size:11px;color:var(--dim)">${esc(body)}</div>`;
  document.body.appendChild(notif);
  setTimeout(() => { notif.style.opacity = '0'; setTimeout(() => notif.remove(), 300); }, 4000);
}

async function checkNotifications() {
  try {
    const [bugs, msgs, sugs] = await Promise.all([
      dbScalar("SELECT COUNT(*) FROM tester_bugs WHERE status='open'"),
      dbScalar("SELECT COUNT(*) FROM tester_chat"),
      dbScalar("SELECT COUNT(*) FROM tester_suggestions WHERE status='pending'"),
    ]);
    if (_lastBugCount !== null && bugs > _lastBugCount) { showNotif('Nouveau bug', `${bugs - _lastBugCount} nouveau(x) bug(s) signale(s)`); showDesktopNotif('Silver App — Nouveau bug', `${bugs - _lastBugCount} nouveau(x) bug(s) signale(s)`); }
    if (_lastMsgCount !== null && msgs > _lastMsgCount) { showNotif('Nouveau message', `${msgs - _lastMsgCount} nouveau(x) message(s)`); showDesktopNotif('Silver App — Message', `${msgs - _lastMsgCount} nouveau(x) message(s)`); }
    if (_lastSugCount !== null && sugs > _lastSugCount) { showNotif('Nouvelle suggestion', `${sugs - _lastSugCount} nouvelle(s) suggestion(s)`); showDesktopNotif('Silver App — Suggestion', `${sugs - _lastSugCount} nouvelle(s) suggestion(s)`); }
    _lastBugCount = bugs; _lastMsgCount = msgs; _lastSugCount = sugs;
  } catch {}
}
setInterval(checkNotifications, 15000);
checkNotifications();

// ═══ UPTIME MONITOR ════════════════════════════════════════════════════════

async function loadUptime(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Uptime</h2><p>Disponibilite du bot et du backend</p></div>
    <div id="uptimeContent"><div class="loading"><div class="spinner"></div></div></div>`;
  const checks = [];
  const labels = [];
  for (let i = 0; i < 20; i++) {
    const t = performance.now();
    try {
      await fetch(`${BACKEND}/health`, { signal: AbortSignal.timeout(3000) });
      checks.push(Math.round(performance.now() - t));
      labels.push(`#${i+1}`);
    } catch {
      checks.push(-1);
      labels.push(`#${i+1}`);
    }
  }
  const upCount = checks.filter(c => c > 0).length;
  const avgMs = upCount > 0 ? Math.round(checks.filter(c => c > 0).reduce((a, b) => a + b, 0) / upCount) : 0;
  const uptimePct = Math.round(upCount / checks.length * 100);

  let html = `<div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:16px">
    <div class="card stat-card"><div class="stat-bar" style="background:${uptimePct > 90 ? 'var(--green)' : 'var(--red)'}"></div><div class="stat-label">Uptime</div><div class="stat-value">${uptimePct}%</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">Latence moyenne</div><div class="stat-value">${avgMs}ms</div></div>
    <div class="card stat-card"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Checks</div><div class="stat-value">${upCount}/${checks.length}</div></div>
  </div>`;
  html += sectionHeader('Historique des pings');
  html += '<div class="card" style="padding:16px"><div class="uptime-bar">';
  checks.forEach((c, i) => {
    const color = c < 0 ? 'var(--red)' : c < 200 ? 'var(--green)' : c < 500 ? 'var(--gold)' : 'var(--red)';
    html += `<div class="uptime-block" style="background:${color}" title="${labels[i]}: ${c < 0 ? 'DOWN' : c + 'ms'}"></div>`;
  });
  html += '</div></div>';
  document.getElementById('uptimeContent').innerHTML = html;
}

// ═══ EXPORT PDF ═════════════════════════════════════════════════════════════

function exportCurrentPage() {
  const content = document.getElementById('content');
  if (!content) return;
  const win = window.open('', '_blank');
  win.document.write(`<html><head><title>Silver App Export</title>
    <style>body{font-family:Inter,sans-serif;background:#fff;color:#111;padding:40px}table{width:100%;border-collapse:collapse}th,td{padding:8px 12px;border:1px solid #ddd;text-align:left;font-size:12px}th{background:#f5f5f5;font-weight:700}.badge{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700}.stat-value{font-size:20px;font-weight:800}img{max-width:40px;border-radius:50%}</style>
  </head><body><h1>Silver App — ${esc(currentPage)}</h1><p style="color:#666;font-size:12px">${new Date().toLocaleString('fr-FR')}</p><hr>${content.innerHTML}</body></html>`);
  win.document.close();
  setTimeout(() => { win.print(); }, 500);
}

// ═══ UI ENHANCEMENTS ════════════════════════════════════════════════════════

const pageSections = {
  home: 'Silver Bot', overview: 'secPrincipal', leaderboard: 'secPrincipal', members: 'secPrincipal',
  compare: 'secPrincipal', stats: 'secPrincipal', channels: 'secPrincipal', serverlist: 'secPrincipal',
  analytics: 'secPrincipal', heatmap: 'secPrincipal', control: 'secControle',
  botinfo: 'secControle', botprofile: 'secControle', embedbuilder: 'secControle', uptime: 'secControle', chat: 'secTesteurs',
  bugs: 'secTesteurs', tasks: 'secTesteurs', announcements: 'secTesteurs',
  suggestions: 'secTesteurs', testlab: 'secTesteurs', forgot: 'secTesteurs',
  database: 'secSysteme', logs: 'secSysteme', history: 'secSysteme',
  changelog: 'secSysteme', console: 'secSysteme', update: 'secSysteme', settings: 'secSysteme',
};

function updateBreadcrumbs(name) {
  const sec = document.getElementById('breadcrumbSection');
  const cur = document.getElementById('breadcrumbCurrent');
  const sKey = pageSections[name] || '';
  if (sec) sec.textContent = sKey === 'Silver Bot' ? 'Silver Bot' : t(sKey);
  if (cur) cur.textContent = t(name);
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('collapsed');
  localStorage.setItem('silverapp_sidebar', sb.classList.contains('collapsed'));
}

(function() {
  if (localStorage.getItem('silverapp_sidebar') === 'true') {
    const sb = document.getElementById('sidebar');
    if (sb) sb.classList.add('collapsed');
  }
})();

function renderSkeleton() {
  return `<div style="padding:0">
    <div class="skeleton skeleton-text" style="width:180px;height:20px;margin-bottom:4px"></div>
    <div class="skeleton skeleton-text" style="width:120px;height:12px;margin-bottom:16px"></div>
    <div class="skeleton-grid">${'<div class="skeleton skeleton-card"></div>'.repeat(4)}</div>
    <div class="skeleton-list">${'<div class="skeleton skeleton-row"></div>'.repeat(5)}</div>
  </div>`;
}

function spawnConfetti(x, y) {
  const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#eab308', '#06b6d4', '#f43f5e'];
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = (x + (Math.random() - .5) * 80) + 'px';
    p.style.top = (y + (Math.random() - .5) * 20) + 'px';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (.6 + Math.random() * .5) + 's';
    p.style.animationDelay = (Math.random() * .15) + 's';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

// Parallax 3D on stat cards
document.addEventListener('mousemove', e => {
  const card = e.target.closest('.stat-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - .5;
  const y = (e.clientY - rect.top) / rect.height - .5;
  card.style.transform = `perspective(800px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) scale(1.02)`;
  card.style.transition = 'transform .08s ease';
});
document.addEventListener('mouseout', e => {
  const card = e.target.closest?.('.stat-card');
  if (card && !card.contains(e.relatedTarget)) {
    card.style.transform = '';
    card.style.transition = 'transform .3s ease';
  }
});

function disconnect() {
  localStorage.removeItem(CONFIG_FILE);
  localStorage.removeItem('silverapp_theme');
  localStorage.removeItem('silverapp_mode');
  localStorage.removeItem('silverapp_glass');
  localStorage.removeItem('silverapp_sidebar');
  localStorage.removeItem('silverapp_maintenance');
  silver.navigate('login');
}

// Init
showPage('home');
renderFavorites();
if ('Notification' in window && Notification.permission === 'default' && _desktopNotifs) Notification.requestPermission();
checkForUpdate();
setInterval(checkForUpdate, 1800000);
