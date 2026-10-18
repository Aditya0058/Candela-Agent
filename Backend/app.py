from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests
import sqlite3
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


# AI chatting routes below

@app.route('/chats', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])

    proxy_url = "http://127.0.0.1:2026/api/chat"
    payload = {
        "model": "gemma4:31b-cloud",
        "messages": messages,
        "stream": False     
    }

    response = requests.post(proxy_url, json=payload)
    result = response.json()

    
    bot_answer = result.get("message", {}).get("content", "Sorry, I couldn't think of an answer.")

    return jsonify({"response": bot_answer})
    

if __name__ == "__main__":
    app.run(debug=True, port=5000)