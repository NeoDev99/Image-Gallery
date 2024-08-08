# Image Gallery

This is a simple image gallery web application built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Features

- Display a collection of images in a grid layout
- Pagination to navigate through multiple pages of images
- Search functionality to filter images by keywords
- Responsive design for optimal viewing on different devices
- Navigation bar for easy navigation between pages

## Technologies Used

- MongoDB: Database for storing image data
- Express.js: Backend framework for handling API requests
- React: Frontend library for building the user interface
- Node.js: JavaScript runtime environment for running the server
- Cloudinary: Cloud-based image management service
- Multer: Middleware for handling file uploads
- React Router: Library for handling client-side routing
- Axios: HTTP client for making API requests

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/UmbrellaSkiies/Image_Gallery
```

2. Install the dependencies:

```shell
cd client
npm install

cd ../server
npm install
```

3. Set up the environment variables:

```shell
MONGODB_URI=<your-mongodb-uri>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

4. Start the development server:

```shell
cd client
npm start

cd ../server
nodemon server.js
```

5. Open your browser and visit http://localhost:3000 to see the application.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any bug fixes, suggestions, or new features.

## License
This project is free to use.
