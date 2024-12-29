const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3002;

const dbClient = new Client({
    host: 'postgres-svc',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
});

dbClient.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Failed to connect to PostgreSQL:', err.stack));

app.get('/pingpong', async (req, res) => {
    try {
        await dbClient.query(`
            CREATE TABLE IF NOT EXISTS pingpong (
                id SERIAL PRIMARY KEY,
                count INTEGER NOT NULL
            )
        `);

        const result = await dbClient.query('SELECT count FROM pingpong LIMIT 1');
        let pongCount = 1;

        if (result.rows.length === 0) {
            await dbClient.query('INSERT INTO pingpong (count) VALUES ($1)', [pongCount]);
        } else {
            pongCount = result.rows[0].count + 1;
            await dbClient.query('UPDATE pingpong SET count = $1 WHERE id = 1', [pongCount]);
        }

        res.json({ message: 'pong', pongCount });
    } catch (err) {
        console.error('Error interacting with database:', err.stack);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(port, () => {
    console.log(`Ping Pong App listening on port ${port}`);
});
