import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../store.types';

const initialState: IUserState = {
  user: {
    email: '',
    id: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUserState(state, action: PayloadAction<IUserState>) {
      const { email, id } = action.payload.user;
      state.user.email = email;
      state.user.id = id;
    },
    clearUserState(state) {
      state.user.email = '';
      state.user.id = '';
    },
  },
});

export const { storeUserState, clearUserState } = userSlice.actions;
export default userSlice.reducer;
