const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let tasks = [];
let currentId = 1;

// get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// add task
app.post("/tasks", (req, res) => {
  const task = {
    id: currentId++,
    title: req.body.title,
    completed: false
  };
  tasks.push(task);
  res.json(task);
});

// update task (edit / toggle)
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
});

// delete task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
