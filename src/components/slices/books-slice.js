import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const errorMessage = 'Что-то пошло не так. Обновите страницу через некоторое время.';

const initialState = {
  books: [],
  book: null,
  isError: '',
  isLoading: false,
};

const fetchBooks = createAsyncThunk('categories/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.fetchBooks();

    return response.data;
  } catch (error) {
    return rejectWithValue(errorMessage);
  }
});

const fetchBooksById = createAsyncThunk('categories/fetchBooksById', async (bookId, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.fetchBookById(bookId);

    return response.data;
  } catch (error) {
    return rejectWithValue(errorMessage);
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      const newState = state;

      newState.books = action.payload;
      newState.isLoading = false;
    });

    builder.addCase(fetchBooks.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      const newState = state;

      newState.isError = action.payload;

      newState.isLoading = false;
    });

    builder.addCase(fetchBooksById.fulfilled, (state, action) => {
      const newState = state;

      newState.book = action.payload;

      newState.isLoading = false;
    });

    builder.addCase(fetchBooksById.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(fetchBooksById.rejected, (state, action) => {
      const newState = state;

      newState.isError = action.payload;

      newState.isLoading = false;
    });
  },
});

const { actions, reducer } = booksSlice;

export { reducer as booksReducer, fetchBooks, fetchBooksById, actions };
