const fs = require('fs');
const path = require('path');

const filePath = path.join('/usr/src/app/files', 'timestamp.txt');

setInterval(() => {
    const timestamp = new Date().toISOString();
    fs.writeFileSync(filePath, timestamp);
    console.log(`Timestamp written: ${timestamp}`);
}, 5000);
