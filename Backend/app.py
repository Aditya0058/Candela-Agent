from flask import Flask, request, jsonify
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_text = data.get('message')

    print(f"User saild: {user_text}")

    return jsonify({"response": f"Server received: {user_text}"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)