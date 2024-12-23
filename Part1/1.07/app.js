const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

let randomString = Math.random().toString(36).substring(7);
let timestamp = new Date().toISOString();

app.get('/', (req, res) => {
    res.send('Log output application is running');
});

app.get('/status', (req, res) => {
    res.json({ timestamp, randomString });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
