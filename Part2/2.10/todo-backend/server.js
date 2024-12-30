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

// 📄 **Request Logging Middleware**
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

// 📄 **Endpoint to get all TODOs**
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

// 📄 **Endpoint to add a new TODO**
app.post('/todos', async (req, res) => {
    const { task } = req.body;

    if (!task) {
        console.warn(`[${new Date().toISOString()}] BLOCKED: Missing 'task' in request body`);
        return res.status(400).json({ error: 'Task is required' });
    }

    if (task.length > 140) {
        console.warn(`[${new Date().toISOString()}] BLOCKED: Task exceeds 140 characters`);
        return res.status(400).json({ error: 'Task cannot exceed 140 characters' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *',
            [task, false]
        );
        console.log(`[${new Date().toISOString()}] ADDED: ${task}`);
        res.json(result.rows[0]);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] ERROR: Database insert failed`, err);
        res.status(500).send('Database error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`TODO Backend listening on port ${port}`);
});
