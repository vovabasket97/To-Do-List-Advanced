import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat()
  // devTools: process.env.NODE_ENV !== 'production',
});

export type TypeRootState = ReturnType<typeof store.getState>;
