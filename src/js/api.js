async function discordGet(path) {
  try {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const r = await fetch(`${BACKEND}/discord/${cleanPath}`);
    return await r.json();
  } catch (e) { return { error: e.message }; }
}

async function discordPost(path, data) {
  try {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const r = await fetch(`${BACKEND}/discord/${cleanPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    return await r.json();
  } catch (e) { return { error: e.message }; }
}

async function discordPatch(path, data) {
  try {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const r = await fetch(`${BACKEND}/discord/${cleanPath}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    return await r.json();
  } catch (e) { return { error: e.message }; }
}

async function discordDelete(path) {
  try {
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const r = await fetch(`${BACKEND}/discord/${cleanPath}`, { method: 'DELETE' });
    return await r.json();
  } catch (e) { return { error: e.message }; }
}

// Backend API — try local first, fallback to remote
const BACKEND_REMOTE = 'http://nh3r.now-heberg.com:27041';
const BACKEND_LOCAL = 'http://127.0.0.1:8051';
let BACKEND = BACKEND_REMOTE;

(async () => {
  try {
    const r = await fetch(`${BACKEND_LOCAL}/health`, { signal: AbortSignal.timeout(1500) });
    const d = await r.json();
    if (d.status === 'ok') BACKEND = BACKEND_LOCAL;
  } catch {}
})();

async function dbQuery(query, params = []) {
  try {
    const r = await fetch(`${BACKEND}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, params }),
    });
    return await r.json();
  } catch { return []; }
}

async function dbScalar(query, params = []) {
  const rows = await dbQuery(query, params);
  if (rows.length && rows[0]) {
    const vals = Object.values(rows[0]);
    return vals[0] || 0;
  }
  return 0;
}

function getBotAvatar(userData, size = 128) {
  if (!userData) return null;
  const { id, avatar } = userData;
  if (avatar) {
    const ext = avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${ext}?size=${size}`;
  }
  const index = (BigInt(id) >> 22n) % 6n;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png?size=${size}`;
}

function getUserAvatar(userId, avatarHash, size = 64) {
  if (avatarHash) {
    const ext = avatarHash.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${ext}?size=${size}`;
  }
  const index = Number((BigInt(userId) >> 22n) % 6n);
  return `https://cdn.discordapp.com/embed/avatars/${index}.png?size=${size}`;
}
