import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DiseaseDetailPage = () => {
  const location = useLocation();
  const [disease, setDisease] = useState(null);
  const [quantities, setQuantities] = useState({}); // Store customized quantities
  const [message, setMessage] = useState(''); // Store success message
  const [messageType, setMessageType] = useState(''); // Track whether it's for cart or wishlist

  // Extract diseaseId from query params
  const queryParams = new URLSearchParams(location.search);
  const diseaseId = queryParams.get('diseaseId'); // Get diseaseId from query

  useEffect(() => {
    const fetchDiseaseDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/diseases/${diseaseId}`);
        const data = await response.json();
        setDisease(data);

        // Initialize quantities with a default value of 1
        const initialQuantities = {};
        data.groceries.forEach((grocery) => {
          initialQuantities[grocery._id] = 1; // Set default value to 1
        });
        setQuantities(initialQuantities); // Initialize the quantities for each grocery item
      } catch (error) {
        console.error('Error fetching disease details:', error);
      }
    };

    if (diseaseId) {
      fetchDiseaseDetail();
    }
  }, [diseaseId]);

  const handleAddSingleItemToCart = async (grocery) => {
    console.log(grocery);
    const token = localStorage.getItem('userToken'); // Assuming the token is saved as 'token'
  
    if (!token) {
      console.error("User is not authenticated. No token found.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use retrieved userToken here
        },
        body: JSON.stringify({
          groceryId: grocery._id,
          quantity: quantities[grocery._id] || 1, // Default to 1 if no quantity selected
          diseaseName: disease.name,
        }),
      });
  
      if (response.ok) {
        const cartData = await response.json();
        console.log('Grocery added to cart:', cartData);
        setMessage(`Added ${grocery.name} to cart`);
        setMessageType('cart');
        // Reset message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        console.error('Failed to add grocery to cart:', errorData.message);
      }
    } catch (error) {
      console.error('Error adding grocery to cart:', error);
    }
  };
  
  const handleAddSingleItemToWishlist = async (grocery) => {
    console.log(grocery);
    const token = localStorage.getItem('userToken'); // Assuming the token is saved as 'token'
  
    if (!token) {
      console.error("User is not authenticated. No token found.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/wishlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use retrieved userToken here
        },
        body: JSON.stringify({
          groceryId: grocery._id,
          quantity: quantities[grocery._id] || 1, // Default to 1 if no quantity selected
          diseaseName: disease.name,
        }),
      });
  
      if (response.ok) {
        const wishlistData = await response.json();
        console.log('Grocery added to wishlist:', wishlistData);
        setMessage(`Added ${grocery.name} to wishlist`);
        setMessageType('wishlist');
        // Reset message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        console.error('Failed to add grocery to wishlist:', errorData.message);
      }
    } catch (error) {
      console.error('Error adding grocery to wishlist:', error);
    }
  };

  if (!disease) {
    return <p>Loading disease details...</p>;
  }

  return (
    <div>
      <h1 className="heading1">{disease.name}</h1>
      <p className="description1">{disease.description}</p>

      <h2 className="heading2">Recommended Groceries</h2>

      {/* Display the success message */}
      {message && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
        </div>
      )}

      <div className="groceries-container">
        {disease.groceries.map((grocery) => (
          <div key={grocery._id} className="grocery-card">
            <div className="grocery-card-header">
              <img src={grocery.image} alt={grocery.name} />
            </div>

            <div className="grocery-card-body">
              <h3>{grocery.name}</h3>
              <p>{grocery.description}</p>
              <p><strong>Price:</strong> ${grocery.price}</p>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [grocery._id]: Math.max(1, prev[grocery._id] - 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{quantities[grocery._id]}</span>
                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [grocery._id]: prev[grocery._id] + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="grocery-card-footer">
              <div className="view">
                <button className="add-to-cart-btn" onClick={() => handleAddSingleItemToCart(grocery)}>
                  Add to Cart
                </button>
                <button className="add-to-cart-btn" onClick={() => handleAddSingleItemToWishlist(grocery)}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiseaseDetailPage;
