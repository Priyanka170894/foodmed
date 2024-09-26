import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      const userToken = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setAddresses(data.addresses);
    };

    const fetchCartItems = async () => {
      const userToken = localStorage.getItem('userToken');
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      setCartItems(data.items);
      setTotalPrice(data.items.reduce((acc, item) => acc + item.grocery.price * item.quantity, 0));
    };

    fetchAddresses();
    fetchCartItems();
  }, []);

  // Handle order creation
  const handlePlaceOrder = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!selectedAddress) {
      alert('Please select a delivery address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            grocery: item.grocery._id,
            quantity: item.quantity,
          })),
          totalAmount: totalPrice,
          deliveryAddress: selectedAddress,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to the payment page with the newly placed order ID
        navigate(`/payment/${data.order._id}`);
      } else {
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-page">
        <h1>Checkout</h1>

        {/* Display Cart Items First */}
        <h2>Cart Items:</h2>
        <div className="checkoutcart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="checkoutcart-item">
              <img 
                src={item.grocery.image} 
                alt={item.grocery.name} 
                className="checkoutcart-item-image"
              />
              <div className="checkoutcart-item-details">
                <p><strong>{item.grocery.name}</strong></p>
                <p>Price: ${item.grocery.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

      

        {/* Display Address Section */}
        <h2>Select Delivery Address:</h2>
        <div className="checkout-details">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`checkoutaddress-option ${selectedAddress === address ? 'selected' : ''}`}
              onClick={() => setSelectedAddress(address)}
            >
              <h3 className="addressheading">{`Address ${index + 1}`}</h3>
              <div className="checkoutaddress-row">
                <label>Address Line 1: </label>
                <span>{address.addressLine1}</span>
              </div>
              <div className="checkoutaddress-row">
                <label>Address Line 2: </label>
                <span>{address.addressLine2}</span>
              </div>
              <div className="checkoutaddress-row">
                <label>City: </label>
                <span>{address.city}</span>
              </div>
              <div className="checkoutaddress-row">
                <label>State: </label>
                <span>{address.state}</span>
              </div>
              <div className="checkoutaddress-row">
                <label>Zip Code: </label>
                <span>{address.zipCode}</span>
              </div>
              <div className="checkoutaddress-row">
                <label>Country: </label>
                <span>{address.country}</span>
              </div>
            </div>
          ))}
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        </div>

        <button onClick={handlePlaceOrder} className='checkoutbtn'>Place Order</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
