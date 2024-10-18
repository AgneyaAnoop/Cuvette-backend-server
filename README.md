# Cuvette Job Posting Application

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Prerequisites](#prerequisites)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)


## Introduction

This Job Posting Application is a robust Node.js backend system designed to facilitate job postings and applications. It provides a secure platform for companies to register, post job openings, and for candidates to apply to these positions. The system includes email and mobile verification processes to ensure the authenticity of users.

## Features

- Company Registration with Email and Mobile Verification
- Secure Authentication using JWT stored in HTTP-only cookies
- Job Posting Management (Create, Read, Update, Delete)
- Candidate Application System
- Automated Job Alert Emails to Candidates
- OTP-based Email and Mobile Verification

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for Authentication
- SendGrid for Email Services
- Twilio for SMS Services

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)
- SendGrid Account
- Twilio Account

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/job-posting-application.git
   ```

2. Navigate to the project directory:
   ```
   cd job-posting-application
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/your_database_name
   JWT_SECRET=your_very_long_and_secure_jwt_secret_key
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_sender_email@yourdomain.com
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   BASE_URL=http://localhost:3000
   ```

   Replace the placeholder values with your actual configuration details.

## Running the Application

To run the application in development mode:

```
npm run dev
```

For production:

```
npm start
```

The server will start running on `http://localhost:3000` (or the port you specified in the .env file).

## API Endpoints

Here are the main API endpoints:

### Authentication
- `POST /api/auth/register`: Register a new company
- `POST /api/auth/login`: Login for companies
- `POST /api/auth/logout`: Logout (requires authentication)
- `POST /api/auth/verify-email`: Verify email with OTP
- `POST /api/auth/verify-mobile`: Verify mobile with OTP
- `POST /api/auth/resend-verification`: Resend verification OTP

### Jobs
- `POST /api/jobs`: Create a new job posting (requires authentication)
- `GET /api/jobs`: Get all job postings (requires authentication)
- `GET /api/jobs/:id`: Get a specific job posting (requires authentication)
- `PUT /api/jobs/:id`: Update a job posting (requires authentication)
- `DELETE /api/jobs/:id`: Delete a job posting (requires authentication)

### Email
- `POST /api/email/job-alerts/:jobId`: Send job alerts to candidates (requires authentication)



