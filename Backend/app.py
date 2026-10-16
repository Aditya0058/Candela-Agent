from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests
app = Flask(__name__)
CORS(app)

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