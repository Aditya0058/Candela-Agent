from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests
import sqlite3
import uuid
app = Flask(__name__)
CORS(app)

# database routes below
@app.route('/api/chats', methods=['GET'])
def get_chats():
    conn = sqlite3.connect('candela.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM chats ORDER BY created_at DESC")
    rows = cursor.fetchall()

    chats = [dict(row) for row in rows]

    conn.close()
    return jsonify(chats)

@app.route('/api/chats', methods=['POST'])
def create_chat():
    data = request.json
    chat_id = data.get('id')
    title = data.get('title')

    conn = sqlite3.connect('candela.db')
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO chats (id, title) VALUES (?, ?)", 
        (chat_id, title)
    )
    conn.commit()
    conn.close()
    
    return jsonify({"status": "success", "id": chat_id}), 201

# getting data from datbase
@app.route('/api/chats/<chat_id>/messages', methods=['GET'])
def get_chat_messages(chat_id):
    conn = sqlite3.connect('candela.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC", (chat_id,))
    rows = cursor.fetchall()

    messages = [dict(row) for row in rows]

    conn.close()
    return jsonify(messages)


# AI chatting routes below

@app.route('/chats', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    chat_id = data.get('chat_id')

    user_msg = messages[-1]

    conn = sqlite3.connect('candela.db')
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO messages (id, chat_id, role, content) VALUES (?, ?, ?, ?)",
        (user_msg['id'], chat_id, user_msg['role'], user_msg['content'])
    )

    conn.commit()
    conn.close()

    proxy_url = "http://127.0.0.1:2026/api/chat"
    payload = {
        "model": "gemma4:31b-cloud",
        "messages": messages,
        "stream": False     
    }

    response = requests.post(proxy_url, json=payload)
    result = response.json()

    
    bot_answer = result.get("message", {}).get("content", "Sorry, I couldn't think of an answer.")

    ai_msg_id = str(uuid.uuid4())
    conn = sqlite3.connect('candela.db')
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO messages (id, chat_id, role, content) VALUES (?, ?, ?, ?)",
        (ai_msg_id, chat_id, 'assistant', bot_answer)
    )
    conn.commit()
    conn.close()

    return jsonify({"response": bot_answer})
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)