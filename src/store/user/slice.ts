import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from './types';

const initialState: UserState = {
  username: '',
  age: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.username = action.payload.username;
      state.age = action.payload.age;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
