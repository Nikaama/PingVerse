const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Ensure `uploads` directory exists
const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Muri@835101',
    database: 'pingverse_users',
});

// Connect to Database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Configure Multer for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mkv|avi/;
        const mimeType = allowedTypes.test(file.mimetype);
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimeType && extName) {
            return cb(null, true);
        }
        cb(new Error('Only images and video files are allowed'));
    },
});

// Upload Route
router.post('/upload', upload.single('media'), (req, res) => {
    const { username, location } = req.body;
    const file = req.file;

    // Validate fields
    if (!username || !location) {
        return res.status(400).json({ error: 'Username and location are required' });
    }
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `uploads/${file.filename}`;

    // Save to MySQL
    const query = `
        INSERT INTO media_uploads (username, location, file_path)
        VALUES (?, ?, ?)
    `;
    db.query(query, [username, location, filePath], (err) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Redirect to /dashboard after successful upload
        res.redirect('/dashboard');
    });
});

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    next();
});

// Route: Fetch and Render Media
router.get('/media', (req, res) => {
    const query = 'SELECT username, location, file_path, uploaded_at FROM media_uploads ORDER BY uploaded_at DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching media from MySQL:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.render('dashboard', { mediaItems: results });
    });
});

module.exports = router;