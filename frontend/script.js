const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

// ✅ Use your latest ngrok public URL from backend logs here
const BACKEND_URL = "https://5f59d534a04b.ngrok-free.app";



if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;

    // Show user's message in chat box
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

    // Reset input and scroll down
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
