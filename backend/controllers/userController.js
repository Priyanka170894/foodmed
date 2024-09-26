// controllers/userController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from '../middlewares/asyncHandler.js';



// Create User (Registration)
// Create User (Registration)
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, mobile } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Check if the user already exists by email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists with this email' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    mobile,
  });

  // Save the new user
  const savedUser = await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Send the token in response along with user details
  res.status(201).json({ 
    token, 
    user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } 
  });
});


// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const updatedUser = {};
  if (name) updatedUser.name = name;
  if (email) updatedUser.email = email;
  if (mobile) updatedUser.mobile = mobile;
  if (password) updatedUser.password = await bcrypt.hash(password, 10);

  const user = await User.findByIdAndUpdate(req.user.id, updatedUser, { new: true }).select('-password');
  res.json(user);
});

// Delete User
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); // Admins can delete any user by their ID

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await User.findByIdAndDelete(req.params.id); // Delete user by their ID

  res.json({ message: 'User account deleted successfully' });
});

// Add or Update Address
export const addUserAddress = asyncHandler(async (req, res) => {
  const { addressLine1, addressLine2, city, state, zipCode, country } = req.body;

  const user = await User.findById(req.user.id);
  user.addresses.push({ addressLine1, addressLine2, city, state, zipCode, country });
  await user.save();
  res.json(user.addresses);
});

// Update User Address
export const updateUserAddress = asyncHandler(async (req, res) => {
  const { addressLine1, addressLine2, city, state, zipCode, country } = req.body;
  const { addressId } = req.params;

  // Find the user by their ID from the token (attached by the middleware)
  const user = await User.findByIdAndUpdate(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the address to update
  const address = user.addresses.id(addressId);

  if (!address) {
    return res.status(404).json({ message: 'Address not found' });
  }
else{
  // Update address fields
  address.addressLine1 = addressLine1 || address.addressLine1;
  address.addressLine2 = addressLine2 || address.addressLine2;
  address.city = city || address.city;
  address.state = state || address.state;
  address.zipCode = zipCode || address.zipCode;
  address.country = country || address.country;
}
  await user.save(); // Save the updated user with the new address

  res.json({ message: 'Address updated successfully', addresses: user.addresses });
});




// Delete Address
export const deleteUserAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  user.addresses = user.addresses.filter(address => address._id.toString() !== req.params.addressId);
  await user.save();
  res.json(user.addresses);
});
