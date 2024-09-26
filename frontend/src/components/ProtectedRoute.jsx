// src/components/ProtectedRoute.js
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child components
  return children;
};


ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Validate children prop
  };

export default ProtectedRoute;
