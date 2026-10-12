# 🍔 Cravix

A modern full-stack food ordering web application built with **React, Node.js, Express.js, and MySQL**.

Cravix allows users to browse restaurants, explore menus, manage their cart, place orders, and track order status. It also includes an admin dashboard for managing restaurants, menus, and customer orders.

---

## ✨ Features

### 👤 User
- User Registration & Login (JWT Authentication)
- Browse Restaurants
- Search Food Items
- Filter by Categories
- Restaurant Menu
- Add / Remove Cart Items
- Checkout
- Cash on Delivery
- Order History
- Order Tracking
- Responsive UI

### 🔐 Admin
- Secure Admin Login
- Dashboard
- Restaurant Management
- Menu Management
- Order Management
- Update Order Status

---

## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS
- Vite

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt

### Database
- MySQL

---

## 📁 Project Structure

```
Cravix
│
├── cravix-frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── cravix-backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/SAKUblade/Cravix.git

cd Cravix
```

---

## Backend Setup

```bash
cd cravix-backend

npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database

JWT_SECRET=your_secret_key
```

Start backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd ../cravix-frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## 📸 Screenshots

Add screenshots here later.

- Home Page
- Restaurant Page
- Cart
- Checkout
- Orders
- Admin Dashboard

---

## 🔒 Authentication

- JWT Authentication
- Password Hashing using Bcrypt
- Protected Routes
- Admin Authorization

---

## 📌 Future Improvements

- Online Payments
- Email Notifications
- Live Order Tracking
- Ratings & Reviews
- Coupons & Offers
- Push Notifications
- Docker Support

---

## 👨‍💻 Author

**Nitesh Kumar**

GitHub: https://github.com/SAKUblade

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
