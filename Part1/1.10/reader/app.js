const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3002;
const filePath = path.join('/usr/src/app/files', 'timestamp.txt');

app.get('/', (req, res) => {
    if (fs.existsSync(filePath)) {
        const timestamp = fs.readFileSync(filePath, 'utf8');
        const hash = crypto.createHash('sha256').update(timestamp).digest('hex');
        res.send(`Timestamp: ${timestamp}<br>Hash: ${hash}`);
    } else {
        res.send('Timestamp file not found.');
    }
});

app.listen(port, () => {
    console.log(`Reader app listening on port ${port}`);
});
