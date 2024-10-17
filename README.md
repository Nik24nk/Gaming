# Eternal Blue Esports

E-blue Esports is a gaming website based on PERN (PostgreSQL, Express, React, Node.js) stack-based web application designed for event management. It features functionalities for event creation, participant registration, payment integration (using Razorpay), team management, user authentication, and password recovery. The backend is built with Express.js and PostgreSQL, and user sessions are managed with Passport.js and Redis.

## Features
**1. Event Creation and Management:** Create, update, and delete events with details such as date, time, venue, prizes, and registration fees.

**2. Participant Registration:** Users can register for events and manage team members.

**3. Payment Integration:** Secure payment handling using Razorpay.

**4. User Authentication:** User authentication with bcrypt for password hashing and passport.js for session handling.

**5. Email Notifications:** Send emails for event participation and password recovery using integrated email services.

**6. Redis Session Storage:** Uses Redis to store session data and support scalable sessions.

**7. Password Recovery:** Reset and update forgotten passwords securely.

**8. Admin Interface:** Allows admins to manage users and events.

## Tech Stack
**Backend:** Node.js, Express.js

**Database:** PostgreSQL

**Payment Gateway:** Razorpay

**Authentication:** Passport.js, Bcrypt, Express-session

**Session Storage:** Redis

**Email Service:** Custom email functionality with sendEmail.js

**Environment Configuration:** dotenv for environment variables

### Other Libraries:

**pg:** PostgreSQL client for Node.js

**cors:** For handling Cross-Origin Resource Sharing

**crypto:** For secure HMAC signature creation

## Getting Started
### Prerequisites
**Node.js:** Make sure Node.js is installed on your system.

**PostgreSQL:** A PostgreSQL database is required to store events, users, and team details.

**Redis:** Redis server is required for session management.

**Razorpay Account:** You will need Razorpay credentials for payment integration.

## Installation
1. Clone the repository:
```bash
git clone https://github.com/your-username/your-repo.git

```
2. Install dependencies:
```bash
npm install

```
3. Create a .env file with the following environment variables:

```bash
DATABASE_URL=your-postgresql-connection-url
PORT=your-desired-port
CORS_ORIGIN=your-frontend-origin
SALTVALUE=your-bcrypt-salt-rounds
SECRET_KEY=your-session-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
```
4. Set up PostgreSQL and Redis servers.

5. Run Application
```bash
npm start
```

### Email Service
The application uses a custom function sendEmail.js to send verification and password reset emails.

### Redis Configuration
Ensure Redis is properly set up and running on your server. The session data will be stored using Redis, which is configured with connect-redis.

### Security
**Session Management:** Secure cookies and Redis storage for session handling.

**Password Hashing:** Bcrypt is used for password hashing.

**Environment Variables:** Sensitive information is stored in .env and should never be committed to version control.
