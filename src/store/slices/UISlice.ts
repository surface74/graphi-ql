import { createSlice } from '@reduxjs/toolkit';
import { UIState } from '../store.types';

const initialState: UIState = {
  docsIsOpen: false,
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setDocsIsOpen: (state, action) => {
      state.docsIsOpen = action.payload;
    },
  },
});

export const { setDocsIsOpen } = UISlice.actions;
export default UISlice.reducer;
