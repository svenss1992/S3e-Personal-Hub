require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes
// Register a new user
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Register attempt for user:', username);

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
    db.run(sql, [username, hashedPassword], function(err) {
      if (err) {
        console.error('Database registration error:', err);
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ message: 'Username already exists' });
        }
        return res.status(500).json({ message: 'Error registering user' });
      }
      console.log('User registered successfully:', username);
      res.status(201).json({ id: this.lastID, username });
    });
  } catch (error) {
    console.error('Bcrypt or other error during registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login a user
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging in' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});


// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Routes
// Get all todos for a user
app.get('/api/todos', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM todos WHERE user_id = ?';
  db.all(sql, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching todos' });
    }
    res.json(rows);
  });
});

// Add a new todo
app.post('/api/todos', authenticateToken, (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const sql = 'INSERT INTO todos (user_id, text) VALUES (?, ?)';
  db.run(sql, [req.user.id, text], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error adding todo' });
    }
    res.status(201).json({ id: this.lastID, user_id: req.user.id, text, completed: false });
  });
});

// Update a todo
app.put('/api/todos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const fields = [];
  const params = [];

  if (text !== undefined) {
    fields.push('text = ?');
    params.push(text);
  }

  if (completed !== undefined) {
    fields.push('completed = ?');
    params.push(completed);
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  params.push(id, req.user.id);

  const sql = `UPDATE todos SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`;

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error updating todo' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Todo not found or not owned by user' });
    }
    res.json({ id, text, completed });
  });
});

// Delete a todo
app.delete('/api/todos/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ? AND user_id = ?';

  db.run(sql, [id, req.user.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting todo' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Todo not found or not owned by user' });
    }
    res.status(204).send(); // No content
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
