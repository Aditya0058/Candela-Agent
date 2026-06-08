function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById("clock").innerText = "Current time: " + time;
}

setInterval(updateTime, 1000);