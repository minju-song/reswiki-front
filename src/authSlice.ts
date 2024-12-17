// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_KEYS } from "./constants";

interface AuthState {
  isLoggedIn: boolean;
}

const getInitialLoginState = (): boolean => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  const memberId = localStorage.getItem(LOCAL_STORAGE_KEYS.MEMBER_ID);
  if (token && memberId) {
    return true;
  } else return false;
};

const initialState: AuthState = {
  isLoggedIn: getInitialLoginState(),
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
