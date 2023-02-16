import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { libraryAPI } from '../../api/api';

const initialState = {
  isMenuActive: false,
  isVisibleCategoryList: false,
  categories: [],
};

export const fetchBooksCategories = createAsyncThunk('categories/fetchByUrl', async () => {
  const data = await libraryAPI.fetchCategories();

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

      newState.categories = action.payload;
    });
  },
});

const { actions, reducer } = navigationSlice;

export const { toggleModeMenu, toggleListCategory } = actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
