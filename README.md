# Week 3 Assignments - Product Model and Product API

This project uses Express.js and MongoDB with Mongoose.  
It creates APIs to manage product data with validation and authentication.

---

# Files

## prodmodel.js

Creates a Mongoose schema and model for products.

### Product Fields
- Product Name
- Product ID
- Price
- Brand

### Validations Used
- Required fields
- Minimum length
- Maximum length
- Minimum price
- Maximum price

### Features
- Timestamps
- Schema validation
- MongoDB model creation

---

## prodapi.js

Creates REST APIs for product operations.

### Authentication API

#### POST /auth
Checks product credentials and generates JWT token.  
Stores token in cookies after successful login.

---

# Product APIs

### POST /prod
Creates a new product and stores it in MongoDB.

### GET /prod
Fetches all product data from database.  
Protected using token verification middleware.

### GET /prod/:id
Finds a product using MongoDB object ID.

### PUT /prod/:id
Updates product details by ID.

### DELETE /prod/:id
Deletes a product from database by ID.

---

# Concepts Practiced

- Express.js
- MongoDB
- Mongoose Schema
- Model Creation
- CRUD Operations
- REST APIs
- JWT Authentication
- Cookies
- Middleware
- Validation
- Async/Await
