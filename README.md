# Cuvette Job Board

A simple job board platform where company can signup and create a interview schedule by just filling the form then automated email invite send to the candidates. Built with a **React** frontend and **Express.js** backend, and uses **MongoDB** for data storage.

## Features
- Responsive user interface designed with TailwindCSS.
- Seamless interaction between the frontend and backend using RESTful APIs.
- Data persistence using MongoDB with CRUD functionality (Create, Read, Update, Delete).
- Backend built with Express.js, featuring API routes for interacting with the database.
- Scalable and easily extensible architecture.

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Utility-first CSS framework for custom UI design.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js to build the backend API.
- **MongoDB**: NoSQL database to store application data.
- **Mongoose**: MongoDB ODM for schema-based modeling and data management.

## Installation

### Prerequisites

Make sure you have the following installed:
- Node.js

1. Clone the repo:
   ```bash
   git clone https://github.com/HimanshuMaurya2300/Cuvette_Job_Board.git
   ```
2. Move to frontend directory in new terminal:
    ```bash
     cd frontend
     npm install
     npm run dev
    ```
3. Move to Backend directory in new terminal:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the `backend` directory to store your environment variables securely. The following variables should be defined:
```bash
  JWT_SECRET = add_your_secret_key
  EMAIL_ADDRESS = add_email_address_for_sending_email
  EMAIL_PASSWORD = add_email_password
  FAST2SMS_API_KEY= add_fast2sms_api_key
  MONGO_URI = add_monogdb_uri
```
