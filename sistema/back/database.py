import sqlite3

DB_NAME = "solo.db"


def get_connection():
    """
    Cria e retorna uma conexão com o banco SQLite.
    """
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # Permite acessar colunas por nome
    return conn

def init_db():
    """
    Cria as tabelas iniciais se não existirem.
    """
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS player (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            level INTEGER NOT NULL,
            xp INTEGER NOT NULL,
            points INTEGER NOT NULL
        )
    """)

    conn.commit()
    conn.close()


def create_player(level, xp, points):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO player (level, xp, points)
        VALUES (?, ?, ?)
    """, (level, xp, points))

    conn.commit()
    conn.close()

def get_player():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM player LIMIT 1")
    player = cursor.fetchone()

    conn.close()
    return player

def update_player(level, xp, points):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE player
        SET level = ?, xp = ?, points = ?
        WHERE id = 1
    """, (level, xp, points))

    conn.commit()
    conn.close()

def add_xp(amount):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM player WHERE id = 1")
    player = cursor.fetchone()

    if player is None:
        conn.close()
        return None

    current_xp = player["xp"]
    current_level = player["level"]
    current_points = player["points"]

    new_xp = current_xp + amount

    # Verifica level up
    xp_needed = current_level * 100

    while new_xp >= xp_needed:
        new_xp -= xp_needed
        current_level += 1
        current_points += 5  # recompensa por level
        xp_needed = current_level * 100

    cursor.execute("""
        UPDATE player
        SET xp = ?, level = ?, points = ?
        WHERE id = 1
    """, (new_xp, current_level, current_points))

    conn.commit()
    conn.close()

    return {
        "level": current_level,
        "xp": new_xp,
        "points": current_points
    }
