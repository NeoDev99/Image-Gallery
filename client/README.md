# Frontend for Image Gallery Project

This is the frontend application for the Image Gallery project, built with React, TypeScript, Tailwind CSS, and integrating authentication and user management.

## Table of Contents

- [Frontend for Image Gallery Project](#frontend-for-image-gallery-project)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)
  - [License](#license)


## Installation

To get started with the frontend, follow these steps:

1. **Clone the repository**:
   
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:
   
   ```bash
   npm install
   ```


## Configuration

Before running the application, ensure that you have configured the environment variables:

    1. Create a `.env` file in the root of the project.
    2. **Add the following variables** to your `.env` file:

    ```env
    REACT_APP_API_ACCESS_KEY=<api-access-key>
    CLERK_FRONTEND_API=<pk_test_api>
    ```


## Running the Application

To start the development server:

    ```bash
    npm run dev
    ```

    Visit `http://localhost:3000` in your browser to view the application.


## API Endpoints

The frontend communicates with the following API endpoints:

- Sign In: `POST /signin`
  - Body: { "email": "<email>", "password": "<password>" }
  - Response: { "accessToken": "<token>", "refreshToken": "<token>", "user": { "id": "<id>", "name": "<name>", "email": "<email>" } }

- Register: `POST /register`
  - Body: { "name": "<name>", "email": "<email>", "password": "<password>" }
  - Response: { "message": "User registered successfully!" }

- Refresh Token: `POST /token/access`
  - Headers: refresh-token: <token>
  - Response: { "accessToken": "<token>", "refreshToken": "<token>" }
  
- Profile: `GET /profile`
  - Headers: Authorization: Bearer <access-token>
  - Response: { "user": { "id": "<id>", "name": "<name>", "email": "<email>" } }


## Folder Structure


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.


## License
This project is licensed under the MIT License. See the **LICENSE** file for details.
