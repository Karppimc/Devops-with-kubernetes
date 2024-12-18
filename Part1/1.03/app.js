const crypto = require('crypto');


const randomString = crypto.randomUUID();

console.log(`Application started with random string: ${randomString}`);


setInterval(() => {
    console.log(`${new Date().toISOString()}: ${randomString}`);
}, 5000);
