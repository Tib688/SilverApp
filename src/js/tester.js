// Clock
setInterval(() => {
  const el = document.getElementById('testerClock');
  if (el) {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.innerHTML = `<span style="color:#707088">${h}</span><span style="color:#404058">:</span><span style="color:#707088">${m}</span><span style="color:#404058">:</span><span style="color:#505068">${s}</span>`;
  }
}, 1000);

// Session info
const tCfg = loadConfig();
const testerId = tCfg.testerDiscordId || '';
const testerCode = tCfg.testerCode || '';
const testerName = tCfg.testerName || 'Testeur';

document.getElementById('testerWelcome').textContent = `Welcome, ${testerName} !`;
document.getElementById('testerSub').textContent = `Testeur · Silver Bot`;
document.getElementById('testerUserLabel').textContent = `${testerName} · Testeur`;

// Update presence
dbQuery("INSERT INTO user_presence (user_id, status, last_seen) VALUES (%s, 'online', NOW()) ON DUPLICATE KEY UPDATE status='online', last_seen=NOW()", [testerId]);
setInterval(() => dbQuery("UPDATE user_presence SET last_seen=NOW() WHERE user_id=%s", [testerId]), 30000);

// Page system
let tCurrentPage = 't-home';
let tChatInterval = null;

function testerShowPage(name) {
  tCurrentPage = name;
  if (tChatInterval) { clearInterval(tChatInterval); tChatInterval = null; }
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${name}'`)) n.classList.add('active');
  });
  const content = document.getElementById('testerContent');
  const banner = document.getElementById('tBanner');
  if (name === 't-home') { if (banner) banner.style.display = 'none'; }
  else { if (banner) banner.style.display = ''; }

  content.innerHTML = '<div class="loading"><div class="spinner"></div> Chargement...</div>';
  const loaders = {
    't-home': tLoadHome,
    't-overview': tLoadOverview,
    't-chat': tLoadChat,
    't-dm': tLoadDm,
    't-announcements': tLoadAnnouncements,
    't-tasks': tLoadTasks,
    't-bugs': tLoadBugs,
    't-suggestions': tLoadSuggestions,
    't-testlab': tLoadTestLab,
    't-botinfo': tLoadBotInfo,
    't-changelog': tLoadChangelog,
    't-update': tLoadUpdate,
  };
  const loader = loaders[name];
  if (loader) loader(content);
  else content.innerHTML = '<div class="coming-soon fade-in"><div class="icon">—</div><p>Coming soon</p></div>';
}

// Helpers
function esc(s) { const d = document.createElement('div'); d.textContent = s || ''; return d.innerHTML; }
function fmtDate(d) { if (!d) return '—'; const s = String(d); return s.length > 11 ? s.slice(11, 16) : s.slice(0, 10); }
function fmtDateTime(d) { if (!d) return ''; const dt = new Date(d); if (isNaN(dt)) return String(d).slice(0, 16); return dt.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }); }
function sectionHeader(text) { return `<div class="section-header"><div class="bar"></div><h3>${text}</h3><div class="line"></div></div>`; }

// ═══ HOME ═══════════════════════════════════════════════════════════════════

async function tLoadHome(el) {
  const [bot, guilds, testers, openBugs] = await Promise.all([
    discordGet('/users/@me'),
    discordGet('/users/@me/guilds'),
    dbScalar('SELECT COUNT(*) FROM tester_codes'),
    dbScalar("SELECT COUNT(*) FROM tester_bugs WHERE status='open'"),
  ]);
  const b = (bot && !bot.error) ? bot : {};
  const avatar = b.id ? getBotAvatar(b, 256) : '';
  const guildCount = Array.isArray(guilds) ? guilds.length : 0;

  if (b.id) {
    const sbAv = document.getElementById('sidebarAvatar');
    if (sbAv) sbAv.innerHTML = `<img src="${getBotAvatar(b, 128)}">`;
  }

  el.innerHTML = `
    <div class="fade-in" style="display:flex;flex-direction:column;align-items:center;padding-top:30px">
      <div style="position:relative;margin-bottom:20px">
        ${avatar ? `<img src="${avatar}" style="width:96px;height:96px;border-radius:50%;border:3px solid var(--accent);box-shadow:0 0 30px rgba(139,149,176,.15)">` : '<div style="width:96px;height:96px;border-radius:50%;background:var(--card);border:3px solid var(--accent)"></div>'}
        <span class="dot dot-green dot-pulse" style="position:absolute;bottom:4px;right:4px;width:14px;height:14px;border:3px solid var(--bg)"></span>
      </div>
      <h1 style="font-size:28px;font-weight:800;color:var(--bright);letter-spacing:-.03em">${esc(b.username || 'Silver Bot')}</h1>
      <p style="font-size:12px;color:var(--dim);margin-top:2px">Made by <span style="color:var(--accent);font-weight:600">Tib</span> · v2.1</p>
      <div style="display:flex;gap:8px;margin-top:16px">
        <span class="badge badge-green" style="padding:5px 14px;font-size:11px">En ligne</span>
        <span class="badge badge-blue" style="padding:5px 14px;font-size:11px">BOT</span>
        <span class="badge badge-purple" style="padding:5px 14px;font-size:11px">${guildCount} serveur${guildCount > 1 ? 's' : ''}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;max-width:500px;margin-top:28px">
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Serveurs</div><div class="stat-value">${guildCount}</div></div>
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Testeurs</div><div class="stat-value">${testers}</div></div>
        <div class="card stat-card" style="text-align:center"><div class="stat-bar" style="background:var(--red)"></div><div class="stat-label">Bugs</div><div class="stat-value">${openBugs}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%;max-width:500px;margin-top:14px">
        <div class="card" style="text-align:center;cursor:pointer;padding:18px" onclick="testerShowPage('t-overview')">
          <div style="font-size:22px;margin-bottom:6px;opacity:.5"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/></svg></div>
          <div style="font-size:12px;font-weight:600;color:var(--bright)">Vue d'ensemble</div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;padding:18px" onclick="testerShowPage('t-chat')">
          <div style="font-size:22px;margin-bottom:6px;opacity:.5"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg></div>
          <div style="font-size:12px;font-weight:600;color:var(--bright)">Chat</div>
        </div>
        <div class="card" style="text-align:center;cursor:pointer;padding:18px" onclick="testerShowPage('t-tasks')">
          <div style="font-size:22px;margin-bottom:6px;opacity:.5"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"/></svg></div>
          <div style="font-size:12px;font-weight:600;color:var(--bright)">Mes Taches</div>
        </div>
      </div>
      <div style="margin-top:20px;cursor:pointer;opacity:.5;transition:opacity .2s" onmouseenter="this.style.opacity='1'" onmouseleave="this.style.opacity='.5'" onclick="silver.openExternal('https://discord.gg/SPfXUehuRK')" title="Rejoindre le serveur Discord">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--bright)"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z"/></svg>
      </div>
      <p style="font-size:9px;color:var(--muted);margin-top:10px">Silver App v2.3.1 · Electron · FastAPI · MySQL</p>
    </div>`;
}

// ═══ OVERVIEW ═══════════════════════════════════════════════════════════════

async function tLoadOverview(el) {
  const [tasks, bugs, announces, guilds] = await Promise.all([
    dbQuery("SELECT status, COUNT(*) as c FROM tester_tasks WHERE assigned_to=%s GROUP BY status", [testerId]),
    dbQuery("SELECT status, COUNT(*) as c FROM tester_bugs WHERE reporter=%s GROUP BY status", [testerId]),
    dbScalar("SELECT COUNT(*) FROM tester_announcements"),
    discordGet('/users/@me/guilds'),
  ]);

  const taskCounts = { todo: 0, in_progress: 0, done: 0 };
  tasks.forEach(r => { if (taskCounts[r.status] !== undefined) taskCounts[r.status] = r.c; });
  const totalTasks = taskCounts.todo + taskCounts.in_progress + taskCounts.done;
  const bugCount = bugs.reduce((s, r) => s + r.c, 0);
  const guildCount = Array.isArray(guilds) ? guilds.length : 0;

  document.getElementById('tPillTasks').textContent = totalTasks;
  document.getElementById('tPillBugs').textContent = bugCount;
  document.getElementById('tPillAnnounce').textContent = announces;

  el.innerHTML = `
    <div class="page-header fade-in"><h2>Vue d'ensemble</h2><p>Bienvenue ${esc(testerName)}</p></div>
    <div class="stats-grid fade-in">
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Serveurs</div><div class="stat-value">${guildCount}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.03s"><div class="stat-bar" style="background:var(--gold)"></div><div class="stat-label">Taches a faire</div><div class="stat-value">${taskCounts.todo}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.06s"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">En cours</div><div class="stat-value">${taskCounts.in_progress}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.09s"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Terminees</div><div class="stat-value">${taskCounts.done}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.12s"><div class="stat-bar" style="background:var(--red)"></div><div class="stat-label">Bugs signales</div><div class="stat-value">${bugCount}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.15s"><div class="stat-bar" style="background:var(--purple)"></div><div class="stat-label">Annonces</div><div class="stat-value">${announces}</div></div>
    </div>
    <div id="tOverviewAnnounces"></div>
    <div id="tOverviewTasks"></div>`;

  const recentAnnounces = await dbQuery("SELECT title, content, author AS author_name, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 3");
  if (recentAnnounces.length && !recentAnnounces[0]?.error) {
    let h = sectionHeader('Annonces recentes');
    h += recentAnnounces.map(r => `
      <div class="card announce-card slide-in" style="margin-bottom:8px">
        <div class="announce-title">${esc(r.title)}</div>
        ${r.content ? `<div class="announce-body">${esc(r.content).replace(/\n/g, '<br>')}</div>` : ''}
        <div class="announce-meta">${esc(r.author_name || '?')} · ${fmtDateTime(r.created_at)}</div>
      </div>`).join('');
    document.getElementById('tOverviewAnnounces').innerHTML = h;
  }

  const myTasks = await dbQuery("SELECT title, priority, status FROM tester_tasks WHERE assigned_to=%s AND status!='done' ORDER BY FIELD(priority,'urgent','high','medium','low') LIMIT 5", [testerId]);
  if (myTasks.length && !myTasks[0]?.error) {
    const prioColors = { low: 'var(--blue)', medium: 'var(--gold)', high: 'var(--red)', urgent: '#ff2d55' };
    let h = sectionHeader('Mes taches en cours');
    h += myTasks.map(r => `
      <div class="card bug-item slide-in" style="margin-bottom:6px">
        <div class="bug-item-header">
          <div class="bug-item-severity" style="background:${prioColors[r.priority] || 'var(--muted)'}"></div>
          <div class="bug-item-title">${esc(r.title)}</div>
          <span class="badge ${r.status === 'in_progress' ? 'badge-blue' : 'badge-gold'}">${r.status === 'in_progress' ? 'En cours' : 'A faire'}</span>
        </div>
      </div>`).join('');
    document.getElementById('tOverviewTasks').innerHTML = h;
  }
}

// ═══ CHAT GENERAL ═══════════════════════════════════════════════════════════

async function tLoadChat(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Chat General</h2><p>Discussion avec l'equipe</p></div>
    <div class="chat-layout fade-in" style="height:calc(100% - 60px)">
      <div class="chat-main" style="border-radius:var(--radius)">
        <div class="chat-header">Chat General</div>
        <div class="chat-messages" id="tChatMessages"><div class="loading"><div class="spinner"></div></div></div>
        <div class="chat-input-bar">
          <button class="btn btn-secondary chat-attach-btn" onclick="document.getElementById('tChatFile').click()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <input type="text" id="tChatInput" placeholder="Ecrire un message..." onkeydown="if(event.key==='Enter')tChatSend()">
          <button class="btn btn-primary" onclick="tChatSend()">Envoyer</button>
          <input type="file" id="tChatFile" style="display:none" onchange="tChatUpload(this)">
        </div>
      </div>
    </div>`;
  tChatLoadMessages();
  tChatInterval = setInterval(tChatLoadMessages, 5000);
}

async function tChatLoadMessages() {
  const container = document.getElementById('tChatMessages');
  if (!container) { if (tChatInterval) { clearInterval(tChatInterval); tChatInterval = null; } return; }
  const rows = await dbQuery("SELECT CAST(sender_id AS CHAR) AS sender_id, sender_name, message, file_url, file_name, created_at FROM tester_chat ORDER BY created_at DESC LIMIT 50");
  if (!Array.isArray(rows) || !rows.length || rows[0]?.error) {
    if (!Array.isArray(rows) || rows[0]?.error) return;
    container.innerHTML = '<div class="coming-soon" style="height:100%"><p style="color:#555568">Aucun message</p></div>'; return;
  }
  rows.reverse();
  const wasAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
  container.innerHTML = rows.map(r => tRenderMessage(r)).join('');
  if (wasAtBottom) container.scrollTop = container.scrollHeight;
}

function tRenderMessage(r) {
  const isMe = String(r.sender_id) === String(testerId);
  const isOwner = r.sender_id === '1504594533521031219';
  let content = esc(r.message || '');
  if (r.file_url) {
    const ext = (r.file_name || '').split('.').pop().toLowerCase();
    if (['png','jpg','jpeg','gif','webp'].includes(ext)) content += `<div class="chat-file-preview"><img src="${r.file_url}" onclick="window.open('${r.file_url}')" style="max-width:300px;border-radius:8px;margin-top:6px;cursor:pointer"></div>`;
    else if (['mp4','webm','mov'].includes(ext)) content += `<div class="chat-file-preview"><video src="${r.file_url}" controls style="max-width:300px;border-radius:8px;margin-top:6px"></video></div>`;
    else content += `<div style="margin-top:6px"><a href="${r.file_url}" target="_blank" style="color:var(--blue);font-size:11px">${esc(r.file_name || 'Fichier')}</a></div>`;
  }
  const avatarUrl = getUserAvatar(r.sender_id, null, 32);
  const nameColor = isOwner ? '#a090d0' : isMe ? '#50b8d0' : '#8888a0';
  const badge = isOwner ? ' <span style="font-size:8px;background:rgba(160,144,208,.1);color:#a090d0;padding:1px 5px;border-radius:4px;margin-left:4px">Owner</span>' : '';
  return `<div style="display:flex;gap:10px;padding:8px 12px;transition:background .1s;border-radius:10px" onmouseenter="this.style.background='rgba(200,200,230,.02)'" onmouseleave="this.style.background='transparent'">
    <img src="${avatarUrl}" style="width:32px;height:32px;border-radius:50%;flex-shrink:0;margin-top:2px;background:#12121a" onerror="this.style.display='none'">
    <div style="flex:1;min-width:0">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
        <span style="font-size:12px;font-weight:500;color:${nameColor}">${esc(r.sender_name || r.sender_id)}</span>${badge}
        <span style="font-size:9px;color:#404058;margin-left:auto">${fmtDateTime(r.created_at)}</span>
      </div>
      <div style="font-size:12px;color:#9090a8;line-height:1.5;word-break:break-word">${content}</div>
    </div>
  </div>`;
}

async function tChatSend() {
  const input = document.getElementById('tChatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  await dbQuery("INSERT INTO tester_chat (sender_id, sender_name, message, created_at) VALUES (%s,%s,%s,NOW())", [testerId, testerName, msg]);
  tChatLoadMessages();
}

async function tChatUpload(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch(`${BACKEND}/upload`, { method: 'POST', body: form });
    const data = await res.json();
    if (data.error) return;
    await dbQuery("INSERT INTO tester_chat (sender_id, sender_name, message, file_url, file_name, created_at) VALUES (%s,%s,%s,%s,%s,NOW())", [testerId, testerName, '', data.url, data.name]);
    tChatLoadMessages();
  } catch {}
}

// ═══ DM OWNER ═══════════════════════════════════════════════════════════════

async function tLoadDm(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Message prive</h2><p>Discussion avec l'owner</p></div>
    <div class="chat-layout fade-in" style="height:calc(100% - 60px)">
      <div class="chat-main" style="border-radius:var(--radius)">
        <div class="chat-header">DM avec Tib (Owner)</div>
        <div class="chat-messages" id="tDmMessages"><div class="loading"><div class="spinner"></div></div></div>
        <div class="chat-input-bar">
          <button class="btn btn-secondary chat-attach-btn" onclick="document.getElementById('tDmFile').click()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <input type="text" id="tDmInput" placeholder="Ecrire un message..." onkeydown="if(event.key==='Enter')tDmSend()">
          <button class="btn btn-primary" onclick="tDmSend()">Envoyer</button>
          <input type="file" id="tDmFile" style="display:none" onchange="tDmUpload(this)">
        </div>
      </div>
    </div>`;
  tDmLoadMessages();
  tChatInterval = setInterval(tDmLoadMessages, 5000);
}

async function tDmLoadMessages() {
  const container = document.getElementById('tDmMessages');
  if (!container) { if (tChatInterval) { clearInterval(tChatInterval); tChatInterval = null; } return; }
  const rows = await dbQuery("SELECT CAST(sender_id AS CHAR) AS sender_id, sender_name, message, file_url, file_name, created_at FROM tester_dms WHERE (CAST(sender_id AS CHAR)=%s OR CAST(receiver_id AS CHAR)=%s) ORDER BY created_at DESC LIMIT 50", [testerId, testerId]);
  if (!Array.isArray(rows) || !rows.length || rows[0]?.error) {
    if (!Array.isArray(rows) || rows[0]?.error) return;
    container.innerHTML = '<div class="coming-soon" style="height:100%"><p style="color:#555568">Aucun message</p></div>'; return;
  }
  rows.reverse();
  const wasAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
  container.innerHTML = rows.map(r => tRenderMessage(r)).join('');
  if (wasAtBottom) container.scrollTop = container.scrollHeight;
}

async function tDmSend() {
  const input = document.getElementById('tDmInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  await dbQuery("INSERT INTO tester_dms (sender_id, sender_name, receiver_id, message, created_at) VALUES (%s,%s,%s,%s,NOW())", [testerId, testerName, '1504594533521031219', msg]);
  tDmLoadMessages();
}

async function tDmUpload(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';
  const form = new FormData();
  form.append('file', file);
  try {
    const res = await fetch(`${BACKEND}/upload`, { method: 'POST', body: form });
    const data = await res.json();
    if (data.error) return;
    await dbQuery("INSERT INTO tester_dms (sender_id, sender_name, receiver_id, message, file_url, file_name, created_at) VALUES (%s,%s,%s,%s,%s,%s,NOW())", [testerId, testerName, '1504594533521031219', '', data.url, data.name]);
    tDmLoadMessages();
  } catch {}
}

// ═══ ANNONCES ═══════════════════════════════════════════════════════════════

async function tLoadAnnouncements(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Annonces</h2><p>Messages de l'owner</p></div><div id="tAnnounceList"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery("SELECT title, content, author AS author_name, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 30");
  if (!rows.length || rows[0]?.error) { document.getElementById('tAnnounceList').innerHTML = '<div class="coming-soon"><div class="icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="var(--muted)"><path d="M18 11v2h4v-2zm-2 6.46l2.18 1.63 1.12-1.5-2.18-1.63zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h4v-2H2zm9-9h2V0h-2z"/></svg></div><p>Aucune annonce</p></div>'; return; }
  document.getElementById('tAnnounceList').innerHTML = rows.map(r => `
    <div class="card announce-card slide-in" style="margin-bottom:10px">
      <div class="announce-title">${esc(r.title)}</div>
      ${r.content ? `<div class="announce-body">${esc(r.content).replace(/\n/g, '<br>')}</div>` : ''}
      <div class="announce-meta">${esc(r.author_name || '?')} · ${fmtDateTime(r.created_at)}</div>
    </div>`).join('');
}

// ═══ MES TACHES ═════════════════════════════════════════════════════════════

async function tLoadTasks(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Mes Taches</h2><p>Taches qui me sont assignees</p></div><div id="tTaskList"><div class="loading"><div class="spinner"></div></div></div>`;
  const rows = await dbQuery("SELECT id, title, description, priority, status, created_at FROM tester_tasks WHERE assigned_to=%s ORDER BY FIELD(priority,'urgent','high','medium','low'), created_at DESC", [testerId]);
  if (!rows.length || rows[0]?.error) { document.getElementById('tTaskList').innerHTML = '<div class="coming-soon"><div class="icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="var(--muted)"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"/></svg></div><p>Aucune tache assignee</p></div>'; return; }

  const prioColors = { low: 'var(--blue)', medium: 'var(--gold)', high: 'var(--red)', urgent: '#ff2d55' };
  const statusLabels = { todo: 'A faire', in_progress: 'En cours', done: 'Termine' };
  const statusBadges = { todo: 'badge-gold', in_progress: 'badge-blue', done: 'badge-green' };

  document.getElementById('tTaskList').innerHTML = rows.map(r => {
    const nextStatus = r.status === 'todo' ? 'in_progress' : r.status === 'in_progress' ? 'done' : null;
    return `<div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:${prioColors[r.priority] || 'var(--muted)'}"></div>
        <div class="bug-item-title">${esc(r.title)}</div>
        <span class="badge ${statusBadges[r.status] || 'badge-gold'}">${statusLabels[r.status] || r.status}</span>
        ${nextStatus ? `<button class="btn btn-primary" style="padding:4px 10px;font-size:10px" onclick="tTaskUpdate(${r.id},'${nextStatus}')">${nextStatus === 'in_progress' ? 'Demarrer' : 'Terminer'}</button>` : ''}
      </div>
      ${r.description ? `<div class="bug-item-desc">${esc(r.description)}</div>` : ''}
      <div class="bug-item-meta">${r.priority} · ${fmtDate(r.created_at)}</div>
    </div>`;
  }).join('');
}

async function tTaskUpdate(id, status) {
  await dbQuery("UPDATE tester_tasks SET status=%s WHERE id=%s", [status, id]);
  tLoadTasks(document.getElementById('testerContent'));
}

// ═══ BUGS ════════════════════════════════════════════════════════════════════

async function tLoadBugs(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Bugs Reports</h2><p>Signaler et suivre les bugs</p></div>
    <button class="btn btn-primary fade-in" onclick="tBugShowForm()" style="margin-bottom:14px">+ Signaler un bug</button>
    <div id="tBugForm"></div>
    <div id="tBugList"><div class="loading"><div class="spinner"></div></div></div>`;
  tBugLoadList();
}

function tBugShowForm() {
  const c = document.getElementById('tBugForm');
  if (c.innerHTML) { c.innerHTML = ''; return; }
  c.innerHTML = `
    <div class="card slide-in" style="margin-bottom:14px;padding:16px">
      <div class="control-section-title">Signaler un bug</div>
      <input type="text" id="tBugTitle" placeholder="Titre du bug">
      <textarea id="tBugDesc" placeholder="Description detaillee..." rows="3" style="margin-top:8px;resize:vertical"></textarea>
      <div style="display:flex;gap:8px;margin-top:8px;align-items:center">
        <select id="tBugSeverity" style="max-width:160px">
          <option value="low">Basse</option>
          <option value="medium" selected>Moyenne</option>
          <option value="high">Haute</option>
          <option value="critical">Critique</option>
        </select>
        <button class="btn btn-primary" onclick="tBugSubmit()">Soumettre</button>
        <button class="btn btn-secondary" onclick="document.getElementById('tBugForm').innerHTML=''">Annuler</button>
      </div>
    </div>`;
}

async function tBugSubmit() {
  const title = document.getElementById('tBugTitle').value.trim();
  const desc = document.getElementById('tBugDesc').value.trim();
  const severity = document.getElementById('tBugSeverity').value;
  if (!title) return;
  await dbQuery("INSERT INTO tester_bugs (reporter, title, description, severity, status, created_at) VALUES (%s,%s,%s,%s,'open',NOW())", [testerName, title, desc, severity]);
  document.getElementById('tBugForm').innerHTML = '';
  tBugLoadList();
}

async function tBugLoadList() {
  const listEl = document.getElementById('tBugList');
  const rows = await dbQuery("SELECT id, reporter AS reporter_name, title, description, severity, status, created_at FROM tester_bugs ORDER BY created_at DESC LIMIT 30");
  if (!rows.length || rows[0]?.error) { listEl.innerHTML = '<div class="coming-soon"><div class="icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="var(--muted)"><path d="M20 8h-2.81a5.985 5.985 0 0 0-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5s-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20z"/></svg></div><p>Aucun bug</p></div>'; return; }
  const sevColors = { low: 'var(--blue)', medium: 'var(--gold)', high: 'var(--red)', critical: '#ff2d55' };
  listEl.innerHTML = rows.map(r => `
    <div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:${sevColors[r.severity] || 'var(--muted)'}"></div>
        <div class="bug-item-title">${esc(r.title)}</div>
        <span class="badge ${r.status === 'open' ? 'badge-gold' : r.status === 'fixed' ? 'badge-green' : 'badge-red'}">${r.status}</span>
      </div>
      ${r.description ? `<div class="bug-item-desc">${esc(r.description)}</div>` : ''}
      <div class="bug-item-meta">${esc(r.reporter_name || '?')} · ${r.severity} · ${fmtDate(r.created_at)}</div>
    </div>`).join('');
}

// ═══ SUGGESTIONS ════════════════════════════════════════════════════════════

async function tLoadSuggestions(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Suggestions</h2><p>Propose des idees et ajouts</p></div>
    <button class="btn btn-primary fade-in" onclick="tSugShowForm()" style="margin-bottom:14px">+ Nouvelle suggestion</button>
    <div id="tSugForm"></div>
    <div id="tSugList"><div class="loading"><div class="spinner"></div></div></div>`;
  tSugLoadList();
}

function tSugShowForm() {
  const c = document.getElementById('tSugForm');
  if (c.innerHTML) { c.innerHTML = ''; return; }
  c.innerHTML = `
    <div class="card slide-in" style="margin-bottom:14px;padding:16px">
      <div class="control-section-title">Nouvelle suggestion</div>
      <input type="text" id="tSugTitle" placeholder="Titre">
      <textarea id="tSugDesc" placeholder="Description detaillee..." rows="3" style="margin-top:8px;resize:vertical"></textarea>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn btn-primary" onclick="tSugSubmit()">Soumettre</button>
        <button class="btn btn-secondary" onclick="document.getElementById('tSugForm').innerHTML=''">Annuler</button>
      </div>
    </div>`;
}

async function tSugSubmit() {
  const title = document.getElementById('tSugTitle').value.trim();
  const desc = document.getElementById('tSugDesc').value.trim();
  if (!title) return;
  await dbQuery("INSERT INTO tester_suggestions (reporter_id, reporter_name, title, description, status, created_at) VALUES (%s,%s,%s,%s,'pending',NOW())", [testerId, testerName, title, desc]);
  document.getElementById('tSugForm').innerHTML = '';
  tSugLoadList();
}

async function tSugLoadList() {
  const listEl = document.getElementById('tSugList');
  const rows = await dbQuery("SELECT id, reporter_name, title, description, status, created_at FROM tester_suggestions ORDER BY created_at DESC LIMIT 30");
  if (!rows.length || rows[0]?.error) { listEl.innerHTML = '<div class="coming-soon"><div class="icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="var(--muted)"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg></div><p>Aucune suggestion</p></div>'; return; }
  listEl.innerHTML = rows.map(r => {
    const statusBadge = r.status === 'approved' ? 'badge-green' : r.status === 'rejected' ? 'badge-red' : 'badge-gold';
    const statusLabel = r.status === 'approved' ? 'Approuve' : r.status === 'rejected' ? 'Rejete' : 'En attente';
    return `<div class="card bug-item slide-in" style="margin-bottom:8px">
      <div class="bug-item-header">
        <div class="bug-item-severity" style="background:var(--purple)"></div>
        <div class="bug-item-title">${esc(r.title)}</div>
        <span class="badge ${statusBadge}">${statusLabel}</span>
      </div>
      ${r.description ? `<div class="bug-item-desc">${esc(r.description)}</div>` : ''}
      <div class="bug-item-meta">${esc(r.reporter_name || '?')} · ${fmtDateTime(r.created_at)}</div>
    </div>`;
  }).join('');
}

// ═══ TEST LAB ═══════════════════════════════════════════════════════════════

let tTestlabCommands = [];
let tTestlabMessages = [];

async function tLoadTestLab(el) {
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Test Lab</h2><p>Simulateur de commandes bot</p></div>
    <div class="testlab-layout fade-in">
      <div class="testlab-sidebar">
        <div class="testlab-sidebar-header">Commandes</div>
        <input type="text" id="tTestlabSearch" placeholder="Rechercher..." oninput="tTestlabFilter()" style="margin:8px;width:calc(100% - 16px)">
        <div class="testlab-cmd-list" id="tTestlabCmdList"><div class="loading"><div class="spinner"></div></div></div>
        <div class="testlab-cmd-count" id="tTestlabCmdCount"></div>
      </div>
      <div class="testlab-main">
        <div class="testlab-chat" id="tTestlabChat">
          <div class="testlab-welcome"><div class="testlab-welcome-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="var(--muted)" opacity=".3"><path d="M7 2v2h1v5.17L3.2 16.8A2.5 2.5 0 0 0 5.24 21h13.52a2.5 2.5 0 0 0 2.04-4.2L16 9.17V4h1V2zm2 2h6v5.83l1.08 1.42H7.92L9 9.83z"/></svg></div><div class="testlab-welcome-title">Silver Bot — Test Lab</div><div class="testlab-welcome-sub">Tape une commande avec / pour tester</div></div>
        </div>
        <div class="testlab-input-bar">
          <span class="testlab-slash">/</span>
          <input type="text" id="tTestlabInput" placeholder="commande args..." onkeydown="tTestlabKeydown(event)" autocomplete="off">
          <button class="btn btn-primary" onclick="tTestlabSend()">Envoyer</button>
        </div>
        <div class="testlab-suggestions" id="tTestlabSuggestions"></div>
      </div>
    </div>`;
  try {
    const res = await fetch(`${BACKEND}/testlab/commands`);
    const data = await res.json();
    tTestlabCommands = Array.isArray(data) ? data : [];
  } catch { tTestlabCommands = []; }
  tTestlabMessages = [];
  tRenderCmdList(tTestlabCommands);
}

function tRenderCmdList(cmds) {
  document.getElementById('tTestlabCmdCount').textContent = `${cmds.length} commande${cmds.length > 1 ? 's' : ''}`;
  document.getElementById('tTestlabCmdList').innerHTML = cmds.length ? cmds.map(c => `
    <div class="testlab-cmd-item" onclick="document.getElementById('tTestlabInput').value='${esc(c.name)} ';document.getElementById('tTestlabInput').focus()">
      <span class="testlab-cmd-name">/${esc(c.name)}</span>
      <span class="testlab-cmd-desc">${esc(c.description)}</span>
    </div>`).join('') : '<div style="padding:12px;font-size:11px;color:var(--muted);text-align:center">Aucune commande</div>';
}

function tTestlabFilter() {
  const q = document.getElementById('tTestlabSearch').value.toLowerCase();
  tRenderCmdList(tTestlabCommands.filter(c => c.name.includes(q) || c.description.toLowerCase().includes(q)));
}

function tTestlabKeydown(e) {
  if (e.key === 'Enter') tTestlabSend();
  if (e.key === 'Tab') { e.preventDefault(); const v = document.getElementById('tTestlabInput').value.trim().toLowerCase(); const m = tTestlabCommands.find(c => c.name.startsWith(v)); if (m) document.getElementById('tTestlabInput').value = m.name + ' '; }
  setTimeout(() => {
    const v = document.getElementById('tTestlabInput')?.value.trim().toLowerCase();
    const sg = document.getElementById('tTestlabSuggestions');
    if (!v || !sg) { if (sg) sg.innerHTML = ''; return; }
    const matches = tTestlabCommands.filter(c => c.name.startsWith(v)).slice(0, 5);
    sg.innerHTML = matches.map(c => `<div class="testlab-suggestion-item" onclick="document.getElementById('tTestlabInput').value='${esc(c.name)} ';document.getElementById('tTestlabInput').focus();document.getElementById('tTestlabSuggestions').innerHTML=''">${esc('/' + c.name)} <span style="color:var(--muted)">${esc(c.description)}</span></div>`).join('');
  }, 10);
}

async function tTestlabSend() {
  const input = document.getElementById('tTestlabInput');
  let cmd = input.value.trim();
  if (!cmd) return;
  if (!cmd.startsWith('/')) cmd = '/' + cmd;
  input.value = '';
  document.getElementById('tTestlabSuggestions').innerHTML = '';
  tTestlabMessages.push({ type: 'user', content: cmd });
  tRenderTestlabChat();
  try {
    const res = await fetch(`${BACKEND}/testlab/simulate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ command: cmd, username: testerName }) });
    const data = await res.json();
    tTestlabMessages.push({ type: 'bot', content: data.content, embed: data.embed });
  } catch (e) { tTestlabMessages.push({ type: 'bot', content: `Erreur: ${e.message}`, embed: null }); }
  tRenderTestlabChat();
}

function tRenderTestlabChat() {
  const chat = document.getElementById('tTestlabChat');
  chat.innerHTML = tTestlabMessages.map(m => {
    if (m.type === 'user') return `<div class="testlab-msg"><div class="testlab-msg-avatar">T</div><div class="testlab-msg-body"><div class="testlab-msg-name" style="color:var(--accent)">${esc(testerName)}</div><div class="testlab-msg-content">${esc(m.content)}</div></div></div>`;
    let h = '';
    if (m.content) h += `<div class="testlab-msg-content">${esc(m.content)}</div>`;
    if (m.embed) h += tRenderEmbed(m.embed);
    return `<div class="testlab-msg"><div class="testlab-msg-avatar bot-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="var(--cyan)"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg></div><div class="testlab-msg-body"><div class="testlab-msg-name" style="color:var(--cyan)">Silver Bot</div>${h}</div></div>`;
  }).join('');
  chat.scrollTop = chat.scrollHeight;
}

function tRenderEmbed(embed) {
  const color = embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#5865F2';
  let h = `<div class="discord-embed" style="border-left-color:${color}">`;
  if (embed.title) h += `<div class="discord-embed-title">${esc(embed.title)}</div>`;
  if (embed.description) h += `<div class="discord-embed-desc">${tFmtDiscord(embed.description)}</div>`;
  if (embed.fields && embed.fields.length) {
    h += '<div class="discord-embed-fields">';
    for (const f of embed.fields) h += `<div class="discord-embed-field${f.inline ? ' inline' : ''}"><div class="discord-embed-field-name">${esc(f.name)}</div><div class="discord-embed-field-value">${tFmtDiscord(f.value)}</div></div>`;
    h += '</div>';
  }
  return h + '</div>';
}

function tFmtDiscord(text) {
  if (!text) return '';
  let s = esc(text);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
  s = s.replace(/\n/g, '<br>');
  return s;
}

// ═══ BOT INFO ═══════════════════════════════════════════════════════════════

async function tLoadBotInfo(el) {
  el.innerHTML = `<div class="page-header fade-in"><h2>Bot Info</h2><p>Informations du bot</p></div><div id="tBotInfoContent"><div class="loading"><div class="spinner"></div> Chargement...</div></div>`;
  const bot = await discordGet('/users/@me');
  if (bot.error) { document.getElementById('tBotInfoContent').innerHTML = '<div class="coming-soon"><p>Impossible de contacter Discord</p></div>'; return; }
  const avatar = getBotAvatar(bot, 256);
  const guilds = await discordGet('/users/@me/guilds');
  const guildCount = Array.isArray(guilds) ? guilds.length : 0;
  document.getElementById('tBotInfoContent').innerHTML = `
    <div class="botinfo-header card fade-in">
      <img src="${avatar}" class="botinfo-avatar">
      <div class="botinfo-identity">
        <div class="botinfo-name">${esc(bot.username)}</div>
        <div class="botinfo-id">${bot.id}</div>
      </div>
      <div class="botinfo-badges">
        <span class="badge badge-blue">BOT</span>
        <span class="badge badge-purple">${guildCount} serveurs</span>
      </div>
    </div>
    <div class="stats-grid" style="grid-template-columns:repeat(3,1fr);margin-top:14px">
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">Serveurs</div><div class="stat-value">${guildCount}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.03s"><div class="stat-bar" style="background:var(--cyan)"></div><div class="stat-label">API</div><div class="stat-value" style="font-size:14px">v10</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.06s"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Statut</div><div class="stat-value" style="font-size:14px">En ligne</div></div>
    </div>`;
}

// ═══ CHANGELOG ═════════════════════════════════════════════════════════════

function tLoadChangelog(el, append) {
  const logs = [
    { version: 'v2.3.1', date: '29/06/2026', tag: 'Patch', color: 'var(--cyan)', items: [
      'Design Liquid Chrome sur toute l\'app',
      'Splash screen au lancement',
      'Recherche Ctrl+K amelioree',
      'Horloge stylisee, skeleton chrome',
    ]},
    { version: 'v2.3', date: '29/06/2026', tag: 'Majeur', color: 'var(--purple)', items: [
      'Nouveau design Liquid Chrome',
      'Textes en degrade metallique',
      'Bordures ultra-subtiles, coins arrondis',
    ]},
    { version: 'v2.2', date: '29/06/2026', tag: 'Majeur', color: 'var(--blue)', items: [
      'Analytics avec graphiques Chart.js',
      'Embed Builder visuel avec preview',
      'Console bot en direct',
      'Notifications desktop',
      'Backup/Restore JSON',
      'Heatmap d\'activite 90 jours',
      'Raccourcis clavier',
    ]},
    { version: 'v2.1', date: '23/06/2026', tag: 'Majeur', color: 'var(--green)', items: [
      'Page Home, sidebar retractable',
      'Multi-langue FR/EN',
      'Chat et DM repares',
      'Test Lab avec gestion d\'erreurs',
    ]},
    { version: 'v2.0', date: '21/06/2026', tag: 'Initial', color: 'var(--accent)', items: [
      'Migration Electron + FastAPI',
      'Dashboard Owner + Testeur',
      'Chat, bugs, taches, annonces',
    ]},
  ];
  const header = append ? '' : `<div class="page-header fade-in"><h2>Changelog</h2><p>Historique des mises a jour</p></div>`;
  const content =
    logs.map(log => `
      <div class="card fade-in" style="margin-bottom:10px;padding:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="font-size:12px;padding:4px 12px;background:${log.color};color:#fff;font-weight:500;border-radius:8px">${log.version}</span>
          <span style="font-size:9px;padding:2px 8px;border-radius:6px;background:${log.color}15;color:${log.color}">${log.tag}</span>
          <span style="font-size:10px;color:#404058;margin-left:auto">${log.date}</span>
        </div>
        <ul style="margin:0;padding-left:16px;color:#9090a8;font-size:11px;line-height:1.9">
          ${log.items.map(i => `<li>${esc(i)}</li>`).join('')}
        </ul>
      </div>`).join('');
  if (append) el.innerHTML += content;
  else el.innerHTML = header + content;
}

// ═══ UPDATE SYSTEM ═════════════════════════════════════════════════════════

const T_APP_VERSION = '2.3.2';
let _tUpdateInfo = null;

async function tCheckForUpdate() {
  try {
    const res = await fetch('https://api.github.com/repos/Tib688/SilverApp/releases/latest', { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    if (!data.tag_name) return;
    const latest = data.tag_name.replace(/^v/i, '');
    _tUpdateInfo = {
      version: latest,
      name: data.name || `v${latest}`,
      body: data.body || '',
      url: data.html_url,
      download: data.assets?.length ? data.assets[0].browser_download_url : data.html_url,
      date: data.published_at ? new Date(data.published_at).toLocaleDateString('fr-FR') : '',
      isNew: latest !== T_APP_VERSION,
    };
    const badge = document.getElementById('tUpdateBadge');
    if (badge && _tUpdateInfo.isNew) badge.style.display = 'inline-block';
  } catch {}
}

function tLoadUpdate(el) {
  const v = _tUpdateInfo;
  const hasUpdate = v && v.isNew;
  el.innerHTML = `
    <div class="page-header fade-in"><h2>Mise a jour</h2><p>Silver App ${T_APP_VERSION}</p></div>
    <div class="card fade-in" style="padding:24px;margin-bottom:16px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${hasUpdate ? 'rgba(160,144,208,.4)' : 'rgba(48,208,96,.3)'},transparent);"></div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="width:48px;height:48px;border-radius:14px;background:${hasUpdate ? 'rgba(160,144,208,.08)' : 'rgba(48,208,96,.06)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:22px">${hasUpdate ? '⬆' : '✓'}</span>
        </div>
        <div style="flex:1">
          <div style="font-size:16px;font-weight:500;background:var(--chrome-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${hasUpdate ? 'Nouvelle version disponible' : 'A jour'}</div>
          <div style="font-size:12px;color:#555568;margin-top:4px">
            ${hasUpdate ? `Version actuelle: <span style="color:#707088">${T_APP_VERSION}</span> → Derniere: <span style="color:#a090d0">${v.version}</span>` : `Version <span style="color:#30d060">${T_APP_VERSION}</span>`}
          </div>
        </div>
        ${hasUpdate ? `<button class="btn btn-primary" style="padding:10px 24px;font-size:13px" onclick="silver.openExternal('${v.download}')">Telecharger</button>` : ''}
      </div>
    </div>
    ${hasUpdate && v.body ? `<div class="card fade-in" style="padding:20px;margin-bottom:16px"><div style="font-size:12px;font-weight:500;color:#707088;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px">Notes de mise a jour</div><div style="font-size:12px;color:#9090a8;line-height:1.8;white-space:pre-wrap">${esc(v.body)}</div></div>` : ''}
    <div style="font-size:12px;font-weight:500;color:#555568;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px">Changelog</div>`;
  tLoadChangelog(el, true);
}

// ═══ LOGOUT ═════════════════════════════════════════════════════════════════

async function tLogout() {
  await dbQuery("UPDATE user_presence SET status='offline' WHERE user_id=%s", [testerId]);
  const cfg = loadConfig();
  cfg.trustedSession = false;
  cfg.sessionType = '';
  saveConfig(cfg);
  silver.navigate('login');
}

// Load bot avatar in sidebar
(async () => {
  const me = await discordGet('/users/@me');
  if (me && !me.error) {
    const url = getBotAvatar(me, 128);
    if (url) document.getElementById('sidebarAvatar').innerHTML = `<img src="${url}">`;
  }
})();

// Init
testerShowPage('t-home');
tCheckForUpdate();
setInterval(tCheckForUpdate, 1800000);
