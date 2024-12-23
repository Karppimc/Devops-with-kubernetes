const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

let randomString = Math.random().toString(36).substring(7);
let timestamp = new Date().toISOString();

app.get('/', (req, res) => {
    res.send('Log Output Application');
});

app.get('/status', (req, res) => {
    res.json({ timestamp, randomString });
});

// Add this route
app.get('/log', (req, res) => {
    res.send(`
        <h1>Log Output Application</h1>
        <p>Application Hash: ${randomString}</p>
        <p>Timestamp: ${timestamp}</p>
    `);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
