const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');

const app = express();
const port = process.env.PORT || 3001;

// Path to the cached image
const imagePath = path.join(__dirname, 'images', 'hourly.jpg');

// Function to download a new image
function downloadImage(url, dest, callback) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        if (response.statusCode === 302 && response.headers.location) {
            // Follow redirect
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

        // Check if the image is older than 1 hour
        if (now - lastModified < 3600000) {
            return next(); // Image is still valid
        }
    }

    // Download a new image
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

// Route to serve the image
app.get('/image', ensureHourlyImage, (req, res) => {
    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Image not found');
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('TODO Application with Hourly Image Cache');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
