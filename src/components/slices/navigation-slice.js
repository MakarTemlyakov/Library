import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const errorMessage = 'Что-то пошло не так. Обновите страницу через некоторое время.';

const initialState = {
  isMenuActive: false,
  isVisibleCategoryList: false,
  categories: [],
  books: [],
  book: null,
  isLoading: false,
  isError: ' ',
};

export const fetchBooksCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.fetchCategories();

    return response.data;
  } catch (error) {
    return rejectWithValue(errorMessage);
  }
});

export const fetchBooks = createAsyncThunk('categories/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.fetchBooks();

    return response.data;
  } catch (error) {
    return rejectWithValue(errorMessage);
  }
});

export const fetchBooksById = createAsyncThunk('categories/fetchBooksById', async (bookId, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.fetchBookById(bookId);

    return response.data;
  } catch (error) {
    return rejectWithValue(errorMessage);
  }
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
      newState.isError = action.payload;
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
      newState.isError = action.payload;
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
      newState.isError = action.payload;
    });
  },
});

const { actions, reducer } = navigationSlice;

export const { toggleModeMenu, toggleListCategory } = actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
