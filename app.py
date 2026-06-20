from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
import os
import uuid
import requests
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///candela.db"
db = SQLAlchemy(app)
migrate = Migrate(app, db)
#Datbase connection 

#conversation model
class Conversation(db.Model):
    id = db.Column(db.String(50), primary_key=True)

    title = db.Column(db.String(200))

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

#message model
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    chat_id = db.Column(db.String(50))
    
    role = db.Column(db.String(20))

    content = db.Column(db.Text)




#defining gemini ai response function
def gemini_response(prompt):
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
        model="gemini-2.0-flash-lite", 
        contents= prompt
    )
    return response.text

#defining openrouter ai response function
def openrouter_response(prompt):
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "Content-Type": "application/json"
        },
        json={
            "model": "deepseek/deepseek-chat-v3",
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
    )

    data = response.json()
    print(data)
    return data["choices"][0]["message"]["content"]

#SENDING COMMON DATA TO ALL ROUTES
@app.context_processor
def inject_conversations():

    conversations = Conversation.query.order_by(
        Conversation.created_at.desc()
    ).all()

    return {
        "conversations": conversations
    }

# Other Pages Routes
@app.route("/")
def home():

    return render_template("index.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

# Chat Route
@app.route('/chat', methods=['POST'])
    # Chat Function for new chat

def chat():
    data = request.get_json()
    prompt = data['prompt']
    response_text = openrouter_response(prompt)
    chat_id = str(uuid.uuid4())

    conversation = Conversation(
        id=chat_id,
        title=prompt
    )

    db.session.add(conversation)
    
    user_msg = Message(
        chat_id=chat_id,
        role="user",
        content=prompt
    )

    db.session.add(user_msg)

    ai_msg = Message(
        chat_id=chat_id,
        role="assistant",
        content=response_text
    )

    db.session.add(ai_msg)

    db.session.commit()

    return jsonify({
        "response": response_text,
        "chat_id": chat_id
})

# Specific Chat Page Route
@app.route("/chat/<chat_id>")
def chat_page(chat_id):
    messages = Message.query.filter_by(
        chat_id=chat_id
    ).all()

    return render_template("chat.html", chat_id=chat_id, messages=messages)

# Chat Function for specific chat
@app.route("/chat/<chat_id>/message", methods=["POST"])
def continue_chat(chat_id):

    data = request.get_json()
    prompt = data["prompt"]

    response_text = openrouter_response(prompt)
    
    user_msg = Message(
        chat_id=chat_id,
        role="user",
        content=prompt
    )
    db.session.add(user_msg)

    ai_msg = Message(
        chat_id=chat_id,
        role="assistant",
        content=response_text
    )
    db.session.add(ai_msg)
    db.session.commit()
    

    return jsonify({
        "response": response_text,
        "chat_id": chat_id
    })



with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)