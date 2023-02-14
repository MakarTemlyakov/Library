import { configureStore } from '@reduxjs/toolkit';

import navigationReducer from './navigation-slice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});
