const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { todo } = req.body;
  if (todo) {
    todos.push(todo);
    res.status(201).json({ message: 'Todo added', todo });
  } else {
    res.status(400).json({ message: 'Invalid todo item' });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Todo Backend running on port ${PORT}`);
});

