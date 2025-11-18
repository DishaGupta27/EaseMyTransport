# 🚚 EaseMyTransport – Backend API

A simple transport-booking backend built using **Node.js**, **Express**, and **MongoDB**.  
This project handles **Users, Bookings, and Payments**, and includes basic role-based access using a custom header (`x-user-id`).

---

## 📦 Features
- User creation (Customer / Transporter)
- Booking creation & assignment
- Booking status update (Transporter only)
- Payment management
- Pagination support for bookings
- Simple authentication using `x-user-id` header
- MongoDB with Mongoose models

---

## ⚙️ Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Nodemon (dev)**
- **Postman (API testing)**

---

# 🚀 Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/EaseMyTransport.git
    cd EaseMyTransport
     ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a .env file:**
   MONGO_URI=mongodbURL
   PORT=5000
    ```

4. **Run the app locally:**
    ```bash
    npm run dev
    ```
---

## 🧪 Authentication (Important)

This backend uses a simple header called x-user-id to identify the logged-in user.

Every request that needs a logged-in user (Booking / Payment APIs) must include:

x-user-id: <MongoDB user ID>
Example:
x-user-id: 67a74ea726e13d4f45cc8021

---

## 🗂️ Project Structure

EaseMyTransport/
│
├── controllers/
│   ├── userController.js
│   ├── bookingController.js
│   └── paymentController.js
│
├── models/
│   ├── User.js
│   ├── Booking.js
│   └── Payment.js
│
├── routes/
│   ├── userRoutes.js
│   ├── bookingRoutes.js
│   └── paymentRoutes.js
│
├── middleware/
│   └── authMiddleware.js
│
├── config/
│   └── db.js
│
├── app.js
├── server.js
└── README.md


