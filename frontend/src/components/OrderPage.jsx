import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const basePath = import.meta.env.VITE_BASEPATH ?? "";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [trackingInfo, setTrackingInfo] = useState({}); // Store tracking info for individual orders
  const [isTracking, setIsTracking] = useState({}); // Track loading status for individual orders
  const [loading, setLoading] = useState(true); // Track loading state for fetching orders
  const [trackingVisibility, setTrackingVisibility] = useState({}); // Track visibility of tracking info for each order
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${basePath}/api/orders/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`, // User token for authentication
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOrders(data);
        } else {
          if (response.status === 401) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('tokenExpiry');
            localStorage.removeItem('isAuthenticated');
            localStorage.setItem('sessionExpired', 'true');
            navigate('/login');
          }
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchOrders(); // Call the fetchOrders function
  }, [navigate]);

  // Track order status for individual orders
  const trackOrder = async (orderId) => {
    // Toggle the visibility of tracking info
    setTrackingVisibility((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));

    // If tracking info is already visible, do not re-fetch it
    if (trackingVisibility[orderId]) {
      return;
    }

    setIsTracking((prev) => ({ ...prev, [orderId]: true })); // Set tracking as loading

    try {
      const response = await fetch(`${basePath}/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setTrackingInfo((prev) => ({ ...prev, [orderId]: data }));
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Failed to track order');
    } finally {
      setIsTracking((prev) => ({ ...prev, [orderId]: false })); // Stop tracking loading
    }
  };

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  return (
    <div className="order-page-container">
      <div className="order-page">
        <h2 className="order-page__header">Your Orders</h2>
        {error && <p className="order-page__error">{error}</p>}

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <h3 className="order-card__title">Order #{order._id}</h3>
              <p className="order-card__status">Status: {order.status}</p>
              <p className="order-card__total">Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <p className="order-card__date">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <h4 className="order-card__items-title">Items:</h4>
              <ul className="order-card__items-list">
                {order.items.map((item) => (
                  <li key={item._id} className="order-card__item">
                    <p className="order-card__item-name">{item.grocery.name}</p>
                    <p className="order-card__item-price">Price: ${item.grocery.price}</p>
                  </li>
                ))}
              </ul>

              {/* Track Order Button */}
              <button className="order-card__track-button" onClick={() => trackOrder(order._id)}>
                {isTracking[order._id] ? 'Tracking...' : trackingVisibility[order._id] ? 'Hide Tracking' : 'Track Order'}
              </button>

              {/* Display tracking information if available and visible */}
              {trackingVisibility[order._id] && trackingInfo[order._id] && trackingInfo[order._id].trackingDetails && (
                <div className="order-card__tracking-info">
                  <h4 className="order-card__tracking-title">Tracking Details:</h4>
                  <p className="order-card__tracking-status">
                    Status: {trackingInfo[order._id].trackingDetails.status || 'Not Available'}
                  </p>
                  <p className="order-card__tracking-carrier">
                    Carrier: {trackingInfo[order._id].trackingDetails.carrier || 'Not Available'}
                  </p>
                  <p className="order-card__tracking-number">
                    Tracking Number: {trackingInfo[order._id].trackingDetails.trackingNumber || 'Not Available'}
                  </p>
                  <p className="order-card__tracking-location">
                    Current Location: {trackingInfo[order._id].trackingDetails.currentLocation || 'Not Available'}
                  </p>
                  <p className="order-card__tracking-estimated-delivery">
                    Estimated Delivery: {trackingInfo[order._id].trackingDetails.estimatedDelivery
                      ? new Date(trackingInfo[order._id].trackingDetails.estimatedDelivery).toLocaleDateString()
                      : 'Not Available'}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="order-page__no-orders">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
