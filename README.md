
# FoodMedin

**FoodMedin** identifies and assesses the impact of specific foods on the management and treatment of specific diseases. It streamlines the shopping process by combining health recommendations with a convenient purchasing platform. Users can select organs, view diseases associated with those organs, and then find and shop for groceries that are beneficial for managing those diseases.

---

## Technologies Used

**FoodMedin** is built using the following technologies:

### Front-End
- **HTML** for structuring the web pages
- **CSS** for styling and layout
- **React.js** for building the user interface

### Back-End
- **Node.js** for server-side JavaScript execution
- **Express.js** for creating the web server and API routes
- **MongoDB** for database management

### Other Tools
- **JWT** for authentication, with tokens stored in local storage
- **Nodemailer** for sending emails (password reset functionality)
- **PayPal** integration for payment processing

---

## Installation Instructions

Follow the steps below to set up and run the **FoodMedin** project locally. FoodMedin is built using the MERN stack, with additional tools such as JWT for authentication, Nodemailer for email functionality, and PayPal for payment processing. You'll need to set up both the frontend and backend environments, install dependencies, and configure environment variables.

These instructions will guide you through the process of cloning the repository, installing dependencies, and running the project locally.

### Clone the Repository

To get started with FoodMedin, clone the repository from GitHub:

```bash
git clone https://github.com/your-username/your-repository.git
```

### Backend Dependencies

Before starting the backend server, make sure you have the following dependencies installed:

1. **Install Node.js**: [Node.js Download](https://nodejs.org/)

2. **Install dependencies** for the backend by navigating to the `backend` folder and running:

```bash
cd backend
npm install
```

#### Backend Dependencies:

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling for Node.js
- **dotenv**: Load environment variables from a `.env` file
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **nodemon**: Development tool for automatically restarting the server upon code changes
- **jsonwebtoken**: JWT for authentication and authorization
- **nodemailer**: For sending emails (e.g., password reset)
- **paypal-rest-sdk**: PayPal API integration for payments
- **bcryptjs**: For hashing passwords
- **cookie-parser**: Middleware to parse cookies

#### Dev Dependencies:

- **eslint**: Linting JavaScript code
- **prettier**: Code formatting tool

### Frontend Dependencies

For the frontend, navigate to the `frontend` folder and install the required dependencies:

```bash
cd frontend
npm install
```

#### Frontend Dependencies:

- **react**: Core React library
- **react-dom**: React library for DOM manipulation
- **react-router-dom**: For routing and navigation in React
- **axios**: For making HTTP requests (API calls to your backend)
- **redux**: State management library (optional)
- **react-redux**: React bindings for Redux
- **redux-thunk or redux-saga**: Middleware for handling asynchronous actions in Redux
- **jsonwebtoken (jwt-decode)**: For decoding JWT tokens stored in local storage for authentication
- **react-paypal-button-v2 or @paypal/react-paypal-js**: For integrating PayPal payments

### Setting Up Environment Variables

Create a `.env` file in the backend directory with the following environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

After setting up the environment variables, you can run the project.

### Running the Project

1. **Start the backend server** by navigating to the `backend` folder and running:

```bash
npm run dev
```

2. **Start the frontend** by navigating to the `frontend` folder and running:

```bash
npm start
```

---

## Features

FoodMedin offers a wide range of features that help users identify foods that may aid in managing specific diseases, with the added functionality of easily purchasing those foods. Below are the key features:

### 1. Organ Selection
- Users can select specific organs from the user interface.
- Each selected organ leads to a list of diseases specific to that organ.

### 2. Disease-Specific Food Recommendations
- For each disease, a curated list of groceries that may help manage the disease is displayed.
- Users can learn about the nutritional benefits of each food item.

### 3. Add to Cart and Wishlist
- Users can add recommended groceries to their shopping cart for easy checkout.
- Items can also be added to the wishlist for future reference or purchase.

### 4. Secure Authentication
- JWT-based authentication ensures user data is secure.
- Users can register, log in, and manage their accounts securely, with tokens stored in local storage.

### 5. Password Reset Notifications
- Automated email notifications are sent for password resets using Nodemailer.

### 6. PayPal Integration
- Users can purchase recommended groceries using PayPal's secure payment gateway.
- The platform supports real-time transaction processing through PayPal.

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

# FoodMedin

**FoodMedin** identifies and assesses the impact of specific foods on the management and treatment of specific diseases. It streamlines the shopping process by combining health recommendations with a convenient purchasing platform. Users can select organs, view diseases associated with those organs, and then find and shop for groceries that are beneficial for managing those diseases.

---

## Technologies Used

**FoodMedin** is built using the following technologies:

### Front-End
- **HTML** for structuring the web pages
- **CSS** for styling and layout
- **React.js** for building the user interface

### Back-End
- **Node.js** for server-side JavaScript execution
- **Express.js** for creating the web server and API routes
- **MongoDB** for database management

### Other Tools
- **JWT** for authentication, with tokens stored in local storage
- **Nodemailer** for sending emails (password reset functionality)
- **PayPal** integration for payment processing

---

## Installation Instructions

Follow the steps below to set up and run the **FoodMedin** project locally. FoodMedin is built using the MERN stack, with additional tools such as JWT for authentication, Nodemailer for email functionality, and PayPal for payment processing. You'll need to set up both the frontend and backend environments, install dependencies, and configure environment variables.

These instructions will guide you through the process of cloning the repository, installing dependencies, and running the project locally.

### Clone the Repository

To get started with FoodMedin, clone the repository from GitHub:

```bash
git clone https://github.com/your-username/your-repository.git
```

### Backend Dependencies

Before starting the backend server, make sure you have the following dependencies installed:

1. **Install Node.js**: [Node.js Download](https://nodejs.org/)

2. **Install dependencies** for the backend by navigating to the `backend` folder and running:

```bash
cd backend
npm install
```

#### Backend Dependencies:

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling for Node.js
- **dotenv**: Load environment variables from a `.env` file
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **nodemon**: Development tool for automatically restarting the server upon code changes
- **jsonwebtoken**: JWT for authentication and authorization
- **nodemailer**: For sending emails (e.g., password reset)
- **paypal-rest-sdk**: PayPal API integration for payments
- **bcryptjs**: For hashing passwords
- **cookie-parser**: Middleware to parse cookies

#### Dev Dependencies:

- **eslint**: Linting JavaScript code
- **prettier**: Code formatting tool

### Frontend Dependencies

For the frontend, navigate to the `frontend` folder and install the required dependencies:

```bash
cd frontend
npm install
```

#### Frontend Dependencies:

- **react**: Core React library
- **react-dom**: React library for DOM manipulation
- **react-router-dom**: For routing and navigation in React
- **axios**: For making HTTP requests (API calls to your backend)
- **redux**: State management library (optional)
- **react-redux**: React bindings for Redux
- **redux-thunk or redux-saga**: Middleware for handling asynchronous actions in Redux
- **jsonwebtoken (jwt-decode)**: For decoding JWT tokens stored in local storage for authentication
- **react-paypal-button-v2 or @paypal/react-paypal-js**: For integrating PayPal payments

### Setting Up Environment Variables

Create a `.env` file in the backend directory with the following environment variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your email
EMAIL_PASS=password
```

After setting up the environment variables, you can run the project.

### Running the Project

1. **Start the backend server** by navigating to the `backend` folder and running:

```bash
npm run dev
```

2. **Start the frontend** by navigating to the `frontend` folder and running:

```bash
npm start
```

---

## Features

FoodMedin offers a wide range of features that help users identify foods that may aid in managing specific diseases, with the added functionality of easily purchasing those foods. Below are the key features:

### 1. Organ Selection
- Users can select specific organs from the user interface.
- Each selected organ leads to a list of diseases specific to that organ.

### 2. Disease-Specific Food Recommendations
- For each disease, a curated list of groceries that may help manage the disease is displayed.
- Users can learn about the nutritional benefits of each food item.

### 3. Add to Cart and Wishlist
- Users can add recommended groceries to their shopping cart for easy checkout.
- Items can also be added to the wishlist for future reference or purchase.

### 4. Secure Authentication
- JWT-based authentication ensures user data is secure.
- Users can register, log in, and manage their accounts securely, with tokens stored in local storage.

### 5. Password Reset Notifications
- Automated email notifications are sent for password resets using Nodemailer.

### 6. PayPal Integration
- Users can purchase recommended groceries using PayPal's secure payment gateway.
- The platform supports real-time transaction processing through PayPal.

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### 1. **Authentication**

#### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "User's Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Logout User
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Description**: Logs out the authenticated user.

#### Forgot Password
- **URL**: `/auth/forgot-password`
- **Method**: `POST`
- **Description**: Initiates password reset process.

#### Reset Password
- **URL**: `/auth/reset-password/:token`
- **Method**: `POST`
- **Description**: Resets user password using a token.

---

### 2. **User Management**

#### Get User Profile
- **URL**: `/users/profile`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's profile.

#### Update User Profile
- **URL**: `/users/profile`
- **Method**: `PUT`
- **Description**: Updates the authenticated user's profile.

#### Add User Address
- **URL**: `/users/address`
- **Method**: `POST`
- **Description**: Adds a new address for the authenticated user.

#### Update User Address
- **URL**: `/users/address/:addressId`
- **Method**: `PATCH`
- **Description**: Updates an existing address for the authenticated user.

#### Delete User Address
- **URL**: `/users/address/:addressId`
- **Method**: `DELETE`
- **Description**: Deletes an address for the authenticated user.

---

### 3. **Organ Management**

#### Get All Organs
- **URL**: `/organs`
- **Method**: `GET`
- **Description**: Retrieves a list of all organs.

#### Get Organ Filters
- **URL**: `/organs/filter`
- **Method**: `GET`
- **Description**: Retrieves a filtered list of organs based on criteria.

---

### 4. **Disease Management**

#### Get All Diseases
- **URL**: `/diseases`
- **Method**: `GET`
- **Description**: Retrieves a list of all diseases.

#### Get Diseases by Organ ID
- **URL**: `/diseases/organ/:organId`
- **Method**: `GET`
- **Description**: Retrieves a list of diseases associated with a specific organ.

#### Get Disease Details with Groceries
- **URL**: `/diseases/:diseaseId`
- **Method**: `GET`
- **Description**: Retrieves detailed information about a disease, including groceries beneficial for the disease.

---

### 5. **Grocery Management**

#### Get All Groceries for a Disease
- **URL**: `/diseases/:diseaseId/groceries`
- **Method**: `GET`
- **Description**: Retrieves groceries recommended for managing a specific disease.

---

### 6. **Cart Management**

#### Add Item to Cart
- **URL**: `/cart`
- **Method**: `POST`
- **Description**: Adds an item to the user's cart.
- **Request Body**:
  ```json
  {
    "groceryId": "grocery-id",
    "quantity": 1
  }
  ```

#### Get Cart Items
- **URL**: `/cart`
- **Method**: `GET`
- **Description**: Retrieves the items in the user's cart.

#### Update Cart Item
- **URL**: `/cart/:itemId`
- **Method**: `PUT`
- **Description**: Updates the quantity of a cart item.

#### Remove Cart Item
- **URL**: `/cart/:itemId`
- **Method**: `DELETE`
- **Description**: Removes an item from the user's cart.

---

### 7. **Wishlist Management**

#### View Wishlist
- **URL**: `/wishlist`
- **Method**: `GET`
- **Description**: Retrieves the items in the user's wishlist.

#### Add Item to Wishlist
- **URL**: `/wishlist`
- **Method**: `POST`
- **Description**: Adds an item to the user's wishlist.

#### Remove Item from Wishlist
- **URL**: `/wishlist/:itemId`
- **Method**: `DELETE`
- **Description**: Removes an item from the user's wishlist.

---

### 8. **Order Management**

#### Get Order History
- **URL**: `/orders`
- **Method**: `GET`
- **Description**: Retrieves the authenticated user's order history.

#### Create Order
- **URL**: `/orders`
- **Method**: `POST`
- **Description**: Places an order for items in the user's cart.

#### Get Order by ID
- **URL**: `/orders/:orderId`
- **Method**: `GET`
- **Description**: Retrieves details of a specific order by its ID.

---

### 9. **Payment Integration**

#### Create PayPal Order
- **URL**: `/payments/create-paypal-order`
- **Method**: `POST`
- **Description**: Initiates a PayPal payment order.

#### Capture PayPal Payment
- **URL**: `/payments/capture-paypal-payment`
- **Method**: `POST`
- **Description**: Captures a PayPal payment after successful authorization.

---

## License

This project is **not licensed**. All rights are reserved by the owner. You may not use, distribute, or modify this project without explicit permission.

---

## Acknowledgments

This project was developed individually, using the following resources and tools:

- **React.js** – for providing a flexible and efficient framework to build the front end.
- **Node.js** and **Express.js** – for enabling the creation of a powerful backend and API.
- **MongoDB** – for managing the database efficiently.
- **Nodemailer** – for enabling email functionalities such as password resets.
- **PayPal API** – for facilitating secure payment processing.
- **Redux** – for efficient state management in the front end.

Special thanks to the developers of these tools and libraries for making this project possible.
