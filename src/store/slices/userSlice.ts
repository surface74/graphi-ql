import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../store.types';

const initialState: IUserState = {
  user: {
    email: '',
    token: '',
    id: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState>) {
      const { email, token, id } = action.payload.user;
      state.user.email = email;
      state.user.token = token;
      state.user.id = id;
    },
    removeUser(state) {
      state.user.email = '';
      state.user.token = '';
      state.user.id = '';
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
