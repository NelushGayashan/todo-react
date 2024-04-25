import express from 'express';
import { createPool } from 'mysql';
import { json } from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(json());
app.use(cors());

const pool = createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app'
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
  connection.release();
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

// Gracefully close the database pool when the server shuts down
process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) {
      console.error('Error closing the database pool: ' + err.stack);
      process.exit(1);
    }
    console.log('Database pool closed');
    process.exit();
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
