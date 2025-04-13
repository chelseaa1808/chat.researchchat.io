import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer, { setKey, logout } from "./slices/authSlice";
import { chatApi } from "./apis/chatApi";
import { authApi } from "./apis/authApi";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

// Persist config
const persistConfig = {
  key: "chattr",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Optional: CSRF token helper (if needed)
const getCsrfToken = () => {
  const name = "csrftoken";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return null;
};

// Store instance
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(chatApi.middleware)
      .concat(authApi.middleware)
      .concat((store) => (next) => (action) => {
        if (
          action.type.endsWith("/rejected") &&
          action.error?.message?.includes("403")
        ) {
          const csrfToken = getCsrfToken();
          if (csrfToken && action.meta?.request) {
            const headers = action.meta.request.headers || {};
            headers["X-CSRFToken"] = csrfToken;
            return next(store.dispatch(action.meta.request));
          }
        }
        return next(action);
      }),
});

setupListeners(store.dispatch);

// Persistor
export const persistor = persistStore(store);

// Re-exports
export { setKey, logout } from "./slices/authSlice";
export * from "./apis/chatApi";
export * from "./apis/authApi";

// 🔁 Types for useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
