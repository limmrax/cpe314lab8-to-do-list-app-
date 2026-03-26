// Activity 5: Debug — intentionally broken code (wrong ID: "task-input" instead of "task")
// Bug: document.getElementById("task-input").value  → "task-input" does not exist in HTML
// Fix: corrected to document.getElementById("task").value as shown below
// Console error seen was: Cannot read properties of null (reading 'value')

// Load tasks from localStorage when page loads
window.onload = function () {
    loadTasks();
    updateEmptyMessage();
};

function addTask() {
    // Activity 5 fix: correct ID used here after debugging
    let taskValue = document.getElementById("task").value.trim();

    if (taskValue) {
        createTaskItem(taskValue);
        saveToLocalStorage();
        document.getElementById("task").value = "";
        updateEmptyMessage();
    }
}

function createTaskItem(taskText, completed = false) {
    let ul = document.getElementById("task-list");

    let li = document.createElement("li");

    // Span holds the task text so click-to-complete targets text only
    let span = document.createElement("span");
    span.textContent = taskText;

    // Activity 2: strikethrough on click
    if (completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", function (e) {
        // Prevent toggling when delete button is clicked
        if (e.target.classList.contains("delete-btn")) return;
        li.classList.toggle("completed");
        saveToLocalStorage();
    });

    // Activity 1: delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        ul.removeChild(li);
        saveToLocalStorage();
        updateEmptyMessage();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
}

// Activity 3: Save tasks to localStorage
function saveToLocalStorage() {
    let tasks = [];
    let items = document.querySelectorAll("#task-list li");
    items.forEach(function (li) {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Activity 3: Load tasks from localStorage on page reload
function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if (saved) {
        let tasks = JSON.parse(saved);
        tasks.forEach(function (task) {
            createTaskItem(task.text, task.completed);
        });
    }
}

// Show or hide the empty message
function updateEmptyMessage() {
    let items = document.querySelectorAll("#task-list li");
    let msg = document.getElementById("empty-msg");
    msg.style.display = items.length === 0 ? "block" : "none";
}

// Allow pressing Enter key to add a task
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("task").addEventListener("keyup", function (e) {
        if (e.key === "Enter") addTask();
    });
});
