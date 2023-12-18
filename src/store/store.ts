import { configureStore } from '@reduxjs/toolkit';
import userStateReducor from './slices/userSlice';
import UIReducer from './slices/UISlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    user: userStateReducor,
    UIData: UIReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
