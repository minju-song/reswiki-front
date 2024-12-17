// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state) => {
      state.isLoggedIn = true;
    },
    authLogout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
