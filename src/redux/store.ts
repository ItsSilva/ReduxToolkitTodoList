import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import toDoSlice from "./slices/toDoSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    toDo: toDoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;