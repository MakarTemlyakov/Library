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
  isError: '',
};

export const fetchBooksCategories = createAsyncThunk('categories/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await libraryAPI.fetchCategories();

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

      newState.categories = [
        {
          name: 'Все книги',
          path: 'all',
          id: 0,
          booksCount: action.payload.reduce((count, category) => count + category.booksCount, 0),
        },
        ...action.payload,
      ];

      newState.isLoading = false;
    });

    builder.addCase(fetchBooksCategories.pending, (state, action) => {
      const newState = state;

      newState.isLoading = true;
    });

    builder.addCase(fetchBooksCategories.rejected, (state, action) => {
      const newState = state;

      newState.isError = action.payload;
      newState.isLoading = false;
    });
  },
});

const { actions, reducer } = navigationSlice;

export const { toggleModeMenu, toggleListCategory } = actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
