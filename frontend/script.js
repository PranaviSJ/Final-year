
const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// 🔹 Replace with your current ngrok URL from Colab
const BACKEND_URL = "https://65a725c649ee.ngrok-free.app/";

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userText = input.value.trim();
    if (!userText) return;

    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = "User: " + userText;
    chatBox.appendChild(userMsg);

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg = document.createElement("div");
      assistantMsg.className = "message assistant";
      assistantMsg.innerText = "Assistant: " + data.reply;
      chatBox.appendChild(assistantMsg);

    } catch (error) {
      console.error("Error talking to backend:", error);
      const errorMsg = document.createElement("div");
      errorMsg.className = "message error";
      errorMsg.innerText = "⚠️ Could not connect to the backend.";
      chatBox.appendChild(errorMsg);
    }

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

