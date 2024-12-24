const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    const hash = Math.random().toString(36).substring(7);
    const pingPongCount = fs.existsSync('/usr/src/app/shared/pingpong.txt')
        ? fs.readFileSync('/usr/src/app/shared/pingpong.txt', 'utf-8')
        : 0;
    res.send(`${timestamp}: ${hash}. Ping / Pongs: ${pingPongCount}`);
});

app.listen(port, () => {
    console.log(`Log Output App listening on port ${port}`);
});
