import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

messages = []

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    if not user_msg.strip():
        return jsonify({"reply": "Please enter a message."})
    messages.append({"role": "user", "content": user_msg})
    response_text = f"Echo: {user_msg}"  # Replace with model inference call
    messages.append({"role": "assistant", "content": response_text})
    return jsonify({"reply": response_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

messages = []

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    if not user_msg.strip():
        return jsonify({"reply": "Please enter a message."})
    messages.append({"role": "user", "content": user_msg})
    response_text = f"Echo: {user_msg}"  # Replace with model inference call
    messages.append({"role": "assistant", "content": response_text})
    return jsonify({"reply": response_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
