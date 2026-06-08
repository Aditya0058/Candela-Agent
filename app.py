from flask import Flask, render_template, jsonify, request
import datetime
import sqlite3

app = Flask(__name__)

# Initialize database
def init_db():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)''')
    conn.commit()
    conn.close()

# Initialize notes database
def init_notes_db():
    conn = sqlite3.connect('notes.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS notes
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  content TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()
init_notes_db()

@app.route('/api/time')
def get_time():
    return jsonify({"time": datetime.datetime.now().strftime("%H:%M:%S"), "date": datetime.date.today().strftime("%Y-%m-%d")})

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT task FROM tasks")
    tasks = [row[0] for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    task = data.get('task', '')
    if task:
        conn = sqlite3.connect('tasks.db')
        c = conn.cursor()
        c.execute("INSERT INTO tasks (task) VALUES (?)", (task,))
        conn.commit()
        conn.close()
    return jsonify({"success": True})

@app.route('/api/tasks', methods=['DELETE'])
def clear_tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("DELETE FROM tasks")
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# Notes API endpoints
@app.route('/api/notes', methods=['GET'])
def get_notes():
    conn = sqlite3.connect('notes.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT id, content, created_at FROM notes ORDER BY created_at DESC")
    notes = [{"id": row["id"], "content": row["content"], "created_at": row["created_at"]} for row in c.fetchall()]
    conn.close()
    return jsonify(notes)

@app.route('/api/notes', methods=['POST'])
def add_note():
    data = request.json
    content = data.get('content', '')
    if content:
        conn = sqlite3.connect('notes.db')
        c = conn.cursor()
        c.execute("INSERT INTO notes (content) VALUES (?)", (content,))
        conn.commit()
        conn.close()
        return jsonify({"success": True})
    return jsonify({"success": False, "error": "Content is required"}), 400

@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    conn = sqlite3.connect('notes.db')
    c = conn.cursor()
    c.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

@app.route('/')
def Home():
    return render_template("index.html")

@app.route('/todos')
def todos():
    return render_template("todos.html")

@app.route('/notes')
def notes():
    return render_template("notes.html")

if __name__ == '__main__':
    app.run()
