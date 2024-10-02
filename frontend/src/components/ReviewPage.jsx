import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewPage = () => {
  const { orderId } = useParams(); // Fetch orderId from the URL parameters
  const [order, setOrder] = useState(null); // Store order details and items
  const [error, setError] = useState(null); // Error state for handling any issues
  const [loading, setLoading] = useState(true); // Loading state during fetch operations
  const [reviewData, setReviewData] = useState({}); // Store review data for each item
  const [success, setSuccess] = useState(null); // Success state for submission
  const navigate = useNavigate(); // Navigation hook to redirect

  // Fetch the order details and initialize review data
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`https://secret-temple-94612-64e66da72cb4.herokuapp.com/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Ensure user is authenticated
        },
      });

      const data = await response.json();
      if (response.ok) {
        setOrder(data); // Set the order details
        // Initialize review data with empty rating and comment for each item
        const initialReviewData = {};
        data.items.forEach((item) => {
          // Default rating and comment to empty string if undefined
          initialReviewData[item._id] = { rating: '', comment: '' };
        });
        setReviewData(initialReviewData); // Set initial review data for each item
      } else {
        setError(data.message || 'Failed to fetch order details.'); // Set error if the request fails
      }
    } catch (error) {
      setError('An error occurred while fetching order details: ' + error.message); // Catch network or server errors
    } finally {
      setLoading(false); // Loading is done regardless of success or failure
    }
  };

  // Trigger data fetching when the component first renders
  // This replaces useEffect
  (async () => {
    await fetchOrderDetails();
  })();

  // Handle input changes for rating and comment fields
  const handleInputChange = (itemId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  // Submit the reviews for all items in the order
  const submitReviews = async () => {
    const reviews = Object.keys(reviewData).map((itemId) => ({
      groceryId: itemId,
      rating: reviewData[itemId].rating,
      comment: reviewData[itemId].comment,
      orderId,
    }));

    try {
      const response = await fetch(`https://secret-temple-94612-64e66da72cb4.herokuapp.com/api/orders/${orderId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`, // Auth header for request
        },
        body: JSON.stringify({ reviews }), // Submit the reviews as a JSON payload
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Reviews submitted successfully.'); // Show success message
        setTimeout(() => {
          navigate('/orders'); // Redirect to the orders page after success
        }, 2000);
      } else {
        setError(data.message || 'Failed to submit reviews.'); // Set error if submission fails
      }
    } catch (error) {
      setError('An error occurred while submitting the reviews: ' + error.message); // Catch network or server errors
    }
  };

  // Ensure that loading and error states are handled properly
  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>; // Display the error if present

  return (
    <div>
      <h2>Write a Review for Order #{orderId}</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}

      {order && order.items.length > 0 ? (
        <div>
          {order.items.map((item) => (
            <div key={item._id} className="review-item">
              <h4>{item.grocery.name}</h4>
              <p>Price: ${item.grocery.price}</p>

              {/* Input for rating */}
              <label>
                Rating (1-5):
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={reviewData[item._id]?.rating || ''} // Safe access with fallback
                  onChange={(e) => handleInputChange(item._id, 'rating', e.target.value)}
                />
              </label>
              <br />

              {/* Input for comment */}
              <label>
                Comment:
                <textarea
                  value={reviewData[item._id]?.comment || ''} // Safe access with fallback
                  onChange={(e) => handleInputChange(item._id, 'comment', e.target.value)}
                />
              </label>
              <br />
            </div>
          ))}
          {/* Button to submit reviews */}
          <button onClick={submitReviews}>Submit Reviews</button>
        </div>
      ) : (
        <p>No items found in this order.</p>
      )}
    </div>
  );
};

export default ReviewPage;
