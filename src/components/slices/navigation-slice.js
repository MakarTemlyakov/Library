import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuActive: false,
  isVisibleCategoryList: false,
};

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
});

const { actions, reducer } = navigationSlice;

export const { toggleModeMenu, toggleListCategory } = actions;

// eslint-disable-next-line import/no-default-export
export default reducer;
