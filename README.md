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
   ```bash
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

   ```bash
   x-user-id: <MongoDB user ID>
    ```
 ```bash
 x-user-id: 67a74ea726e13d4f45cc8021
```
---

## 🗂️ Project Structure
```bash
ease-my-transport/
├─ package.json
├─ .env.example
├─ README.md
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ config/
│  │  └─ db.js
│  ├─ models/
│  │  ├─ User.js
│  │  ├─ Booking.js
│  │  └─ Payment.js
│  ├─ routes/
│  │  ├─ users.js
│  │  ├─ bookings.js
│  │  └─ payments.js
│  ├─ controllers/
│  │  ├─ userController.js
│  │  ├─ bookingController.js
│  │  └─ paymentController.js
│  └─ middleware/
│     └─ auth.js
 
```
---

📌 Sample API Requests (Postman)

Below are example API requests for testing the EaseMyTransport backend using Postman.

1️⃣ Create a User
POST /users
Headers
Content-Type: application/json

Body
{
  "name": "Disha Gupta",
  "email": "disha@example.com",
  "role": "customer"
}


OR create a transporter:

{
  "name": "Aman Transporter",
  "email": "aman@example.com",
  "role": "transporter"
}

2️⃣ Get User by ID
GET /users/:id

Example

GET http://localhost:3000/users/691c2837fd15d1ebd2c5bdb6

3️⃣ Create a Booking (Customer Only)
POST /bookings
Headers
Content-Type: application/json
x-user-id: <CUSTOMER_ID>

Body
{
  "pickupLocation": "Delhi",
  "dropLocation": "Mumbai",
  "transporterId": "691c2864fd15d1ebd2c5bdb9"
}


If you do not assign a transporter, booking status becomes "pending".

4️⃣ Get Bookings (Customer or Transporter)
GET /bookings
Headers
x-user-id: <USER_ID>


No body required.

This returns bookings:

Customer → only their bookings

Transporter → only bookings assigned to them

5️⃣ Update Booking Status (Transporter Only)
PATCH /bookings/:id

Example URL

PATCH http://localhost:3000/bookings/691c2c01fd15d1ebd2c5bdbd

Headers
Content-Type: application/json
x-user-id: <TRANSPORTER_ID>

Body
{
  "status": "completed"
}


Valid status values:

"pending"

"assigned"

"completed"

6️⃣ Create a Payment (Customer Only)
POST /payments
Headers
Content-Type: application/json
x-user-id: <CUSTOMER_ID>

Body
{
  "bookingId": "691c2c01fd15d1ebd2c5bdbd",
  "amount": 1500
}

7️⃣ Get Payment Details for a Booking
GET /payments/:bookingId
Headers
x-user-id: <CUSTOMER_OR_TRANSPORTER_ID>


Example

GET http://localhost:3000/payments/691c2c01fd15d1ebd2c5bdbd

