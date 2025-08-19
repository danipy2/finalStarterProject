// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { bookmarkApi } from "./services/bookmarkApi";
import {getJobApi} from "./services/getJobs"
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    [getJobApi.reducerPath] : getJobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(bookmarkApi.middleware)
    .concat(getJobApi.middleware),
    

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
