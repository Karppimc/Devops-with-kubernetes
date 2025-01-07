const fs = require('fs');
const express = require('express');
const axios = require('axios'); 
const app = express();
const port = process.env.PORT || 3001;

app.get('/', async (req, res) => {
    const timestamp = new Date().toISOString();
    const hash = Math.random().toString(36).substring(7);

    const message = process.env.MESSAGE || "No MESSAGE env variable set";
    let fileContent = "File not found";
    let pongCount = "N/A";


    try {
        fileContent = fs.readFileSync('/usr/src/app/config/information.txt', 'utf8');
    } catch (err) {
        console.error('Error reading file:', err.message);
    }


    try {
        const response = await axios.get('http://pingpong-svc:80/pingpong');
        pongCount = response.data.pongCount || "N/A";
    } catch (err) {
        console.error('Failed to fetch pong count:', err.message);
    }

    res.send(`${timestamp}: ${hash}. Ping / Pongs: ${fileContent}. Pong Count: ${pongCount}\nEnv Variable: ${message}`);
});

app.listen(port, () => {
    console.log(`Log Output App listening on port ${port}`);
});
