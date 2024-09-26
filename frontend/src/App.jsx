import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import AboutPage from './components/AboutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Optional: If you have a Footer component
import DiseaseDetailPage from './components/DiseaseDetailPage';
import LoginPage from './components/LoginPage';
import CreateAccountPage from './components/CreateAccountPage'; 
import AccountPage from './components/AccountPage'; // Import AccountPage component
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ForgotPasswordPage from './components/ForgotPasswordPage.jsx';
import ResetPasswordPage from './components/ResetPasswordPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import PaymentPage from './components/PaymentPage.jsx';
import OrderPage from './components/OrderPage.jsx';
import ReviewPage from './components/ReviewPage.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';



function App() {


  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        {/* Navbar remains visible across all routes */}
        <Navbar />

        {/* Define routes for different pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/diseases" element={<DiseaseDetailPage />} /> {/* Route for disease details */}
          <Route path="/about" element={<AboutPage />} />

          <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      
        <Route path="/account" element={<AccountPage />} />
           
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
          {/* Add other routes here if needed */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment/:orderId" element={<PaymentPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/order/:orderId/grocery/:groceryId/review" element={<ReviewPage />} />
        </Routes>

        {/* Optional: Footer */}
        <Footer />
      </div>
    </Router>
    </Provider>
  );
}

export default App;

