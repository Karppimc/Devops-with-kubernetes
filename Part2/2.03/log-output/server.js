const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', async (req, res) => {
    const timestamp = new Date().toISOString();
    const hash = Math.random().toString(36).substring(7);
    let pingPongCount = 0;

    try {
        console.log(`Attempting to fetch pingpong count from http://pingpong-svc:3002`);
        const response = await axios.get('http://pingpong-svc:3002');
        pingPongCount = response.data.pongCount;
        console.log(`Fetched pingpong count: ${pingPongCount}`);
    } catch (error) {
        console.error('Failed to fetch pingpong count:', error.message);
    }

    res.send(`${timestamp}: ${hash}. Ping / Pongs: ${pingPongCount}`);
});

app.listen(port, () => {
    console.log(`Log Output App listening on port ${port}`);
});
