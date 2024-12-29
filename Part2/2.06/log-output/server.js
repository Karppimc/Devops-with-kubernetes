const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    const timestamp = new Date().toISOString();
    const hash = Math.random().toString(36).substring(7);

    const message = process.env.MESSAGE || "No MESSAGE env variable set";
    let fileContent = "File not found";
    try {
        fileContent = fs.readFileSync('/usr/src/app/config/information.txt', 'utf8');
    } catch (err) {
        console.error('Error reading file:', err.message);
    }

    res.send(`${timestamp}: ${hash}. Ping / Pongs: ${fileContent}\nEnv Variable: ${message}`);
});

app.listen(port, () => {
    console.log(`Log Output App listening on port ${port}`);
});
