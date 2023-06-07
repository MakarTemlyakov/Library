import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const errorMessage = 'Что-то пошло не так. Обновите страницу через некоторое время.';

const initialState = {
  order: {
    order: false,
    dateOrder: null,
    book: 0,
    customer: 0,
  },
  isError: '',
};

const createBooking = createAsyncThunk('booking/createBooking', async (bookingData, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.bookingBook(bookingData);

    return response.data;
  } catch (error) {
    return rejectWithValue(errorMessage);
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createBooking.fulfilled, (state, action) => {
      const newState = state;

      newState.isLoading = false;
    });

    builder.addCase(createBooking.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(createBooking.rejected, (state, action) => {
      const newState = state;

      newState.isError = action.payload;
      newState.isLoading = false;
    });
  },
});

const { reducer } = bookingSlice;

export { reducer as bookingReducer, createBooking };
