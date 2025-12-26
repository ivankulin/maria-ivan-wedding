import os
import sqlite3
from datetime import datetime
from flask import Flask, jsonify, request, session

app = Flask(__name__, static_folder=".", static_url_path="")
app.secret_key = os.environ.get("RSVP_SECRET", "change-me")

DB_PATH = os.path.join(app.root_path, "rsvp.sqlite")
ADMIN_PASSWORD = os.environ.get("RSVP_ADMIN_PASSWORD", "change-me")


def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS rsvps (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT,
                attending TEXT NOT NULL,
                plus_one TEXT,
                adults INTEGER NOT NULL,
                children INTEGER NOT NULL,
                meal TEXT,
                nights INTEGER,
                notes TEXT,
                language TEXT,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS codes (
                code TEXT PRIMARY KEY,
                household TEXT NOT NULL,
                max_adults INTEGER NOT NULL,
                max_children INTEGER NOT NULL,
                allow_plus_one INTEGER NOT NULL
            )
            """
        )

        existing = conn.execute("SELECT COUNT(*) FROM codes").fetchone()[0]
        if existing == 0:
            seed_codes(conn)


def seed_codes(conn):
    codes = [
        ("ANGEL-EVELIN", "Angel & Evelin", 2, 1, 0),
        ("YOSIF", "Yosif", 2, 0, 1),
        ("SLAVI", "Slavi", 2, 0, 1),
        ("STOYAN", "Stoyan", 2, 0, 1),
    ]
    conn.executemany(
        "INSERT INTO codes (code, household, max_adults, max_children, allow_plus_one) VALUES (?, ?, ?, ?, ?)",
        codes,
    )


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def clean_text(value, max_len=300):
    if value is None:
        return ""
    text = str(value).strip()
    if len(text) > max_len:
        return text[:max_len]
    return text


def is_admin():
    return session.get("admin") is True


def lookup_code(code):
    with get_db() as conn:
        row = conn.execute(
            "SELECT code, household, max_adults, max_children, allow_plus_one FROM codes WHERE code = ?",
            (code,),
        ).fetchone()
    return row


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/admin")
def admin_page():
    return app.send_static_file("admin.html")


@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    password = data.get("password", "")
    if password and password == ADMIN_PASSWORD:
        session["admin"] = True
        return jsonify({"ok": True})
    return jsonify({"error": "unauthorized"}), 401


@app.post("/api/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@app.post("/api/code")
def verify_code():
    data = request.get_json(silent=True) or {}
    code = clean_text(data.get("code"), 40).upper()
    row = lookup_code(code)
    if not row:
        return jsonify({"error": "invalid code"}), 404

    return jsonify(
        {
            "code": row["code"],
            "household": row["household"],
            "max_adults": row["max_adults"],
            "max_children": row["max_children"],
            "allow_plus_one": bool(row["allow_plus_one"]),
        }
    )


@app.get("/api/rsvps")
def list_rsvps():
    if not is_admin():
        return jsonify({"error": "unauthorized"}), 401

    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM rsvps ORDER BY datetime(created_at) DESC"
        ).fetchall()

    return jsonify({"rsvps": [dict(row) for row in rows]})


@app.delete("/api/rsvp/<int:rsvp_id>")
def delete_rsvp(rsvp_id):
    if not is_admin():
        return jsonify({"error": "unauthorized"}), 401

    with get_db() as conn:
        conn.execute("DELETE FROM rsvps WHERE id = ?", (rsvp_id,))
        conn.commit()

    return jsonify({"ok": True})


@app.post("/api/rsvp")
def save_rsvp():
    data = request.get_json(silent=True) or {}

    code = clean_text(data.get("code"), 40).upper()
    name = clean_text(data.get("name"), 120)
    attending = data.get("attending")

    if not code or not name or attending not in {"yes", "no"}:
        return jsonify({"error": "invalid payload"}), 400

    code_row = lookup_code(code)
    if not code_row:
        return jsonify({"error": "invalid code"}), 403

    email = clean_text(data.get("email"), 120)
    plus_one = clean_text(data.get("plus_one"), 20)
    meal = clean_text(data.get("meal"), 40)
    notes = clean_text(data.get("notes"), 500)
    language = clean_text(data.get("language"), 5)

    try:
        nights = int(data.get("nights", 0))
    except (TypeError, ValueError):
        nights = 0

    try:
        children = int(data.get("children", 0))
    except (TypeError, ValueError):
        children = 0

    max_adults = int(code_row["max_adults"])
    max_children = int(code_row["max_children"])
    allow_plus_one = bool(code_row["allow_plus_one"])

    if attending == "no":
        adults = 0
        children = 0
        plus_one = ""
    else:
        adults = 1
        if allow_plus_one and plus_one == "yes":
            adults = min(max_adults, 2)
        else:
            adults = min(max_adults, adults)

    if not allow_plus_one:
        plus_one = ""

    if children < 0 or children > max_children:
        children = 0

    if nights < 0 or nights > 7:
        nights = 0

    if meal not in {"fish", "chicken", "vegetarian"}:
        meal = ""

    if plus_one not in {"yes", "no"}:
        plus_one = ""

    created_at = datetime.utcnow().isoformat()

    with get_db() as conn:
        conn.execute(
            """
            INSERT INTO rsvps (code, name, email, attending, plus_one, adults, children, meal, nights, notes, language, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                code,
                name,
                email,
                attending,
                plus_one,
                adults,
                children,
                meal,
                nights,
                notes,
                language,
                created_at,
            ),
        )
        conn.commit()

    return jsonify({"ok": True})


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
