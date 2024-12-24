const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

let counter = 0;

app.get('/', (req, res) => {
    counter++;
    fs.writeFileSync('/usr/src/app/shared/pingpong.txt', counter.toString());
    res.send(`pong ${counter}`);
});

app.listen(port, () => {
    console.log(`Ping Pong App listening on port ${port}`);
});
