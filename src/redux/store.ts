import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import lottieReducer from './lottie/lottieSlice';

/**
 * Root reducer combining all individual reducers.
 */
const rootReducer = combineReducers({
  lottie: lottieReducer,
});

/**
 * Configuration for persisting the Redux store.
 * @type {object}
 * @property {string} key - The key for the persisted state in storage.
 * @property {object} storage - The storage engine to use.
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['lottie'],
};

/**
 * Persisted reducer to enable persistence of the root reducer.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configures and creates the Redux store with persisted reducers.
 * 
 * @returns {object} The configured Redux store.
 */
export const store = configureStore({
  reducer: persistedReducer,
});

/**
 * Persists the store, enabling persistence of the state.
 * 
 * @returns {object} The persistor object.
 */
export const persistor = persistStore(store);

/**
 * Type representing the state of the Redux store.
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**
 * Type representing the dispatch function of the Redux store.
 * @typedef {typeof store.dispatch} AppDispatch
 */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
