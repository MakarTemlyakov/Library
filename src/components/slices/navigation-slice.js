import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const initialState = {
  isMenuActive: false,
  isVisibleCategoryList: false,
  categories: [],
  books: [],
  book: null,
  isLoading: false,
  isError: false,
};

export const fetchBooksCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const data = await libraryAPI.fetchCategories();

  return data;
});

export const fetchBooks = createAsyncThunk('categories/fetchBooks', async () => {
  const data = await libraryAPI.fetchBooks();

  return data;
});

export const fetchBooksById = createAsyncThunk('categories/fetchBooksById', async (bookId) => {
  const data = await libraryAPI.fetchBookById(bookId);

  return data;
});

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,

  reducers: {
    toggleModeMenu: (state, action) => {
      const newState = state;

      newState.isMenuActive = action.payload;
    },
    toggleListCategory: (state, action) => {
      const newState = state;

      newState.isVisibleCategoryList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooksCategories.fulfilled, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.categories = action.payload;
    });

    builder.addCase(fetchBooksCategories.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(fetchBooksCategories.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.isError = true;
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.books = action.payload;
    });

    builder.addCase(fetchBooks.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.isError = true;
    });

    builder.addCase(fetchBooksById.fulfilled, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.book = action.payload;
    });

    builder.addCase(fetchBooksById.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(fetchBooksById.rejected, (state, action) => {
      const newState = state;

      newState.isLoading = false;
      newState.isError = true;
    });
  },
});

const { actions, reducer } = navigationSlice;

export const { toggleModeMenu, toggleListCategory } = actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
