# HouseHunt - Property Rental Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for property rental management with comprehensive role-based access control and admin approval workflow.

---

##  Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Creating Admin Account](#creating-admin-account)
- [User Roles & Features](#user-roles--features)
- [Security Features](#security-features)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Testing Guide](#testing-guide)
- [Troubleshooting](#troubleshooting)
- [Known Issues](#known-issues)
- [Future Enhancements](#future-enhancements)

---

##  Features

###  Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (RBAC)
- Session management with sessionStorage
- Protected routes with automatic redirection
- Password hashing with bcrypt

###  Admin Features
- User management dashboard
- Owner approval/rejection system
- View all users, properties, and bookings
- Real-time status updates

###  Owner Features
- Add properties with multiple images
- Edit property details
- Delete properties
- View booking requests
- Requires admin approval before access

###  Renter Features
- Browse all available properties
- Advanced filtering (by address, type, ad type)
- View detailed property information
- Book properties with contact details
- View booking history
- No approval required - instant access

---

##  Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 6.15.0 - Client-side routing
- **Material-UI (MUI)** 5.14.5 - Component library
- **React Bootstrap** 2.8.0 - Bootstrap components
- **Ant Design** 5.8.3 - Additional UI components
- **Axios** 1.4.0 - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18.2 - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** 7.4.3 - ODM for MongoDB
- **JWT** (jsonwebtoken) 9.0.1 - Authentication
- **Bcryptjs** 2.4.3 - Password hashing
- **Multer** 1.4.5 - File upload handling
- **Nodemon** 3.0.1 - Development server

---

##  Prerequisites

Before installation, ensure you have:

1. **Node.js** (v14 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **MongoDB**
   - **Option A (Recommended):** MongoDB Atlas (Cloud)
     - Create free account: https://www.mongodb.com/cloud/atlas
     - Create cluster and get connection string
   - **Option B:** Local MongoDB
     - Download: https://www.mongodb.com/try/download/community

4. **Git** (for cloning)
   - Download: https://git-scm.com/

---

##  Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/househunt.git
cd househunt/code
```

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Create a file named .env in the backend folder
```

**Create `backend/.env` file with:**

```env
# MongoDB Connection String
# For MongoDB Atlas:
MONGO_DB=mongodb+srv://your-username:your-password@cluster.mongodb.net/househunt?retryWrites=true&w=majority

# For Local MongoDB:
# MONGO_DB=mongodb://localhost:27017/househunt

# Server Port
PORT=8001

# JWT Secret Key (use a strong random string)
JWT_KEY=your-super-secret-jwt-key-change-this-to-something-random
```

**Important:**
- Replace `MONGO_DB` with your actual MongoDB connection string
- Replace `JWT_KEY` with a strong random string
- If using MongoDB Atlas, whitelist your IP: `0.0.0.0/0` (for development)

### Step 3: Frontend Setup

```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
 Expected: "Server is running on port 8001" and "Connected to MongoDB"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
 Expected: Browser opens at http://localhost:3000

---

##  Creating Admin Account

**CRITICAL:** You must create an admin account manually before using the application.

### Method 1: Browser Console (Easiest - Recommended)

1. Ensure **both backend and frontend are running**
2. Open browser at `http://localhost:3000`
3. Press **F12** to open Developer Console
4. Click **"Console"** tab
5. Copy and paste this code:

```javascript
fetch('http://localhost:8001/api/user/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Admin User',
    email: 'admin@househunt.com',
    password: 'admin123',
    type: 'Admin'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Response:', data);
  if(data.success) {
    alert(' Admin Account Created!\n\nEmail: admin@househunt.com\nPassword: admin123\n\nYou can now login!');
  } else {
    alert(' Error: ' + data.message);
  }
})
.catch(error => console.error('Error:', error));
```

6. Press **Enter**
7. You should see: " Admin Account Created!"

### Method 2: Using Postman/Thunder Client

- **Method:** POST
- **URL:** `http://localhost:8001/api/user/register`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "name": "Admin User",
  "email": "admin@househunt.com",
  "password": "admin123",
  "type": "Admin"
}
```

### Method 3: Using cURL (Command Line)

```bash
curl -X POST http://localhost:8001/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@househunt.com",
    "password": "admin123",
    "type": "Admin"
  }'
```

### Save Your Admin Credentials

**Create a text file:** `admin-credentials.txt`

```
HouseHunt Admin Login
=====================
Email: admin@househunt.com
Password: admin123
Dashboard: http://localhost:3000/adminhome
```

---

##  User Roles & Features

### 1️ Admin User

**Access:** Full system control

**Capabilities:**
-  View all registered users
-  Approve/reject property owners
-  View all properties in the system
-  View all bookings
-  Manage user access
-  Dashboard: `/adminhome`

**Login:**
```
Email: admin@househunt.com
Password: admin123
```

---

### 2 Owner User

**Access:** Property management

**Registration Process:**
1. Register through `/register` page
2. Select "Owner" as user type
3. Login attempt shows: "Your account is not yet confirmed by the admin"
4. Admin must approve the account
5. After approval, can login and access owner dashboard

**Capabilities (After Approval):**
-  Add new properties with multiple images
-  Edit existing properties
-  Delete properties
-  View booking requests for their properties
-  Dashboard: `/ownerhome`

**Example Owner Account:**
```
Email: owner@test.com
Password: owner123
Status: Must be approved by admin
```

---

### 3️ Renter User

**Access:** Property browsing and booking

**Registration Process:**
1. Register through `/register` page
2. Select "Renter" as user type
3. Instant access - no approval needed
4. Can login immediately

**Capabilities:**
-  Browse all available properties
-  Filter properties by:
  - Address/location
  - Property type (Residential, Commercial, Land/Plot)
  - Ad type (Rent, Sale)
-  View detailed property information
-  Book properties with contact details
-  View booking history
-  Dashboard: `/renterhome`

**Example Renter Account:**
```
Email: renter@test.com
Password: renter123
Status: Instant access
```

---

##  Security Features

### Implemented Security Measures

#### 1. Role-Based Access Control (RBAC)
- Each user type can only access their designated dashboard
- Automatic redirection if wrong user tries to access restricted area
- Protected routes using `ProtectedRoute` component

**Access Control Matrix:**

| User Type          | /adminhome      | /ownerhome     | /renterhome   |
|--------------------|-----------------|----------------|---------------|
| Not Logged In      |  → /login       |  → /login      |  → /login     |
| Admin |  Allowed   |  → /adminhome   |  → /adminhome  |      -        |
| Owner (Approved)   |  → /ownerhome   |  Allowed       |  → /ownerhome |
| Owner (Unapproved) |  → /login       |  → /login      |  → /login     |
| Renter             |  → /renterhome  |  → /renterhome |  Allowed      |

#### 2. Authentication & Authorization
- JWT token-based authentication
- Token validation on all protected API endpoints
- Middleware for route protection (`authMiddleware`)

#### 3. Password Security
- All passwords hashed using bcrypt (salt rounds: 10)
- Never stored in plain text
- Secure password transmission

#### 4. Admin Approval System
- Property owners require admin approval before accessing features
- Prevents spam and ensures quality control
- Real-time status updates

#### 5. Session Management
- sessionStorage used for temporary session data
- Automatic logout when browser/tab is closed
- More secure than localStorage for shared computers

#### 6. API Security
- CORS protection
- Authorization headers required for protected routes
- Token expiration (24 hours)

---

##  API Endpoints

### User Routes (`/api/user`)
```
POST   /register              - Register new user
POST   /login                 - User login
POST   /forgotpassword        - Reset password
POST   /getuserdata          - Get authenticated user data
GET    /getAllProperties      - Get all properties (public)
POST   /bookinghandle/:id    - Create booking (protected)
GET    /getallbookings       - Get user's bookings (protected)
```

### Owner Routes (`/api/owner`)
```
POST   /postproperty         - Add new property (protected, with image upload)
GET    /getallproperties     - Get owner's properties (protected)
PATCH  /updateproperty/:id   - Update property (protected)
DELETE /deleteproperty/:id   - Delete property (protected)
GET    /getallbookings       - Get bookings for owner's properties (protected)
POST   /handlebookingstatus  - Update booking status (protected)
```

### Admin Routes (`/api/admin`)
```
GET    /getallusers          - Get all users (protected)
POST   /handlestatus         - Approve/reject owner (protected)
GET    /getallproperties     - Get all properties (protected)
GET    /getallbookings       - Get all bookings (protected)
```

**Note:** All protected routes require `Authorization: Bearer <token>` header

---

##  Project Structure

```
househunt/
├── backend/
│   ├── config/
│   │   └── connect.js              # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js      # Admin operations
│   │   ├── ownerController.js      # Owner operations
│   │   └── userController.js       # User auth operations
│   ├── middlewares/
│   │   └── authMiddlware.js        # JWT authentication
│   ├── routes/
│   │   ├── adminRoutes.js          # Admin API routes
│   │   ├── ownerRoutes.js          # Owner API routes
│   │   └── userRoutes.js           # User API routes
│   ├── schemas/
│   │   ├── bookingModel.js         # Booking schema
│   │   ├── propertyModel.js        # Property schema
│   │   └── userModel.js            # User schema
│   ├── uploads/                    # Property images storage
│   ├── .env                        # Environment variables (create this)
│   ├── .gitignore                  # Git ignore file
│   ├── index.js                    # Server entry point
│   └── package.json                # Backend dependencies
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx  # Route protection component
    │   ├── modules/
    │   │   ├── admin/              # Admin components
    │   │   │   ├── AdminHome.jsx
    │   │   │   ├── AllUsers.jsx
    │   │   │   ├── AllProperty.jsx
    │   │   │   └── AllBookings.jsx
    │   │   ├── common/             # Shared components
    │   │   │   ├── Home.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── Register.jsx
    │   │   │   └── ForgotPassword.jsx
    │   │   └── user/               # User components
    │   │       ├── AllPropertiesCards.jsx
    │   │       ├── Owner/
    │   │       │   ├── OwnerHome.jsx
    │   │       │   ├── AddProperty.jsx
    │   │       │   ├── AllProperties.jsx
    │   │       │   └── AllBookings.jsx
    │   │       └── renter/
    │   │           ├── RenterHome.jsx
    │   │           └── AllProperties.jsx
    │   ├── App.js                  # Main app with routing
    │   ├── App.css                 # Global styles
    │   └── index.js                # React entry point
    ├── package.json                # Frontend dependencies
    └── README.md                   # This file
```

---

##  Testing Guide

### Quick 5-Minute Test

1. **Create Admin Account** (using browser console method)
2. **Test Admin:**
   - Login as admin
   - Should access `/adminhome` 
   - Try `/ownerhome` → Redirects to `/adminhome` 

3. **Test Owner:**
   - Register as owner
   - Login → Shows "not confirmed" 
   - Admin approves owner
   - Login again → Success 
   - Add property → Works 

4. **Test Renter:**
   - Register as renter
   - Login → Immediate access 
   - Book property → Success 

### Complete Testing Checklist

#### Authentication Tests
- [ ] Admin can login and access admin dashboard
- [ ] Owner registration requires admin approval
- [ ] Renter can register and login immediately
- [ ] Wrong credentials show appropriate error
- [ ] Logout clears session data

#### Authorization Tests
- [ ] Owner cannot access admin dashboard (redirects)
- [ ] Renter cannot access owner dashboard (redirects)
- [ ] Admin cannot access other dashboards (redirects)
- [ ] Unapproved owner cannot login
- [ ] Direct URL access is protected

#### Admin Features Tests
- [ ] Can view all users
- [ ] Can approve owners (status changes to "granted")
- [ ] Can revoke owner access (status changes to "ungranted")
- [ ] Can view all properties
- [ ] Can view all bookings

#### Owner Features Tests
- [ ] Can add property with images
- [ ] Can edit property details
- [ ] Can delete property
- [ ] Can view own properties
- [ ] Can view booking requests

#### Renter Features Tests
- [ ] Can browse all properties
- [ ] Can filter by address
- [ ] Can filter by property type
- [ ] Can filter by ad type
- [ ] Can view property details
- [ ] Can book property
- [ ] Can view booking history

#### Session Management Tests
- [ ] Login persists on page refresh
- [ ] Logout clears session
- [ ] Closing browser clears session
- [ ] Reopening browser requires re-login

#### Security Tests
- [ ] Invalid token redirects to login
- [ ] Corrupted session data redirects to login
- [ ] API calls without token are rejected
- [ ] Passwords are hashed in database

---

##  Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution:**
- Check internet connection (for MongoDB Atlas)
- Verify MongoDB connection string in `.env`
- Ensure IP address is whitelisted in MongoDB Atlas
  - Go to Network Access → Add IP → Use `0.0.0.0/0` for development
- For local MongoDB, ensure MongoDB service is running

### Issue: "Port 3000 or 8001 already in use"

**Solution:**

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:8001 | xargs kill -9
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Admin account already exists"

**Solution:**
- The admin is already created
- Try logging in with: `admin@househunt.com` / `admin123`
- Or create admin with different email

### Issue: "Failed to save changes" or "Failed to delete property"

**Solution:**
- Ensure you're logged in
- Check browser console for errors
- Verify backend is running
- Check backend terminal for errors
- Ensure token is valid (logout and login again)

### Issue: "User is null after login"

**Solution:**
- Clear sessionStorage and localStorage
- Logout completely
- Login again
- Check browser console for errors

### Issue: "Property images not uploading"

**Solution:**
- Ensure images are in correct format (jpg, png, jpeg)
- Check file size (should be reasonable)
- Verify `uploads/` folder exists in backend
- Check backend terminal for errors

---

##  Known Issues

### Fixed Issues 
-  Role-based access control implemented (previously any user could access any dashboard)
-  User data persistence with sessionStorage
-  Property edit and delete functionality working
-  File upload error resolved
-  Booking functionality with userId

### Minor Issues (Non-Critical)
1. **Typo in booking model:** Field name `propertId` (should be `propertyId`) - doesn't affect functionality
2. **Deprecated Mongoose options:** Code works but uses old options
3. **HTTP status codes:** Some errors return 200 instead of proper error codes
4. **Phone numbers:** Stored as Number (should be String for international formats)

### Cosmetic Issues
- HTML nesting warnings in console (doesn't affect functionality)
- Babel plugin warning (doesn't affect functionality)

---

##  Future Enhancements

### Planned Features
- [ ] Email verification for new users
- [ ] Complete forgot password flow with email
- [ ] Property search with advanced filters
- [ ] Pagination for property listings
- [ ] Multiple images per property (carousel)
- [ ] Rating and review system
- [ ] Real-time notifications
- [ ] Payment gateway integration
- [ ] Property booking calendar
- [ ] User profile management
- [ ] Property favorites/wishlist
- [ ] Chat system between owner and renter
- [ ] Google Maps integration for property location
- [ ] Admin analytics dashboard
- [ ] Export data to CSV/PDF
- [ ] Mobile responsive improvements
- [ ] Dark mode support

### Technical Improvements
- [ ] Unit and integration tests
- [ ] API documentation with Swagger
- [ ] Input validation improvements
- [ ] Better error handling
- [ ] Performance optimization
- [ ] Code splitting and lazy loading
- [ ] PWA support
- [ ] Docker containerization
- [ ] CI/CD pipeline

---

##  Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  type: String (Admin/Owner/Renter),
  granted: String (granted/ungranted) // For owners only
}
```

### Property Model
```javascript
{
  ownerId: ObjectId (ref: User),
  ownerName: String,
  propertyType: String (residential/commercial/land/plot),
  propertyAdType: String (rent/sale),
  propertyAddress: String,
  ownerContact: String,
  propertyAmt: Number,
  propertyImage: Array of { filename, path },
  additionalInfo: String,
  isAvailable: String (Available/Unavailable)
}
```

### Booking Model
```javascript
{
  propertyId: ObjectId (ref: Property),
  userID: ObjectId (ref: User),
  ownerID: ObjectId (ref: User),
  userName: String,
  phone: Number,
  bookingStatus: String (pending/booked/rejected)
}
```

---

## 🎓 Learning Outcomes

This project demonstrates:

1.  Full-stack MERN development
2.  RESTful API design and implementation
3.  JWT authentication and authorization
4.  Role-based access control (RBAC)
5.  Database design and relationships
6.  File upload handling with Multer
7.  React Router protected routes
8.  State management with React hooks
9.  Form handling and validation
10. Error handling and user feedback
11. Session management
12. Security best practices

---

##  Support

### For Evaluators

**Setup Time:** ~10 minutes

**Demo Credentials (Create after setup):**
- Admin: `admin@househunt.com` / `admin123`
- Owner: `owner@test.com` / `owner123` (needs approval)
- Renter: `renter@test.com` / `renter123`

**Common Questions:**

**Q: How do I create the admin account?**
A: Use the browser console method described in the "Creating Admin Account" section.

**Q: Owner can't login?**
A: Owners need admin approval. Login as admin first and approve the owner.

**Q: Properties not showing?**
A: Ensure at least one owner has added properties after admin approval.

**Q: Getting network errors?**
A: Ensure both backend (port 8001) and frontend (port 3000) are running.

---

##  Author

**V SURESH KUMAR**
- GitHub: [@Suresh-1116](https://github.com/Suresh-1116)
- Email: vsureshkumar1116@gmail.com

**Project:** Smart Bridge Virtual Internship - MERN Stack Application

---

##  License

This project is created for educational purposes as part of Smart Bridge Virtual Internship program.

---

##  Acknowledgments

- Smart Bridge for providing the internship opportunity
- MongoDB Atlas for free cloud database hosting
- Material-UI and Bootstrap for UI components
- The MERN stack community for excellent documentation and support

---

##  Important Notes

### For Development
- This setup uses sessionStorage for session management
- Sessions clear when browser closes (more secure)
- Use `0.0.0.0/0` for MongoDB Atlas IP whitelist (development only)

### For Production
Would require:
- Environment-based configuration
- Proper session management
- HTTPS/SSL certificates
- Rate limiting
- Input sanitization
- Database backup strategy
- Error logging service
- Load balancing
- CDN for static assets

---

##  Final Checklist Before Submission

- [ ] All dependencies installed
- [ ] Backend running without errors
- [ ] Frontend running without errors
- [ ] MongoDB connected successfully
- [ ] Admin account created and tested
- [ ] Owner account created, approved, and tested
- [ ] Renter account created and tested
- [ ] All CRUD operations working
- [ ] Security features tested
- [ ] No critical console errors
- [ ] README.md completed
- [ ] Code pushed to GitHub
- [ ] GitHub repository is public
- [ ] Repository link shared with evaluators

---

** If you find this project useful, please give it a star on GitHub!**

** For questions or issues, please contact the author or open an issue on GitHub.**

---

**Last Updated:** February 2026  
**Version:** 1.0.0  
**Status:**  Production Ready
