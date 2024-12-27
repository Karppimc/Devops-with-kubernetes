const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

let counter = 0;

app.get('/', (req, res) => {
    counter++;
    res.json({ pongCount: counter });
});

app.listen(port, () => {
    console.log(`Ping Pong App listening on port ${port}`);
});

