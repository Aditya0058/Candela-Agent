from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# create  a flask app

app = Flask(__name__)
CORS(app)
# configure the gemini api
genai.configure(api_key="AIzaSyDLdTWJ9xP4LxemvwDVmwokEeXSkRxgOPU")
model = genai.GenerativeModel("gemini-2.5-flash")

# create a route for the chat page as /chat

@app.route("/chat", methods = ['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']
    print(user_message)
    response = model.generate_content(user_message)
    return jsonify({"reply": response.text})


# now send that response to the chat page

# now run the app
if __name__ == "__main__":
    app.run(debug=True)