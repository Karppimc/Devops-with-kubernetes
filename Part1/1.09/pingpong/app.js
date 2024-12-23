const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

let counter = 0;

app.get('/', (req, res) => {
    res.send('Ping-Pong Application is running');
});

app.get('/pingpong', (req, res) => {
    counter++;
    res.send(`pong ${counter}`);
});

app.listen(port, () => {
    console.log(`Ping-Pong app listening on port ${port}`);
});
