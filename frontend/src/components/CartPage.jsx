import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      // If not authenticated, redirect to the login page
      navigate('/login');
      return;
    }

    // Fetch cart items when the component mounts
    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://your-heroku-app.herokuapp.com/api', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Ensure the token is passed here
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items); // Assuming data.items is an array of cart items
          calculateTotalPrice(data.items); // Calculate total price after fetching items
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [navigate]);

  // Function to calculate total price of cart items
  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.grocery.price * item.quantity, 0);
    setTotalPrice(total);
  };


  const handleRemoveFromCart = async (itemId) => {
    const userToken = localStorage.getItem('userToken');
    try {
      const response = await fetch(`https://your-heroku-app.herokuapp.com/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the item from cartItems in the state
        const updatedCartItems = cartItems.filter(
          (item) => item._id !== itemId
        );
        setCartItems(updatedCartItems);
        calculateTotalPrice(updatedCartItems); // Recalculate total price
      } else {
        const errorData = await response.json();
        console.error('Failed to remove item from cart:', errorData.message);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="cart-items">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.grocery._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.grocery.image}
                      alt={item.grocery.name}
                      width="50"
                      height="50"
                    />
                  </td>
                  <td className="cart-item-name">{item.grocery.name}</td>
                  <td className=" cart-item-price">${item.grocery.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.grocery.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="remove-item-button"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h2 className="cart-total">Total Price: ${totalPrice.toFixed(2)}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
