import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../redux/user/userSlice';
// ... import other reducers as needed

// Combine your reducers into a single rootReducer
const rootReducer = combineReducers({
  user: userReducer,
  // ... add other reducers here
});

// Configure the persist options
const persistConfig = {
  key: 'root',
  storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor };
