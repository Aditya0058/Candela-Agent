async function sendMessage() {
    // Get the message from the input field
    const messageInput = document.getElementById("messageInput");
    const message = messageInput.value;
    messageInput.value = "";

    // Send the message to the server
    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
    });

    // Get the data from the server
    const data = await response.json();
    window.location.href = `/chat/${data.chat_id}`;
    console.log(data.response);
    console.log(data.chat_id);

    //
}