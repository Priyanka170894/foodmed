import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Utility function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// User Registration
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, mobile } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, mobile });

  if (user) {
    const token = generateToken(user._id);

// Send token in response for front-end to store in localStorage
    res.status(201).json({ 
      token, // Send token in the response body
      user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
      message: 'User registered successfully'
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// User Login
export const loginUser = asyncHandler(async (req, res) => {
  const { emailOrPhone, password } = req.body;

  // Find the user by email or phone number
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { mobile: emailOrPhone }],
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);

    // Send token in response for front-end to store in localStorage
    return res.json({
      token, // Send token in the response body
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
      message: 'Login successful',
    });
  } else {
    return res.status(401).json({ message: 'Invalid email/phone or password' });
  }
});

// User Logout
export const logoutUser = (req, res) => {
// No action needed for localStorage token; just send a success message
  res.status(200).json({ message: 'Logout successful' });
};


// Forgot Password Controller
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

// Generate reset token
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });

// Save token to user (you could also hash it if desired for security)
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes from now
  await user.save();

// Send email with reset link
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  console.log('Reset URL:', resetUrl);
  const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Password Reset Request',
    text: message,
  });

  res.status(200).json({ message: 'Email sent. Please check your inbox.' });
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.resetPasswordExpire < Date.now()) {
      return res.status(400).json({ message: 'Token has expired.' });
    }

    // Update the user's password
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};
