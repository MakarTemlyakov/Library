import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const initialState = {
  user: {},
  userToken: null,
  errorResponse: null,
  successResponse: null,
  isLoading: false,
  isAuth: false,
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
    return rejectWithValue(error.response.error);
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

    removeSuccess: (state, action) => {
      const newState = state;

      newState.successResponse = null;
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
      localStorage.setItem('jwt', JSON.stringify(newState.userToken));
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
  },
});

const { reducer } = authSlice;

export const { removeError, removeSuccess } = authSlice.actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
