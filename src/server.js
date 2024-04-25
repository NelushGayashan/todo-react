const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app'
});

app.get('/tasks', (req, res) => {
  pool.query('SELECT * FROM tasks', (error, results) => {
    if (error) {
      console.error('Error retrieving tasks: ' + error.stack);
      res.status(500).json({ error: 'Failed to retrieve tasks' });
      return;
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { description } = req.body;
  if (!description) {
    res.status(400).json({ error: 'Task description is required' });
    return;
  }

  pool.query('INSERT INTO tasks (description) VALUES (?)', [description], (error, results) => {
    if (error) {
      console.error('Error inserting task: ' + error.stack);
      res.status(500).json({ error: 'Failed to insert task' });
      return;
    }
    res.json({ message: 'Task inserted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
