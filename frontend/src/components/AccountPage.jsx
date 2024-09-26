import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUserProfile,
  updateUserProfile,
  deleteUser,
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
} from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [showAddressForm, setShowAddressForm] = useState(false); // Show/hide address form
  const [editingAddressId, setEditingAddressId] = useState(null); // Editing existing address

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [addressData, setAddressData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [passwordError, setPasswordError] = useState('');

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Update form data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [user]);

  // Handle profile update
  const handleUpdateProfile = () => {
    setPasswordError('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    dispatch(updateUserProfile(formData));
  };

  // Handle adding or updating an address
  const handleAddOrUpdateAddress = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      dispatch(updateUserAddress({ addressId: editingAddressId, addressData })).then(() => {
        dispatch(fetchUserProfile()); // Refresh profile after updating
        setEditingAddressId(null);
        setShowAddressForm(false);
      });
    } else {
      dispatch(addUserAddress(addressData)).then(() => {
        dispatch(fetchUserProfile()); // Refresh profile after adding
        setShowAddressForm(false);
      });
    }
    // Reset form
    setAddressData({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUser());
  };

  // Populate the form for editing an existing address
  const handleEditAddress = (address) => {
    setEditingAddressId(address._id);
    setAddressData({
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
    setShowAddressForm(true); // Show the form for editing
  };

  const handleDeleteAddress = (addressId) => {
    dispatch(deleteUserAddress(addressId))
      .then(() => {
        dispatch(fetchUserProfile()); // Refetch profile after address is deleted
      })
      .catch((error) => {
        console.error('Failed to delete address:', error);
      });
  };
  

  const toggleAddressForm = () => {
    setShowAddressForm(!showAddressForm);
    setEditingAddressId(null); // Reset form when adding a new address
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="account-page-container">
      <h1 className="page-title">Profile</h1>
      <div className="profile-form">
        <label className="form-label">Full Name:</label>
        <input
          type="text"
          className="form-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />

        <label className="form-label">Email:</label>
        <input
          type="email"
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />

        <label className="form-label">Mobile:</label>
        <input
          type="text"
          className="form-input"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          placeholder="Mobile"
        />

        <label className="form-label">New Password:</label>
        <input
          type="password"
          className="form-input"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="New Password"
        />

        <label className="form-label">Confirm Password:</label>
        <input
          type="password"
          className="form-input"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          placeholder="Confirm Password"
        />

        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        <button onClick={handleUpdateProfile} className="update-button">
          Update Profile
        </button>
      </div>

      <h2 className="address-title">Address Book</h2>
      
      {/* List of existing addresses */}
      {user?.addresses?.map((address) => (
        <div key={address._id} className="address-item">
          <p><strong>Address Line 1:</strong> {address.addressLine1}</p>
    <p><strong>Address Line 2:</strong> {address.addressLine2}</p>
    <p><strong>City:</strong> {address.city}</p>
    <p><strong>State:</strong> {address.state}</p>
    <p><strong>Zip Code:</strong> {address.zipCode}</p>
    <p><strong>Country:</strong> {address.country}</p>
          <button className="edit-address-button" onClick={() => handleEditAddress(address)}>
            Edit Address
          </button>
          <button className="delete-address-button" onClick={() => handleDeleteAddress(address._id)}>
            Delete Address
          </button>
        </div>
      ))}

      {/* Show add/update address form */}
      <button className="toggle-address-form-btn" onClick={toggleAddressForm}>
        {showAddressForm ? 'Cancel' : 'Add New Address'}
      </button>

      {showAddressForm && (
        <form onSubmit={handleAddOrUpdateAddress} className="address-form">
          <label className="form-label">Address Line 1:</label>
          <input
            type="text"
            className="form-input"
            value={addressData.addressLine1}
            onChange={(e) => setAddressData({ ...addressData, addressLine1: e.target.value })}
            placeholder="Address Line 1"
          />

          <label className="form-label">Address Line 2:</label>
          <input
            type="text"
            className="form-input"
            value={addressData.addressLine2}
            onChange={(e) => setAddressData({ ...addressData, addressLine2: e.target.value })}
            placeholder="Address Line 2"
          />

          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-input"
            value={addressData.city}
            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
            placeholder="City"
          />

          <label className="form-label">State:</label>
          <input
            type="text"
            className="form-input"
            value={addressData.state}
            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
            placeholder="State"
          />

          <label className="form-label">Zip Code:</label>
          <input
            type="text"
            className="form-input"
            value={addressData.zipCode}
            onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
            placeholder="Zip Code"
          />

          <label className="form-label">Country:</label>
          <input
            type="text"
            className="form-input"
            value={addressData.country}
            onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
            placeholder="Country"
          />

          <button type="submit" className="add-address-button">
            {editingAddressId ? 'Update Address' : 'Add Address'}
          </button>
        </form>
      )}
      <br></br>
      <button onClick={handleDeleteAccount} className="delete-account-btn">Delete Account</button>
    </div>
  );
};

export default AccountPage;
