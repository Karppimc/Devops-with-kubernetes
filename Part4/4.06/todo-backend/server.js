const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client library
const app = express();
const port = process.env.PORT || 3005;
const expressPrometheusMiddleware = require('express-prometheus-middleware');

// Middleware for parsing JSON
app.use(express.json());

// PostgreSQL Configuration from Environment Variables
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});

// Test database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Failed to connect to database:', err));

// Request Logging Middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next();
});

app.use(expressPrometheusMiddleware({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
}));

app.get('/healthz', async (req, res) => {
    try {
      await pool.query('SELECT 1');
      res.status(200).send('OK');
    } catch (err) {
      res.status(500).send('Database connection failed');
    }
  });

// Endpoint to get all TODOs
app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        console.log(`[${new Date().toISOString()}] FETCHED: All TODOs`);
        res.json(result.rows);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] ERROR: Database fetch failed`, err);
        res.status(500).send('Database error');
    }
});

// Add this route alongside `/todos`
app.get('/api/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        console.log(`[${new Date().toISOString()}] FETCHED: All TODOs`);
        res.json(result.rows);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] ERROR: Database fetch failed`, err);
        res.status(500).send('Database error');
    }
});


// Backend code to add a new TODO
app.post('/todos', async (req, res) => {
    const { todo } = req.body; // Extract 'todo' instead of 'task'

    if (!todo) {
        console.warn(`[${new Date().toISOString()}] BLOCKED: Missing 'todo' in request body`);
        return res.status(400).json({ error: 'Todo is required' });
    }

    if (todo.length > 140) {
        console.warn(`[${new Date().toISOString()}] BLOCKED: Todo exceeds 140 characters`);
        return res.status(400).json({ error: 'Todo cannot exceed 140 characters' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *',
            [todo, false] // Use 'todo' instead of 'task'
        );
        console.log(`[${new Date().toISOString()}] ADDED: ${todo}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] ERROR: Database insert failed`, err);
        res.status(500).send('Database error');
    }
});

// PUT request to mark a todo as done
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { done } = req.body; // Expecting a boolean value (true or false)

    if (done === undefined) {
        return res.status(400).json({ error: 'Done field is required' });
    }

    try {
        // Update the "done" field in the database
        const result = await pool.query(
            'UPDATE todos SET done = $1 WHERE id = $2 RETURNING *',
            [done, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        console.log(`[${new Date().toISOString()}] UPDATED: Todo ${id} to done = ${done}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] ERROR: Database update failed`, err);
        res.status(500).send('Database error');
    }
});



// Start server
app.listen(port, () => {
    console.log(`TODO Backend listening on port ${port}`);
});
