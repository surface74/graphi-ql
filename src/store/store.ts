import { configureStore } from '@reduxjs/toolkit';
import userStateReducor from './slices/userSlice';
import UIReducer from './slices/UISlice';
import ApiReducer from './slices/apiSlice';
import QueryReducer from './slices/querySlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rtkqApi } from '../api/rtk-api';

export const store = configureStore({
  reducer: {
    user: userStateReducor,
    UIData: UIReducer,
    ApiData: ApiReducer,
    [rtkqApi.reducerPath]: rtkqApi.reducer,
    querySlice: QueryReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkqApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
