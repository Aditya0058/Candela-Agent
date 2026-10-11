const userMessage = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const welcome = document.getElementById("welcome-zone");
sendBtn.addEventListener("click", async () => {
  const chat = document.getElementById("chat-display");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("usr-msg");
  msgDiv.innerText = userMessage.value;
  welcome.style.display = "none";
  chat.appendChild(msgDiv);
  const text = userMessage.value;
  userMessage.value = "";

//   sending mesage to python server
    const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({message: text})
    }); 

    // parse the JSON response from the server
    const data = await response.json();
    const replyDiv = document.createElement("div");
    replyDiv.classList.add("bot-msg");
    replyDiv.innerText = data.response;
    chat.appendChild(replyDiv);
});
