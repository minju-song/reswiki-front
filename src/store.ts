// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // 리듀서를 가져옵니다.

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState 타입 정의
export type AppDispatch = typeof store.dispatch; // AppDispatch 타입 정의

export default store;
