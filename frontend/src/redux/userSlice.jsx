import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to get the token from localStorage
const getToken = () => localStorage.getItem('userToken');

// Async action to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken(); // Get token from localStorage
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.get('https://your-heroku-app.herokuapp.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.put('https://your-heroku-app.herokuapp.com/api/users/profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to delete user
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.delete('https://your-heroku-app.herokuapp.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to add/update user address
export const addUserAddress = createAsyncThunk(
  'user/addUserAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.post('https://your-heroku-app.herokuapp.com/api/users/address', addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'An error occurred while adding the address');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  'user/updateUserAddress',
  async ({ addressId, addressData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.patch(
        `https://your-heroku-app.herokuapp.com/api/users/address/${addressId}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to update address');
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Async action to delete a specific address
export const deleteUserAddress = createAsyncThunk(
  'user/deleteUserAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await axios.delete(`https://your-heroku-app.herokuapp.com/api/users/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null; // Clear user on logout
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    // Fetch user profile
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add or update address
    builder.addCase(addUserAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.user.addresses = [...state.user.addresses, action.payload];
    });
    builder.addCase(addUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update user address
    builder.addCase(updateUserAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      const updatedAddresses = state.user.addresses.map((address) =>
        address._id === action.payload._id ? action.payload : address
      );
      state.user.addresses = updatedAddresses;
    });
    builder.addCase(updateUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete address
    builder.addCase(deleteUserAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.user.addresses = state.user.addresses.filter(
        (address) => address._id !== action.payload._id
      );
    });
    builder.addCase(deleteUserAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
