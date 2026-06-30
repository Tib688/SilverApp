"""Lightweight FastAPI backend for MySQL queries."""
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import pymysql
import uvicorn
import os
import uuid
from pathlib import Path

UPLOADS_DIR = Path(__file__).parent / "uploads"
UPLOADS_DIR.mkdir(exist_ok=True)

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

DB = {
    "host": "163.5.159.107", "port": 3306,
    "user": "u15187_Ete17ZQbC1", "password": "uujk.EklpewktzI=t8eSqDQ!",
    "database": "s15187_DBs", "charset": "utf8mb4",
    "connect_timeout": 5, "read_timeout": 5,
}

class Query(BaseModel):
    query: str
    params: list = []

@app.post("/query")
async def run_query(q: Query):
    try:
        conn = pymysql.connect(**DB, cursorclass=pymysql.cursors.DictCursor)
        with conn.cursor() as c:
            c.execute(q.query, q.params)
            if q.query.strip().upper().startswith("SELECT") or q.query.strip().upper().startswith("SHOW"):
                rows = c.fetchall()
            else:
                conn.commit()
                rows = [{"affected": c.rowcount}]
        conn.close()
        return rows
    except Exception as e:
        return [{"error": str(e)}]

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix
    name = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOADS_DIR / name
    content = await file.read()
    dest.write_bytes(content)
    return {"url": f"http://127.0.0.1:8051/uploads/{name}", "name": file.filename}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/import-config")
async def import_config():
    import json
    cfg_path = Path.home() / ".silverapp" / "config.json"
    if cfg_path.exists():
        return json.loads(cfg_path.read_text())
    token = os.environ.get('DISCORD_TOKEN', '')
    if token:
        return {"token": token}
    return {}

class ConfigBody(BaseModel):
    token: str = ""
    owner_id: str = ""

@app.post("/save-config")
async def save_config(body: dict):
    import json
    cfg_path = Path.home() / ".silverapp" / "config.json"
    cfg_path.parent.mkdir(exist_ok=True)
    cfg_path.write_text(json.dumps(body, indent=2), encoding="utf-8")
    return {"ok": True}

# Discord API proxy
import aiohttp as _aio

@app.get("/discord/{path:path}")
async def discord_proxy_get(path: str, request: Request):
    cfg = await import_config()
    token = cfg.get("token", "")
    qs = str(request.query_params)
    url = f"https://discord.com/api/v10/{path}" + (f"?{qs}" if qs else "")
    async with _aio.ClientSession() as s:
        async with s.get(url, headers={"Authorization": f"Bot {token}"}) as r:
            return await r.json() if r.status == 200 else {"error": r.status}

class DiscordBody(BaseModel):
    data: dict = {}

@app.post("/discord/{path:path}")
async def discord_proxy_post(path: str, body: DiscordBody):
    cfg = await import_config()
    token = cfg.get("token", "")
    async with _aio.ClientSession() as s:
        async with s.post(f"https://discord.com/api/v10/{path}", headers={"Authorization": f"Bot {token}", "Content-Type": "application/json"}, json=body.data) as r:
            try:
                return await r.json()
            except:
                return {"ok": True} if r.status in (200, 201, 204) else {"error": r.status}

@app.patch("/discord/{path:path}")
async def discord_proxy_patch(path: str, body: DiscordBody):
    cfg = await import_config()
    token = cfg.get("token", "")
    async with _aio.ClientSession() as s:
        async with s.patch(f"https://discord.com/api/v10/{path}", headers={"Authorization": f"Bot {token}", "Content-Type": "application/json"}, json=body.data) as r:
            try:
                return await r.json()
            except:
                return {"ok": True} if r.status in (200, 201, 204) else {"error": r.status}

@app.delete("/discord/{path:path}")
async def discord_proxy_delete(path: str):
    cfg = await import_config()
    token = cfg.get("token", "")
    async with _aio.ClientSession() as s:
        async with s.delete(f"https://discord.com/api/v10/{path}", headers={"Authorization": f"Bot {token}"}) as r:
            try:
                return await r.json()
            except:
                return {"ok": True} if r.status in (200, 201, 204) else {"error": r.status}

# ── Test Lab: proxy to the production server, which runs the real live bot ──
# (only that process has a connected `discord.Client` to execute real commands)
_TESTLAB_REMOTE = "http://nh3r.now-heberg.com:27041"

@app.get("/testlab/commands")
async def testlab_commands():
    try:
        async with _aio.ClientSession() as s:
            async with s.get(f"{_TESTLAB_REMOTE}/testlab/commands", timeout=_aio.ClientTimeout(total=10)) as r:
                return await r.json()
    except Exception:
        return []

@app.post("/testlab/execute")
async def testlab_execute(body: dict):
    try:
        async with _aio.ClientSession() as s:
            async with s.post(f"{_TESTLAB_REMOTE}/testlab/execute", json=body, timeout=_aio.ClientTimeout(total=30)) as r:
                return await r.json()
    except Exception as e:
        return {"error": f"Backend de test injoignable: {e}"}


def ensure_columns():
    try:
        conn = pymysql.connect(**DB)
        with conn.cursor() as c:
            for table in ('tester_chat', 'tester_dms'):
                for col, typedef in [('file_url', 'TEXT'), ('file_name', 'VARCHAR(255)')]:
                    try:
                        c.execute(f"ALTER TABLE `{table}` ADD COLUMN `{col}` {typedef} DEFAULT NULL")
                    except:
                        pass
            try:
                c.execute("""CREATE TABLE IF NOT EXISTS tester_suggestions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    reporter_id VARCHAR(50),
                    reporter_name VARCHAR(100),
                    title VARCHAR(255),
                    description TEXT,
                    status VARCHAR(20) DEFAULT 'pending',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )""")
            except:
                pass
            try:
                c.execute("""CREATE TABLE IF NOT EXISTS testlab_messages (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    sender VARCHAR(50),
                    command TEXT,
                    response_json TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )""")
            except:
                pass
            # One-time cleanup marker
            try:
                c.execute("SELECT 1 FROM _cleanup_done LIMIT 1")
            except:
                try:
                    c.execute("CREATE TABLE _cleanup_done (id INT PRIMARY KEY)")
                    c.execute("INSERT INTO _cleanup_done VALUES (1)")
                    for t in ('tester_announcements', 'tester_bugs', 'forgot_code_requests'):
                        try:
                            c.execute(f"DELETE FROM `{t}` WHERE 1=1")
                        except:
                            pass
                except:
                    pass
            conn.commit()
        conn.close()
    except:
        pass

# ── Voice stubs (voice requires remote backend with bot) ────────────────────

class VoiceBody(BaseModel):
    guild_id: str = ""
    channel_id: str = ""

class TTSBody(BaseModel):
    guild_id: str = ""
    text: str = ""
    lang: str = "fr"

class AmbianceBody(BaseModel):
    guild_id: str = ""
    sound: str = ""

@app.post("/voice/join")
async def voice_join(body: VoiceBody):
    return {"error": "Voice requires remote backend (Nowheberg)"}

@app.post("/voice/leave")
async def voice_leave(body: VoiceBody):
    return {"error": "Voice requires remote backend (Nowheberg)"}

@app.post("/voice/tts")
async def voice_tts(body: TTSBody):
    return {"error": "Voice requires remote backend (Nowheberg)"}

@app.post("/voice/ambiance")
async def voice_ambiance(body: AmbianceBody):
    return {"error": "Voice requires remote backend (Nowheberg)"}

@app.post("/voice/stop")
async def voice_stop(body: VoiceBody):
    return {"error": "Voice requires remote backend (Nowheberg)"}

@app.get("/voice/ambiance/list")
async def voice_ambiance_list():
    return []

# ── Bot logs ──────────────────────────────────────────────────────────────
import json as _json

@app.get("/bot/logs")
async def bot_logs(lines: int = 100):
    log_paths = [
        _bot_dir_local / "bot.log",
        _bot_dir_remote / "bot.log",
        _server_dir / "bot.log",
    ]
    for lp in log_paths:
        if lp.exists():
            try:
                content = lp.read_text(encoding="utf-8", errors="replace")
                return {"lines": content.strip().split("\n")[-lines:]}
            except:
                pass
    return {"lines": []}

# ── Backup / restore ─────────────────────────────────────────────────────

@app.get("/backup/export")
async def backup_export():
    cfg = await import_config()
    tables_data = {}
    try:
        conn = pymysql.connect(**DB, cursorclass=pymysql.cursors.DictCursor)
        with conn.cursor() as c:
            c.execute("SHOW TABLES")
            tables = [list(r.values())[0] for r in c.fetchall()]
            for t in tables:
                if t.startswith('_'): continue
                try:
                    c.execute(f"SELECT * FROM `{t}` LIMIT 500")
                    tables_data[t] = c.fetchall()
                except:
                    pass
        conn.close()
    except:
        pass
    return {"config": cfg, "tables": tables_data, "exported_at": str(datetime.now()) if 'datetime' in dir() else "now"}

class RestoreBody(BaseModel):
    config: dict = {}

@app.post("/backup/restore-config")
async def backup_restore(body: RestoreBody):
    if body.config:
        await save_config(body.config)
    return {"ok": True}

if __name__ == "__main__":
    ensure_columns()
    import os
    port = int(os.environ.get("BACKEND_PORT", 8051))
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="error")
