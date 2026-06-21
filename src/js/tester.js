// Clock
setInterval(() => {
  const el = document.getElementById('testerClock');
  if (el) el.textContent = new Date().toLocaleTimeString('fr-FR');
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
let tCurrentPage = 't-overview';
let tChatInterval = null;

function testerShowPage(name) {
  tCurrentPage = name;
  if (tChatInterval) { clearInterval(tChatInterval); tChatInterval = null; }
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${name}'`)) n.classList.add('active');
  });
  const content = document.getElementById('testerContent');
  content.innerHTML = '<div class="loading"><div class="spinner"></div> Chargement...</div>';
  const loaders = {
    't-overview': tLoadOverview,
    't-chat': tLoadChat,
    't-dm': tLoadDm,
    't-announcements': tLoadAnnouncements,
    't-tasks': tLoadTasks,
    't-bugs': tLoadBugs,
    't-testlab': tLoadTestLab,
    't-botinfo': tLoadBotInfo,
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

// ═══ OVERVIEW ═══════════════════════════════════════════════════════════════

async function tLoadOverview(el) {
  const [tasks, bugs, announces] = await Promise.all([
    dbQuery("SELECT status, COUNT(*) as c FROM tester_tasks WHERE assigned_to=%s GROUP BY status", [testerId]),
    dbQuery("SELECT status, COUNT(*) as c FROM tester_bugs WHERE reporter_id=%s GROUP BY status", [testerId]),
    dbScalar("SELECT COUNT(*) FROM tester_announcements"),
  ]);

  const taskCounts = { todo: 0, in_progress: 0, done: 0 };
  tasks.forEach(r => { if (taskCounts[r.status] !== undefined) taskCounts[r.status] = r.c; });
  const totalTasks = taskCounts.todo + taskCounts.in_progress + taskCounts.done;
  const bugCount = bugs.reduce((s, r) => s + r.c, 0);

  document.getElementById('tPillTasks').textContent = totalTasks;
  document.getElementById('tPillBugs').textContent = bugCount;
  document.getElementById('tPillAnnounce').textContent = announces;

  el.innerHTML = `
    <div class="page-header fade-in"><h2>Tableau de bord</h2><p>Bienvenue ${esc(testerName)}</p></div>
    <div class="stats-grid fade-in">
      <div class="card stat-card slide-in"><div class="stat-bar" style="background:var(--gold)"></div><div class="stat-label">Taches a faire</div><div class="stat-value">${taskCounts.todo}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.03s"><div class="stat-bar" style="background:var(--blue)"></div><div class="stat-label">En cours</div><div class="stat-value">${taskCounts.in_progress}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.06s"><div class="stat-bar" style="background:var(--green)"></div><div class="stat-label">Terminees</div><div class="stat-value">${taskCounts.done}</div></div>
      <div class="card stat-card slide-in" style="animation-delay:.09s"><div class="stat-bar" style="background:var(--red)"></div><div class="stat-label">Bugs signales</div><div class="stat-value">${bugCount}</div></div>
    </div>
    <div id="tOverviewAnnounces"></div>
    <div id="tOverviewTasks"></div>`;

  // Recent announcements
  const recentAnnounces = await dbQuery("SELECT title, content, author_name, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 3");
  if (recentAnnounces.length) {
    let h = sectionHeader('Annonces recentes');
    h += recentAnnounces.map(r => `
      <div class="card announce-card slide-in" style="margin-bottom:8px">
        <div class="announce-title">${esc(r.title)}</div>
        ${r.content ? `<div class="announce-body">${esc(r.content).replace(/\n/g, '<br>')}</div>` : ''}
        <div class="announce-meta">${esc(r.author_name || '?')} · ${fmtDateTime(r.created_at)}</div>
      </div>`).join('');
    document.getElementById('tOverviewAnnounces').innerHTML = h;
  }

  // My pending tasks
  const myTasks = await dbQuery("SELECT title, priority, status FROM tester_tasks WHERE assigned_to=%s AND status!='done' ORDER BY FIELD(priority,'urgent','high','medium','low') LIMIT 5", [testerId]);
  if (myTasks.length) {
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
        <div class="chat-header">💬 General</div>
        <div class="chat-messages" id="tChatMessages"><div class="loading"><div class="spinner"></div></div></div>
        <div class="chat-input-bar">
          <button class="btn btn-secondary chat-attach-btn" onclick="document.getElementById('tChatFile').click()">📎</button>
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
  const rows = await dbQuery("SELECT sender_id, sender_name, message, file_url, file_name, created_at FROM tester_chat ORDER BY created_at DESC LIMIT 50");
  rows.reverse();
  if (!rows.length) { container.innerHTML = '<div class="coming-soon" style="height:100%"><div class="icon">💬</div><p>Aucun message</p></div>'; return; }
  container.innerHTML = rows.map(r => tRenderMessage(r)).join('');
  container.scrollTop = container.scrollHeight;
}

function tRenderMessage(r) {
  const isMe = r.sender_id === testerId;
  let content = esc(r.message || '');
  if (r.file_url) {
    const ext = (r.file_name || '').split('.').pop().toLowerCase();
    if (['png','jpg','jpeg','gif','webp'].includes(ext)) content += `<div class="chat-file-preview"><img src="${r.file_url}" onclick="window.open('${r.file_url}')"></div>`;
    else if (['mp4','webm','mov'].includes(ext)) content += `<div class="chat-file-preview"><video src="${r.file_url}" controls style="max-width:300px;border-radius:8px"></video></div>`;
    else content += `<div class="chat-file-link"><a href="${r.file_url}" target="_blank">📎 ${esc(r.file_name || 'Fichier')}</a></div>`;
  }
  return `<div class="chat-bubble ${isMe ? 'chat-bubble-owner' : ''}">
    <div class="chat-bubble-header">
      <span class="chat-bubble-name" style="color:${isMe ? 'var(--cyan)' : 'var(--accent)'}">${esc(r.sender_name || r.sender_id)}</span>
      <span class="chat-bubble-time">${fmtDateTime(r.created_at)}</span>
    </div>
    <div class="chat-bubble-content">${content}</div>
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
        <div class="chat-header">✉ DM avec Tib (Owner)</div>
        <div class="chat-messages" id="tDmMessages"><div class="loading"><div class="spinner"></div></div></div>
        <div class="chat-input-bar">
          <button class="btn btn-secondary chat-attach-btn" onclick="document.getElementById('tDmFile').click()">📎</button>
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
  const rows = await dbQuery("SELECT sender_id, sender_name, message, file_url, file_name, created_at FROM tester_dms WHERE sender_id=%s OR receiver_id=%s ORDER BY created_at DESC LIMIT 50", [testerId, testerId]);
  rows.reverse();
  if (!rows.length) { container.innerHTML = '<div class="coming-soon" style="height:100%"><div class="icon">✉</div><p>Aucun message</p></div>'; return; }
  container.innerHTML = rows.map(r => tRenderMessage(r)).join('');
  container.scrollTop = container.scrollHeight;
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
  const rows = await dbQuery("SELECT title, content, author_name, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 30");
  if (!rows.length) { document.getElementById('tAnnounceList').innerHTML = '<div class="coming-soon"><div class="icon">📢</div><p>Aucune annonce</p></div>'; return; }
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
  if (!rows.length) { document.getElementById('tTaskList').innerHTML = '<div class="coming-soon"><div class="icon">📋</div><p>Aucune tache assignee</p></div>'; return; }

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
  await dbQuery("INSERT INTO tester_bugs (reporter_id, reporter_name, title, description, severity, status, created_at) VALUES (%s,%s,%s,%s,%s,'open',NOW())",
    [testerId, testerName, title, desc, severity]);
  document.getElementById('tBugForm').innerHTML = '';
  tBugLoadList();
}

async function tBugLoadList() {
  const listEl = document.getElementById('tBugList');
  const rows = await dbQuery("SELECT id, reporter_name, title, description, severity, status, created_at FROM tester_bugs ORDER BY created_at DESC LIMIT 30");
  if (!rows.length) { listEl.innerHTML = '<div class="coming-soon"><div class="icon">🐛</div><p>Aucun bug</p></div>'; return; }
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
          <div class="testlab-welcome"><div class="testlab-welcome-icon">⚗</div><div class="testlab-welcome-title">Silver Bot — Test Lab</div><div class="testlab-welcome-sub">Tape une commande avec / pour tester</div></div>
        </div>
        <div class="testlab-input-bar">
          <span class="testlab-slash">/</span>
          <input type="text" id="tTestlabInput" placeholder="commande args..." onkeydown="tTestlabKeydown(event)" autocomplete="off">
          <button class="btn btn-primary" onclick="tTestlabSend()">Envoyer</button>
        </div>
        <div class="testlab-suggestions" id="tTestlabSuggestions"></div>
      </div>
    </div>`;
  const res = await fetch(`${BACKEND}/testlab/commands`);
  tTestlabCommands = await res.json();
  tTestlabMessages = [];
  tRenderCmdList(tTestlabCommands);
}

function tRenderCmdList(cmds) {
  document.getElementById('tTestlabCmdCount').textContent = `${cmds.length} commande${cmds.length > 1 ? 's' : ''}`;
  document.getElementById('tTestlabCmdList').innerHTML = cmds.map(c => `
    <div class="testlab-cmd-item" onclick="document.getElementById('tTestlabInput').value='${esc(c.name)} ';document.getElementById('tTestlabInput').focus()">
      <span class="testlab-cmd-name">/${esc(c.name)}</span>
      <span class="testlab-cmd-desc">${esc(c.description)}</span>
    </div>`).join('');
}

function tTestlabFilter() {
  const q = document.getElementById('tTestlabSearch').value.toLowerCase();
  tRenderCmdList(tTestlabCommands.filter(c => c.name.includes(q) || c.description.toLowerCase().includes(q)));
}

function tTestlabKeydown(e) {
  if (e.key === 'Enter') tTestlabSend();
  if (e.key === 'Tab') { e.preventDefault(); const v = document.getElementById('tTestlabInput').value.trim().toLowerCase(); const m = tTestlabCommands.find(c => c.name.startsWith(v)); if (m) document.getElementById('tTestlabInput').value = m.name + ' '; }
  setTimeout(() => {
    const v = document.getElementById('tTestlabInput').value.trim().toLowerCase();
    const sg = document.getElementById('tTestlabSuggestions');
    if (!v) { sg.innerHTML = ''; return; }
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
    if (m.type === 'user') return `<div class="testlab-msg testlab-msg-user"><div class="testlab-msg-avatar">T</div><div class="testlab-msg-body"><div class="testlab-msg-name" style="color:var(--accent)">${esc(testerName)}</div><div class="testlab-msg-content">${esc(m.content)}</div></div></div>`;
    let h = '';
    if (m.content) h += `<div class="testlab-msg-content">${esc(m.content)}</div>`;
    if (m.embed) h += tRenderEmbed(m.embed);
    return `<div class="testlab-msg testlab-msg-bot"><div class="testlab-msg-avatar bot-avatar">⚡</div><div class="testlab-msg-body"><div class="testlab-msg-name" style="color:var(--cyan)">Silver Bot</div>${h}</div></div>`;
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
  if (bot.error) { document.getElementById('tBotInfoContent').innerHTML = '<div class="coming-soon"><div class="icon">●</div><p>Impossible de contacter Discord</p></div>'; return; }
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
testerShowPage('t-overview');
