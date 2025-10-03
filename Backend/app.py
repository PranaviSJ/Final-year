import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔹 Colab ngrok URL — update this every time Colab restarts
COLAB_URL = "https://grindable-azucena-nocuous.ngrok-free.dev"

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    if not user_msg.strip():
        return jsonify({"reply": "Please enter a message."})

    try:
        # Forward request to Colab LLaMA API
        res = requests.post(f"{COLAB_URL}/chat", json={"message": user_msg}, timeout=60)
        data = res.json()

        return jsonify({"reply": data.get("reply", "No response from model.")})

    except Exception as e:
        return jsonify({"reply": f"Error connecting to Colab: {str(e)}"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
