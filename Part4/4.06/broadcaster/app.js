const { connect } = require('nats');
const axios = require('axios');

// Define an async function to handle NATS connection and subscription
async function start() {
  // Connect to NATS
  const nc = await connect({ url: process.env.NATS_URL });

  // Subscribe to the 'todo-status' subject with queue group 'broadcaster-queue'
  const sub = nc.subscribe('todo-status', { queue: 'broadcaster-queue' });

  // Process each received message
  for await (const msg of sub) {
    console.log('Received message:', msg.data.toString());

    // Send the message to the external service
    axios.post(process.env.EXTERNAL_SERVICE_URL, {
      user: 'bot',
      message: msg.data.toString(), // Convert buffer to string
    })
      .then(response => {
        console.log('Message sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  }
}

// Call the start function
start().catch(console.error);
