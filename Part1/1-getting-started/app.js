const crypto = require('crypto');

const randomString = crypto.randomUUID(); // Generate a random string
console.log(`Random string generated: ${randomString}`);

setInterval(() => {
    console.log(`${new Date().toISOString()}: ${randomString}`);
}, 5000);
