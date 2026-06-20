import customtkinter as ctk
import threading
import requests
import pymysql
import json
import os
import io
import time
import pyotp
from datetime import datetime
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageTk
try:
    from pypresence import Presence as RPC
except ImportError:
    RPC = None

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIG
# ═══════════════════════════════════════════════════════════════════════════════

APP_NAME = "Silver App"
VERSION = "1.1"

CONFIG_DIR = Path.home() / ".silverapp"
CONFIG_DIR.mkdir(exist_ok=True)
CONFIG_FILE = CONFIG_DIR / "config.json"
CACHE_DIR = CONFIG_DIR / "avatar_cache"
CACHE_DIR.mkdir(exist_ok=True)

def load_config():
    if CONFIG_FILE.exists():
        return json.loads(CONFIG_FILE.read_text())
    return {}

def save_config(cfg):
    CONFIG_FILE.write_text(json.dumps(cfg, indent=2))

config = load_config()
DISCORD_API = "https://discord.com/api/v10"

# ═══════════════════════════════════════════════════════════════════════════════
# USER CACHE (username + avatar)
# ═══════════════════════════════════════════════════════════════════════════════

_user_cache = {}

def fetch_discord_user(user_id, token):
    if user_id in _user_cache:
        return _user_cache[user_id]
    try:
        r = requests.get(f"{DISCORD_API}/users/{user_id}", headers={"Authorization": f"Bot {token}"}, timeout=5)
        if r.status_code == 200:
            data = r.json()
            _user_cache[user_id] = data
            return data
    except Exception:
        pass
    return None

def get_avatar_url(user_data, size=64):
    if not user_data:
        return None
    avatar = user_data.get("avatar")
    uid = user_data.get("id")
    if avatar:
        ext = "gif" if avatar.startswith("a_") else "png"
        return f"https://cdn.discordapp.com/avatars/{uid}/{avatar}.{ext}?size={size}"
    discrim = int(user_data.get("discriminator", "0"))
    index = (int(uid) >> 22) % 6 if discrim == 0 else discrim % 5
    return f"https://cdn.discordapp.com/embed/avatars/{index}.png?size={size}"

def download_avatar(url, size=40):
    cache_key = url.split("?")[0].replace("/", "_").replace(":", "")
    cache_path = CACHE_DIR / f"{cache_key}_{size}.png"
    if cache_path.exists():
        try:
            return Image.open(cache_path)
        except Exception:
            pass
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200:
            img = Image.open(io.BytesIO(r.content)).resize((size, size), Image.LANCZOS)
            # Make circular
            mask = Image.new('L', (size, size), 0)
            draw = ImageDraw.Draw(mask)
            draw.ellipse((0, 0, size, size), fill=255)
            output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
            output.paste(img.convert('RGBA'), (0, 0))
            output.putalpha(mask)
            output.save(cache_path, "PNG")
            return output
    except Exception:
        pass
    # Fallback: grey circle
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse((0, 0, size-1, size-1), fill=(60, 60, 80, 255))
    return img

# ═══════════════════════════════════════════════════════════════════════════════
# MYSQL
# ═══════════════════════════════════════════════════════════════════════════════

def get_db():
    cfg = load_config()
    return pymysql.connect(
        host=cfg.get("mysql_host", "163.5.159.107"),
        port=int(cfg.get("mysql_port", 3306)),
        user=cfg.get("mysql_user", "u15187_Ete17ZQbC1"),
        password=cfg.get("mysql_pass", ""),
        database=cfg.get("mysql_db", "s15187_DBs"),
        charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        connect_timeout=10,
    )

def db_query(query, params=()):
    try:
        conn = get_db()
        with conn.cursor() as c:
            c.execute(query, params)
            rows = c.fetchall()
        conn.close()
        return rows
    except Exception as e:
        print(f"DB error: {e}")
        return []

def db_scalar(query, params=()):
    try:
        conn = get_db()
        with conn.cursor() as c:
            c.execute(query, params)
            row = c.fetchone()
        conn.close()
        return list(row.values())[0] if row else 0
    except Exception:
        return 0

# ═══════════════════════════════════════════════════════════════════════════════
# DISCORD API
# ═══════════════════════════════════════════════════════════════════════════════

def discord_get(path, token):
    try:
        r = requests.get(f"{DISCORD_API}{path}", headers={"Authorization": f"Bot {token}"}, timeout=10)
        return r.json() if r.status_code == 200 else {"error": r.status_code}
    except Exception as e:
        return {"error": str(e)}

def discord_post(path, token, data):
    try:
        r = requests.post(f"{DISCORD_API}{path}", headers={"Authorization": f"Bot {token}", "Content-Type": "application/json"}, json=data, timeout=10)
        return r.json() if r.status_code in (200, 201) else {"ok": True} if r.status_code == 204 else {"error": r.status_code}
    except Exception as e:
        return {"error": str(e)}

def discord_patch(path, token, data):
    try:
        r = requests.patch(f"{DISCORD_API}{path}", headers={"Authorization": f"Bot {token}", "Content-Type": "application/json"}, json=data, timeout=10)
        return {"ok": True} if r.status_code in (200, 204) else {"error": r.status_code}
    except Exception as e:
        return {"error": str(e)}

def discord_delete(path, token):
    try:
        r = requests.delete(f"{DISCORD_API}{path}", headers={"Authorization": f"Bot {token}"}, timeout=10)
        return {"ok": True} if r.status_code in (200, 204) else {"error": r.status_code}
    except Exception as e:
        return {"error": str(e)}

# ═══════════════════════════════════════════════════════════════════════════════
# PRESENCE & FILE HELPERS
# ═══════════════════════════════════════════════════════════════════════════════

OWNER_ID = "1504594533521031219"
DOWNLOAD_DIR = CONFIG_DIR / "downloads"
DOWNLOAD_DIR.mkdir(exist_ok=True)

def ping_presence(discord_id, username, is_owner=False):
    try:
        conn = get_db()
        with conn.cursor() as c:
            c.execute("INSERT INTO user_presence (discord_id, username, last_ping, last_seen, is_owner) VALUES (%s,%s,NOW(),NOW(),%s) ON DUPLICATE KEY UPDATE last_ping=NOW(), last_seen=NOW(), username=%s", (discord_id, username, int(is_owner), username))
        conn.commit(); conn.close()
    except: pass

def get_presences():
    return db_query("SELECT discord_id, username, last_ping, last_seen, is_owner FROM user_presence ORDER BY last_ping DESC")

def is_online(last_ping):
    if not last_ping: return False
    from datetime import datetime, timedelta
    if isinstance(last_ping, str):
        try: last_ping = datetime.strptime(last_ping, "%Y-%m-%d %H:%M:%S")
        except: return False
    return (datetime.utcnow() - last_ping).total_seconds() < 90

def format_last_seen(last_seen):
    if not last_seen: return "Jamais"
    from datetime import datetime
    if isinstance(last_seen, str):
        try: last_seen = datetime.strptime(last_seen, "%Y-%m-%d %H:%M:%S")
        except: return str(last_seen)[:16]
    diff = (datetime.utcnow() - last_seen).total_seconds()
    if diff < 60: return "A l'instant"
    if diff < 3600: return f"Il y a {int(diff/60)}m"
    if diff < 86400: return f"Il y a {int(diff/3600)}h"
    return last_seen.strftime("%d/%m %H:%M")

def save_file_to_disk(file_name, file_data):
    path = DOWNLOAD_DIR / file_name
    i = 1
    while path.exists():
        stem = Path(file_name).stem
        ext = Path(file_name).suffix
        path = DOWNLOAD_DIR / f"{stem}_{i}{ext}"
        i += 1
    path.write_bytes(file_data)
    return path

import base64
import tkinter.filedialog as filedialog

# ═══════════════════════════════════════════════════════════════════════════════
# THEME
# ═══════════════════════════════════════════════════════════════════════════════

BG = "#131318"
CARD = "#1c1c24"
BORDER = "#2a2a35"
TEXT = "#c0c5d0"
BRIGHT = "#e8ecf4"
DIM = "#6b7186"
ACCENT = "#9ba2b2"
GREEN = "#4ade80"
RED = "#f87171"

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("dark-blue")

# ═══════════════════════════════════════════════════════════════════════════════
# LOADING SPINNER
# ═══════════════════════════════════════════════════════════════════════════════

class LoadingSpinner(ctk.CTkFrame):
    def __init__(self, parent, text="Chargement..."):
        super().__init__(parent, fg_color="transparent")
        self.dots = 0
        self.base_text = text
        self.label = ctk.CTkLabel(self, text=text, font=("Segoe UI", 13), text_color=DIM)
        self.label.pack(pady=40)
        self._animate()

    def _animate(self):
        self.dots = (self.dots + 1) % 4
        self.label.configure(text=self.base_text + "." * self.dots)
        self._job = self.after(400, self._animate)

    def stop(self):
        if hasattr(self, '_job'):
            self.after_cancel(self._job)
        self.destroy()

# ═══════════════════════════════════════════════════════════════════════════════
# SETUP WINDOW
# ═══════════════════════════════════════════════════════════════════════════════

class SetupWindow(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title(f"{APP_NAME} - Configuration")
        self.geometry("500x600")
        self.resizable(False, False)
        self.configure(fg_color=BG)

        ctk.CTkLabel(self, text="SILVER APP", font=("Segoe UI", 28, "bold"), text_color=BRIGHT).pack(pady=(25, 3))
        ctk.CTkLabel(self, text="Configuration initiale", font=("Segoe UI", 12), text_color=DIM).pack()

        frame = ctk.CTkFrame(self, fg_color=CARD, corner_radius=12, border_width=1, border_color=BORDER)
        frame.pack(padx=30, pady=15, fill="x")

        self.entries = {}
        fields = [
            ("token", "BOT TOKEN DISCORD", "", True),
            ("mysql_host", "MYSQL HOST", "163.5.159.107", False),
            ("mysql_port", "MYSQL PORT", "3306", False),
            ("mysql_user", "MYSQL USER", "u15187_Ete17ZQbC1", False),
            ("mysql_pass", "MYSQL PASSWORD", "", True),
            ("mysql_db", "MYSQL DATABASE", "s15187_DBs", False),
        ]

        for key, label, default, is_secret in fields:
            ctk.CTkLabel(frame, text=label, font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=18, pady=(8, 2), anchor="w")
            e = ctk.CTkEntry(frame, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=32, show="*" if is_secret else "")
            e.pack(padx=18, fill="x")
            val = config.get(key, default)
            if val:
                e.insert(0, val)
            self.entries[key] = e

        self.status_label = ctk.CTkLabel(self, text="", font=("Segoe UI", 11), text_color=RED)
        self.status_label.pack(pady=5)

        ctk.CTkButton(self, text="Sauvegarder et lancer", font=("Segoe UI", 14, "bold"), height=40, corner_radius=8, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, command=self.save_and_launch).pack(padx=30, fill="x")

    def save_and_launch(self):
        for key, entry in self.entries.items():
            config[key] = entry.get().strip()
        if not config.get("token"):
            self.status_label.configure(text="Token requis"); return
        try:
            conn = pymysql.connect(host=config["mysql_host"], port=int(config.get("mysql_port", 3306)), user=config["mysql_user"], password=config["mysql_pass"], database=config["mysql_db"], connect_timeout=5)
            conn.close()
        except Exception as e:
            self.status_label.configure(text=f"MySQL erreur: {str(e)[:60]}"); return
        save_config(config)
        self.destroy()
        MainApp().mainloop()

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN APP
# ═══════════════════════════════════════════════════════════════════════════════

class MainApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.cfg = load_config()
        self.token = self.cfg.get("token", "")
        self._avatar_refs = []
        self._rpc = None
        self._bot_id = None

        self.title(APP_NAME)
        self.geometry("1200x750")
        self.minsize(900, 600)
        self.configure(fg_color=BG)

        threading.Thread(target=self._setup_bot_identity, daemon=True).start()
        self.protocol("WM_DELETE_WINDOW", self._on_close)
        self._presence_loop()

        # Sidebar
        self.sidebar = ctk.CTkFrame(self, width=220, fg_color="#16161e", corner_radius=0)
        self.sidebar.pack(side="left", fill="y")
        self.sidebar.pack_propagate(False)

        # Sidebar brand - will be updated with bot avatar
        self._brand_frame = ctk.CTkFrame(self.sidebar, fg_color="transparent")
        self._brand_frame.pack(pady=(15, 2))
        self._brand_avatar_label = ctk.CTkLabel(self._brand_frame, text="", width=40)
        self._brand_avatar_label.pack(side="left", padx=(0, 8))
        brand_text = ctk.CTkFrame(self._brand_frame, fg_color="transparent")
        brand_text.pack(side="left")
        ctk.CTkLabel(brand_text, text="SILVER APP", font=("Segoe UI", 16, "bold"), text_color=BRIGHT).pack(anchor="w")
        ctk.CTkLabel(brand_text, text="By Tib", font=("Segoe UI", 10), text_color=ACCENT).pack(anchor="w")
        ctk.CTkLabel(brand_text, text=f"v{VERSION}", font=("Segoe UI", 9), text_color=DIM).pack(anchor="w")
        ctk.CTkFrame(self.sidebar, height=1, fg_color=BORDER).pack(fill="x", padx=12, pady=(10, 5))

        self.nav_buttons = {}
        nav = [
            ("main", [("overview", "Vue d'ensemble"), ("moderation", "Moderation"), ("tickets", "Tickets")]),
            ("engagement", [("leaderboard", "Leaderboard"), ("members", "Membres"), ("suggestions", "Suggestions")]),
            ("controle", [("control", "Controle Bot"), ("botinfo", "Bot Info")]),
            ("testeurs", [("tchat", "Chat Testeurs"), ("tbugs", "Bugs Reports"), ("testlab", "Test Lab"), ("forgot", "Codes oublies")]),
            ("systeme", [("database", "Base de donnees"), ("settings", "Parametres")]),
        ]

        for section, items in nav:
            ctk.CTkLabel(self.sidebar, text=section.upper(), font=("Segoe UI", 9, "bold"), text_color="#454a5c", anchor="w").pack(padx=16, pady=(12, 2), fill="x")
            for key, label in items:
                btn = ctk.CTkButton(self.sidebar, text=f"  {label}", font=("Segoe UI", 13), anchor="w", height=34, corner_radius=6, fg_color="transparent", hover_color="#22222e", text_color=DIM, command=lambda k=key: self.show_page(k))
                btn.pack(padx=8, fill="x", pady=1)
                self.nav_buttons[key] = btn

        # Content wrapper with welcome banner
        self.content_wrapper = ctk.CTkFrame(self, fg_color=BG, corner_radius=0)
        self.content_wrapper.pack(side="right", fill="both", expand=True)

        self._welcome_banner = ctk.CTkFrame(self.content_wrapper, fg_color=CARD, corner_radius=0, height=50)
        self._welcome_banner.pack(fill="x"); self._welcome_banner.pack_propagate(False)
        wi = ctk.CTkFrame(self._welcome_banner, fg_color="transparent"); wi.pack(fill="both", expand=True, padx=20)
        self._admin_welcome = ctk.CTkLabel(wi, text="Welcome !", font=("Segoe UI", 15, "bold"), text_color=BRIGHT)
        self._admin_welcome.pack(side="left")
        self._admin_welcome_sub = ctk.CTkLabel(wi, text="Owner  |  Silver Bot", font=("Segoe UI", 11), text_color=DIM)
        self._admin_welcome_sub.pack(side="right")

        self.content = ctk.CTkFrame(self.content_wrapper, fg_color=BG, corner_radius=0)
        self.content.pack(fill="both", expand=True)
        self.show_page("overview")

    def _setup_bot_identity(self):
        if not self.token:
            return
        me = discord_get("/users/@me", self.token)
        if not isinstance(me, dict) or "error" in me:
            return
        self._bot_id = me.get("id")
        bot_name = me.get("username", "Silver Bot")

        # Download bot avatar for window icon + sidebar
        url = get_avatar_url(me, 128)
        if url:
            avatar = download_avatar(url, 40)
            icon_img = download_avatar(url, 64)

            # Set window icon
            icon_path = CACHE_DIR / "bot_icon.ico"
            try:
                icon_full = download_avatar(url, 256)
                icon_full_rgb = Image.new('RGB', icon_full.size, (19, 19, 24))
                icon_full_rgb.paste(icon_full, mask=icon_full.split()[3] if icon_full.mode == 'RGBA' else None)
                icon_full_rgb.save(str(icon_path), format='ICO', sizes=[(256, 256)])
                self.after(0, lambda: self.iconbitmap(str(icon_path)))
            except Exception:
                pass

            # Set sidebar avatar
            ctk_img = ctk.CTkImage(light_image=avatar, dark_image=avatar, size=(40, 40))
            self._avatar_refs.append(ctk_img)
            self.after(0, lambda: self._brand_avatar_label.configure(image=ctk_img))

        # Update welcome banner
        self.after(0, lambda: self._admin_welcome.configure(text=f"Welcome, Tib !"))
        self.after(0, lambda: self._admin_welcome_sub.configure(text=f"Owner  |  {bot_name}"))

        # Start Rich Presence
        if RPC and self._bot_id:
            try:
                self._rpc = RPC(self._bot_id)
                self._rpc.connect()
                self._rpc.update(
                    state="Silver Bot App",
                    details=f"Managing {bot_name}",
                    large_image="silver",
                    large_text="Silver Bot App",
                    start=int(time.time()),
                )
            except Exception:
                self._rpc = None

    def _presence_loop(self):
        ping_presence(OWNER_ID, "Tib", is_owner=True)
        self.after(30000, self._presence_loop)

    def _on_close(self):
        if self._rpc:
            try: self._rpc.close()
            except: pass
        self.destroy()

    def show_page(self, name):
        self._current_page = name
        for k, btn in self.nav_buttons.items():
            btn.configure(fg_color="#22222e" if k == name else "transparent", text_color=BRIGHT if k == name else DIM)
        for w in self.content.winfo_children():
            w.destroy()
        self._avatar_refs = []
        getattr(self, f"page_{name}", self.page_empty)()

    def _threaded_load(self, parent_or_scroll, load_fn):
        spinner = LoadingSpinner(parent_or_scroll)
        spinner.pack(fill="x")
        def _run():
            result = load_fn()
            self.after(0, lambda: (spinner.stop(), result()))
        threading.Thread(target=_run, daemon=True).start()

    # ── OVERVIEW ──────────────────────────────────────────────────────────────

    def page_overview(self):
        self._header("Vue d'ensemble", "Donnees en temps reel depuis MySQL")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll)
        spinner.pack(fill="x")

        def _load():
            me = discord_get("/users/@me", self.token) if self.token else {}
            guilds = discord_get("/users/@me/guilds", self.token) if self.token else []
            guild_count = len(guilds) if isinstance(guilds, list) else 0
            stats = [
                ("Serveurs", guild_count),
                ("Utilisateurs", db_scalar("SELECT COUNT(DISTINCT user_id) FROM user_xp")),
                ("XP Total", db_scalar("SELECT COALESCE(SUM(xp),0) FROM user_xp")),
                ("Messages", db_scalar("SELECT COALESCE(SUM(messages_count),0) FROM global_user_stats")),
                ("Warns", db_scalar("SELECT COUNT(*) FROM warnings")),
                ("Tickets", db_scalar("SELECT COUNT(*) FROM tickets")),
                ("Ouverts", db_scalar("SELECT COUNT(*) FROM tickets WHERE status='open'")),
                ("Suggestions", db_scalar("SELECT COUNT(*) FROM suggestions")),
            ]

            def _render():
                spinner.stop()
                sf = ctk.CTkFrame(scroll, fg_color="transparent")
                sf.pack(fill="x", padx=20, pady=(0, 15))
                for i in range(4): sf.grid_columnconfigure(i, weight=1)
                for i, (label, val) in enumerate(stats):
                    self._stat_card(sf, label, str(val), i // 4, i % 4)

                if isinstance(guilds, list):
                    self._section(scroll, "Bot Discord - Live")
                    f = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
                    f.pack(fill="x", padx=20, pady=(0, 10))
                    ctk.CTkLabel(f, text=f"{me.get('username', '?')}  |  {len(guilds)} serveur(s)  |  ID: {me.get('id', '?')}", font=("Segoe UI", 13), text_color=BRIGHT).pack(padx=15, pady=12)
            return _render

        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── MODERATION ────────────────────────────────────────────────────────────

    def page_moderation(self):
        self._header("Moderation", "Avertissements")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll)
        spinner.pack(fill="x")

        def _load():
            rows = db_query("SELECT id, guild_id, user_id, mod_id, reason, created_at FROM warnings ORDER BY created_at DESC LIMIT 50")
            users = {}
            for r in rows:
                for uid in [r['user_id'], r['mod_id']]:
                    if uid not in users:
                        u = fetch_discord_user(uid, self.token)
                        users[uid] = u.get('username', str(uid)[-6:]) if u else str(uid)[-6:]

            def _render():
                spinner.stop()
                if not rows:
                    self._empty(scroll, "Aucun avertissement"); return
                self._section(scroll, f"{len(rows)} avertissement(s)")
                self._table(scroll, ["ID", "User", "Moderateur", "Raison", "Date"],
                    [[f"#{r['id']}", users.get(r['user_id'], '?'), users.get(r['mod_id'], '?'), (r['reason'] or '')[:40], str(r.get('created_at', ''))[:16]] for r in rows])
            return _render

        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── TICKETS ───────────────────────────────────────────────────────────────

    def page_tickets(self):
        self._header("Tickets", "Support")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll)
        spinner.pack(fill="x")

        def _load():
            rows = db_query("SELECT ticket_id, guild_id, user_id, status, created_at FROM tickets ORDER BY created_at DESC LIMIT 50")
            users = {}
            for r in rows:
                uid = r['user_id']
                if uid not in users:
                    u = fetch_discord_user(uid, self.token)
                    users[uid] = u.get('username', str(uid)[-6:]) if u else str(uid)[-6:]

            def _render():
                spinner.stop()
                if not rows:
                    self._empty(scroll, "Aucun ticket"); return
                open_c = sum(1 for r in rows if r['status'] == 'open')
                self._section(scroll, f"{len(rows)} ticket(s) | {open_c} ouvert(s)")
                self._table(scroll, ["ID", "User", "Statut", "Date"],
                    [[f"#{r['ticket_id']}", users.get(r['user_id'], '?'), r['status'], str(r.get('created_at', ''))[:16]] for r in rows])
            return _render

        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── LEADERBOARD ───────────────────────────────────────────────────────────

    def page_leaderboard(self):
        self._header("Leaderboard", "Classement XP")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll, "Chargement du leaderboard")
        spinner.pack(fill="x")

        def _load():
            rows = db_query("SELECT user_id, SUM(xp) as xp, SUM(chat_xp) as chat_xp, SUM(voice_xp) as voice_xp, SUM(messages_count) as msgs FROM user_xp GROUP BY user_id ORDER BY xp DESC LIMIT 20")

            user_data = {}
            avatars = {}
            for r in rows:
                uid = r['user_id']
                u = fetch_discord_user(uid, self.token)
                user_data[uid] = u
                if u:
                    url = get_avatar_url(u, 64)
                    if url:
                        avatars[uid] = download_avatar(url, 36)

            def _render():
                spinner.stop()
                if not rows:
                    self._empty(scroll, "Aucune donnee XP"); return

                for i, r in enumerate(rows):
                    uid = r['user_id']
                    u = user_data.get(uid)
                    username = u.get('username', '?') if u else str(uid)
                    xp = r['xp'] or 0
                    msgs = r['msgs'] or 0
                    chat = r['chat_xp'] or 0

                    row_frame = ctk.CTkFrame(scroll, fg_color=CARD if i % 2 == 0 else "#1e1e28", corner_radius=10, border_width=1, border_color=BORDER, height=56)
                    row_frame.pack(fill="x", padx=20, pady=2)
                    row_frame.pack_propagate(False)

                    inner = ctk.CTkFrame(row_frame, fg_color="transparent")
                    inner.pack(fill="both", expand=True, padx=12, pady=8)

                    # Rank
                    rank_colors = {0: "#ffd700", 1: "#c0c0c0", 2: "#cd7f32"}
                    rank_color = rank_colors.get(i, DIM)
                    ctk.CTkLabel(inner, text=f"#{i+1}", font=("Segoe UI", 16, "bold"), text_color=rank_color, width=45, anchor="w").pack(side="left")

                    # Avatar
                    if uid in avatars:
                        avatar_img = avatars[uid]
                        ctk_img = ctk.CTkImage(light_image=avatar_img, dark_image=avatar_img, size=(36, 36))
                        self._avatar_refs.append(ctk_img)
                        ctk.CTkLabel(inner, image=ctk_img, text="", width=36).pack(side="left", padx=(0, 10))
                    else:
                        placeholder = ctk.CTkFrame(inner, width=36, height=36, corner_radius=18, fg_color="#2a2a35")
                        placeholder.pack(side="left", padx=(0, 10))
                        placeholder.pack_propagate(False)
                        ctk.CTkLabel(placeholder, text=username[0].upper() if username else "?", font=("Segoe UI", 14, "bold"), text_color=DIM).pack(expand=True)

                    # Username
                    ctk.CTkLabel(inner, text=username, font=("Segoe UI", 14, "bold"), text_color=BRIGHT, width=160, anchor="w").pack(side="left")

                    # Stats
                    for label, value in [("XP", str(xp)), ("Messages", str(msgs)), ("Chat", str(chat))]:
                        sf = ctk.CTkFrame(inner, fg_color="transparent", width=110)
                        sf.pack(side="left", padx=5)
                        sf.pack_propagate(False)
                        ctk.CTkLabel(sf, text=label, font=("Segoe UI", 9), text_color=DIM, anchor="w").pack(anchor="w")
                        ctk.CTkLabel(sf, text=value, font=("Segoe UI", 13, "bold"), text_color=BRIGHT, anchor="w").pack(anchor="w")

            return _render

        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── MEMBERS ───────────────────────────────────────────────────────────────

    def page_members(self):
        self._header("Recherche Membre", "Profil par User ID")
        frame = ctk.CTkFrame(self.content, fg_color="transparent")
        frame.pack(fill="x", padx=20, pady=10)
        self.member_entry = ctk.CTkEntry(frame, placeholder_text="User ID Discord...", fg_color=CARD, border_color=BORDER, text_color=BRIGHT, height=38, width=300)
        self.member_entry.pack(side="left", padx=(0, 10))
        self.member_entry.bind("<Return>", lambda e: self._search_member())
        ctk.CTkButton(frame, text="Rechercher", height=38, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, command=self._search_member).pack(side="left")
        self.member_result = ctk.CTkFrame(self.content, fg_color="transparent")
        self.member_result.pack(fill="both", expand=True, padx=20)

    def _search_member(self):
        uid = self.member_entry.get().strip()
        if not uid or not uid.isdigit(): return
        for w in self.member_result.winfo_children(): w.destroy()

        spinner = LoadingSpinner(self.member_result)
        spinner.pack(fill="x")

        def _load():
            uid_int = int(uid)
            guild_stats = db_query("SELECT guild_id, xp, chat_xp, voice_xp, messages_count, voice_minutes FROM user_xp WHERE user_id = %s", (uid_int,))
            warns = db_query("SELECT id, guild_id, reason, created_at FROM warnings WHERE user_id = %s ORDER BY created_at DESC", (uid_int,))
            global_xp = db_scalar("SELECT COALESCE(global_xp, 0) FROM global_user_profile WHERE user_id = %s", (uid_int,))
            user = fetch_discord_user(uid_int, self.token)
            avatar = None
            if user:
                url = get_avatar_url(user, 128)
                if url: avatar = download_avatar(url, 56)

            def _render():
                spinner.stop()
                scroll = ctk.CTkScrollableFrame(self.member_result, fg_color="transparent")
                scroll.pack(fill="both", expand=True)

                username = user.get('username', uid) if user else uid
                level = int(((global_xp or 0) / 100) ** 0.5)

                # Profile header
                hf = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
                hf.pack(fill="x", pady=(0, 10))
                hi = ctk.CTkFrame(hf, fg_color="transparent")
                hi.pack(padx=15, pady=12, fill="x")

                if avatar:
                    ctk_img = ctk.CTkImage(light_image=avatar, dark_image=avatar, size=(56, 56))
                    self._avatar_refs.append(ctk_img)
                    ctk.CTkLabel(hi, image=ctk_img, text="", width=56).pack(side="left", padx=(0, 12))

                info = ctk.CTkFrame(hi, fg_color="transparent")
                info.pack(side="left")
                ctk.CTkLabel(info, text=username, font=("Segoe UI", 16, "bold"), text_color=BRIGHT).pack(anchor="w")
                ctk.CTkLabel(info, text=f"Niveau {level}  |  XP: {global_xp}  |  {len(warns)} warn(s)", font=("Segoe UI", 12), text_color=DIM).pack(anchor="w")

                if guild_stats:
                    self._section(scroll, "Stats par serveur")
                    self._table(scroll, ["Serveur", "XP", "Chat", "Voice", "Messages", "Voice Time"],
                        [[str(g['guild_id'])[-6:], str(g['xp'] or 0), str(g['chat_xp'] or 0), str(g['voice_xp'] or 0), str(g['messages_count'] or 0), f"{g['voice_minutes'] or 0}m"] for g in guild_stats])
                if warns:
                    self._section(scroll, "Avertissements")
                    self._table(scroll, ["ID", "Serveur", "Raison", "Date"],
                        [[f"#{w['id']}", str(w['guild_id'])[-6:], (w['reason'] or '')[:50], str(w.get('created_at', ''))[:16]] for w in warns])
            return _render

        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── SUGGESTIONS ───────────────────────────────────────────────────────────

    def page_suggestions(self):
        self._header("Suggestions", "Idees des membres")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll)
        spinner.pack(fill="x")
        def _load():
            rows = db_query("SELECT id, guild_id, user_id, content, status, created_at FROM suggestions ORDER BY created_at DESC LIMIT 30")
            def _render():
                spinner.stop()
                if not rows: self._empty(scroll, "Aucune suggestion"); return
                self._table(scroll, ["ID", "User", "Contenu", "Statut", "Date"],
                    [[f"#{r['id']}", str(r['user_id'])[-6:], (r['content'] or '')[:40], r['status'], str(r.get('created_at', ''))[:16]] for r in rows])
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── CONTROL ───────────────────────────────────────────────────────────────

    def page_control(self):
        self._header("Controle Bot", "Gerer Silver Bot")
        scroll = self._scrollable()

        self._section(scroll, "Envoyer une annonce")
        af = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
        af.pack(fill="x", pady=(0, 15))
        for lbl, attr, ph, w in [("Channel ID:", "ann_ch", "ID du channel", 200), ("Titre:", "ann_title", "Optionnel", 300)]:
            r = ctk.CTkFrame(af, fg_color="transparent"); r.pack(fill="x", padx=15, pady=4)
            ctk.CTkLabel(r, text=lbl, font=("Segoe UI", 12), text_color=DIM, width=80, anchor="w").pack(side="left")
            e = ctk.CTkEntry(r, placeholder_text=ph, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=30, width=w); e.pack(side="left", padx=5)
            setattr(self, attr, e)
        r = ctk.CTkFrame(af, fg_color="transparent"); r.pack(fill="x", padx=15, pady=4)
        ctk.CTkLabel(r, text="Message:", font=("Segoe UI", 12), text_color=DIM, width=80, anchor="w").pack(side="left")
        self.ann_msg = ctk.CTkTextbox(r, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=60, width=300, border_width=1); self.ann_msg.pack(side="left", padx=5)
        rb = ctk.CTkFrame(af, fg_color="transparent"); rb.pack(fill="x", padx=15, pady=(4, 12))
        self.ann_status = ctk.CTkLabel(rb, text="", font=("Segoe UI", 11))
        ctk.CTkButton(rb, text="Envoyer", height=32, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=120, command=self._send_announce).pack(side="left")
        self.ann_status.pack(side="left", padx=10)

        self._section(scroll, "Actions rapides")
        grid = ctk.CTkFrame(scroll, fg_color="transparent"); grid.pack(fill="x")
        grid.grid_columnconfigure(0, weight=1); grid.grid_columnconfigure(1, weight=1)
        for i, (title, fields, btn_text, cmd) in enumerate([
            ("Slowmode", [("slow_ch", "Channel ID", 140), ("slow_sec", "Secondes", 70)], "Appliquer", self._set_slowmode),
            ("Purge", [("purge_ch", "Channel ID", 140), ("purge_cnt", "Nombre", 70)], "Purger", self._purge),
            ("Topic", [("topic_ch", "Channel ID", 140), ("topic_txt", "Nouveau topic", 140)], "Appliquer", self._set_topic),
            ("Nickname Bot", [("nick_guild", "Guild ID", 140), ("nick_name", "Pseudo", 140)], "Appliquer", self._set_nickname),
        ]):
            f = ctk.CTkFrame(grid, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
            f.grid(row=i//2, column=i%2, padx=4, pady=4, sticky="ew")
            ctk.CTkLabel(f, text=title, font=("Segoe UI", 13, "bold"), text_color=BRIGHT).pack(padx=12, pady=(10, 5), anchor="w")
            r = ctk.CTkFrame(f, fg_color="transparent"); r.pack(fill="x", padx=12, pady=3)
            for attr, ph, w in fields:
                e = ctk.CTkEntry(r, placeholder_text=ph, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=28, width=w); e.pack(side="left", padx=(0, 4))
                setattr(self, attr, e)
            rb = ctk.CTkFrame(f, fg_color="transparent"); rb.pack(fill="x", padx=12, pady=(3, 10))
            status_attr = f"_ctl_status_{i}"
            sl = ctk.CTkLabel(rb, text="", font=("Segoe UI", 10)); setattr(self, status_attr, sl)
            ctk.CTkButton(rb, text=btn_text, height=26, corner_radius=5, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=80, command=lambda c=cmd, s=status_attr: self._run_action(c, s)).pack(side="left")
            sl.pack(side="left", padx=8)

    def _run_action(self, action_fn, status_attr):
        sl = getattr(self, status_attr)
        sl.configure(text="...", text_color=DIM)
        def _do():
            result = action_fn()
            ok = result.get("ok", False) if isinstance(result, dict) else False
            self.after(0, lambda: sl.configure(text="OK" if ok else "Erreur", text_color=GREEN if ok else RED))
        threading.Thread(target=_do, daemon=True).start()

    def _send_announce(self):
        ch = self.ann_ch.get().strip(); msg = self.ann_msg.get("1.0", "end").strip()
        if not ch or not msg: self.ann_status.configure(text="Champs requis", text_color=RED); return
        title = self.ann_title.get().strip()
        embed = {"description": msg, "color": 0xC0C5D0, "timestamp": datetime.utcnow().isoformat()}
        if title: embed["title"] = title
        def _do():
            r = discord_post(f"/channels/{ch}/messages", self.token, {"embeds": [embed]})
            ok = "error" not in r
            self.after(0, lambda: self.ann_status.configure(text="OK" if ok else "Erreur", text_color=GREEN if ok else RED))
        threading.Thread(target=_do, daemon=True).start()

    def _set_slowmode(self):
        return discord_patch(f"/channels/{self.slow_ch.get().strip()}", self.token, {"rate_limit_per_user": int(self.slow_sec.get().strip() or 0)})

    def _purge(self):
        ch = self.purge_ch.get().strip(); cnt = min(int(self.purge_cnt.get().strip() or 10), 100)
        msgs = discord_get(f"/channels/{ch}/messages?limit={cnt}", self.token)
        if not isinstance(msgs, list): return {"error": True}
        ids = [m["id"] for m in msgs]
        if len(ids) == 1: discord_delete(f"/channels/{ch}/messages/{ids[0]}", self.token)
        elif ids: discord_post(f"/channels/{ch}/messages/bulk-delete", self.token, {"messages": ids})
        return {"ok": True, "count": len(ids)}

    def _set_topic(self):
        return discord_patch(f"/channels/{self.topic_ch.get().strip()}", self.token, {"topic": self.topic_txt.get().strip()})

    def _set_nickname(self):
        me = discord_get("/users/@me", self.token)
        return discord_patch(f"/guilds/{self.nick_guild.get().strip()}/members/{me.get('id','')}", self.token, {"nick": self.nick_name.get().strip()})

    # ── BOT INFO ──────────────────────────────────────────────────────────────

    def page_botinfo(self):
        self._header("Bot Info", "Infos live depuis Discord")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll, "Connexion a Discord")
        spinner.pack(fill="x")
        def _load():
            me = discord_get("/users/@me", self.token)
            guilds = discord_get("/users/@me/guilds", self.token)
            bot_avatar = None
            if not isinstance(me, dict) or "error" in me:
                def _err():
                    spinner.stop()
                    self._empty(scroll, "Erreur - verifie ton token")
                return _err
            url = get_avatar_url(me, 128)
            if url: bot_avatar = download_avatar(url, 56)
            def _render():
                spinner.stop()
                gl = guilds if isinstance(guilds, list) else []
                hf = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
                hf.pack(fill="x", pady=(0, 15))
                hi = ctk.CTkFrame(hf, fg_color="transparent"); hi.pack(padx=15, pady=12, fill="x")
                if bot_avatar:
                    ci = ctk.CTkImage(light_image=bot_avatar, dark_image=bot_avatar, size=(56, 56))
                    self._avatar_refs.append(ci)
                    ctk.CTkLabel(hi, image=ci, text="", width=56).pack(side="left", padx=(0, 12))
                info = ctk.CTkFrame(hi, fg_color="transparent"); info.pack(side="left")
                ctk.CTkLabel(info, text=me.get('username', '?'), font=("Segoe UI", 16, "bold"), text_color=BRIGHT).pack(anchor="w")
                ctk.CTkLabel(info, text=f"ID: {me.get('id', '?')}  |  {len(gl)} serveur(s)", font=("Segoe UI", 12), text_color=DIM).pack(anchor="w")
                self._section(scroll, f"Serveurs ({len(gl)})")
                for g in gl:
                    gf = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=8, border_width=1, border_color=BORDER)
                    gf.pack(fill="x", pady=2)
                    ctk.CTkLabel(gf, text=f"{g['name']}  |  {g['id']}", font=("Segoe UI", 13), text_color=BRIGHT).pack(padx=12, pady=8, anchor="w")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── DATABASE ──────────────────────────────────────────────────────────────

    def page_database(self):
        self._header("Base de donnees", "MySQL en direct")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll)
        spinner.pack(fill="x")
        def _load():
            tables = ["guild_config", "warnings", "welcome_config", "ticket_config", "tickets", "role_panels", "antispam_config", "reminders", "autoroles", "suggestions", "user_xp", "global_user_profile", "level_rewards", "global_user_stats", "notification_config", "guild_customization"]
            data = []; total = 0
            for t in tables:
                c = db_scalar(f"SELECT COUNT(*) FROM `{t}`"); data.append([t, str(c)]); total += c
            def _render():
                spinner.stop()
                sf = ctk.CTkFrame(scroll, fg_color="transparent"); sf.pack(fill="x", padx=0, pady=(0, 10))
                for i in range(3): sf.grid_columnconfigure(i, weight=1)
                self._stat_card(sf, "Total lignes", str(total), 0, 0)
                self._stat_card(sf, "Tables", str(len(tables)), 0, 1)
                self._stat_card(sf, "Type", "MySQL", 0, 2)
                self._section(scroll, "Detail par table")
                self._table(scroll, ["Table", "Lignes"], data)
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── SETTINGS ──────────────────────────────────────────────────────────────

    def page_tchat(self):
        self._header("Chat Testeurs", "Messages prives par testeur")
        split = ctk.CTkFrame(self.content, fg_color="transparent")
        split.pack(fill="both", expand=True, padx=15, pady=(0, 5))

        # Left panel: conversations + online status
        left = ctk.CTkFrame(split, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER, width=220)
        left.pack(side="left", fill="y", padx=(0, 8)); left.pack_propagate(False)
        ctk.CTkLabel(left, text="CONVERSATIONS", font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=10, pady=(10, 5), anchor="w")

        self._dm_selected = None
        ctk.CTkButton(left, text="  # General", font=("Segoe UI", 12), anchor="w", height=32, corner_radius=6, fg_color="#22222e", hover_color="#2a2a38", text_color=BRIGHT, command=lambda: self._select_dm(None, "General")).pack(padx=6, fill="x", pady=2)

        ctk.CTkFrame(left, height=1, fg_color=BORDER).pack(fill="x", padx=8, pady=5)
        ctk.CTkLabel(left, text="TESTEURS", font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=10, pady=(0, 3), anchor="w")
        self._dm_list_frame = ctk.CTkScrollableFrame(left, fg_color="transparent")
        self._dm_list_frame.pack(fill="both", expand=True, padx=4)

        # Right panel
        right = ctk.CTkFrame(split, fg_color="transparent")
        right.pack(side="right", fill="both", expand=True)

        self._dm_header_label = ctk.CTkLabel(right, text="# General", font=("Segoe UI", 14, "bold"), text_color=BRIGHT, anchor="w")
        self._dm_header_label.pack(fill="x", padx=5, pady=(0, 5))

        self.admin_chat_frame = ctk.CTkScrollableFrame(right, fg_color="transparent")
        self.admin_chat_frame.pack(fill="both", expand=True)

        input_f = ctk.CTkFrame(right, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
        input_f.pack(fill="x", pady=(5, 0))
        inner = ctk.CTkFrame(input_f, fg_color="transparent"); inner.pack(fill="x", padx=10, pady=8)
        self.admin_chat_input = ctk.CTkEntry(inner, placeholder_text="Repondre en tant qu'Owner...", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=36)
        self.admin_chat_input.pack(side="left", fill="x", expand=True, padx=(0, 5))
        self.admin_chat_input.bind("<Return>", lambda e: self._admin_send_chat())
        ctk.CTkButton(inner, text="Fichier", height=36, corner_radius=6, fg_color="#22222e", hover_color="#2a2a38", text_color=DIM, width=60, command=self._admin_send_file).pack(side="right", padx=(0, 5))
        ctk.CTkButton(inner, text="Envoyer", height=36, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=80, command=self._admin_send_chat).pack(side="right")

        threading.Thread(target=self._load_dm_list, daemon=True).start()
        self._select_dm(None, "General")
        self._admin_chat_auto()

    def _load_dm_list(self):
        codes = db_query("SELECT code, label, discord_id FROM tester_codes ORDER BY label")
        presences = {str(p['discord_id']): p for p in get_presences()}
        def _render():
            for w in self._dm_list_frame.winfo_children(): w.destroy()
            for tc in codes:
                label = tc['label'] or tc['code']
                did = str(tc.get('discord_id', ''))
                p = presences.get(did)
                online = is_online(p['last_ping']) if p else False
                last = format_last_seen(p['last_seen']) if p else "Jamais vu"

                bf = ctk.CTkFrame(self._dm_list_frame, fg_color="transparent")
                bf.pack(fill="x", pady=1)
                dot_color = GREEN if online else "#3a3a45"
                ctk.CTkFrame(bf, width=8, height=8, corner_radius=4, fg_color=dot_color).pack(side="left", padx=(4, 6), pady=10)
                text_frame = ctk.CTkFrame(bf, fg_color="transparent")
                text_frame.pack(side="left", fill="x", expand=True)
                btn = ctk.CTkButton(text_frame, text=label, font=("Segoe UI", 12), anchor="w", height=20, corner_radius=4, fg_color="transparent", hover_color="#22222e", text_color=BRIGHT if online else DIM,
                    command=lambda c=tc['code'], l=label: self._select_dm(c, l))
                btn.pack(fill="x")
                ctk.CTkLabel(text_frame, text=last, font=("Segoe UI", 8), text_color="#454550", anchor="w").pack(fill="x", padx=8)
        self.after(0, _render)

    def _select_dm(self, tester_code, label):
        self._dm_selected = tester_code
        self._dm_header_label.configure(text=f"{'# General' if not tester_code else f'DM - {label}'}")
        self._admin_refresh_chat()

    def _render_msg(self, parent, m):
        is_owner = m['sender_type'] in ('admin', 'owner')
        color = "#1a2a1a" if is_owner else "#1a1a2a"
        mf = ctk.CTkFrame(parent, fg_color=color, corner_radius=8, border_width=1, border_color=BORDER)
        mf.pack(fill="x", pady=2)
        hdr = ctk.CTkFrame(mf, fg_color="transparent"); hdr.pack(fill="x", padx=10, pady=(6, 0))
        tag = "OWNER" if is_owner else "TESTEUR"
        ctk.CTkLabel(hdr, text=f"{m['sender']}  [{tag}]", font=("Segoe UI", 10, "bold"), text_color=GREEN if is_owner else ACCENT).pack(side="left")
        time_str = str(m.get('created_at', ''))
        if len(time_str) > 10: time_str = time_str[11:16]
        ctk.CTkLabel(hdr, text=time_str, font=("Segoe UI", 9), text_color=DIM).pack(side="right")
        if m.get('message'):
            ctk.CTkLabel(mf, text=m['message'], font=("Segoe UI", 12), text_color=TEXT, wraplength=500, anchor="w", justify="left").pack(padx=10, pady=(2, 4), anchor="w")
        if m.get('file_name'):
            fname = m['file_name']
            is_image = fname.lower().split('.')[-1] in ('png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp')
            ff = ctk.CTkFrame(mf, fg_color="#1a1a24", corner_radius=6, border_width=1, border_color=BORDER)
            ff.pack(padx=10, pady=(2, 8), anchor="w")
            if is_image and m.get('file_data'):
                try:
                    img = Image.open(io.BytesIO(m['file_data']))
                    w, h = img.size
                    max_w = 300
                    if w > max_w:
                        h = int(h * max_w / w); w = max_w
                    img = img.resize((w, h), Image.LANCZOS)
                    ctk_img = ctk.CTkImage(light_image=img, dark_image=img, size=(w, h))
                    self._avatar_refs.append(ctk_img)
                    ctk.CTkLabel(ff, image=ctk_img, text="").pack(padx=8, pady=8)
                except:
                    ctk.CTkLabel(ff, text=f"[Image: {fname}]", font=("Segoe UI", 11), text_color=ACCENT).pack(padx=8, pady=6)
            else:
                ctk.CTkLabel(ff, text=f"[Fichier: {fname}]", font=("Segoe UI", 11), text_color=ACCENT).pack(side="left", padx=(8, 4), pady=6)
            ctk.CTkButton(ff, text="Sauvegarder", height=22, corner_radius=4, fg_color="#22222e", hover_color="#2e2e3e", text_color=DIM, font=("Segoe UI", 9), width=80,
                command=lambda fn=fname, fd=m.get('file_data'): self._save_attachment(fn, fd)).pack(side="right", padx=8, pady=6)

    def _save_attachment(self, fname, fdata):
        if not fdata: return
        path = save_file_to_disk(fname, fdata)
        os.startfile(str(path.parent))

    def _admin_refresh_chat(self):
        if not hasattr(self, 'admin_chat_frame') or not self.admin_chat_frame.winfo_exists(): return
        for w in self.admin_chat_frame.winfo_children(): w.destroy()
        if self._dm_selected:
            msgs = db_query("SELECT sender, sender_type, message, file_name, file_data, created_at FROM tester_dms WHERE tester_code = %s ORDER BY created_at DESC LIMIT 50", (self._dm_selected,))
        else:
            msgs = db_query("SELECT sender, sender_type, message, file_name, file_data, created_at FROM tester_chat ORDER BY created_at DESC LIMIT 50")
        msgs.reverse()
        for m in msgs:
            self._render_msg(self.admin_chat_frame, m)

    def _admin_chat_auto(self):
        if hasattr(self, 'admin_chat_frame') and self.admin_chat_frame.winfo_exists():
            self._admin_refresh_chat()
            # Refresh DM list for online status
            threading.Thread(target=self._load_dm_list, daemon=True).start()
            self.after(5000, self._admin_chat_auto)

    def _admin_send_chat(self, file_name=None, file_data=None):
        msg = self.admin_chat_input.get().strip()
        if not msg and not file_name: return
        try:
            conn = get_db()
            with conn.cursor() as c:
                if self._dm_selected:
                    c.execute("INSERT INTO tester_dms (tester_code, sender, sender_type, message, file_name, file_data) VALUES (%s,%s,%s,%s,%s,%s)", (self._dm_selected, "Tib", "owner", msg or None, file_name, file_data))
                else:
                    c.execute("INSERT INTO tester_chat (sender, sender_type, message, file_name, file_data) VALUES (%s,%s,%s,%s,%s)", ("Tib", "owner", msg or None, file_name, file_data))
            conn.commit(); conn.close()
            self.admin_chat_input.delete(0, "end")
            self._admin_refresh_chat()
        except: pass

    def _admin_send_file(self):
        path = filedialog.askopenfilename(title="Envoyer un fichier")
        if not path: return
        try:
            fdata = open(path, "rb").read()
            fname = os.path.basename(path)
            if len(fdata) > 15 * 1024 * 1024:
                return  # 15MB max
            self._admin_send_chat(file_name=fname, file_data=fdata)
        except: pass

    def page_tbugs(self):
        self._header("Bugs Reports", "Bugs signales par les testeurs")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll); spinner.pack(fill="x")
        def _load():
            rows = db_query("SELECT id, reporter, title, description, severity, status, created_at FROM tester_bugs ORDER BY FIELD(severity, 'critical', 'high', 'medium', 'low'), created_at DESC")
            codes = {r['code']: r['label'] for r in db_query("SELECT code, label FROM tester_codes")}
            def _render():
                spinner.stop()
                if not rows:
                    self._empty(scroll, "Aucun bug signale"); return
                for b in rows:
                    sev_colors = {"critical": "#5a1a1a", "high": "#4a2020", "medium": CARD, "low": "#1a1a2a"}
                    f = ctk.CTkFrame(scroll, fg_color=sev_colors.get(b['severity'], CARD), corner_radius=8, border_width=1, border_color=BORDER); f.pack(fill="x", pady=3)
                    hdr = ctk.CTkFrame(f, fg_color="transparent"); hdr.pack(fill="x", padx=12, pady=(8, 2))
                    reporter_name = codes.get(b.get('reporter'), b.get('reporter', '?'))
                    ctk.CTkLabel(hdr, text=f"#{b['id']} {b['title']}  |  par {reporter_name}", font=("Segoe UI", 13, "bold"), text_color=BRIGHT).pack(side="left")
                    ctk.CTkLabel(hdr, text=f"{b['severity'].upper()}  |  {b['status']}", font=("Segoe UI", 9, "bold"), text_color=RED if b['severity'] in ('critical','high') else DIM).pack(side="right")
                    if b.get('description'):
                        ctk.CTkLabel(f, text=b['description'], font=("Segoe UI", 11), text_color=DIM, wraplength=500, anchor="w").pack(padx=12, pady=(0, 4), anchor="w")
                    btns = ctk.CTkFrame(f, fg_color="transparent"); btns.pack(fill="x", padx=12, pady=(0, 8))
                    if b['status'] != 'fixed':
                        ctk.CTkButton(btns, text="Marquer fixe", height=24, corner_radius=4, fg_color="#1a3a1a", hover_color="#2a4a2a", text_color=GREEN, font=("Segoe UI", 10), width=100,
                            command=lambda bid=b['id']: self._fix_bug(bid)).pack(side="left", padx=(0, 5))
                    if b['status'] != 'closed':
                        ctk.CTkButton(btns, text="Fermer", height=24, corner_radius=4, fg_color="#3a1a1a", hover_color="#4a2a2a", text_color=RED, font=("Segoe UI", 10), width=80,
                            command=lambda bid=b['id']: self._close_bug(bid)).pack(side="left")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    def _fix_bug(self, bug_id):
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("UPDATE tester_bugs SET status = 'fixed' WHERE id = %s", (bug_id,))
            conn.commit(); conn.close(); self.show_page("tbugs")
        except: pass

    def _close_bug(self, bug_id):
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("UPDATE tester_bugs SET status = 'closed' WHERE id = %s", (bug_id,))
            conn.commit(); conn.close(); self.show_page("tbugs")
        except: pass

    def page_settings(self):
        self._header("Parametres", "Configuration Silver App")
        scroll = self._scrollable()
        f = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); f.pack(fill="x", pady=(0, 15))
        self.set_entries = {}
        for key, label, secret in [("token", "BOT TOKEN", True), ("mysql_host", "MYSQL HOST", False), ("mysql_port", "MYSQL PORT", False), ("mysql_user", "MYSQL USER", False), ("mysql_pass", "MYSQL PASSWORD", True), ("mysql_db", "MYSQL DB", False)]:
            ctk.CTkLabel(f, text=label, font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=15, pady=(8, 2), anchor="w")
            e = ctk.CTkEntry(f, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=32, show="*" if secret else ""); e.pack(padx=15, fill="x")
            e.insert(0, self.cfg.get(key, "")); self.set_entries[key] = e
        self.set_status = ctk.CTkLabel(scroll, text="", font=("Segoe UI", 11))
        ctk.CTkButton(scroll, text="Sauvegarder", height=38, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, command=self._save_settings).pack(pady=10, anchor="w")
        self.set_status.pack(anchor="w")

        # Tester code management
        self._section(scroll, "Gestion des testeurs")
        tf = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); tf.pack(fill="x", pady=(0, 10))
        tr = ctk.CTkFrame(tf, fg_color="transparent"); tr.pack(fill="x", padx=15, pady=(12, 6))
        ctk.CTkLabel(tr, text="Label:", font=("Segoe UI", 12), text_color=DIM, width=50, anchor="w").pack(side="left")
        self.tester_label = ctk.CTkEntry(tr, placeholder_text="Nom du testeur", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=30, width=180); self.tester_label.pack(side="left", padx=5)
        self.tester_gen_status = ctk.CTkLabel(tr, text="", font=("Segoe UI", 11)); self.tester_gen_status.pack(side="right", padx=5)
        ctk.CTkButton(tr, text="Generer code", height=30, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=120, command=self._gen_tester_code).pack(side="left", padx=5)

        self.tester_list_frame = ctk.CTkFrame(tf, fg_color="transparent"); self.tester_list_frame.pack(fill="x", padx=15, pady=(0, 12))
        self._refresh_tester_list()

        # Tester announcements
        self._section(scroll, "Annonces testeurs")
        af = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); af.pack(fill="x", pady=(0, 10))
        ar1 = ctk.CTkFrame(af, fg_color="transparent"); ar1.pack(fill="x", padx=15, pady=(12, 4))
        ctk.CTkLabel(ar1, text="Titre:", font=("Segoe UI", 12), text_color=DIM, width=50, anchor="w").pack(side="left")
        self.tann_title = ctk.CTkEntry(ar1, placeholder_text="Titre", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=30, width=300); self.tann_title.pack(side="left", padx=5)
        ar2 = ctk.CTkFrame(af, fg_color="transparent"); ar2.pack(fill="x", padx=15, pady=4)
        ctk.CTkLabel(ar2, text="Msg:", font=("Segoe UI", 12), text_color=DIM, width=50, anchor="w").pack(side="left")
        self.tann_msg = ctk.CTkTextbox(ar2, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=50, width=300, border_width=1); self.tann_msg.pack(side="left", padx=5)
        ar3 = ctk.CTkFrame(af, fg_color="transparent"); ar3.pack(fill="x", padx=15, pady=(4, 12))
        self.tann_status = ctk.CTkLabel(ar3, text="", font=("Segoe UI", 11))
        ctk.CTkButton(ar3, text="Publier", height=30, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=100, command=self._post_tester_announcement).pack(side="left")
        self.tann_status.pack(side="left", padx=8)

        # Tester tasks
        self._section(scroll, "Taches testeurs")
        tkf = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); tkf.pack(fill="x", pady=(0, 10))
        tkr = ctk.CTkFrame(tkf, fg_color="transparent"); tkr.pack(fill="x", padx=15, pady=(12, 4))
        self.task_title = ctk.CTkEntry(tkr, placeholder_text="Titre de la tache", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=30, width=200); self.task_title.pack(side="left", padx=(0, 5))
        self.task_prio = ctk.CTkOptionMenu(tkr, values=["normal", "high", "low"], fg_color=BG, button_color=ACCENT, text_color=BRIGHT, width=100); self.task_prio.pack(side="left", padx=5)
        tkr2 = ctk.CTkFrame(tkf, fg_color="transparent"); tkr2.pack(fill="x", padx=15, pady=4)
        self.task_desc = ctk.CTkEntry(tkr2, placeholder_text="Description (optionnel)", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=30, width=350); self.task_desc.pack(side="left")
        tkr3 = ctk.CTkFrame(tkf, fg_color="transparent"); tkr3.pack(fill="x", padx=15, pady=(4, 12))
        self.task_status_lbl = ctk.CTkLabel(tkr3, text="", font=("Segoe UI", 11))
        ctk.CTkButton(tkr3, text="Ajouter tache", height=30, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=120, command=self._add_task).pack(side="left")
        self.task_status_lbl.pack(side="left", padx=8)

    def _gen_tester_code(self):
        import random, string
        label = self.tester_label.get().strip() or "Testeur"
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO tester_codes (code, label) VALUES (%s, %s)", (code, label))
            conn.commit(); conn.close()
            self.tester_gen_status.configure(text=f"Code: {code}", text_color=GREEN)
            self._refresh_tester_list()
        except Exception as e:
            self.tester_gen_status.configure(text="Erreur", text_color=RED)

    def _refresh_tester_list(self):
        for w in self.tester_list_frame.winfo_children(): w.destroy()
        codes = db_query("SELECT code, label, discord_id, used_at FROM tester_codes ORDER BY created_at DESC LIMIT 20")
        if not codes:
            ctk.CTkLabel(self.tester_list_frame, text="Aucun code", text_color=DIM, font=("Segoe UI", 11)).pack(pady=5)
            return
        for tc in codes:
            r = ctk.CTkFrame(self.tester_list_frame, fg_color=BG, corner_radius=6); r.pack(fill="x", pady=2)
            status = "Utilise" if tc.get('used_at') else "Disponible"
            color = GREEN if not tc.get('used_at') else DIM
            code_btn = ctk.CTkButton(r, text=f"{tc['code']}  |  {tc['label']}  |  {status}", font=("Segoe UI", 12), text_color=color, fg_color="transparent", hover_color="#22222e", anchor="w", height=28, corner_radius=4,
                command=lambda c=tc['code']: self._copy_code(c))
            code_btn.pack(side="left", padx=6, pady=4, fill="x", expand=True)
            ctk.CTkButton(r, text="Inviter", width=55, height=24, corner_radius=4, fg_color="#1a2a1a", hover_color="#2a3a2a", text_color=GREEN, font=("Segoe UI", 10),
                command=lambda c=tc['code'], l=tc['label']: self._copy_invite(c, l)).pack(side="right", padx=(0, 3), pady=4)
            ctk.CTkButton(r, text="X", width=28, height=24, corner_radius=4, fg_color="#3a2020", hover_color="#5a3030", text_color=RED,
                command=lambda c=tc['code']: self._delete_tester_code(c)).pack(side="right", padx=(0, 3), pady=4)

    def _copy_code(self, code):
        self.clipboard_clear()
        self.clipboard_append(code)
        self.tester_gen_status.configure(text="Code copie !", text_color=GREEN)
        self.after(2000, lambda: self.tester_gen_status.configure(text=""))

    def _copy_invite(self, code, label):
        invite = f"""Hey ! Tu as été invité à tester **Silver Bot** !

Pour accéder à l'app :
1. Télécharge **SilverApp.exe** ici : https://github.com/IZIUKAA/SilverApp/releases/download/1.1/SilverApp.exe
2. Lance l'app
3. Entre ton **Discord ID** et ce code d'invitation :

**Code : {code}**

À bientôt sur Silver Bot !"""
        self.clipboard_clear()
        self.clipboard_append(invite)
        self.tester_gen_status.configure(text="Invitation copiee !", text_color=GREEN)
        self.after(2000, lambda: self.tester_gen_status.configure(text=""))

    def _delete_tester_code(self, code):
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("DELETE FROM tester_codes WHERE code = %s", (code,))
            conn.commit(); conn.close()
            self._refresh_tester_list()
        except: pass

    def _post_tester_announcement(self):
        title = self.tann_title.get().strip(); msg = self.tann_msg.get("1.0", "end").strip()
        if not msg: self.tann_status.configure(text="Message requis", text_color=RED); return
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("INSERT INTO tester_announcements (title, content) VALUES (%s, %s)", (title, msg))
            conn.commit(); conn.close()
            self.tann_status.configure(text="Publie", text_color=GREEN)
            self.tann_title.delete(0, "end"); self.tann_msg.delete("1.0", "end")
        except: self.tann_status.configure(text="Erreur", text_color=RED)

    def _add_task(self):
        title = self.task_title.get().strip()
        if not title: self.task_status_lbl.configure(text="Titre requis", text_color=RED); return
        desc = self.task_desc.get().strip(); prio = self.task_prio.get()
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("INSERT INTO tester_tasks (title, description, priority) VALUES (%s, %s, %s)", (title, desc, prio))
            conn.commit(); conn.close()
            self.task_status_lbl.configure(text="Tache ajoutee", text_color=GREEN)
            self.task_title.delete(0, "end"); self.task_desc.delete(0, "end")
        except: self.task_status_lbl.configure(text="Erreur", text_color=RED)

    def _save_settings(self):
        for key, entry in self.set_entries.items(): self.cfg[key] = entry.get().strip()
        save_config(self.cfg); self.token = self.cfg["token"]
        self.set_status.configure(text="Sauvegarde - redemarre l'app", text_color=GREEN)

    def page_forgot(self):
        self._header("Codes oublies", "Demandes de nouveaux codes")
        scroll = self._scrollable()
        spinner = LoadingSpinner(scroll); spinner.pack(fill="x")
        def _load():
            rows = db_query("SELECT id, discord_id, username, status, created_at FROM forgot_code_requests ORDER BY created_at DESC LIMIT 30")
            def _render():
                spinner.stop()
                if not rows:
                    self._empty(scroll, "Aucune demande"); return
                for r in rows:
                    is_pending = r['status'] == 'pending'
                    f = ctk.CTkFrame(scroll, fg_color=CARD if is_pending else BG, corner_radius=10, border_width=1, border_color="#3a3a4a" if is_pending else BORDER)
                    f.pack(fill="x", pady=3)
                    hdr = ctk.CTkFrame(f, fg_color="transparent"); hdr.pack(fill="x", padx=12, pady=(10, 4))
                    ctk.CTkLabel(hdr, text=f"{r['username']}", font=("Segoe UI", 14, "bold"), text_color=BRIGHT).pack(side="left")
                    ctk.CTkLabel(hdr, text=r['status'].upper(), font=("Segoe UI", 9, "bold"), text_color=GREEN if r['status'] == 'done' else "#fbbf24" if is_pending else DIM).pack(side="right")

                    info = ctk.CTkFrame(f, fg_color="transparent"); info.pack(fill="x", padx=12, pady=(0, 4))
                    ctk.CTkLabel(info, text=f"Discord ID: {r['discord_id']}  |  {str(r.get('created_at',''))[:16]}", font=("Segoe UI", 11), text_color=DIM).pack(side="left")

                    if is_pending:
                        btns = ctk.CTkFrame(f, fg_color="transparent"); btns.pack(fill="x", padx=12, pady=(0, 10))
                        ctk.CTkButton(btns, text="Generer nouveau code", height=28, corner_radius=6, fg_color="#1a2a1a", hover_color="#2a3a2a", text_color=GREEN, font=("Segoe UI", 11), width=160,
                            command=lambda rid=r['id'], did=r['discord_id'], uname=r['username']: self._resolve_forgot(rid, did, uname)).pack(side="left", padx=(0, 5))
                        ctk.CTkButton(btns, text="Ignorer", height=28, corner_radius=6, fg_color="#2a1a1a", hover_color="#3a2a2a", text_color=RED, font=("Segoe UI", 11), width=80,
                            command=lambda rid=r['id']: self._dismiss_forgot(rid)).pack(side="left")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    def _resolve_forgot(self, request_id, discord_id, username):
        import random, string
        new_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO tester_codes (code, label) VALUES (%s, %s)", (new_code, username))
                c.execute("UPDATE forgot_code_requests SET status = 'done' WHERE id = %s", (request_id,))
            conn.commit(); conn.close()
            # Copy invite with new code
            invite = f"""Hey {username} ! Voici ton nouveau code d'acces pour **Silver Bot** :

**Code : {new_code}**

Telecharge l'app ici si besoin : https://github.com/IZIUKAA/SilverApp/releases/download/1.1/SilverApp.exe"""
            self.clipboard_clear()
            self.clipboard_append(invite)
            self.show_page("forgot")
        except: pass

    def _dismiss_forgot(self, request_id):
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("UPDATE forgot_code_requests SET status = 'ignored' WHERE id = %s", (request_id,))
            conn.commit(); conn.close()
            self.show_page("forgot")
        except: pass

    def page_testlab(self):
        self._build_testlab("Tib", OWNER_ID, "owner")

    def _build_testlab(self, username, user_id, user_type):
        self._tl_user = username
        self._tl_uid = user_id
        self._tl_type = user_type

        # Header
        hf = ctk.CTkFrame(self.content, fg_color="transparent"); hf.pack(fill="x", padx=24, pady=(15, 0))
        ctk.CTkLabel(hf, text="# test-lab", font=("Segoe UI", 20, "bold"), text_color=BRIGHT).pack(side="left")
        ctk.CTkButton(hf, text="Effacer le chat", height=28, corner_radius=6, fg_color="#2a1a1a", hover_color="#3a2a2a", text_color=RED, font=("Segoe UI", 10), width=100, command=self._testlab_clear).pack(side="right")

        # Quick commands
        cmds_f = ctk.CTkFrame(self.content, fg_color=CARD, corner_radius=0)
        cmds_f.pack(fill="x", padx=0, pady=(8, 0))
        cmds_inner = ctk.CTkFrame(cmds_f, fg_color="transparent"); cmds_inner.pack(padx=15, pady=6)
        for label, cmd in [("/ping", "/ping"), ("/serverinfo", "/serverinfo"), ("/botinfo", "/botinfo"), ("/leaderboard", "/leaderboard"), ("/warn", "/warn @user raison"), ("/xp", "/xp"), ("/level", "/level"), ("hello", "hello")]:
            ctk.CTkButton(cmds_inner, text=label, font=("Segoe UI", 10), height=26, corner_radius=12, fg_color="#1e1e2a", hover_color="#28283a", text_color=ACCENT, border_width=1, border_color="#2a2a3a",
                command=lambda c=cmd: self._testlab_send(c)).pack(side="left", padx=2)

        # Chat area (Discord-like)
        self._tl_chat = ctk.CTkScrollableFrame(self.content, fg_color="#0f0f16", corner_radius=0)
        self._tl_chat.pack(fill="both", expand=True, padx=0, pady=0)

        # Input bar
        input_bar = ctk.CTkFrame(self.content, fg_color="#1a1a24", corner_radius=0, height=56)
        input_bar.pack(fill="x"); input_bar.pack_propagate(False)
        inner = ctk.CTkFrame(input_bar, fg_color="transparent"); inner.pack(fill="both", expand=True, padx=12, pady=8)

        self._tl_input = ctk.CTkEntry(inner, placeholder_text="Envoyer un message dans #test-lab", fg_color="#2a2a36", border_width=0, text_color=BRIGHT, height=38, corner_radius=8, font=("Segoe UI", 13))
        self._tl_input.pack(side="left", fill="x", expand=True, padx=(0, 8))
        self._tl_input.bind("<Return>", lambda e: self._testlab_send())
        ctk.CTkButton(inner, text="Envoyer", height=38, corner_radius=8, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=80, font=("Segoe UI", 12, "bold"), command=self._testlab_send).pack(side="right")

        self._testlab_refresh()
        self._testlab_auto()

    def _testlab_send(self, text=None):
        if text is None:
            text = self._tl_input.get().strip()
            if not text: return
            self._tl_input.delete(0, "end")

        # Save user message
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO testlab_messages (sender_id, sender_name, sender_type, content) VALUES (%s,%s,%s,%s)", (self._tl_uid, self._tl_user, self._tl_type, text))
            conn.commit(); conn.close()
        except: pass

        # Simulate bot response
        self.after(300, lambda: self._testlab_bot_respond(text))
        self.after(100, self._testlab_refresh)

    def _testlab_bot_respond(self, cmd):
        cmd_lower = cmd.lower().strip()
        embed_title = None; embed_desc = None; embed_color = 0x3498DB; embed_fields = None; content = None

        if cmd_lower == "/ping":
            embed_title = "Pong !"; embed_desc = "Latence : 42ms"; embed_color = 0x2ECC71
        elif cmd_lower == "/serverinfo":
            embed_title = "Informations du serveur"
            warns = db_scalar("SELECT COUNT(*) FROM warnings")
            users = db_scalar("SELECT COUNT(DISTINCT user_id) FROM user_xp")
            embed_fields = json.dumps([{"name": "Membres", "value": str(users)}, {"name": "Warns", "value": str(warns)}, {"name": "Region", "value": "Europe"}])
            embed_color = 0x3498DB
        elif cmd_lower == "/botinfo":
            embed_title = "Silver Bot"; embed_desc = "Version 1.2\nBy Tib\nPython + discord.py"; embed_color = 0xC0C5D0
        elif cmd_lower == "/leaderboard":
            rows = db_query("SELECT user_id, SUM(xp) as xp FROM user_xp GROUP BY user_id ORDER BY xp DESC LIMIT 5")
            if rows:
                desc = "\n".join([f"**#{i+1}** User {r['user_id']} — {r['xp']} XP" for i, r in enumerate(rows)])
            else:
                desc = "Aucune donnee XP"
            embed_title = "Leaderboard"; embed_desc = desc; embed_color = 0xFFD700
        elif cmd_lower.startswith("/warn"):
            embed_title = "Avertissement"; embed_desc = "Utilisateur averti avec succes.\nRaison : Test warning"; embed_color = 0xE74C3C
        elif cmd_lower == "/xp" or cmd_lower == "/level":
            embed_title = "Niveau"; embed_desc = f"**{self._tl_user}**\nNiveau : 5\nXP : 2500 / 3600\nMessages : 342"; embed_color = 0x9B59B6
        elif cmd_lower == "/antispam config":
            embed_title = "Anti-Spam Configuration"
            embed_fields = json.dumps([{"name": "Status", "value": "Active"}, {"name": "Limite", "value": "5 msgs / 5s"}, {"name": "Doublons", "value": "3 max"}, {"name": "Action", "value": "warn"}])
            embed_color = 0xE67E22
        elif "hello" in cmd_lower or "salut" in cmd_lower or "hey" in cmd_lower:
            content = f"Salut {self._tl_user} ! Je suis Silver Bot, comment je peux t'aider ?"
        else:
            content = f"Commande inconnue : `{cmd}`. Essaie /ping, /serverinfo, /botinfo, /leaderboard, /warn, /xp"

        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO testlab_messages (sender_id, sender_name, sender_type, content, embed_title, embed_desc, embed_color, embed_fields) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                    ("bot", "Silver Bot", "bot", content, embed_title, embed_desc, embed_color, embed_fields))
            conn.commit(); conn.close()
        except: pass
        self.after(100, self._testlab_refresh)

    def _testlab_clear(self):
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("DELETE FROM testlab_messages")
            conn.commit(); conn.close()
            self._testlab_refresh()
        except: pass

    def _testlab_refresh(self):
        if not hasattr(self, '_tl_chat') or not self._tl_chat.winfo_exists(): return
        for w in self._tl_chat.winfo_children(): w.destroy()

        msgs = db_query("SELECT sender_id, sender_name, sender_type, content, embed_title, embed_desc, embed_color, embed_fields, created_at FROM testlab_messages ORDER BY created_at DESC LIMIT 30")
        msgs.reverse()

        for m in msgs:
            is_bot = m['sender_type'] == 'bot'
            mf = ctk.CTkFrame(self._tl_chat, fg_color="transparent")
            mf.pack(fill="x", padx=16, pady=4)

            # Avatar
            av_frame = ctk.CTkFrame(mf, width=40, height=40, corner_radius=20, fg_color="#2a2a3a" if not is_bot else "#1a2a3a")
            av_frame.pack(side="left", anchor="n", padx=(0, 10), pady=(2, 0))
            av_frame.pack_propagate(False)
            initial = "S" if is_bot else (m['sender_name'][0].upper() if m['sender_name'] else "?")
            ctk.CTkLabel(av_frame, text=initial, font=("Segoe UI", 16, "bold"), text_color="#60a5fa" if is_bot else ACCENT).pack(expand=True)

            # Message body
            body = ctk.CTkFrame(mf, fg_color="transparent")
            body.pack(side="left", fill="x", expand=True)

            # Name + time
            name_row = ctk.CTkFrame(body, fg_color="transparent"); name_row.pack(fill="x")
            name_color = "#60a5fa" if is_bot else GREEN if m['sender_type'] == 'owner' else BRIGHT
            ctk.CTkLabel(name_row, text=m['sender_name'], font=("Segoe UI", 13, "bold"), text_color=name_color).pack(side="left")
            if is_bot:
                tag = ctk.CTkFrame(name_row, fg_color="#404EED", corner_radius=3, width=30, height=16)
                tag.pack(side="left", padx=5); tag.pack_propagate(False)
                ctk.CTkLabel(tag, text="BOT", font=("Segoe UI", 8, "bold"), text_color="#fff").pack(expand=True)
            ts = str(m.get('created_at', ''))
            if len(ts) > 11:
                ctk.CTkLabel(name_row, text=ts[11:16], font=("Segoe UI", 10), text_color=DIM).pack(side="left", padx=6)

            # Content
            if m.get('content'):
                ctk.CTkLabel(body, text=m['content'], font=("Segoe UI", 13), text_color=TEXT, wraplength=550, anchor="w", justify="left").pack(fill="x", pady=(2, 0))

            # Embed
            if m.get('embed_title') or m.get('embed_desc'):
                ec = m.get('embed_color', 0x3498DB)
                hex_color = f"#{ec:06x}" if ec else "#3498DB"
                ef = ctk.CTkFrame(body, fg_color="#1a1a28", corner_radius=6, border_width=0)
                ef.pack(fill="x", pady=(4, 0), padx=(0, 40))
                # Left color bar
                bar = ctk.CTkFrame(ef, width=4, fg_color=hex_color, corner_radius=2)
                bar.pack(side="left", fill="y", padx=(0, 0))
                embed_body = ctk.CTkFrame(ef, fg_color="transparent"); embed_body.pack(side="left", fill="x", expand=True, padx=12, pady=10)
                if m.get('embed_title'):
                    ctk.CTkLabel(embed_body, text=m['embed_title'], font=("Segoe UI", 14, "bold"), text_color=BRIGHT, wraplength=450, anchor="w").pack(fill="x")
                if m.get('embed_desc'):
                    ctk.CTkLabel(embed_body, text=m['embed_desc'], font=("Segoe UI", 12), text_color="#b0b8c8", wraplength=450, anchor="w", justify="left").pack(fill="x", pady=(4, 0))
                if m.get('embed_fields'):
                    try:
                        fields = json.loads(m['embed_fields'])
                        fields_f = ctk.CTkFrame(embed_body, fg_color="transparent"); fields_f.pack(fill="x", pady=(6, 0))
                        for fi, field in enumerate(fields[:8]):
                            ff = ctk.CTkFrame(fields_f, fg_color="transparent")
                            ff.pack(side="left" if fi < 3 else "top", padx=(0, 20), anchor="nw")
                            ctk.CTkLabel(ff, text=field.get('name', ''), font=("Segoe UI", 10, "bold"), text_color=DIM, anchor="w").pack(anchor="w")
                            ctk.CTkLabel(ff, text=field.get('value', ''), font=("Segoe UI", 11), text_color=TEXT, anchor="w").pack(anchor="w")
                    except: pass

    def _testlab_auto(self):
        if hasattr(self, '_tl_chat') and self._tl_chat.winfo_exists():
            self._testlab_refresh()
            self.after(3000, self._testlab_auto)

    def page_empty(self):
        self._header("Page", ""); ctk.CTkLabel(self.content, text="Bientot disponible", text_color=DIM).pack(pady=40)

    # ══════════════════════════════════════════════════════════════════════════
    # UI HELPERS
    # ══════════════════════════════════════════════════════════════════════════

    def _header(self, title, sub):
        hf = ctk.CTkFrame(self.content, fg_color="transparent"); hf.pack(fill="x", padx=24, pady=(20, 10))
        ctk.CTkLabel(hf, text=title, font=("Segoe UI", 20, "bold"), text_color=BRIGHT).pack(anchor="w")
        if sub: ctk.CTkLabel(hf, text=sub, font=("Segoe UI", 12), text_color=DIM).pack(anchor="w")

    def _scrollable(self):
        return ctk.CTkScrollableFrame(self.content, fg_color="transparent")._pack_and_return() if False else self._make_scroll()

    def _make_scroll(self):
        s = ctk.CTkScrollableFrame(self.content, fg_color="transparent"); s.pack(fill="both", expand=True, padx=20, pady=(0, 10)); return s

    def _section(self, parent, text):
        ctk.CTkLabel(parent, text=text.upper(), font=("Segoe UI", 10, "bold"), text_color=DIM, anchor="w").pack(fill="x", pady=(12, 6))

    def _stat_card(self, parent, label, value, row, col):
        f = ctk.CTkFrame(parent, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER, height=80)
        f.grid(row=row, column=col, padx=4, pady=4, sticky="ew"); f.pack_propagate(False)
        ctk.CTkLabel(f, text=label.upper(), font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=12, pady=(12, 2), anchor="w")
        ctk.CTkLabel(f, text=value, font=("Segoe UI", 22, "bold"), text_color=BRIGHT).pack(padx=12, anchor="w")

    def _empty(self, parent, text):
        ctk.CTkLabel(parent, text=text, font=("Segoe UI", 14), text_color=DIM).pack(pady=40)

    def _table(self, parent, headers, rows):
        f = ctk.CTkFrame(parent, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); f.pack(fill="x", pady=(0, 10))
        for i in range(len(headers)): f.grid_columnconfigure(i, weight=1)
        for j, h in enumerate(headers):
            ctk.CTkLabel(f, text=h.upper(), font=("Segoe UI", 9, "bold"), text_color="#454a5c", anchor="w").grid(row=0, column=j, padx=12, pady=(8, 4), sticky="w")
        for i, row in enumerate(rows):
            for j, val in enumerate(row):
                ctk.CTkLabel(f, text=val, font=("Segoe UI", 12), text_color=TEXT, anchor="w").grid(row=i+1, column=j, padx=12, pady=3, sticky="w")


# ═══════════════════════════════════════════════════════════════════════════════
# LOGIN SCREEN (Admin + Tester)
# ═══════════════════════════════════════════════════════════════════════════════

class LoginScreen(ctk.CTk):
    OWNER_DISCORD_ID = "1504594533521031219"

    def __init__(self):
        super().__init__()
        self.title(APP_NAME)
        self.state("zoomed")
        self.configure(fg_color=BG)
        self._avatar_refs = []

        outer = ctk.CTkFrame(self, fg_color="transparent")
        outer.pack(expand=True)
        main = ctk.CTkFrame(outer, fg_color="transparent", width=460)
        main.pack(expand=True)
        main.pack_propagate(False)
        main.configure(height=640)

        # Bot avatar
        self._avatar_frame = ctk.CTkFrame(main, fg_color="transparent", height=90)
        self._avatar_frame.pack(pady=(10, 0))
        self._avatar_placeholder = ctk.CTkFrame(self._avatar_frame, width=80, height=80, corner_radius=40, fg_color=CARD, border_width=2, border_color=BORDER)
        self._avatar_placeholder.pack()
        self._avatar_placeholder.pack_propagate(False)
        self._avatar_inner = ctk.CTkLabel(self._avatar_placeholder, text="S", font=("Segoe UI", 32, "bold"), text_color=ACCENT)
        self._avatar_inner.pack(expand=True)

        ctk.CTkLabel(main, text="SILVER BOT", font=("Segoe UI", 30, "bold"), text_color=BRIGHT).pack(pady=(12, 0))
        ctk.CTkLabel(main, text="By Tib", font=("Segoe UI", 12), text_color=ACCENT).pack(pady=(0, 2))
        self._welcome_label = ctk.CTkLabel(main, text="Bienvenue", font=("Segoe UI", 14), text_color=DIM)
        self._welcome_label.pack(pady=(0, 18))

        # ── Unified login: Discord ID + Code ──
        lf = ctk.CTkFrame(main, fg_color=CARD, corner_radius=12, border_width=1, border_color="#3a3a4a")
        lf.pack(fill="x", pady=(0, 10))

        ctk.CTkLabel(lf, text="CONNEXION", font=("Segoe UI", 13, "bold"), text_color=BRIGHT).pack(padx=18, pady=(14, 10), anchor="w")

        ctk.CTkLabel(lf, text="DISCORD ID", font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=18, pady=(0, 3), anchor="w")
        self.login_discord = ctk.CTkEntry(lf, placeholder_text="Clic droit profil > Copier l'identifiant", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=36)
        self.login_discord.pack(padx=18, fill="x")

        ctk.CTkLabel(lf, text="CODE", font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=18, pady=(10, 3), anchor="w")
        self.login_code = ctk.CTkEntry(lf, placeholder_text="Code (Owner) ou code invitation (Testeur)", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=40, font=("Segoe UI", 16, "bold"), justify="center")
        self.login_code.pack(padx=18, fill="x")
        self.login_code.bind("<Return>", lambda e: self._login())

        self.login_status = ctk.CTkLabel(lf, text="", font=("Segoe UI", 11))
        self.login_status.pack(pady=6)

        btn_row = ctk.CTkFrame(lf, fg_color="transparent")
        btn_row.pack(fill="x", padx=18, pady=(0, 14))
        ctk.CTkButton(btn_row, text="Se connecter", font=("Segoe UI", 14, "bold"), height=44, corner_radius=10, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, command=self._login).pack(side="left", fill="x", expand=True, padx=(0, 5))
        ctk.CTkButton(btn_row, text="Code oublie ?", font=("Segoe UI", 11), height=44, corner_radius=10, fg_color="#22222e", hover_color="#2a2a38", text_color=DIM, width=110, command=self._show_forgot).pack(side="right")

        # Forgot code frame (hidden by default)
        self._forgot_frame = ctk.CTkFrame(main, fg_color=CARD, corner_radius=12, border_width=1, border_color=BORDER)

        ctk.CTkLabel(self._forgot_frame, text="CODE OUBLIE", font=("Segoe UI", 13, "bold"), text_color=BRIGHT).pack(padx=18, pady=(14, 8), anchor="w")
        ctk.CTkLabel(self._forgot_frame, text="DISCORD ID", font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=18, pady=(0, 3), anchor="w")
        self._forgot_id = ctk.CTkEntry(self._forgot_frame, placeholder_text="Ton Discord ID", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=34)
        self._forgot_id.pack(padx=18, fill="x")
        ctk.CTkLabel(self._forgot_frame, text="USERNAME DISCORD", font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=18, pady=(8, 3), anchor="w")
        self._forgot_username = ctk.CTkEntry(self._forgot_frame, placeholder_text="Ton pseudo Discord", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=34)
        self._forgot_username.pack(padx=18, fill="x")
        self._forgot_status = ctk.CTkLabel(self._forgot_frame, text="", font=("Segoe UI", 11))
        self._forgot_status.pack(pady=5)
        forgot_btns = ctk.CTkFrame(self._forgot_frame, fg_color="transparent")
        forgot_btns.pack(fill="x", padx=18, pady=(0, 14))
        ctk.CTkButton(forgot_btns, text="Envoyer la demande", font=("Segoe UI", 12, "bold"), height=38, corner_radius=8, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, command=self._submit_forgot).pack(side="left", fill="x", expand=True, padx=(0, 5))
        ctk.CTkButton(forgot_btns, text="Retour", font=("Segoe UI", 11), height=38, corner_radius=8, fg_color="#22222e", hover_color="#2a2a38", text_color=DIM, width=80, command=self._hide_forgot).pack(side="right")

        # Info
        info_f = ctk.CTkFrame(main, fg_color="transparent")
        info_f.pack(fill="x", pady=(5, 0))
        ctk.CTkLabel(info_f, text="Owner : entre ton Discord ID + ecris 'send pass' pour recevoir le code en DM", font=("Segoe UI", 10), text_color=DIM).pack()
        ctk.CTkLabel(info_f, text="Testeur : entre ton Discord ID + code d'invitation", font=("Segoe UI", 10), text_color=DIM).pack()

        ctk.CTkLabel(main, text=f"v{VERSION}", font=("Segoe UI", 9), text_color="#353540").pack(pady=(12, 0))

        threading.Thread(target=self._load_bot_avatar, daemon=True).start()
        self._animate_welcome()

    def _show_forgot(self):
        self._forgot_frame.pack(fill="x", pady=(5, 0))

    def _hide_forgot(self):
        self._forgot_frame.pack_forget()

    def _submit_forgot(self):
        did = self._forgot_id.get().strip()
        username = self._forgot_username.get().strip()
        if not did or not username:
            self._forgot_status.configure(text="Remplis les deux champs", text_color=RED); return
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO forgot_code_requests (discord_id, username) VALUES (%s, %s)", (did, username))
            conn.commit(); conn.close()
            self._forgot_status.configure(text="Demande envoyee ! L'owner sera notifie.", text_color=GREEN)
            self._forgot_id.delete(0, "end")
            self._forgot_username.delete(0, "end")
        except:
            self._forgot_status.configure(text="Erreur", text_color=RED)

    def _load_bot_avatar(self):
        cfg = load_config()
        token = cfg.get("token", "")
        if not token: return
        me = discord_get("/users/@me", token)
        if not isinstance(me, dict) or "error" in me: return
        url = get_avatar_url(me, 128)
        if not url: return
        avatar = download_avatar(url, 76)
        try:
            icon_img = download_avatar(url, 256)
            icon_path = CACHE_DIR / "bot_icon.ico"
            rgb = Image.new('RGB', icon_img.size, (19, 19, 24))
            rgb.paste(icon_img, mask=icon_img.split()[3] if icon_img.mode == 'RGBA' else None)
            rgb.save(str(icon_path), format='ICO', sizes=[(256, 256)])
            self.after(0, lambda: self.iconbitmap(str(icon_path)))
        except: pass
        ctk_img = ctk.CTkImage(light_image=avatar, dark_image=avatar, size=(76, 76))
        self._avatar_refs.append(ctk_img)
        self.after(0, lambda: (self._avatar_inner.configure(image=ctk_img, text=""), self._avatar_placeholder.configure(border_color=ACCENT)))

    def _animate_welcome(self):
        if not hasattr(self, '_welcome_idx'): self._welcome_idx = 0
        texts = ["Bienvenue", "Bienvenue .", "Bienvenue ..", "Bienvenue ..."]
        self._welcome_idx = (self._welcome_idx + 1) % len(texts)
        try:
            self._welcome_label.configure(text=texts[self._welcome_idx])
            self.after(600, self._animate_welcome)
        except: pass

    def _login(self):
        discord_id = self.login_discord.get().strip()
        code = self.login_code.get().strip()
        if not discord_id:
            self.login_status.configure(text="Discord ID requis", text_color=RED); return

        cfg = load_config()

        # Check if Owner
        if discord_id == self.OWNER_DISCORD_ID:
            if not cfg.get("token") or not cfg.get("mysql_pass"):
                self.destroy(); SetupWindow().mainloop(); return

            # "send pass" → envoie le code en DM
            if code.lower().replace(" ", "") in ("sendpass", "send", "envoi", "envoyer", ""):
                self.login_status.configure(text="Envoi du code en DM...", text_color=ACCENT)
                threading.Thread(target=self._send_owner_dm_code, args=(cfg["token"], discord_id), daemon=True).start()
                return

            # Verify code
            if cfg.get("_login_blocked"):
                self.login_status.configure(text="Acces bloque. Relance l'app.", text_color=RED)
                return
            stored = cfg.get("_login_code", "")
            if code == stored:
                cfg["_login_code"] = ""
                save_config(cfg)
                self.destroy(); MainApp().mainloop()
            else:
                self.login_status.configure(text="Code invalide", text_color=RED)
            return

        # Check if Tester
        if not code:
            self.login_status.configure(text="Code d'invitation requis", text_color=RED); return
        try:
            row = db_query("SELECT * FROM tester_codes WHERE code = %s", (code.upper(),))
            if not row:
                self.login_status.configure(text="Code invalide", text_color=RED); return
            row = row[0]
            if row.get('used_at') and row.get('discord_id') and str(row['discord_id']) != discord_id:
                self.login_status.configure(text="Code deja utilise par quelqu'un d'autre", text_color=RED); return
            conn = get_db()
            with conn.cursor() as c:
                c.execute("UPDATE tester_codes SET used_at = NOW(), discord_id = %s WHERE code = %s", (int(discord_id), code.upper()))
            conn.commit(); conn.close()
            self.destroy()
            TesterApp(code=code.upper(), name=row.get('label', 'Testeur'), discord_id=discord_id).mainloop()
        except Exception as e:
            self.login_status.configure(text=f"Erreur: {str(e)[:40]}", text_color=RED)

    def _send_owner_dm_code(self, token, user_id):
        import random
        code = str(random.randint(100000, 999999))
        cfg = load_config()
        cfg["_login_code"] = code
        cfg["_login_blocked"] = False
        save_config(cfg)

        result = discord_post("/users/@me/channels", token, {"recipient_id": int(user_id)})
        if isinstance(result, dict) and result.get("id"):
            dm_id = result["id"]
            cfg["_dm_channel"] = dm_id
            save_config(cfg)
            discord_post(f"/channels/{dm_id}/messages", token, {
                "embeds": [{
                    "title": "Silver App - Tentative de connexion",
                    "description": f"Quelqu'un essaie de se connecter en tant qu'Owner.\n\nTon code de connexion :\n# **{code}**\n\n**Si ce n'est PAS toi**, reponds `non` pour bloquer l'acces.\nSi c'est toi, entre le code dans l'app.",
                    "color": 0xC0C5D0,
                    "footer": {"text": "Silver Bot App"}
                }]
            })
            # Wait and check if user replied "non"
            import time as _time
            _time.sleep(2)
            # Check recent messages in DM for "non"
            msgs = discord_get(f"/channels/{dm_id}/messages?limit=5", token)
            if isinstance(msgs, list):
                for m in msgs:
                    if m.get("author", {}).get("id") == user_id and m.get("content", "").strip().lower() in ("non", "no", "n"):
                        cfg["_login_code"] = ""
                        cfg["_login_blocked"] = True
                        save_config(cfg)
                        discord_post(f"/channels/{dm_id}/messages", token, {
                            "embeds": [{"title": "Acces bloque", "description": "La tentative de connexion a ete bloquee.", "color": 0xE74C3C}]
                        })
                        self.after(0, lambda: self.login_status.configure(text="Acces bloque par l'owner", text_color=RED))
                        return

            self.after(0, lambda: self.login_status.configure(text="Code envoye en DM ! Verifie tes messages Discord.", text_color=GREEN))
            # Start background check for "non" response for 60 seconds
            threading.Thread(target=self._watch_for_block, args=(token, dm_id, user_id), daemon=True).start()
        else:
            err_msg = result.get("msg", result.get("error", "")) if isinstance(result, dict) else str(result)
            self.after(0, lambda: self.login_status.configure(text=f"Erreur DM: {str(err_msg)[:60]}", text_color=RED))

    def _watch_for_block(self, token, dm_id, user_id):
        import time as _time
        for _ in range(12):  # Check for 60 seconds (12 x 5s)
            _time.sleep(5)
            cfg = load_config()
            if not cfg.get("_login_code"):
                return  # Already logged in or blocked
            msgs = discord_get(f"/channels/{dm_id}/messages?limit=5", token)
            if isinstance(msgs, list):
                for m in msgs:
                    if m.get("author", {}).get("id") == user_id and m.get("content", "").strip().lower() in ("non", "no", "n", "bloque", "block"):
                        cfg["_login_code"] = ""
                        cfg["_login_blocked"] = True
                        save_config(cfg)
                        discord_post(f"/channels/{dm_id}/messages", token, {
                            "embeds": [{"title": "Acces bloque", "description": "La tentative de connexion a ete bloquee.", "color": 0xE74C3C}]
                        })
                        self.after(0, lambda: self.login_status.configure(text="Acces bloque par l'owner", text_color=RED))
                        return


# ═══════════════════════════════════════════════════════════════════════════════
# TESTER APP
# ═══════════════════════════════════════════════════════════════════════════════

class TesterApp(ctk.CTk):
    def __init__(self, code, name, discord_id):
        super().__init__()
        self.code = code
        self.tester_name = name
        self.discord_id = discord_id
        self.discord_username = name
        self._avatar_refs = []

        self.title(f"{APP_NAME} - Testeur")
        self.geometry("1000x650")
        self.minsize(800, 500)
        self.configure(fg_color=BG)

        # Sidebar
        sb = ctk.CTkFrame(self, width=220, fg_color="#16161e", corner_radius=0)
        sb.pack(side="left", fill="y"); sb.pack_propagate(False)

        # Sidebar header with avatar
        self._sb_header = ctk.CTkFrame(sb, fg_color="transparent")
        self._sb_header.pack(pady=(15, 0))
        self._sb_avatar_label = ctk.CTkLabel(self._sb_header, text="", width=44)
        self._sb_avatar_label.pack(side="left", padx=(0, 8))
        # Placeholder avatar
        ph = ctk.CTkFrame(self._sb_header, width=44, height=44, corner_radius=22, fg_color=CARD, border_width=1, border_color=BORDER)
        ph.pack(side="left", padx=(0, 8)); ph.pack_propagate(False); ph.lower()
        ctk.CTkLabel(ph, text="?", font=("Segoe UI", 18, "bold"), text_color=DIM).pack(expand=True)

        sb_text = ctk.CTkFrame(self._sb_header, fg_color="transparent")
        sb_text.pack(side="left")
        ctk.CTkLabel(sb_text, text="SILVER BOT", font=("Segoe UI", 14, "bold"), text_color=BRIGHT).pack(anchor="w")
        self._sb_username = ctk.CTkLabel(sb_text, text="Chargement...", font=("Segoe UI", 10), text_color=ACCENT)
        self._sb_username.pack(anchor="w")

        ctk.CTkFrame(sb, height=1, fg_color=BORDER).pack(fill="x", padx=12, pady=(10, 5))

        self.nav_buttons = {}
        pages = [("chat", "Chat"), ("announcements", "Annonces"), ("tasks", "Taches"), ("bugs", "Bug Reports"), ("testlab", "Test Lab"), ("info", "Infos Bot")]
        for key, label in pages:
            btn = ctk.CTkButton(sb, text=f"  {label}", font=("Segoe UI", 13), anchor="w", height=34, corner_radius=6, fg_color="transparent", hover_color="#22222e", text_color=DIM, command=lambda k=key: self._show(k))
            btn.pack(padx=8, fill="x", pady=1); self.nav_buttons[key] = btn

        ctk.CTkButton(sb, text="Deconnexion", font=("Segoe UI", 11), height=30, corner_radius=6, fg_color="#2a2020", hover_color="#3a2828", text_color=RED, command=self._logout).pack(side="bottom", padx=8, fill="x", pady=10)

        # Content area
        self.content_wrapper = ctk.CTkFrame(self, fg_color=BG, corner_radius=0)
        self.content_wrapper.pack(side="right", fill="both", expand=True)

        # Welcome banner at top
        self._welcome_banner = ctk.CTkFrame(self.content_wrapper, fg_color=CARD, corner_radius=0, height=60, border_width=0)
        self._welcome_banner.pack(fill="x")
        self._welcome_banner.pack_propagate(False)
        self._welcome_inner = ctk.CTkFrame(self._welcome_banner, fg_color="transparent")
        self._welcome_inner.pack(fill="both", expand=True, padx=20)
        self._welcome_avatar = ctk.CTkLabel(self._welcome_inner, text="", width=40)
        self._welcome_avatar.pack(side="left", padx=(0, 12))
        self._welcome_text_frame = ctk.CTkFrame(self._welcome_inner, fg_color="transparent")
        self._welcome_text_frame.pack(side="left")
        self._welcome_title = ctk.CTkLabel(self._welcome_text_frame, text="Welcome!", font=("Segoe UI", 16, "bold"), text_color=BRIGHT)
        self._welcome_title.pack(anchor="w")
        self._welcome_sub = ctk.CTkLabel(self._welcome_text_frame, text="Chargement de ton profil...", font=("Segoe UI", 11), text_color=DIM)
        self._welcome_sub.pack(anchor="w")

        self.content = ctk.CTkFrame(self.content_wrapper, fg_color=BG, corner_radius=0)
        self.content.pack(fill="both", expand=True)

        # Fetch Discord user in background
        threading.Thread(target=self._fetch_user_profile, daemon=True).start()
        self._show("chat")

    def _fetch_user_profile(self):
        cfg = load_config()
        token = cfg.get("token", "")
        if not token or not self.discord_id:
            self.after(0, lambda: self._set_welcome(self.tester_name, None))
            return
        user = fetch_discord_user(self.discord_id, token)
        if user and 'username' in user:
            self.discord_username = user['username']
            ping_presence(self.discord_id, user['username'])
            url = get_avatar_url(user, 128)
            avatar = download_avatar(url, 40) if url else None
            self.after(0, lambda: self._set_welcome(user['username'], avatar))
        else:
            self.after(0, lambda: self._set_welcome(self.tester_name, None))

    def _set_welcome(self, username, avatar):
        self.discord_username = username
        self.tester_name = username
        self._welcome_title.configure(text=f"Welcome, {username} !")
        self._welcome_sub.configure(text="Testeur Silver Bot  |  Bon test !")
        self._sb_username.configure(text=username)
        self.title(f"{APP_NAME} - {username}")
        if avatar:
            ctk_img = ctk.CTkImage(light_image=avatar, dark_image=avatar, size=(40, 40))
            self._avatar_refs.append(ctk_img)
            self._welcome_avatar.configure(image=ctk_img)
            self._sb_avatar_label.configure(image=ctk_img)

    def _show(self, name):
        for k, btn in self.nav_buttons.items():
            btn.configure(fg_color="#22222e" if k == name else "transparent", text_color=BRIGHT if k == name else DIM)
        for w in self.content.winfo_children(): w.destroy()
        self._avatar_refs = []
        getattr(self, f"_page_{name}", lambda: None)()

    def _logout(self):
        self.destroy(); LoginScreen().mainloop()

    def _header(self, title, sub=""):
        hf = ctk.CTkFrame(self.content, fg_color="transparent"); hf.pack(fill="x", padx=20, pady=(15, 8))
        ctk.CTkLabel(hf, text=title, font=("Segoe UI", 18, "bold"), text_color=BRIGHT).pack(anchor="w")
        if sub: ctk.CTkLabel(hf, text=sub, font=("Segoe UI", 11), text_color=DIM).pack(anchor="w")

    def _scroll(self):
        s = ctk.CTkScrollableFrame(self.content, fg_color="transparent"); s.pack(fill="both", expand=True, padx=15, pady=(0, 8)); return s

    # ── CHAT ──────────────────────────────────────────────────────────────────

    def _page_chat(self):
        self._header("Chat", "Discussion avec l'equipe")

        tabs = ctk.CTkFrame(self.content, fg_color="transparent")
        tabs.pack(fill="x", padx=15, pady=(0, 5))
        self._chat_mode = "general"
        self._tab_general = ctk.CTkButton(tabs, text="# General", font=("Segoe UI", 12, "bold"), height=30, corner_radius=6, fg_color="#22222e", text_color=BRIGHT, width=120, command=lambda: self._switch_chat("general"))
        self._tab_general.pack(side="left", padx=(0, 5))
        self._tab_dm = ctk.CTkButton(tabs, text="DM Owner", font=("Segoe UI", 12), height=30, corner_radius=6, fg_color="transparent", hover_color="#22222e", text_color=DIM, width=120, command=lambda: self._switch_chat("dm"))
        self._tab_dm.pack(side="left")

        self.chat_frame = ctk.CTkScrollableFrame(self.content, fg_color="transparent")
        self.chat_frame.pack(fill="both", expand=True, padx=15, pady=(0, 5))

        input_f = ctk.CTkFrame(self.content, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
        input_f.pack(fill="x", padx=15, pady=(0, 10))
        inner = ctk.CTkFrame(input_f, fg_color="transparent"); inner.pack(fill="x", padx=10, pady=8)
        self.chat_input = ctk.CTkEntry(inner, placeholder_text="Ecris un message...", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=36)
        self.chat_input.pack(side="left", fill="x", expand=True, padx=(0, 5))
        self.chat_input.bind("<Return>", lambda e: self._send_chat())
        ctk.CTkButton(inner, text="Fichier", height=36, corner_radius=6, fg_color="#22222e", hover_color="#2a2a38", text_color=DIM, width=60, command=self._tester_send_file).pack(side="right", padx=(0, 5))
        ctk.CTkButton(inner, text="Envoyer", height=36, corner_radius=6, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=80, command=self._send_chat).pack(side="right")

        self._refresh_chat()
        self._chat_auto_refresh()

    def _switch_chat(self, mode):
        self._chat_mode = mode
        self._tab_general.configure(fg_color="#22222e" if mode == "general" else "transparent", text_color=BRIGHT if mode == "general" else DIM)
        self._tab_dm.configure(fg_color="#22222e" if mode == "dm" else "transparent", text_color=BRIGHT if mode == "dm" else DIM)
        self._refresh_chat()

    def _tester_render_msg(self, parent, m):
        is_owner = m['sender_type'] in ('admin', 'owner')
        color = "#1a2a1a" if is_owner else "#1a1a2a"
        mf = ctk.CTkFrame(parent, fg_color=color, corner_radius=8, border_width=1, border_color=BORDER)
        mf.pack(fill="x", pady=2)
        hdr = ctk.CTkFrame(mf, fg_color="transparent"); hdr.pack(fill="x", padx=10, pady=(6, 0))
        tag = "OWNER" if is_owner else "TESTEUR"
        ctk.CTkLabel(hdr, text=f"{m['sender']}  [{tag}]", font=("Segoe UI", 10, "bold"), text_color=GREEN if is_owner else ACCENT).pack(side="left")
        time_str = str(m.get('created_at', ''))
        if len(time_str) > 10: time_str = time_str[11:16]
        ctk.CTkLabel(hdr, text=time_str, font=("Segoe UI", 9), text_color=DIM).pack(side="right")
        if m.get('message'):
            ctk.CTkLabel(mf, text=m['message'], font=("Segoe UI", 12), text_color=TEXT, wraplength=500, anchor="w", justify="left").pack(padx=10, pady=(2, 4), anchor="w")
        if m.get('file_name'):
            fname = m['file_name']
            is_image = fname.lower().split('.')[-1] in ('png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp')
            ff = ctk.CTkFrame(mf, fg_color="#1a1a24", corner_radius=6, border_width=1, border_color=BORDER)
            ff.pack(padx=10, pady=(2, 8), anchor="w")
            if is_image and m.get('file_data'):
                try:
                    img = Image.open(io.BytesIO(m['file_data']))
                    w, h = img.size
                    max_w = 280
                    if w > max_w: h = int(h * max_w / w); w = max_w
                    img = img.resize((w, h), Image.LANCZOS)
                    ctk_img = ctk.CTkImage(light_image=img, dark_image=img, size=(w, h))
                    self._avatar_refs.append(ctk_img)
                    ctk.CTkLabel(ff, image=ctk_img, text="").pack(padx=8, pady=8)
                except:
                    ctk.CTkLabel(ff, text=f"[Image: {fname}]", font=("Segoe UI", 11), text_color=ACCENT).pack(padx=8, pady=6)
            else:
                ctk.CTkLabel(ff, text=f"[Fichier: {fname}]", font=("Segoe UI", 11), text_color=ACCENT).pack(side="left", padx=(8, 4), pady=6)
            ctk.CTkButton(ff, text="Sauvegarder", height=22, corner_radius=4, fg_color="#22222e", hover_color="#2e2e3e", text_color=DIM, font=("Segoe UI", 9), width=80,
                command=lambda fn=fname, fd=m.get('file_data'): self._tester_save_file(fn, fd)).pack(side="right", padx=8, pady=6)

    def _tester_save_file(self, fname, fdata):
        if not fdata: return
        path = save_file_to_disk(fname, fdata)
        os.startfile(str(path.parent))

    def _refresh_chat(self):
        if not hasattr(self, 'chat_frame') or not self.chat_frame.winfo_exists(): return
        for w in self.chat_frame.winfo_children(): w.destroy()
        if self._chat_mode == "dm":
            msgs = db_query("SELECT sender, sender_type, message, file_name, file_data, created_at FROM tester_dms WHERE tester_code = %s ORDER BY created_at DESC LIMIT 50", (self.code,))
        else:
            msgs = db_query("SELECT sender, sender_type, message, file_name, file_data, created_at FROM tester_chat ORDER BY created_at DESC LIMIT 50")
        msgs.reverse()
        for m in msgs:
            self._tester_render_msg(self.chat_frame, m)

    def _chat_auto_refresh(self):
        if hasattr(self, 'chat_frame') and self.chat_frame.winfo_exists():
            ping_presence(self.discord_id, self.discord_username)
            self._refresh_chat()
            self.after(5000, self._chat_auto_refresh)

    def _send_chat(self, file_name=None, file_data=None):
        msg = self.chat_input.get().strip()
        if not msg and not file_name: return
        try:
            conn = get_db()
            with conn.cursor() as c:
                if self._chat_mode == "dm":
                    c.execute("INSERT INTO tester_dms (tester_code, sender, sender_type, message, file_name, file_data) VALUES (%s,%s,%s,%s,%s,%s)", (self.code, self.discord_username, "tester", msg or None, file_name, file_data))
                else:
                    c.execute("INSERT INTO tester_chat (sender, sender_type, message, file_name, file_data) VALUES (%s,%s,%s,%s,%s)", (self.discord_username, "tester", msg or None, file_name, file_data))
            conn.commit(); conn.close()
            self.chat_input.delete(0, "end")
            self._refresh_chat()
        except: pass

    def _tester_send_file(self):
        path = filedialog.askopenfilename(title="Envoyer un fichier")
        if not path: return
        try:
            fdata = open(path, "rb").read()
            fname = os.path.basename(path)
            if len(fdata) > 15 * 1024 * 1024: return
            self._send_chat(file_name=fname, file_data=fdata)
        except: pass

    # ── ANNOUNCEMENTS ─────────────────────────────────────────────────────────

    def _page_announcements(self):
        self._header("Annonces", "Mises a jour de l'equipe")
        scroll = self._scroll()
        spinner = LoadingSpinner(scroll); spinner.pack(fill="x")
        def _load():
            rows = db_query("SELECT title, content, author, created_at FROM tester_announcements ORDER BY created_at DESC LIMIT 20")
            def _render():
                spinner.stop()
                if not rows:
                    ctk.CTkLabel(scroll, text="Aucune annonce", text_color=DIM).pack(pady=30); return
                for a in rows:
                    f = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); f.pack(fill="x", pady=4)
                    hdr = ctk.CTkFrame(f, fg_color="transparent"); hdr.pack(fill="x", padx=12, pady=(10, 4))
                    ctk.CTkLabel(hdr, text=a.get('title') or 'Annonce', font=("Segoe UI", 14, "bold"), text_color=BRIGHT).pack(side="left")
                    ctk.CTkLabel(hdr, text=f"{a.get('author', '')}  |  {str(a.get('created_at', ''))[:16]}", font=("Segoe UI", 10), text_color=DIM).pack(side="right")
                    ctk.CTkLabel(f, text=a['content'], font=("Segoe UI", 12), text_color=TEXT, wraplength=600, anchor="w", justify="left").pack(padx=12, pady=(0, 10), anchor="w")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    # ── TASKS ─────────────────────────────────────────────────────────────────

    def _page_tasks(self):
        self._header("Taches", "Taches assignees")
        scroll = self._scroll()
        spinner = LoadingSpinner(scroll); spinner.pack(fill="x")
        def _load():
            rows = db_query("SELECT id, title, description, status, priority, assigned_to, created_at FROM tester_tasks ORDER BY FIELD(status, 'todo', 'in_progress', 'done'), FIELD(priority, 'high', 'normal', 'low')")
            def _render():
                spinner.stop()
                if not rows:
                    ctk.CTkLabel(scroll, text="Aucune tache", text_color=DIM).pack(pady=30); return
                for t in rows:
                    prio_colors = {"high": "#4a2020", "normal": CARD, "low": "#1a1a2a"}
                    stat_colors = {"todo": "#fbbf24", "in_progress": "#60a5fa", "done": "#4ade80"}
                    f = ctk.CTkFrame(scroll, fg_color=prio_colors.get(t['priority'], CARD), corner_radius=8, border_width=1, border_color=BORDER); f.pack(fill="x", pady=3)
                    hdr = ctk.CTkFrame(f, fg_color="transparent"); hdr.pack(fill="x", padx=12, pady=(8, 2))
                    ctk.CTkLabel(hdr, text=t['title'], font=("Segoe UI", 13, "bold"), text_color=BRIGHT).pack(side="left")
                    sc = stat_colors.get(t['status'], DIM)
                    ctk.CTkLabel(hdr, text=t['status'].upper(), font=("Segoe UI", 9, "bold"), text_color=sc).pack(side="right")
                    if t.get('priority') == 'high':
                        ctk.CTkLabel(hdr, text="HAUTE", font=("Segoe UI", 9, "bold"), text_color=RED).pack(side="right", padx=8)
                    if t.get('description'):
                        ctk.CTkLabel(f, text=t['description'], font=("Segoe UI", 11), text_color=DIM, wraplength=500, anchor="w").pack(padx=12, pady=(0, 4), anchor="w")
                    bottom = ctk.CTkFrame(f, fg_color="transparent"); bottom.pack(fill="x", padx=12, pady=(0, 8))
                    if t['status'] != 'done':
                        next_status = 'in_progress' if t['status'] == 'todo' else 'done'
                        ctk.CTkButton(bottom, text="Marquer " + next_status, height=24, corner_radius=4, fg_color="#2a2a40", hover_color="#35355a", text_color=BRIGHT, font=("Segoe UI", 10), width=120,
                            command=lambda tid=t['id'], ns=next_status: self._update_task(tid, ns)).pack(side="left")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    def _update_task(self, task_id, new_status):
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("UPDATE tester_tasks SET status = %s, assigned_to = %s WHERE id = %s", (new_status, self.code, task_id))
            conn.commit(); conn.close()
            self._show("tasks")
        except: pass

    # ── BUGS ──────────────────────────────────────────────────────────────────

    def _page_bugs(self):
        self._header("Bug Reports", "Signaler et suivre les bugs")

        # Report form
        rf = ctk.CTkFrame(self.content, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER)
        rf.pack(fill="x", padx=15, pady=(0, 8))
        r1 = ctk.CTkFrame(rf, fg_color="transparent"); r1.pack(fill="x", padx=12, pady=(10, 4))
        self.bug_title = ctk.CTkEntry(r1, placeholder_text="Titre du bug", fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=30, width=250); self.bug_title.pack(side="left", padx=(0, 5))
        self.bug_sev = ctk.CTkOptionMenu(r1, values=["low", "medium", "high", "critical"], fg_color=BG, button_color=ACCENT, text_color=BRIGHT, width=100); self.bug_sev.pack(side="left")
        r2 = ctk.CTkFrame(rf, fg_color="transparent"); r2.pack(fill="x", padx=12, pady=4)
        self.bug_desc = ctk.CTkTextbox(r2, fg_color=BG, border_color=BORDER, text_color=BRIGHT, height=50, border_width=1); self.bug_desc.pack(fill="x")
        r3 = ctk.CTkFrame(rf, fg_color="transparent"); r3.pack(fill="x", padx=12, pady=(4, 10))
        self.bug_status_lbl = ctk.CTkLabel(r3, text="", font=("Segoe UI", 11))
        ctk.CTkButton(r3, text="Signaler", height=28, corner_radius=5, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=100, command=self._submit_bug).pack(side="left")
        self.bug_status_lbl.pack(side="left", padx=8)

        # Bug list
        scroll = self._scroll()
        spinner = LoadingSpinner(scroll); spinner.pack(fill="x")
        def _load():
            rows = db_query("SELECT id, reporter, title, description, severity, status, created_at FROM tester_bugs ORDER BY FIELD(severity, 'critical', 'high', 'medium', 'low'), created_at DESC")
            def _render():
                spinner.stop()
                if not rows:
                    ctk.CTkLabel(scroll, text="Aucun bug signale", text_color=DIM).pack(pady=20); return
                for b in rows:
                    sev_colors = {"critical": "#5a1a1a", "high": "#4a2020", "medium": CARD, "low": "#1a1a2a"}
                    f = ctk.CTkFrame(scroll, fg_color=sev_colors.get(b['severity'], CARD), corner_radius=8, border_width=1, border_color=BORDER); f.pack(fill="x", pady=2)
                    hdr = ctk.CTkFrame(f, fg_color="transparent"); hdr.pack(fill="x", padx=10, pady=(8, 2))
                    ctk.CTkLabel(hdr, text=f"#{b['id']} {b['title']}", font=("Segoe UI", 13, "bold"), text_color=BRIGHT).pack(side="left")
                    ctk.CTkLabel(hdr, text=f"{b['severity'].upper()}  |  {b['status']}", font=("Segoe UI", 9, "bold"), text_color=RED if b['severity'] in ('critical', 'high') else DIM).pack(side="right")
                    if b.get('description'):
                        ctk.CTkLabel(f, text=b['description'], font=("Segoe UI", 11), text_color=DIM, wraplength=500, anchor="w").pack(padx=10, pady=(0, 6), anchor="w")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()

    def _submit_bug(self):
        title = self.bug_title.get().strip()
        if not title: self.bug_status_lbl.configure(text="Titre requis", text_color=RED); return
        desc = self.bug_desc.get("1.0", "end").strip(); sev = self.bug_sev.get()
        try:
            conn = get_db()
            with conn.cursor() as c: c.execute("INSERT INTO tester_bugs (reporter, title, description, severity) VALUES (%s, %s, %s, %s)", (self.code, title, desc, sev))
            conn.commit(); conn.close()
            self.bug_status_lbl.configure(text="Bug signale", text_color=GREEN)
            self.bug_title.delete(0, "end"); self.bug_desc.delete("1.0", "end")
            self._show("bugs")
        except: self.bug_status_lbl.configure(text="Erreur", text_color=RED)

    # ── INFO ──────────────────────────────────────────────────────────────────

    def _page_testlab(self):
        # Reuse the same _build_testlab from MainApp but adapted for tester
        self._tl_user = self.discord_username
        self._tl_uid = self.discord_id
        self._tl_type = "tester"

        hf = ctk.CTkFrame(self.content, fg_color="transparent"); hf.pack(fill="x", padx=20, pady=(15, 0))
        ctk.CTkLabel(hf, text="# test-lab", font=("Segoe UI", 18, "bold"), text_color=BRIGHT).pack(side="left")

        cmds_f = ctk.CTkFrame(self.content, fg_color=CARD, corner_radius=0)
        cmds_f.pack(fill="x", padx=0, pady=(8, 0))
        cmds_inner = ctk.CTkFrame(cmds_f, fg_color="transparent"); cmds_inner.pack(padx=12, pady=6)
        for label, cmd in [("/ping", "/ping"), ("/serverinfo", "/serverinfo"), ("/botinfo", "/botinfo"), ("/leaderboard", "/leaderboard"), ("/xp", "/xp"), ("hello", "hello")]:
            ctk.CTkButton(cmds_inner, text=label, font=("Segoe UI", 10), height=26, corner_radius=12, fg_color="#1e1e2a", hover_color="#28283a", text_color=ACCENT, border_width=1, border_color="#2a2a3a",
                command=lambda c=cmd: self._tester_tl_send(c)).pack(side="left", padx=2)

        self._tl_chat = ctk.CTkScrollableFrame(self.content, fg_color="#0f0f16", corner_radius=0)
        self._tl_chat.pack(fill="both", expand=True, padx=0, pady=0)

        input_bar = ctk.CTkFrame(self.content, fg_color="#1a1a24", corner_radius=0, height=56)
        input_bar.pack(fill="x"); input_bar.pack_propagate(False)
        inner = ctk.CTkFrame(input_bar, fg_color="transparent"); inner.pack(fill="both", expand=True, padx=12, pady=8)
        self._tl_input = ctk.CTkEntry(inner, placeholder_text="Envoyer un message dans #test-lab", fg_color="#2a2a36", border_width=0, text_color=BRIGHT, height=38, corner_radius=8, font=("Segoe UI", 13))
        self._tl_input.pack(side="left", fill="x", expand=True, padx=(0, 8))
        self._tl_input.bind("<Return>", lambda e: self._tester_tl_send())
        ctk.CTkButton(inner, text="Envoyer", height=38, corner_radius=8, fg_color=ACCENT, hover_color="#7a8192", text_color=BG, width=80, font=("Segoe UI", 12, "bold"), command=self._tester_tl_send).pack(side="right")

        self._tester_tl_refresh()
        self._tester_tl_auto()

    def _tester_tl_send(self, text=None):
        if text is None:
            text = self._tl_input.get().strip()
            if not text: return
            self._tl_input.delete(0, "end")
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO testlab_messages (sender_id, sender_name, sender_type, content) VALUES (%s,%s,%s,%s)", (self._tl_uid, self._tl_user, self._tl_type, text))
            conn.commit(); conn.close()
        except: pass
        # Bot response (same logic as owner)
        self.after(300, lambda: self._tester_tl_bot(text))
        self.after(100, self._tester_tl_refresh)

    def _tester_tl_bot(self, cmd):
        cmd_lower = cmd.lower().strip()
        embed_title = None; embed_desc = None; embed_color = 0x3498DB; embed_fields = None; content = None
        if cmd_lower == "/ping":
            embed_title = "Pong !"; embed_desc = "Latence : 42ms"; embed_color = 0x2ECC71
        elif cmd_lower == "/serverinfo":
            embed_title = "Informations du serveur"
            embed_fields = json.dumps([{"name": "Membres", "value": str(db_scalar("SELECT COUNT(DISTINCT user_id) FROM user_xp"))}, {"name": "Warns", "value": str(db_scalar("SELECT COUNT(*) FROM warnings"))}])
        elif cmd_lower == "/botinfo":
            embed_title = "Silver Bot"; embed_desc = "Version 1.2\nBy Tib"; embed_color = 0xC0C5D0
        elif cmd_lower == "/leaderboard":
            rows = db_query("SELECT user_id, SUM(xp) as xp FROM user_xp GROUP BY user_id ORDER BY xp DESC LIMIT 5")
            embed_title = "Leaderboard"; embed_desc = "\n".join([f"**#{i+1}** User {r['user_id']} - {r['xp']} XP" for i, r in enumerate(rows)]) if rows else "Aucune donnee"; embed_color = 0xFFD700
        elif cmd_lower == "/xp" or cmd_lower == "/level":
            embed_title = "Niveau"; embed_desc = f"**{self._tl_user}**\nNiveau : 5\nXP : 2500 / 3600"; embed_color = 0x9B59B6
        elif "hello" in cmd_lower or "salut" in cmd_lower:
            content = f"Salut {self._tl_user} !"
        else:
            content = f"Commande inconnue : `{cmd}`"
        try:
            conn = get_db()
            with conn.cursor() as c:
                c.execute("INSERT INTO testlab_messages (sender_id, sender_name, sender_type, content, embed_title, embed_desc, embed_color, embed_fields) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",
                    ("bot", "Silver Bot", "bot", content, embed_title, embed_desc, embed_color, embed_fields))
            conn.commit(); conn.close()
        except: pass
        self.after(100, self._tester_tl_refresh)

    def _tester_tl_refresh(self):
        if not hasattr(self, '_tl_chat') or not self._tl_chat.winfo_exists(): return
        for w in self._tl_chat.winfo_children(): w.destroy()
        msgs = db_query("SELECT sender_id, sender_name, sender_type, content, embed_title, embed_desc, embed_color, embed_fields, created_at FROM testlab_messages ORDER BY created_at DESC LIMIT 30")
        msgs.reverse()
        for m in msgs:
            is_bot = m['sender_type'] == 'bot'
            mf = ctk.CTkFrame(self._tl_chat, fg_color="transparent"); mf.pack(fill="x", padx=14, pady=4)
            av = ctk.CTkFrame(mf, width=36, height=36, corner_radius=18, fg_color="#1a2a3a" if is_bot else "#2a2a3a")
            av.pack(side="left", anchor="n", padx=(0, 8), pady=(2, 0)); av.pack_propagate(False)
            ctk.CTkLabel(av, text="S" if is_bot else (m['sender_name'][0].upper() if m['sender_name'] else "?"), font=("Segoe UI", 14, "bold"), text_color="#60a5fa" if is_bot else ACCENT).pack(expand=True)
            body = ctk.CTkFrame(mf, fg_color="transparent"); body.pack(side="left", fill="x", expand=True)
            nr = ctk.CTkFrame(body, fg_color="transparent"); nr.pack(fill="x")
            ctk.CTkLabel(nr, text=m['sender_name'], font=("Segoe UI", 12, "bold"), text_color="#60a5fa" if is_bot else BRIGHT).pack(side="left")
            if is_bot:
                t = ctk.CTkFrame(nr, fg_color="#404EED", corner_radius=3, width=28, height=14); t.pack(side="left", padx=4); t.pack_propagate(False)
                ctk.CTkLabel(t, text="BOT", font=("Segoe UI", 7, "bold"), text_color="#fff").pack(expand=True)
            ts = str(m.get('created_at', ''))
            if len(ts) > 11: ctk.CTkLabel(nr, text=ts[11:16], font=("Segoe UI", 9), text_color=DIM).pack(side="left", padx=5)
            if m.get('content'): ctk.CTkLabel(body, text=m['content'], font=("Segoe UI", 12), text_color=TEXT, wraplength=450, anchor="w", justify="left").pack(fill="x", pady=(2, 0))
            if m.get('embed_title') or m.get('embed_desc'):
                ec = m.get('embed_color', 0x3498DB); hc = f"#{ec:06x}" if ec else "#3498DB"
                ef = ctk.CTkFrame(body, fg_color="#1a1a28", corner_radius=6); ef.pack(fill="x", pady=(4, 0), padx=(0, 30))
                ctk.CTkFrame(ef, width=4, fg_color=hc, corner_radius=2).pack(side="left", fill="y")
                eb = ctk.CTkFrame(ef, fg_color="transparent"); eb.pack(side="left", fill="x", expand=True, padx=10, pady=8)
                if m.get('embed_title'): ctk.CTkLabel(eb, text=m['embed_title'], font=("Segoe UI", 13, "bold"), text_color=BRIGHT, anchor="w").pack(fill="x")
                if m.get('embed_desc'): ctk.CTkLabel(eb, text=m['embed_desc'], font=("Segoe UI", 11), text_color="#b0b8c8", wraplength=400, anchor="w", justify="left").pack(fill="x", pady=(3, 0))
                if m.get('embed_fields'):
                    try:
                        for field in json.loads(m['embed_fields'])[:6]:
                            ctk.CTkLabel(eb, text=f"{field.get('name','')}: {field.get('value','')}", font=("Segoe UI", 10), text_color=DIM, anchor="w").pack(fill="x", pady=1)
                    except: pass

    def _tester_tl_auto(self):
        if hasattr(self, '_tl_chat') and self._tl_chat.winfo_exists():
            self._tester_tl_refresh()
            self.after(3000, self._tester_tl_auto)

    def _page_info(self):
        self._header("Infos Bot", "Informations sur Silver Bot")
        scroll = self._scroll()
        spinner = LoadingSpinner(scroll); spinner.pack(fill="x")
        def _load():
            cfg = load_config()
            token = cfg.get("token", "")
            me = discord_get("/users/@me", token) if token else {}
            guilds = discord_get("/users/@me/guilds", token) if token else []
            warns = db_scalar("SELECT COUNT(*) FROM warnings")
            tickets = db_scalar("SELECT COUNT(*) FROM tickets")
            users = db_scalar("SELECT COUNT(DISTINCT user_id) FROM user_xp")
            def _render():
                spinner.stop()
                if isinstance(me, dict) and 'username' in me:
                    f = ctk.CTkFrame(scroll, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER); f.pack(fill="x", pady=(0, 10))
                    ctk.CTkLabel(f, text=f"{me['username']}  |  {len(guilds) if isinstance(guilds, list) else 0} serveur(s)", font=("Segoe UI", 14, "bold"), text_color=BRIGHT).pack(padx=15, pady=12)
                sf = ctk.CTkFrame(scroll, fg_color="transparent"); sf.pack(fill="x", pady=(0, 10))
                for i in range(3): sf.grid_columnconfigure(i, weight=1)
                for i, (l, v) in enumerate([("Utilisateurs", str(users)), ("Warns", str(warns)), ("Tickets", str(tickets))]):
                    card = ctk.CTkFrame(sf, fg_color=CARD, corner_radius=10, border_width=1, border_color=BORDER, height=70)
                    card.grid(row=0, column=i, padx=4, pady=4, sticky="ew"); card.pack_propagate(False)
                    ctk.CTkLabel(card, text=l.upper(), font=("Segoe UI", 9, "bold"), text_color=DIM).pack(padx=10, pady=(10, 2), anchor="w")
                    ctk.CTkLabel(card, text=v, font=("Segoe UI", 20, "bold"), text_color=BRIGHT).pack(padx=10, anchor="w")
            return _render
        threading.Thread(target=lambda: self.after(0, _load()), daemon=True).start()


# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    cfg = load_config()
    if not cfg.get("token") or not cfg.get("mysql_pass"):
        SetupWindow().mainloop()
    else:
        LoginScreen().mainloop()
