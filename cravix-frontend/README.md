# Cravix

A modern full-stack food ordering web application built using React, Node.js, Express.js, and MySQL.

Cravix provides a complete food ordering experience, allowing customers to browse restaurants, search menu items, manage their shopping cart, place orders, and track their order status. The application also includes a secure administrator dashboard for managing restaurants, menu items, and customer orders.

The project was developed to demonstrate full-stack software engineering principles, including frontend development, backend API development, relational database design, authentication, authorization, and responsive user interface design.

---

# Table of Contents

- Overview
- Features
- Technology Stack
- System Architecture
- Project Structure
- Prerequisites
- Installation
- Environment Variables
- Database Setup
- Running the Application
- Administrator Account
- API Overview
- Available Scripts
- Authentication & Authorization
- Development Workflow
- Troubleshooting
- Future Improvements
- Contributing
- License
- Author

---

# Overview

Cravix is a full-stack restaurant ordering platform designed to simulate the workflow of modern food delivery applications.

Customers can:

- Create an account
- Log into their account securely
- Browse restaurants
- View restaurant menus
- Search food items
- Filter restaurants by category
- Add food items to the shopping cart
- Update cart quantities
- Place delivery, pickup, or dine-in orders
- View previous orders
- Track order progress

Administrators can:

- Access a protected dashboard
- Manage restaurants
- Manage menu items
- View customer orders
- Update order status
- Monitor platform activity

The application follows a client-server architecture where the frontend communicates with a RESTful backend API, and all persistent data is stored in a MySQL relational database.

---

# Features

## Customer Features

### Authentication

- User Registration
- User Login
- User Logout
- JWT Authentication
- Password Encryption using bcrypt
- Protected Customer Routes

---

### Restaurant Browsing

- Browse Restaurants
- Restaurant Details
- Restaurant Banner
- Restaurant Information
- Restaurant Categories
- Responsive Restaurant Cards

---

### Food Discovery

- Browse Menu Items
- Search Food
- Category Filtering
- Food Recommendations
- Menu Item Details

---

### Shopping Cart

- Add Items
- Remove Items
- Update Quantity
- Cart Persistence
- Price Calculation
- GST Calculation
- Delivery Fee Calculation
- Order Summary

---

### Checkout

- Delivery Orders
- Pickup Orders
- Dine-In Orders
- Customer Information Form
- Order Validation
- Order Placement
- Order Confirmation

---

### Orders

- View Previous Orders
- Order Details
- Order Timeline
- Order Status Tracking
- Delivery Progress

---

### User Experience

- Responsive Design
- Modern User Interface
- Mobile Friendly
- Clean Navigation
- Professional Layout
- Smooth User Flow

---

# Administrator Features

## Authentication

- Secure Administrator Login
- Role-Based Authorization
- Protected Administrator Routes

---

## Restaurant Management

- Add Restaurants
- Edit Restaurants
- Delete Restaurants
- Manage Restaurant Information

---

## Menu Management

- Add Menu Items
- Edit Menu Items
- Delete Menu Items
- Update Availability
- Restaurant Assignment

---

## Order Management

- View Customer Orders
- Update Order Status
- Monitor Incoming Orders
- Manage Order Workflow

---

## Dashboard

- Administrative Dashboard
- Restaurant Overview
- Order Overview
- Platform Management

---

# Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Protected React Routes
- Role-Based Authorization
- Secure Environment Variables
- Server-Side Validation
- Client-Side Validation
- MySQL Foreign Key Constraints

---

# Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | User Interface |
| React Router DOM | Client-side Routing |
| Axios | HTTP Requests |
| CSS3 | Styling |
| Lucide React | Icons |
| Vite | Development Server & Build Tool |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
| JWT | Authentication |
| bcrypt | Password Encryption |
| CORS | Cross-Origin Requests |
| dotenv | Environment Variables |
| Multer | File Upload Handling |

---

## Database

| Technology | Purpose |
|------------|---------|
| MySQL | Relational Database |

---

## Development Tools

| Tool | Purpose |
|------|---------|
| VS Code | Code Editor |
| Git | Version Control |
| GitHub | Source Code Hosting |
| MySQL Workbench | Database Management |
| Postman | API Testing |
| npm | Package Management |

---

# System Architecture

```
                +----------------------+
                |      React App       |
                |    (Frontend UI)     |
                +----------+-----------+
                           |
                           |
                     HTTP Requests
                           |
                           v
                +----------------------+
                |    Express Server    |
                |    REST API Layer    |
                +----------+-----------+
                           |
                           |
                    Business Logic
                           |
                           v
                +----------------------+
                |       MySQL          |
                |      Database        |
                +----------------------+
```

The frontend communicates with the backend through REST API endpoints using Axios.

The backend validates requests, performs business logic, and communicates with the MySQL database.

JWT tokens are used to authenticate users and authorize protected operations.

---

# Project Structure

```
Cravix
│
├── cravix-backend
│   │
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── package.json
│   ├── server.js
│   └── .env.example
│
├── cravix-frontend
│   │
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   ├── styles
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env.example
│
├── database
│   ├── schema.sql
│   ├── seed.sql
│   └── README.md
│
├── LICENSE
├── .gitignore
└── README.md
```

---

## Directory Overview

### `cravix-frontend`

Contains the complete React application, including pages, reusable components, routing, API services, hooks, contexts, and styling.

### `cravix-backend`

Contains the Express.js server, REST API, middleware, controllers, database configuration, authentication logic, and business rules.

### `database`

Contains the SQL scripts required to create the database schema and populate initial data.

### `README.md`

Primary documentation for setting up, running, and understanding the project.

# Prerequisites

Before running Cravix locally, ensure the following software is installed on your system.

| Software | Recommended Version |
|----------|---------------------|
| Node.js | 18.x or later |
| npm | Latest |
| MySQL Server | 8.0 or later |
| MySQL Workbench | Latest |
| Git | Latest |
| Visual Studio Code | Latest (Recommended) |

---

# Installation

## Step 1 - Clone the Repository

Clone the repository using Git.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/cravix.git
```

Move into the project directory.

```bash
cd cravix
```

Your project structure should look similar to the following.

```
cravix
│
├── cravix-backend
├── cravix-frontend
├── database
├── README.md
└── LICENSE
```

---

# Backend Setup

Navigate to the backend directory.

```bash
cd cravix-backend
```

Install all backend dependencies.

```bash
npm install
```

Once installation is complete, the backend should contain a `node_modules` folder.

---

# Frontend Setup

Open another terminal.

Navigate to the frontend folder.

```bash
cd cravix-frontend
```

Install frontend dependencies.

```bash
npm install
```

---

# Environment Variables

Cravix uses environment variables to keep sensitive information out of the source code.

Never upload your actual `.env` file to GitHub.

Instead, copy the example file.

## Backend

Create a new file named

```
.env
```

inside

```
cravix-backend
```

Example configuration:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=cravix_db

JWT_SECRET=REPLACE_WITH_A_LONG_RANDOM_SECRET

CLIENT_URL=http://localhost:5173
```

Replace the values with your own local configuration.

---

## Frontend

Create a new file named

```
.env
```

inside

```
cravix-frontend
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Database Setup

Cravix uses MySQL as its primary database.

---

## Step 1 - Create the Database

Open MySQL Workbench.

Create a new database.

```sql
CREATE DATABASE cravix_db;
```

Select the database.

```sql
USE cravix_db;
```

---

## Step 2 - Import the Database Schema

Inside the project you'll find

```
database/
    schema.sql
```

Import the schema using MySQL Workbench.

### Option A

Open

```
Server
→ Data Import
```

Choose

```
schema.sql
```

Click

```
Start Import
```

---

### Option B

Execute directly.

```sql
SOURCE database/schema.sql;
```

The schema will create all required tables including:

- users
- restaurants
- menu_items
- orders
- order_items

---

## Step 3 - Import Sample Data

If your repository contains

```
database/
    seed.sql
```

Import it.

Workbench

```
Server
→ Data Import
→ seed.sql
```

or

```sql
SOURCE database/seed.sql;
```

The seed file may include:

- Sample Restaurants
- Menu Items
- Categories
- Demo Users
- Administrator Account

If you choose not to import `seed.sql`, you can create restaurants and menu items manually through the administrator dashboard after creating an administrator account.

---

## Step 4 - Verify the Database

Run the following query.

```sql
SHOW TABLES;
```

Expected tables:

```
users
restaurants
menu_items
orders
order_items
```

Verify that the tables were created successfully before starting the backend.

---

# Administrator Setup

If your project includes a default administrator account in `seed.sql`, use the credentials provided there.

If there is no administrator account, create one using the application.

1. Start the backend and frontend.
2. Register a new user through the registration page.
3. Open MySQL Workbench.
4. Promote the newly created account to an administrator.

Example:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Replace the email with the email address used during registration.

After updating the role, log out and log back in to access the administrator dashboard.

---

# Running the Application

## Start the Backend

Navigate to the backend directory.

```bash
cd cravix-backend
```

Start the development server.

```bash
npm run dev
```

Expected output:

```
Server running on port 5000
Connected to MySQL Database
```

---

## Start the Frontend

Open a second terminal.

```bash
cd cravix-frontend
```

Run the frontend development server.

```bash
npm run dev
```

Expected output:

```
Local: http://localhost:5173
```

Open the URL in your browser.

```
http://localhost:5173
```

---

# Verifying the Installation

After both servers are running successfully:

- Register a new user account.
- Log in to the application.
- Browse restaurants.
- Add menu items to the cart.
- Complete the checkout process.
- View your order history.
- If using an administrator account, verify that the admin dashboard is accessible.

If all of these functions work correctly, the application has been configured successfully.

---

# Production Build

To create a production build of the frontend:

```bash
cd cravix-frontend
```

```bash
npm run build
```

The production files will be generated in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
```

---

# Backend Production

For production deployment, install dependencies and start the server using:

```bash
npm install
```

```bash
npm start
```

Ensure that production environment variables are configured correctly before deployment.

# API Overview

Cravix follows a RESTful API architecture where the frontend communicates with the backend using HTTP requests. All endpoints return JSON responses and use standard HTTP status codes.

Base URL (Development)

```
http://localhost:5000/api
```

---

# API Modules

The backend API is organized into the following modules.

```
Authentication

Restaurants

Menu

Orders

Admin

Dashboard
```

---

# Authentication API

## Register User

Creates a new customer account.

**Endpoint**

```
POST /api/auth/register
```

Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

Success Response

```json
{
  "success": true,
  "message": "Registration successful"
}
```

---

## Login

Authenticates a user and returns a JSON Web Token.

**Endpoint**

```
POST /api/auth/login
```

Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Success Response

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": 1,
    "name": "John Doe",
    "role": "customer"
  }
}
```

---

# Restaurant API

## Get All Restaurants

Returns every available restaurant.

```
GET /api/restaurants
```

---

## Get Restaurant Details

Returns details for a specific restaurant.

```
GET /api/restaurants/:id
```

---

## Search Menu Items

Search menu items by keyword.

```
GET /api/menu/search?q=pizza
```

---

# Order API

## Place Order

Creates a new customer order.

```
POST /api/orders
```

Authentication Required

```
Yes
```

---

## Get Customer Orders

Returns all orders belonging to the logged-in customer.

```
GET /api/orders/my-orders
```

Authentication Required

```
Yes
```

---

## Get Order Details

Returns details for a specific order.

```
GET /api/orders/:id
```

Authentication Required

```
Yes
```

---

# Administrator API

Administrator routes require an authenticated administrator account.

---

## Dashboard

```
GET /api/admin/dashboard
```

---

## Restaurants

```
GET    /api/admin/restaurants

POST   /api/admin/restaurants

PUT    /api/admin/restaurants/:id

DELETE /api/admin/restaurants/:id
```

---

## Menu Items

```
GET    /api/admin/menu

POST   /api/admin/menu

PUT    /api/admin/menu/:id

DELETE /api/admin/menu/:id
```

---

## Orders

```
GET    /api/admin/orders

PUT    /api/admin/orders/:id
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
|200|Request Successful|
|201|Resource Created|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|500|Internal Server Error|

---

# Authentication & Authorization

Cravix uses JSON Web Tokens (JWT) for authentication.

When a user logs in successfully, the backend generates a signed JWT token.

The frontend stores this token locally and includes it with every protected request.

Example

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Protected routes verify the token before allowing access to secured resources.

---

## Role-Based Access Control

Two user roles are supported.

```
Customer

Administrator
```

### Customer

Customers can:

- Register
- Login
- Browse restaurants
- View menus
- Add items to cart
- Place orders
- View order history
- Track orders

### Administrator

Administrators have access to everything available to customers, along with administrative features such as:

- Dashboard
- Restaurant Management
- Menu Management
- Order Management
- Order Status Updates

---

# Available Scripts

## Frontend

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Create production build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

## Backend

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Start production server

```bash
npm start
```

---

# Development Workflow

The recommended development workflow is outlined below.

## Step 1

Start MySQL Server.

---

## Step 2

Start the backend server.

```bash
cd cravix-backend

npm run dev
```

---

## Step 3

Start the frontend server.

```bash
cd cravix-frontend

npm run dev
```

---

## Step 4

Open the application.

```
http://localhost:5173
```

---

## Step 5

Test the application.

Recommended testing checklist:

- Register a new account
- Log in
- Browse restaurants
- Search menu items
- Add products to the cart
- Remove products
- Update quantities
- Complete checkout
- Verify order creation
- View order history
- Track order status
- Log in as an administrator
- Add a restaurant
- Add menu items
- Update order status

---

# Build for Production

## Frontend

```bash
npm run build
```

The production-ready files will be generated inside the `dist` directory.

---

## Backend

Install dependencies.

```bash
npm install
```

Start the production server.

```bash
npm start
```

Ensure all production environment variables are configured before deployment.

---

# Troubleshooting

## Database Connection Failed

Possible causes:

- MySQL Server is not running.
- Incorrect database credentials.
- Database does not exist.
- Incorrect `.env` configuration.

Verify:

```env
DB_HOST

DB_PORT

DB_USER

DB_PASSWORD

DB_NAME
```

---

## JWT Authentication Errors

Possible causes:

- Missing token.
- Invalid token.
- Expired token.

Solution:

Log in again to generate a new token.

---

## CORS Errors

Ensure the backend allows requests from the frontend URL.

Example:

```
http://localhost:5173
```

---

## Backend Server Does Not Start

Check:

- Node.js installation
- Missing dependencies
- Missing `.env`
- Port conflicts

Install dependencies again if necessary.

```bash
npm install
```

---

## Frontend Cannot Connect to Backend

Verify:

- Backend server is running.
- API URL is correct.
- `VITE_API_URL` points to the backend.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## MySQL Import Errors

If importing `schema.sql` fails:

- Verify the database exists.
- Ensure MySQL Server is running.
- Execute:

```sql
USE cravix_db;
```

before importing.

---

## Port Already in Use

If port **5000** or **5173** is already in use:

- Stop the conflicting application.
- Or configure a different port in the appropriate configuration file.

---

## Build Failures

If the frontend build fails:

```bash
npm install

npm run build
```

If the backend fails:

```bash
npm install

npm start
```

Review the terminal output for missing packages or configuration issues.

## Author

**Nitesh Kumar**

Bachelor of Computer Applications (BCA) Student at IGNOU and Full-Stack Web Developer passionate about building modern, scalable, and user-friendly web applications using React, Node.js, Express.js, and MySQL.

- **GitHub:** https://github.com/SAKUblade

If you find this project useful, consider giving it a star on GitHub.