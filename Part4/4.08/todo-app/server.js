const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3006;

// Set your backend base URL (Ingress routes `/api` to `todo-backend-svc`)
const baseURL = process.env.BASE_URL || '/api';


// Path to the cached image
const imagePath = path.join(__dirname, 'images', 'hourly.jpg');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.path}`);
    next();
});

// Helper function to download an image
async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 && response.headers.location) {
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                });
            } else if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => file.close(resolve));
            } else {
                reject(new Error(`Failed to download image. Status code: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // Cleanup on error
            reject(err);
        });
    });
}

// Middleware to ensure the image is up-to-date
async function ensureHourlyImage(req, res, next) {
    try {
        const now = Date.now();
        if (fs.existsSync(imagePath)) {
            const stats = fs.statSync(imagePath);
            const lastModified = stats.mtimeMs;
            if (now - lastModified < 3600000) {
                return next(); // Image is valid
            }
        }
        console.log('Downloading a new hourly image...');
        await downloadImage('https://picsum.photos/1200', imagePath);
        console.log('New image downloaded successfully');
        next();
    } catch (err) {
        console.error('Error downloading image:', err.message);
        res.status(500).send('Failed to fetch a new image');
    }
}

// Serve homepage with TODO list
// In your frontend rendering (the GET '/' route)
app.get('/', ensureHourlyImage, async (req, res) => {
    try {
        const response = await axios.get(`${baseURL}/todos`);
        const todos = response.data;

        const todoItems = todos.map(todo => `
            <li>
                <span>${todo.task}</span>
                <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="updateTodo(${todo.id}, this)">
            </li>
        `).join('');

        res.send(`
            <html>
            <head>
                <title>TODO Application</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    img { width: 100%; max-width: 500px; }
                    .todo-container { margin-top: 20px; }
                    ul { margin-top: 20px; }
                    li { margin: 5px 0; }
                </style>
            </head>
            <body>
                <h1>TODO Application</h1>
                <img src="/image" alt="Hourly Image" />
                <div class="todo-container">
                    <h2>TODO List</h2>
                    <ul>${todoItems}</ul>
                </div>
                <script>
                    function updateTodo(id, checkbox) {
                        const done = checkbox.checked;
                        fetch('/todos/' + id, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ done })
                        })
                        .then(response => response.json())
                        .then(data => console.log('Todo updated:', data))
                        .catch(error => console.error('Error updating todo:', error));
                    }
                </script>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Failed to fetch TODOs:', error.message);
        res.status(500).send('Failed to fetch TODOs');
    }
});


// Add a TODO
app.post('/add-todo', async (req, res) => {
    const { task } = req.body;
    if (!task || task.length > 140) {
        return res.status(400).json({ message: 'Invalid TODO' });
    }
    try {
        await axios.post(`${baseURL}/todos`, { task });
        res.status(201).json({ message: 'TODO added successfully' });
    } catch (error) {
        console.error('Failed to add TODO:', error.message);
        res.status(500).json({ message: 'Failed to add TODO' });
    }
});

// Serve the image
app.get('/image', ensureHourlyImage, (req, res) => {
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Image not found');
    }
});

app.get('/healthz', (req, res) => {
    res.status(200).send('OK');
  });

// Start the server
app.listen(port, () => {
    console.log(`Todo App running on port ${port}`);
});
