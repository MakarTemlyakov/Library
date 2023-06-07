import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import { bookingReducer } from './booking-slice';
import { booksReducer } from './books-slice';
import navigationReducer from './navigation-slice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    auth: authReducer,
    books: booksReducer,
    booking: bookingReducer,
  },
});
