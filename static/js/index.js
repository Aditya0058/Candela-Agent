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

    // Get the response from the server
    const data = await response.json();
    console.log(data.response);

    //
}