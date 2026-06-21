const CONFIG_FILE = 'silverapp_config';
const OWNER_ID = '1504594533521031219';
const API_BASE = 'https://discord.com/api/v10';
const MYSQL_CONFIG = {
  host: '163.5.159.107',
  port: 3306,
  user: 'u15187_Ete17ZQbC1',
  pass: 'uujk.EklpewktzI=t8eSqDQ!',
  db: 's15187_DBs',
};

function loadConfig() {
  try {
    return JSON.parse(localStorage.getItem(CONFIG_FILE) || '{}');
  } catch { return {}; }
}

function saveConfig(cfg) {
  localStorage.setItem(CONFIG_FILE, JSON.stringify(cfg));
}

function getToken() {
  return loadConfig().token || '';
}
