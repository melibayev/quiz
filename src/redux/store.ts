import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authorizationSlice from './authorizationSlice';
import indexCounterSlice from './indexCounterSlice';
import totalScoreSlice from './totalScoreSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthorizationReducer = persistReducer(persistConfig, authorizationSlice);
const persistedIndexCounterReducer = persistReducer(persistConfig, indexCounterSlice);
const persistedTotalScoreReducer = persistReducer(persistConfig, totalScoreSlice);

const store = configureStore({
  reducer: {
    authorizationSetting: persistedAuthorizationReducer,
    counterSlice: persistedIndexCounterReducer,
    totalScoreSlice: persistedTotalScoreReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
