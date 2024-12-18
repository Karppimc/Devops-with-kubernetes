const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;

// Generate a random hash for the application (stored for the process lifetime)
const appHash = crypto.randomUUID();

const server = http.createServer((req, res) => {
    const requestHash = crypto.randomUUID();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1>Log Output Application</h1>
        <p>Application Hash: ${appHash}</p>
        <p>Request Hash: ${requestHash}</p>
    `);
});

server.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
});
