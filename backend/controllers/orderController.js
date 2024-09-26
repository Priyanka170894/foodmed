import Order from '../models/Order.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import mongoose from 'mongoose';
import Grocery from '../models/Grocery.js'; 




// Create a new order (protected)
export const createOrder = asyncHandler(async (req, res) => {
  const { items, totalAmount, deliveryAddress } = req.body; // Extract delivery address from the request
  const userId = req.user._id; // Get user ID from authenticated token

  // Ensure items and delivery address are provided
  if (!items || items.length === 0 || !deliveryAddress) {
    return res.status(400).json({ message: 'Items and delivery address are required' });
  }

  // Create a new order
  const newOrder = new Order({
    user: userId,
    items,
    totalAmount,
    deliveryAddress, // Store the selected delivery address in the order
    status: 'Pending', // Initial status
  });

  // Save the order to the database
  const savedOrder = await newOrder.save();

  res.status(201).json({
    orderId: savedOrder._id,
    message: 'Order created successfully',
    order: savedOrder,
  });
});

// Example in your getOrderById controller
export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  
  // Check if the orderId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  try {
    // Fetch order by ID and populate grocery details
    const order = await Order.findById(orderId).populate('items.grocery', 'name price image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Server error while fetching order' });
  }
});
// Get order history for a user (protected)
export const getOrderHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from authenticated token

  // Find all orders for the user, sorted by createdAt in descending order
  const orders = await Order.find({ user: userId })
    .populate('items.grocery', 'name price image')
    .sort({ createdAt: -1 }); // Sort by date, descending

  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: 'No orders found' });
  }

  res.json(orders);
});

// Update order status and tracking details (protected)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status, trackingDetails } = req.body;

  // Find the order by ID
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Update the order status and tracking details
  if (status) {
    order.status = status;
  }

  if (trackingDetails) {
    order.trackingDetails = { ...order.trackingDetails, ...trackingDetails };
  }

  order.updatedAt = Date.now();

  await order.save();

  res.json({ message: 'Order status updated successfully', order });
});

// Get all groceries from the orders of a specific user (protected)
export const getOrderedGroceries = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get user ID from authenticated token

  // Find all orders of the user that have been completed
  const orders = await Order.find({ user: userId, status: 'Completed' }).populate('items.grocery');

  if (!orders || orders.length === 0) {
    return res.status(404).json({ message: 'No completed orders found' });
  }

  // Extract groceries from orders
  const orderedGroceries = orders.flatMap(order => order.items.map(item => item.grocery));

  res.json(orderedGroceries);
});

// Post a review for an item in an order
export const postReview = asyncHandler(async (req, res) => {
  const { orderId, groceryId } = req.params;
  const { rating, comment } = req.body;

  // Validate rating
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Find the order by ID
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Find the item in the order matching the groceryId
  const item = order.items.find(i => i.grocery.toString() === groceryId);

  if (!item) {
    return res.status(404).json({ message: 'Grocery item not found in this order' });
  }

  // Check if a review already exists for this item
  if (item.review) {
    return res.status(400).json({ message: 'You have already reviewed this item' });
  }

  // Add the review to the order item
  item.review = { rating, comment };

  await order.save();

  // Update the average rating of the grocery item
  const grocery = await Grocery.findById(groceryId);

  if (!grocery) {
    return res.status(404).json({ message: 'Grocery item not found' });
  }

  // Calculate the new average rating based on all reviews
  const allReviews = await Order.aggregate([
    { $unwind: '$items' },  // Unwind the items array
    { $match: { 'items.grocery': mongoose.Types.ObjectId(groceryId), 'items.review': { $ne: null } } },
    { $group: { _id: null, averageRating: { $avg: '$items.review.rating' } } }
  ]);

  // Update the average rating in the grocery model
  grocery.averageRating = allReviews.length > 0 ? allReviews[0].averageRating : 0;
  await grocery.save();

  res.status(201).json({ message: 'Review submitted successfully' });
});


// Get all reviews for items in a specific order
export const getReviewsForOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  // Find the order by ID and populate grocery details
  const order = await Order.findById(orderId).populate('items.grocery', 'name price image');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Extract reviews from the order
  const reviews = order.items
    .filter(item => item.review)  // Only include items that have a review
    .map(item => ({
      grocery: item.grocery.name,
      rating: item.review.rating,
      comment: item.review.comment,
      reviewDate: item.review.reviewDate,
    }));

  res.json(reviews);
});

// Update a review for an item in an order
export const updateReview = asyncHandler(async (req, res) => {
  const { orderId, groceryId } = req.params;
  const { rating, comment } = req.body;

  // Validate rating
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  // Find the order by ID
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Find the item in the order matching the groceryId
  const item = order.items.find(i => i.grocery.toString() === groceryId);

  if (!item || !item.review) {
    return res.status(404).json({ message: 'Review not found for this item' });
  }

  // Update the review
  item.review.rating = rating;
  item.review.comment = comment;
  item.review.reviewDate = Date.now();

  await order.save();

  // Update the average rating of the grocery item
  const grocery = await Grocery.findById(groceryId);

  // Calculate the new average rating based on all reviews
  const allReviews = await Order.aggregate([
    { $unwind: '$items' },
    { $match: { 'items.grocery': mongoose.Types.ObjectId(groceryId), 'items.review': { $ne: null } } },
    { $group: { _id: null, averageRating: { $avg: '$items.review.rating' } } }
  ]);

  grocery.averageRating = allReviews.length > 0 ? allReviews[0].averageRating : 0;
  await grocery.save();

  res.status(200).json({ message: 'Review updated successfully' });
});
// Delete a review for an item in an order
export const deleteReview = asyncHandler(async (req, res) => {
  const { orderId, groceryId } = req.params;

  // Find the order by ID
  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Find the item in the order matching the groceryId
  const item = order.items.find(i => i.grocery.toString() === groceryId);

  if (!item || !item.review) {
    return res.status(404).json({ message: 'Review not found for this item' });
  }

  // Delete the review
  item.review = undefined;

  await order.save();

  // Update the average rating of the grocery item
  const grocery = await Grocery.findById(groceryId);

  // Calculate the new average rating based on all reviews
  const allReviews = await Order.aggregate([
    { $unwind: '$items' },
    { $match: { 'items.grocery': mongoose.Types.ObjectId(groceryId), 'items.review': { $ne: null } } },
    { $group: { _id: null, averageRating: { $avg: '$items.review.rating' } } }
  ]);

  grocery.averageRating = allReviews.length > 0 ? allReviews[0].averageRating : 0;
  await grocery.save();

  res.status(200).json({ message: 'Review deleted successfully' });
});
