import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist items when the component mounts
  useEffect(() => {
    // Check if the user is authenticated
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      // If not authenticated, redirect to the login page
      navigate('/login');
      return;
    }

    const fetchWishlistItems = async () => {
      try {
        const response = await fetch('https://your-heroku-app.herokuapp.com/api/wishlist/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setWishlistItems(data.items); // Assuming data.items is the array of wishlist items
        } else {
          console.error('Failed to fetch wishlist items');
        }
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
      }
    };

    fetchWishlistItems();
  }, [navigate]);

  // Function to add item to cart
  const handleAddToCart = async (groceryId) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`https://your-heroku-app.herokuapp.com/api/wishlist/move-to-cart/${groceryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        
      });

      if (response.ok) {
        console.log('Item added to cart successfully');
        // Optionally, you can remove it from the wishlist or give a success message
        setWishlistItems((prevItems) => prevItems.filter(item => item.grocery._id !== groceryId));
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Function to remove item from wishlist
  const handleRemoveFromWishlist = async (groceryId) => {
    const token = localStorage.getItem('userToken');
    try {
      const response = await fetch(`https://your-heroku-app.herokuapp.com/api/wishlist/${groceryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the item from wishlistItems in the state
        setWishlistItems((prevItems) => prevItems.filter(item => item._id !== groceryId));
        console.log('Item removed from wishlist');
      } else {
        console.error('Failed to remove item from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className="wishlist-page-container">
      <h1>Your Wishlist</h1>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-items">
          <table className="wishlist-table">
            <thead>
              <tr>
                <th>Sl. No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item, index) => (
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
                  <td className="wishlist-item-name">{item.grocery.name}</td>
                  <td className="wishlist-item-price">${item.grocery.price}</td>
                  <td>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(item._id)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="remove-from-wishlist-button"
                      onClick={() => handleRemoveFromWishlist(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Your wishlist is empty</p>
      )}
    </div>
  );
};

export default WishlistPage;
