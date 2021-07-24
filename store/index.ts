import { configureStore } from "@reduxjs/toolkit";
import app from "./slices/app";

export const store = configureStore({
  reducer: {
    app,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { ignoredPaths: ["some.nested.path"] },
      serializableCheck: { ignoredPaths: ["some.nested.path"] },
    }),
});
