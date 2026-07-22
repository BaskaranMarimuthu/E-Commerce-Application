# 🛒 MERN E-Commerce Application

A full-stack, responsive E-Commerce web application built using the MERN Stack. The application provides a modern online shopping experience with secure authentication, product management, shopping cart functionality, and order processing.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Update Profile
- Change Password
- Forgot & Reset Password
- Browse Products
- Search & Filter Products
- Product Details Page
- Add to Cart
- Update Cart Quantity
- Remove Items from Cart
- Checkout Process
- Order Placement
- Order History
- Product Reviews & Ratings

### 🛍 Product Features

- Product Categories
- Product Images
- Product Description
- Product Ratings
- Product Reviews
- Stock Management
- Discount Display

### 🔐 Admin Features

- Admin Dashboard
- Add Products
- Update Products
- Delete Products
- Manage Users
- Manage Orders
- Update Order Status

---

# 🛠 Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Cloudinary
- Multer
- Nodemailer

---

# 📂 Project Structure

```
Ecommerce-App
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── features
│   │   ├── layouts
│   │   ├── utils
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone the repository

```bash
git clone <repository-url>
```

## Backend

```bash
cd backend
npm install
npm start
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=6700

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

COOKIE_EXPIRE=7

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_EMAIL=your_email
SMTP_PASSWORD=your_email_password
SMTP_FROM=your_email
```

---

# 📸 Screens

- Home Page
- Product Details
- Login & Register
- Shopping Cart
- Checkout
- Orders
- User Profile
- Admin Dashboard

---

# 🔄 Application Flow

1. User Registration/Login
2. Browse Products
3. View Product Details
4. Add Products to Cart
5. Update Quantity
6. Checkout
7. Place Order
8. View Orders

---

# 📦 Major Functionalities

- Authentication using JWT
- Protected Routes
- Redux State Management
- Product Search & Filtering
- Shopping Cart using Local Storage
- Secure Password Hashing
- Image Upload with Cloudinary
- Responsive UI
- RESTful APIs

---

# 💻 API Endpoints

### User

- Register User
- Login User
- Logout User
- Get User Profile
- Update Profile
- Change Password
- Forgot Password
- Reset Password

### Product

- Get All Products
- Get Product Details
- Create Product
- Update Product
- Delete Product

### Cart

- Add to Cart
- Update Quantity
- Remove Item

### Orders

- Create Order
- Get My Orders
- Get Order Details
- Update Order Status

---

# 🎯 Future Improvements

- Online Payment Integration (Stripe/Razorpay)
- Wishlist
- Coupon System
- Product Recommendations
- Email Notifications
- Inventory Analytics
- Multi-vendor Support
- Dark Mode
- Progressive Web App (PWA)

---

# 👨‍💻 Author

**Bass**

Frontend Developer | MERN Stack Developer

### Skills

- React.js
- JavaScript (ES6+)
- Redux Toolkit
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- REST APIs
- Git & GitHub

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Happy Coding! 🚀
