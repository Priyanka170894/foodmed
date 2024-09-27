import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';



const LoginPage = () => {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://secret-temple-94612-64e66da72cb4.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone: emailOrMobile, password }),
        credentials:'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const { token } = data; // Token from the response

        console.log(token);
  
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        // Store token in localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('tokenExpiry', expirationTime);
   
        console.log('Login successful. Token expires at:', new Date(expirationTime));
        
        // Set login state
        localStorage.setItem('isAuthenticated', 'true');
  
        // Trigger a storage event so that other parts of the app are updated
        window.dispatchEvent(new Event('storage'));
  
        // Navigate to account page
        navigate('/');
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  const handleCreateAccount = () => {
    navigate('/create-account');
  };
  const handleLogout = useCallback(() => {
    // Clear token and user state from localStorage
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('isAuthenticated');
    localStorage.setItem('sessionExpired', 'true');
  
    // Redirect to the login page or home
    navigate('/login');
  }, [navigate]);
  const checkTokenExpiration =  useCallback(() => {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
  
    if (tokenExpiry && new Date().getTime() > tokenExpiry) {
      // Token has expired
      console.log('Token has expired. Logging out.');
      handleLogout();
    }
  }, [handleLogout]);;

  

  // Check for session expiration on load
  useEffect(() => {
    if (localStorage.getItem('sessionExpired') === 'true') {
      alert('Session expired, please login again.');
      localStorage.removeItem('sessionExpired'); // Clear the flag after showing the message
    }
  }, []); // Only run once when component mounts

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 10000); // Check every 10 seconds
  
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [checkTokenExpiration]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login'); // Redirect to login if no token
    } else {
      checkTokenExpiration(); // Check if token has expired
    }
  }, [checkTokenExpiration,navigate]);



  return (
    <div className="login-page">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="emailOrPhone" className="form-label">Email or Phone:</label>
          <input
            type="text"
            id="emailOrPhone"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            placeholder="Enter your email or phone"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="forgot-password-text">
  <a href="/forgot-password">Forgot your password?</a>
</p>
      <p className="signup-text">Dont have an account?</p>
      <button onClick={handleCreateAccount} className="create-account-button">Create Account</button>
    </div>
  );
};

export default LoginPage;