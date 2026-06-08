// Load tasks when page loads
function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById("tasks");
            taskList.innerHTML = ""; // Clear existing
            tasks.forEach(task => {
                const taskItem = document.createElement("li");
                taskItem.innerText = task;
                taskList.appendChild(taskItem);
            });
        });
}

function addTask() {
    const task = document.getElementById("task").value;
    if (!task) return;

    // Send to backend
    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: task })
    })
    .then(response => response.json())
    .then(() => {
        // Reload tasks from server
        loadTasks();
    });

    document.getElementById("task").value = "";
}

// Load tasks when page loads
loadTasks();

function clearAllTasks() {
    fetch('/api/tasks', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadTasks();
    });
}
