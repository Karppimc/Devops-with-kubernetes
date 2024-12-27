const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const axios = require('axios'); // Add axios for backend communication

const app = express();
const port = process.env.PORT || 3006;

// Path to the cached image
const imagePath = path.join(__dirname, 'images', 'hourly.jpg');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the image if it exists
function downloadImage(url, dest, callback) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        if (response.statusCode === 302 && response.headers.location) {
            https.get(response.headers.location, (res) => {
                res.pipe(file);
                file.on('finish', () => {
                    file.close(callback);
                });
            });
        } else if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close(callback);
            });
        } else {
            callback(new Error(`Failed to download image. Status code: ${response.statusCode}`));
        }
    }).on('error', (err) => {
        fs.unlink(dest, () => {});
        callback(err);
    });
}

// Middleware to ensure the image is up-to-date
function ensureHourlyImage(req, res, next) {
    const now = Date.now();

    if (fs.existsSync(imagePath)) {
        const stats = fs.statSync(imagePath);
        const lastModified = stats.mtimeMs;

        if (now - lastModified < 3600000) {
            return next(); // Image is still valid
        }
    }

    console.log('Downloading a new hourly image...');
    downloadImage('https://picsum.photos/1200', imagePath, (err) => {
        if (err) {
            console.error('Error downloading image:', err.message);
            return res.status(500).send('Failed to fetch a new image');
        }
        console.log('New image downloaded successfully');
        next();
    });
}

// Serve homepage
app.get('/', ensureHourlyImage, async (req, res) => {
    try {
        // Fetch TODO list from backend
        const response = await axios.get('http://todo-backend-svc:3005/todos');
        const todos = response.data;

        const todoItems = todos.map(todo => `<li>${todo}</li>`).join('');

        res.send(`
            <html>
                <head>
                    <title>TODO Application with Hourly Image Cache</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        img { width: 100%; max-width: 500px; }
                        .todo-container { margin-top: 20px; }
                        .todo-input { margin-top: 10px; }
                        ul { margin-top: 20px; }
                        li { margin: 5px 0; }
                    </style>
                </head>
                <body>
                    <h1>TODO Application with Hourly Image Cache</h1>
                    <img src="/image" alt="Hourly Image" />
                    <div class="todo-container">
                        <h2>TODO List</h2>
                        <div class="todo-input">
                            <input type="text" id="todoInput" placeholder="Enter TODO (max 140 characters)" maxlength="140" />
                            <button id="addTodo">Create TODO</button>
                        </div>
                        <ul>
                            ${todoItems}
                        </ul>
                    </div>
                    <script>
                        document.getElementById('addTodo').addEventListener('click', async () => {
                            const input = document.getElementById('todoInput');
                            if (input.value.length > 0) {
                                const response = await fetch('/add-todo', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ todo: input.value })
                                });
                                if (response.ok) {
                                    alert('TODO added: ' + input.value);
                                    location.reload();
                                } else {
                                    alert('Failed to add TODO.');
                                }
                            } else {
                                alert('Please enter a valid TODO.');
                            }
                        });
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Failed to fetch TODOs:', error.message);
        res.status(500).send('Failed to fetch TODOs');
    }
});

// Route to handle adding a TODO (proxy to backend)
app.post('/add-todo', async (req, res) => {
    try {
        const { todo } = req.body;
        if (!todo) {
            return res.status(400).json({ message: 'Invalid TODO' });
        }

        await axios.post('http://todo-backend-svc:3005/todos', { todo });
        res.status(201).json({ message: 'TODO added successfully' });
    } catch (error) {
        console.error('Failed to add TODO:', error.message);
        res.status(500).json({ message: 'Failed to add TODO' });
    }
});

// Route to serve the image directly
app.get('/image', ensureHourlyImage, (req, res) => {
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Image not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Todo App running on port ${port}`);
});
