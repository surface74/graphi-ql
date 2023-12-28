import { createSlice } from '@reduxjs/toolkit';
import { ApiState } from '../store.types';

const initialState: ApiState = {
  baseUrl: '',
  errorMessage: '',
};

const ApiSlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setBaseUrl: (state, action) => {
      state.baseUrl = action.payload;
    },
    setApiErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setBaseUrl, setApiErrorMessage } = ApiSlice.actions;
export default ApiSlice.reducer;
