import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApiState } from '../store.types';

const initialState: ApiState = {
  baseUrl: '',
  errorMessage: '',
};

const ApiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setBaseUrl: (state, action: PayloadAction<string>) => {
      state.baseUrl = action.payload;
    },
  },
});

export const { setBaseUrl } = ApiSlice.actions;
export default ApiSlice.reducer;
