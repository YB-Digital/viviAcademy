import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./course/course";
import categoryReducer from "./category/category";

export const store = configureStore({
  reducer: {
    course: courseReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
