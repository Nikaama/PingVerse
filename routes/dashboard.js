const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { isAuthenticated } = require('../middleware/authMiddleware');

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
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

// Dashboard Route
router.get('/', isAuthenticated, (req, res) => {
    const query = 'SELECT username, location, file_path, uploaded_at FROM media_uploads ORDER BY uploaded_at DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching media from MySQL:', err.message);
            return res.status(500).render('error', { message: 'Database error', error: err });
        }

        const footerLinks = [
            { label: 'About Us', url: '/about' },
            { label: 'Contact', url: '/contact' },
            { label: 'Privacy Policy', url: '/privacy' },
            { label: 'Terms of Service', url: '/terms' }
        ];

        // Render the dashboard and pass the data
        res.render('dashboard', {
            title: 'Dashboard',
            user: req.session.user, // Assuming user info is stored in session
            mediaItems: results, // Pass fetched media items to the view
            footerLinks // Dynamically include footer links
        });
    });
});

module.exports = router;