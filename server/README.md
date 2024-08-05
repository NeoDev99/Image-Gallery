# Starting the Server for Your MERN Stack Project
This guide will help you start the server for your MERN stack image gallery project.

## Prerequisites
- **Node.js**: Make sure Node.js is installed. You can download it from nodejs.org.
- **MongoDB**: Ensure you have MongoDB installed and running, or use a MongoDB cloud service like MongoDB Atlas.

1. Set Up Environment Variables
Create a `.env` file in the server directory to store your environment variables. This file should include:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

2. Install Server Dependencies
Open a terminal and navigate to the server directory:

```bash
cd server
```

Install the required server-side dependencies:

```bash
npm install
```

3. Start the Server
Start the nodemon server using the following command:

```bash
nodemon server.js
```