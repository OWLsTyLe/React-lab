import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game/slice.ts';
import userReducer from './user/slice.ts';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
