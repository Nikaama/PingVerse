// src/utils/mediaFetch.js
const db = require('../config/db'); // Assuming your DB connection file is here
const geolib = require('geolib'); // For calculating distance

/**
 * Fetch media files based on user location.
 * @param {Object} userLocation - The user's current location.
 * @param {number} userLocation.lat - Latitude of the user.
 * @param {number} userLocation.long - Longitude of the user.
 * @param {number} proximity - Radius in meters for nearby media.
 * @returns {Promise<Array>} - List of media files within the proximity.
 */
const mediaFetch = (userLocation, proximity = 5000) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM media_uploads';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject('Error fetching media data');
            }

            // Filter results based on proximity
            const nearbyMedia = results.filter((media) => {
                const [lat, long] = media.location
                    .replace('Lat: ', '')
                    .replace('Long: ', '')
                    .split(', ')
                    .map(coord => parseFloat(coord.split(':')[1]));

                return geolib.isPointWithinRadius(
                    { latitude: userLocation.lat, longitude: userLocation.long },
                    { latitude: lat, longitude: long },
                    proximity
                );
            });

            resolve(nearbyMedia);
        });
    });
};

module.exports = mediaFetch;