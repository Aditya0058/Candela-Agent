from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data['prompt']
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
    model="gemini-2.5-flash", 
    contents= prompt
    )

    return jsonify({"response": response.text})


if __name__ == '__main__':
    app.run(debug=True)