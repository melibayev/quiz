import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authorizationSlice from './authorizationSlice';
import indexCounterSlice from './indexCounterSlice';
import totalScoreSlice from './totalScoreSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['counterSlice', 'totalScoreSlice']
};

const persistedReducer = persistReducer(persistConfig, authorizationSlice);

const store = configureStore({
  reducer: {
    authorizationSetting: persistedReducer,
    counterSlice: indexCounterSlice,
    totalScoreSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
