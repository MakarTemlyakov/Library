import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const initialState = {
  user: {},
  userToken: null,
  errorResponse: null,
  successResponse: null,
  isLoading: false,
  isAuth: false,
  isSuccess: false,
};

export const authRegister = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.register(userData);

    return {
      userData: response.data,
      status: response.status,
    };
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

export const signIn = createAsyncThunk('auth/signIn', async (userData, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.signIn(userData);

    return {
      userData: response.data,
      status: response.status,
    };
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.forgotPassword(email);

    return {
      success: response.data,
    };
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (credentials, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.resetPassword(credentials);

    return {
      successStatus: response.status,
    };
  } catch (error) {
    return rejectWithValue(error.response.data.error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    removeError: (state, action) => {
      const newState = state;

      newState.errorResponse = null;
    },

    initUser: (state, action) => {
      const newState = state;

      newState.user = JSON.parse(localStorage.getItem('user'));
    },

    removeSuccess: (state, action) => {
      const newState = state;

      newState.successResponse = null;
    },

    logout: (state, action) => {
      const newState = state;

      newState.user = null;
      localStorage.removeItem('jwt');
      newState.isAuth = false;
      newState.userToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authRegister.fulfilled, (state, action) => {
      const newState = state;

      newState.user = action.payload.userData;
      newState.successResponse = action.payload.status;

      newState.isLoading = false;
    });

    builder.addCase(authRegister.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(authRegister.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.errorResponse = action.payload;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      const newState = state;

      newState.successResponse = action.payload.status;
      newState.user = { ...action.payload.userData.user };
      newState.userToken = action.payload.userData.jwt;

      newState.isAuth = true;
      localStorage.setItem('user', JSON.stringify(newState.user));

      localStorage.setItem('jwt', newState.userToken);
      newState.isLoading = false;
    });

    builder.addCase(signIn.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(signIn.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.errorResponse = action.payload;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      const newState = state;

      newState.isSuccess = action.payload.success;

      newState.isLoading = false;
    });

    builder.addCase(forgotPassword.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(forgotPassword.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.errorResponse = action.payload;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      const newState = state;

      newState.successResponse = { ...newState.successResponse, status: action.payload.successStatus };
      newState.isLoading = false;
    });

    builder.addCase(resetPassword.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.errorResponse = action.payload;
    });
  },
});

const { reducer } = authSlice;

export const { removeError, removeSuccess, logout, initUser } = authSlice.actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
