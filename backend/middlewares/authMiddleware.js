import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// Middleware to authenticate token from Authorization header
export const authenticateToken = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the Authorization header contains the Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from the Authorization header
    token = req.headers.authorization.split(' ')[1];

    // If token is missing, return an error early
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
      // Decode the token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Debugging: Log token content in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Decoded JWT Token:', decoded);
      }

      // Fetch user from the database and attach it to the request object
      req.user = await User.findById(decoded.id).select('-password');

      // Check if the user exists
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      // Handle JWT verification errors explicitly
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired, please log in again' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token, please log in again' });
      }

      // Log detailed error for debugging in development mode
      if (process.env.NODE_ENV === 'development') {
        console.error('JWT verification error:', error);
      }

      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    // If no authorization header is present, return unauthorized response
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
});
