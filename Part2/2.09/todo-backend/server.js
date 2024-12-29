const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client library
const app = express();
const port = process.env.PORT || 3005;

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

// Endpoint to get all TODOs
app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.json(result.rows);
    } catch (err) {
        console.error('Error querying database:', err);
        res.status(500).send('Database error');
    }
});

// Endpoint to add a new TODO
app.post('/todos', async (req, res) => {
    const { task } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO todos (task, completed) VALUES ($1, $2) RETURNING *',
            [task, false]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting into database:', err);
        res.status(500).send('Database error');
    }
});

app.listen(port, () => {
    console.log(`TODO Backend listening on port ${port}`);
});


