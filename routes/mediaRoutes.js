const express = require("express");
const { mediaFetch } = require("../models/mediaFetch"); // Import the mediaFetch function

const router = express.Router();

// API to fetch media based on user's location
router.get("/fetch", async (req, res) => {
    try {
        const { userLat, userLong } = req.query;

        if (!userLat || !userLong) {
            return res.status(400).json({ error: "Latitude and Longitude are required." });
        }

        const nearbyMedia = await mediaFetch(userLat, userLong);

        res.status(200).json({ media: nearbyMedia });
    } catch (error) {
        console.error("Error fetching media:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;