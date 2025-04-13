import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  username: string;
  email: string;
  // Add more fields if needed from your /user/ endpoint
}

interface AuthState {
  key: string | null;
  lastLogin: string | null;
  user: UserInfo | null;
}

const initialState: AuthState = {
  key: null,
  lastLogin: null,
  user: null, // Now valid
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setKey: (
      state,
      action: PayloadAction<{ key: string; timestamp?: string }>
    ) => {
      state.key = action.payload.key;
      state.lastLogin = action.payload.timestamp || new Date().toISOString();
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout: () => initialState,
  },
});

export const { setKey, setUser, logout } = authSlice.actions;
export default authSlice.reducer;

