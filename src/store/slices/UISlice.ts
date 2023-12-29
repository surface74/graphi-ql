import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UIState } from '../store.types';

const initialState: UIState = {
  docsIsOpen: false,
  isLoadingSchema: false,
};

const UISlice = createSlice({
  name: 'UI',
  initialState,
  reducers: {
    setDocsIsOpen: (state, action: PayloadAction<boolean>) => {
      state.docsIsOpen = action.payload;
    },
    setIsLoadingSchema: (state, action: PayloadAction<boolean>) => {
      state.isLoadingSchema = action.payload;
    },
  },
});

export const { setDocsIsOpen, setIsLoadingSchema } = UISlice.actions;
export default UISlice.reducer;
