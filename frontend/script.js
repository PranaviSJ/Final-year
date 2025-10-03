const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// 🔥 Use your Render backend URL here (example below)
const BACKEND_URL = "https://final-year-v2ne.onrender.com/"; 

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    // Show user's message
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = "User: " + userText;
    chatBox.appendChild(userMsg);

    try {
      // Call backend
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      // Show assistant's reply
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

    // Reset input and scroll
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
