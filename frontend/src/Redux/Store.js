import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./Slices/AuthenticationSlice";
import TasksSlice from "./Slices/TasksSlice";

export const store = configureStore({
  reducer: {
    auth: AuthenticationSlice,
    tasks: TasksSlice,
  },
});
