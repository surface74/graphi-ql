import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Storage from '../../utils/Storage/Storage';

const querySlice = createSlice({
  name: 'query',
  initialState: {
    value: Storage.recallRequest() || '',
    headers: Storage.recallHeaders() || '',
    variables: Storage.recallVariables() || '',
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
