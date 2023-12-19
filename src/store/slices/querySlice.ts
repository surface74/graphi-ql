import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
  name: 'query',
  initialState: {
    value: '',
    headers: '',
    variables: '',
  },
  reducers: {
    updateQuery(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    updateHeaders(state, action: PayloadAction<string>) {
      state.headers = action.payload;
    },
    updateVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
  },
});

export const { updateQuery, updateHeaders, updateVariables } =
  querySlice.actions;
export default querySlice.reducer;
