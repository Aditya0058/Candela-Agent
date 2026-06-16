async function sendMessage() {
    let prompt = document.getElementById("messageInput").value;
    
    let response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt
        })
    });

    let data = await response.json();
    console.log(data["response"]);


}