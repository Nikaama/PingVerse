# PingVerse
PingVerse is a community-focused platform designed for real-time media sharing, chat, and user interactio
This project enables users to upload photos or videos, view and share media, and interact with each other
maintaining a focus on security and user experience.
## Features
- **User Authentication**: Allows users to register, log in, and maintain their sessions securely.
- **File Upload**: Users can upload photos and videos, with automatic geolocation tagging.
- **Media Viewing**: Displaying uploaded media with location information on the dashboard.
- **Real-Time Chat**: A chat feature that allows users to engage in conversations, with an emphasis on imp
## Project Structure
- **config/**: Contains configuration files, such as database configurations.
- db.js - Database connection setup.
- **controllers/**: Contains logic to handle requests and interact with models.
- authController.js - Handles user authentication.
- mediaController.js - Manages media uploads and retrieval.
- **middleware/**: Custom middleware for routing.
- authMiddleware.js - Protects routes requiring authentication.
- staticFiles.js - Serves static files (e.g., media).
- **models/**: Defines the data models for interacting with the database.
- chatModel.js - Handles chat-related data.
- mediaFetch.js - Retrieves media data from the database.
- mediaModel.js - Defines the media data structure.
- photoModel.js - Manages photo-specific data.
- userModel.js - Contains user-related data.
- **routes/**: Contains route definitions for the application.
- auth.js - Routes related to authentication.
- dashboard.js - Routes for the user dashboard.
- media.js - Routes for uploading and retrieving media.
- mediaRoutes.js - Additional media-related routes.
- signup.js - Routes for user registration.
- **src/**: Source files including custom styles and configuration.
- styles/ - Tailwind CSS styles.
- **views/**: Contains EJS views for rendering HTML pages.
- 404.ejs - Page for not found errors.
- dashboard.ejs - User dashboard view.
- error.ejs - Generic error page.
- login.ejs - Login page for user authentication.
- partials/ - Header and footer partials used across pages.
- signup.ejs - User registration form.
- upload.ejs - Upload page for media content.
- **public/**: Contains public static assets.
- css/ - Custom CSS styles for the application.
- **uploads/**: Directory where uploaded files are stored.
- **.env**: Environment configuration file for sensitive information.
- **tailwind.config.js**: Tailwind CSS configuration.
- **postcss.config.js**: PostCSS configuration for styling.
- **package.json**: Defines dependencies and scripts for the project.
- **package-lock.json**: Lock file for npm dependencies.
## Required Node Modules
The following Node.js modules are required for PingVerse:
```
npm install express express-session express-mysql-session mongoose mysql2 sequelize bcrypt validator s
```
- **Express Framework**:
- express - Web framework for Node.js
- express-session - Session management
- express-mysql-session - Store sessions in MySQL
- **Database Modules**:
- mongoose - MongoDB ODM
- mysql2 - MySQL client for Node.js
- sequelize - ORM for MySQL
- **Authentication & Security**:
- bcrypt - Password hashing
- validator - Input validation
- **Socket Communication**:
- socket.io - WebSockets for real-time chat
- **Environment Variables**:
- dotenv - Loads environment variables from .env
- **Email Handling**:
- nodemailer - Sending emails (for OTP, notifications, etc.)
- **File Upload Handling**:
- multer - Handling file uploads
- **Templating Engine**:
- ejs - Embedded JavaScript templating for frontend rendering
## Setup Instructions
1. Clone the repository:
```
git clone https://github.com/Nikaama/PingVerse.git
```
2. Navigate to the project directory:
```
cd PingVerse
```
3. Install dependencies:
```
npm install
```
4. Set up the `.env` file with your database credentials and other sensitive information.
5. Start the application:
```
npm start
```
## Git Workflow
1. **Initialize Git Repository**:
- `git init` to initialize a Git repository.
- `git add .` to add all files.
- `git commit -m "Initial commit"` to commit changes.
2. **Remote Repository**:
- Set the remote origin with `git remote add origin https://github.com/Nikaama/PingVerse.git`.
- Push changes with `git push -u origin main`.
3. **Git Pull and Push**:
- Resolve any merge conflicts if they arise.
- Push changes with `git push`.
## Future Features
- Real-time chat with topic-based conversations.
- End-to-end encryption for messages.
- Enhanced media gallery with advanced filtering options.
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.