const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let todos = [
  { id: 1, text: 'Leer React', completed: false },
  { id: 2, text: 'Bouw een persoonlijke hub', completed: false },
  { id: 3, text: 'Verover de wereld', completed: false },
];

// Routes
// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id == id);

  if (todoIndex > -1) {
    const updatedTodo = { ...todos[todoIndex], ...req.body };
    todos[todoIndex] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id != id);

  if (todos.length < initialLength) {
    res.status(204).send(); // No content
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
