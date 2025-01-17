// middlewares/isAuthenticated.js
module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // Allow the request to proceed
    } else {
        return res.redirect('/login'); // Redirect to login page if not authenticated
    }
};