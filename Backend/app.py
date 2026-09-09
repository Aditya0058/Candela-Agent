from flask import Flask, request, jsonify
from flask_cors import CORS 
import requests
app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_text = data.get('message')

    print(f"User: {user_text}")

    proxy_url = "http://127.0.0.1:2026/api/generate"
    payload = {
        "model": "gemma4", # Or any model your proxy supports
        "prompt": user_text,
        "stream": False     # We want the full answer at once, not piece by piece
    }

    response = requests.post(proxy_url, json=payload)
    result = response.json()

    bot_answer = result.get("response", "Sorry, I couldn't think of an answer.")

    return jsonify({"response": bot_answer})

if __name__ == "__main__":
    app.run(debug=True, port=5000)