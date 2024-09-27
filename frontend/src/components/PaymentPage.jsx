import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState(null); // Track the selected payment method
  const [orderSuccess, setOrderSuccess] = useState(false); // Track if the order is successful
  const { orderId } = useParams(); // Extract the order ID from the URL
  const navigate = useNavigate(); // To navigate the user after a successful order

  // Handle selection of payment method
  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  // Function to clear cart items
  const clearCartItems = async () => {
    try {
      const response = await fetch('https://your-heroku-app.herokuapp.com/api/cart/clear', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (response.ok) {
        console.log('Cart cleared successfully');
      } else {
        console.error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Handle order status update
  const updateOrderStatus = async (status) => {
    try {
      const response = await fetch(`https://your-heroku-app.herokuapp.com/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        console.log('Order status updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Order update failed:', errorData);
      }
    } catch (error) {
      console.error('Order update failed', error);
    }
  };

  // Handle Cash on Delivery logic
  const handleCashOnDelivery = async () => {
    try {
      // Update the order status to 'Processing' for Cash on Delivery
      await updateOrderStatus('Processing');

      // Once order is completed, clear the cart
      await clearCartItems();

      // Show success and navigate to home
      setOrderSuccess(true);
      navigate('/'); // Redirect to the home page after success
    } catch (error) {
      console.error('Cash on Delivery failed', error);
    }
  };

  // Handle PayPal Payment logic
  const handlePayPalPayment = async () => {
    try {
      // Create PayPal order (call your server API to create a PayPal order)
      const response = await fetch('https://your-heroku-app.herokuapp.com/api/payments/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({ amount: '100.00', currency: 'USD' }), // Example amount
      });

      const data = await response.json();

      if (response.ok && data.id) {
        // Redirect the user to PayPal for payment approval
        const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
        window.location.href = approvalUrl;
      } else {
        console.error('Failed to create PayPal order:', data);
      }
    } catch (error) {
      console.error('PayPal payment initiation failed', error);
    }
  };

  // Effect to handle any additional event listeners or side effects based on payment method
  useEffect(() => {
    if (paymentMethod === 'PayPal') {
      // Optionally add any PayPal-related event listeners here, if necessary
      console.log('PayPal method selected');
    } else if (paymentMethod === 'CashOnDelivery') {
      console.log('Cash on Delivery method selected');
    }
  }, [paymentMethod]);

  return (
    <div className="payment-page">
      <h1>Select Payment Method</h1>
      <div className="payment-options">
        <button
          onClick={() => handlePaymentSelection('PayPal')}
          className={paymentMethod === 'PayPal' ? 'selected' : ''}
        >
          PayPal
        </button>
        <button
          onClick={() => handlePaymentSelection('CashOnDelivery')}
          className={paymentMethod === 'CashOnDelivery' ? 'selected' : ''}
        >
          Cash on Delivery
        </button>
      </div>

      {paymentMethod === 'PayPal' && (
        <div>
          <h2>PayPal Payment</h2>
          <button onClick={handlePayPalPayment}>Pay Now with PayPal</button>
        </div>
      )}

      {paymentMethod === 'CashOnDelivery' && (
        <div>
          <h2>Cash on Delivery</h2>
          <button onClick={handleCashOnDelivery}>Place Order</button>
        </div>
      )}

      {orderSuccess && (
        <div className="order-success">
          <h2>Order Successful!</h2>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
