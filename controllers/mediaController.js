const Media = require('../models/mediaModel');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|mp4/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extName) {
            cb(null, true);
        } else {
            cb('Error: Only images and videos are allowed!');
        }
    },
}).single('media'); // 'media' is the field name for the uploaded file

// Handle media upload
exports.uploadMedia = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
        const { username, location } = req.body;
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded!' });
        }

        try {
            const media = new Media({
                username,
                location,
                mediaType: req.file.mimetype.includes('video') ? 'video' : 'photo',
                mediaPath: req.file.path,
            });

            await media.save();
            res.status(201).send({ message: 'Media uploaded successfully!', media });
        } catch (error) {
            console.error('Error saving media:', error);
            res.status(500).send({ message: 'An error occurred while saving media.' });
        }
    });
};