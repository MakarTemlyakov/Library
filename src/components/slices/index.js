import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import navigationReducer from './navigation-slice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    auth: authReducer,
  },
});
