"""Create all bot tables in MySQL."""
import pymysql

conn = pymysql.connect(
    host="163.5.159.107",
    port=3306,
    user="u15187_Ete17ZQbC1",
    password="uujk.EklpewktzI=t8eSqDQ!",
    database="s15187_DBs",
    charset="utf8mb4",
)
c = conn.cursor()

tables = [
    """CREATE TABLE IF NOT EXISTS guild_config (
        guild_id BIGINT PRIMARY KEY,
        log_channel BIGINT,
        mute_role BIGINT,
        log_events VARCHAR(255) DEFAULT 'all'
    )""",
    """CREATE TABLE IF NOT EXISTS warnings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        guild_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        mod_id BIGINT NOT NULL,
        reason TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""",
    """CREATE TABLE IF NOT EXISTS welcome_config (
        guild_id BIGINT PRIMARY KEY,
        channel_id BIGINT,
        message TEXT DEFAULT NULL,
        goodbye_channel BIGINT,
        goodbye_message TEXT DEFAULT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS ticket_config (
        guild_id BIGINT PRIMARY KEY,
        category_id BIGINT,
        log_channel_id BIGINT,
        support_role_id BIGINT,
        panel_channel BIGINT,
        panel_message BIGINT,
        counter INT DEFAULT 0
    )""",
    """CREATE TABLE IF NOT EXISTS tickets (
        ticket_id INT AUTO_INCREMENT PRIMARY KEY,
        guild_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        channel_id BIGINT NOT NULL,
        status VARCHAR(20) DEFAULT 'open',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""",
    """CREATE TABLE IF NOT EXISTS role_panels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        guild_id BIGINT NOT NULL,
        channel_id BIGINT NOT NULL,
        message_id BIGINT NOT NULL,
        title VARCHAR(255) NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS role_panel_entries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        panel_id INT NOT NULL,
        role_id BIGINT NOT NULL,
        label VARCHAR(255) NOT NULL,
        emoji VARCHAR(64),
        description TEXT
    )""",
    """CREATE TABLE IF NOT EXISTS antispam_config (
        guild_id BIGINT PRIMARY KEY,
        enabled TINYINT DEFAULT 1,
        msg_limit INT DEFAULT 5,
        msg_interval INT DEFAULT 5,
        duplicate_limit INT DEFAULT 3,
        caps_percent INT DEFAULT 70,
        caps_min_length INT DEFAULT 10,
        filter_invites TINYINT DEFAULT 1,
        filter_links TINYINT DEFAULT 0,
        punishment VARCHAR(20) DEFAULT 'warn',
        log_channel BIGINT,
        whitelist_channels TEXT,
        whitelist_roles TEXT
    )""",
    """CREATE TABLE IF NOT EXISTS reminders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT NOT NULL,
        channel_id BIGINT NOT NULL,
        guild_id BIGINT NOT NULL,
        message TEXT NOT NULL,
        remind_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""",
    """CREATE TABLE IF NOT EXISTS autoroles (
        guild_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        PRIMARY KEY (guild_id, role_id)
    )""",
    """CREATE TABLE IF NOT EXISTS suggestions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        guild_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        message_id BIGINT NOT NULL,
        content TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""",
    """CREATE TABLE IF NOT EXISTS user_xp (
        guild_id BIGINT NOT NULL,
        user_id BIGINT NOT NULL,
        xp INT DEFAULT 0,
        chat_xp INT DEFAULT 0,
        voice_xp INT DEFAULT 0,
        messages_count INT DEFAULT 0,
        voice_minutes INT DEFAULT 0,
        PRIMARY KEY (guild_id, user_id)
    )""",
    """CREATE TABLE IF NOT EXISTS suggest_config (
        guild_id BIGINT PRIMARY KEY,
        channel_id BIGINT
    )""",
    """CREATE TABLE IF NOT EXISTS meme_config (
        guild_id BIGINT PRIMARY KEY,
        channel_id BIGINT,
        `interval` INT DEFAULT 60
    )""",
    """CREATE TABLE IF NOT EXISTS global_user_profile (
        user_id BIGINT PRIMARY KEY,
        global_xp INT DEFAULT 0,
        global_coins INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )""",
    """CREATE TABLE IF NOT EXISTS level_rewards (
        guild_id BIGINT NOT NULL,
        level INT NOT NULL,
        role_id BIGINT NOT NULL,
        PRIMARY KEY (guild_id, level, role_id)
    )""",
    """CREATE TABLE IF NOT EXISTS global_user_stats (
        user_id BIGINT PRIMARY KEY,
        messages_count INT DEFAULT 0,
        voice_minutes INT DEFAULT 0
    )""",
    """CREATE TABLE IF NOT EXISTS notification_config (
        guild_id BIGINT PRIMARY KEY,
        enabled TINYINT DEFAULT 1,
        channel_id BIGINT,
        style VARCHAR(20) DEFAULT 'embed',
        message_template TEXT,
        milestone_notifications TINYINT DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""",
    """CREATE TABLE IF NOT EXISTS guild_customization (
        guild_id BIGINT PRIMARY KEY,
        primary_color VARCHAR(10) DEFAULT '3498DB',
        accent_color VARCHAR(10) DEFAULT 'FFD700',
        prefix VARCHAR(10) DEFAULT '!',
        timezone VARCHAR(50) DEFAULT 'UTC',
        xp_multiplier FLOAT DEFAULT 1.0,
        message_ping TINYINT DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )""",
]

for sql in tables:
    c.execute(sql)
    name = sql.split("EXISTS")[1].split("(")[0].strip()
    print(f"  OK: {name}")

conn.commit()
conn.close()
print("\nToutes les tables creees dans MySQL !")
