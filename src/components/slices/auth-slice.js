import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const initialState = {
  user: {},
  errorResponse: null,
  isLoading: false,
};

export const authRegister = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.register(userData);

    return response.data;
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
  },
  extraReducers: (builder) => {
    builder.addCase(authRegister.fulfilled, (state, action) => {
      const newState = state;

      newState.user = action.payload;
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
  },
});

const { reducer } = authSlice;

export const { removeError } = authSlice.actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
