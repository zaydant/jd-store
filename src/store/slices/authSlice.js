import { createSlice } from '@reduxjs/toolkit';

// Check local storage for existing user and token data
const persistedUser = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
const persistedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  user: persistedUser,
  token: persistedToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // Persist user in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      // Persist token in local storage
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // Remove user and token from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
