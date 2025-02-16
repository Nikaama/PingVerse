// **Import Core Modules**
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// **Import Custom Middleware and Routes**
const serveStaticFiles = require('./middleware/staticFiles');
const authController = require('./controllers/authController');  // Adjust the path if necessary
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const mediaRoutes = require('./routes/media');
const chatRoutes = require('./routes/chat');
const discussionRoutes = require('./routes/discussion');
const profileRoutes = require('./routes/profile'); // Corrected the variable name and import path
const LoggedinUserUploads = require('./models/loggedinuser_uploads');

// **Initialize App and Server**
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// **Configuration**
const PORT = process.env.PORT || 3000;

// **MySQL Configuration**
const mysqlOptions = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'Muri@835101', // Use environment variables for sensitive data
    database: process.env.MYSQL_DB || 'pingverse_users',
};

// Set up session store using MySQL
const sessionStore = new MySQLStore(mysqlOptions);

// **MongoDB Configuration**
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/pingverse';
mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process on MongoDB connection failure
    });

// **Middleware**
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// **Session Configuration**
app.use(
    session({
        key: process.env.SESSION_KEY || 'user_sid', // Custom session key
        secret: process.env.SESSION_SECRET || 'secret_key', // Secure session secret
        store: sessionStore, // MySQL-based session store
        resave: false, // Prevent resaving unmodified sessions
        saveUninitialized: false, // Prevent saving uninitialized sessions
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Session expiration: 1 day
    })
);

// Serve static files
serveStaticFiles(app);

// **View Engine**
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// **Routes**
app.use('/', authRoutes); // Authentication routes
app.use('/dashboard', dashboardRoutes); // Dashboard routes
app.use('/media', mediaRoutes); // Media upload/download routes
app.use('/chat', chatRoutes); // Chat routes
app.use('/discussion', discussionRoutes);
app.use('/profile', profileRoutes); // Profile routes - Corrected path and variable name
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static("public"));

// **Root Route**
app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard'); // Redirect authenticated users to the dashboard
    }
    res.redirect('/login'); // Redirect unauthenticated users to the login page
});

// **404 Error Handler**
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// **Global Error Handling Middleware**
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).render('error', { title: 'Internal Server Error', error: err.message });
});

// Define the /verify-otp route
app.post('/verify-otp', authController.verifyOTP);

// **Socket.IO Integration**
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('chatMessage', async (msg) => {
        console.log('Incoming message:', msg);

        try {
            // Validate message content
            if (!msg.username || !msg.content) {
                throw new Error('Missing required fields: username or message');
            }

            // Save chat message to MongoDB
            const Message = require('./models/messageModel'); // Import the Message model
            const newMessage = new Message({
                username: msg.username,
                message: msg.content, // Use `content` field for the message
            });
            await newMessage.save();

            // Broadcast the saved message to all connected clients
            io.emit('chatMessage', {
                username: msg.username,
                message: msg.content,
                timestamp: new Date(),
            });
        } catch (err) {
            console.error('Error saving chat message:', err.message);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// **Start Server**
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});