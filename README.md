# RentEase | Finding Your Perfect Rental Home

A full-stack rental platform connecting tenants with property owners.

## About the Project

**RentEase** is a full-stack rental home platform developed during the internship at **Sashverse Technologies Pvt. Ltd.** It provides tenants with a simple way to discover and book properties while allowing owners to manage their listings.

The project provided practical experience in building a complete MERN Stack application, including frontend development, backend APIs, authentication, database operations, and role-based access.

## Features

* **Role-Based Access** — Admin, Property Owner, and Tenant roles
* **Authentication** — Registration, login, password reset, JWT, and bcryptjs
* **Property Management** — Add, update, delete, and view properties
* **Image Uploads** — Upload property images using Multer
* **Booking System** — Tenants can book properties and owners can manage bookings
* **Admin Panel** — Manage users, properties, and bookings
* **Protected Routes** — JWT-based route protection
* **Availability Tracking** — Updates property availability based on bookings
* **Responsive UI** — Supports different screen sizes

## Tech Stack

| Area           | Technologies          |
| -------------- | --------------------- |
| Frontend       | React.js, CSS3, Axios |
| Backend        | Node.js, Express.js   |
| Database       | MongoDB, Mongoose     |
| Authentication | JWT, bcryptjs         |
| File Upload    | Multer                |
| Development    | Git, GitHub, Nodemon  |

## Project Structure

```text
RentEase/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

## Getting Started

### Prerequisites

* Node.js
* npm
* MongoDB or MongoDB Atlas

### Installation

```bash
git clone https://github.com/hindhuja-reddy/RentEase.git
cd RentEase

cd backend
npm install

cd ../frontend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8001
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
```

### Run the Application

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm start
```

The frontend runs at `http://localhost:3000`.

## **Contributor**

**[Hindhuja Reddy](https://github.com/hindhuja-reddy)**

---

<div align="center">

Developed during the internship at **Sashverse Technologies Pvt. Ltd.**

</div>
