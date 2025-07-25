import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { API_URLS } from "@constants/urls";
import { JWT_TOKEN_NAME } from "@constants/globals";

const getTokenFromSessionStorage = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(JWT_TOKEN_NAME);
  }
  return null;
};

const setTokenToSessionStorage = (token) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(JWT_TOKEN_NAME, token);
  }
};

const removeTokenFromSessionStorage = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(JWT_TOKEN_NAME);
  }
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const loginCredentials = {
        email: credentials.email,
        password_plain: credentials.password,
      };

      const loginResponse = await axios.post(API_URLS.LOGIN, loginCredentials);

      const token = loginResponse.data.access_token;
      console.log(token); 
      setTokenToSessionStorage(token);

      return { access_token: token };
    } catch (error) {
      removeTokenFromSessionStorage();
      console.error("Login error:", error.response?.data || error.message); 
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getTokenFromSessionStorage(),
    isAuthenticated: !!getTokenFromSessionStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      removeTokenFromSessionStorage();
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logout } = authSlice.actions; 
export default authSlice.reducer;