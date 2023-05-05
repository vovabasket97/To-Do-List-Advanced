import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducers';

const saveSubsetFilter = createBlacklistFilter('todo', ['drawer']);

const persistConfig = {
  key: 'root',
  storage,
  transforms: [saveSubsetFilter]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export type TypeRootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
