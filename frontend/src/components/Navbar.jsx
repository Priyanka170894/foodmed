import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for user authentication status on initial load
  useEffect(() => {
    checkAuth();

    // Listen for updates to the authentication state (like on login/logout)
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth); // Cleanup event listener on unmount
    };
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('userToken'); // Simplified to check only localStorage
    setIsAuthenticated(!!token); // Set user as authenticated if token exists
  };

  // Fetch diseases from API
  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/diseases/');
        const data = await response.json();
        setDiseases(data);
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };
    fetchDiseases();
  }, []);

  // Filter diseases based on the search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = diseases.filter((disease) =>
        disease.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredDiseases(filtered);
    } else {
      setFilteredDiseases([]);
    }
  }, [searchTerm, diseases]);

  // Handle input change for search
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle disease click to navigate to the selected disease
  const handleDiseaseClick = (diseaseId) => {
    navigate(`/diseases?diseaseId=${diseaseId}`);
    setSearchTerm(''); // Clear the search term after a selection to close the dropdown
  };

  // Handle account, cart, wishlist, orders click
  const handleAccountClick = () => {
    navigate(isAuthenticated ? '/account' : '/login');
  };

  const handleOrdersClick = () => {
    navigate(isAuthenticated ? '/orders' : '/login');
  };

  const handleCartClick = () => {
    navigate(isAuthenticated ? '/cart' : '/login');
  };

  const handleWishlistClick = () => {
    navigate(isAuthenticated ? '/wishlist' : '/login');
  };

  // Handle logout
  const handleLogout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('userToken'); // Remove the token from localStorage
    setIsAuthenticated(false);
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <div className="navbar">
      <div className="navbar-header">
        <h1 className="icon" onClick={() => navigate('/')}>FoodMedin</h1>
      </div>

      {/* Search input */}
      <div ref={searchRef} className="search-wrapper">
        <input
          type="text"
          className="search"
          placeholder="Search your diseases here..."
          value={searchTerm}
          onChange={handleInputChange}
        />

        {/* Dropdown for filtered diseases */}
        {searchTerm && filteredDiseases.length > 0 && (
          <div className="search-dropdown">
            <ul>
              {filteredDiseases.map((disease) => (
                <li key={disease._id} onClick={() => handleDiseaseClick(disease._id)}>
                  {disease.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <nav>
        <ul>
          <li><a className="highlight" href="/">Home</a></li>
          <li><a className="highlight" href="/products">Products</a></li>
          <li><a className="highlight" href="/about">About</a></li>
          <li><a className="highlight" onClick={handleOrdersClick} style={{ cursor: 'pointer' }}>Orders</a></li>

          <li>
            <a className="highlight" onClick={handleAccountClick} style={{ cursor: 'pointer' }}>
              Account
            </a>
          </li>

          {isAuthenticated ? (
            <li>
              <a className="highlight" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </a>
            </li>
          ) : (
            <li>
              <a className="highlight" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                Login
              </a>
            </li>
          )}

          <li>
            <a className="wishlist" onClick={handleWishlistClick} style={{ cursor: 'pointer' }}>
              &#10084;
            </a>
          </li>

          <li>
            <img
              className="cart-icon"
              src="/images/cart.png"
              width="30px"
              height="30px"
              alt="Cart Icon"
              onClick={handleCartClick}
              style={{ cursor: 'pointer' }}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;