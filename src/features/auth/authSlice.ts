import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export enum AuthNav {
  Login,
  Register,
}

export interface AuthState {
  username: string;
  password: string;
  repeatPassword: string;
  authNav: AuthNav;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: AuthState = {
  username: "",
  password: "",
  repeatPassword: "",
  authNav: AuthNav.Login,
  status: "idle",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }: { username: string; password: string }) => {
    console.log(username, password);
    const response = await fetch(`http://localhost:3001/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch(`http://localhost:3001/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRepeatPassword: (state, action: PayloadAction<string>) => {
      state.repeatPassword = action.payload;
    },
    setAuthNav: (state, action: PayloadAction<AuthNav>) => {
      state.authNav = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = "";
        state.password = "";
        state.repeatPassword = "";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state) => {
        state.username = "";
        state.password = "";
        state.repeatPassword = "";
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = "";
        state.password = "";
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state) => {
        state.username = "";
        state.password = "";
        state.status = "failed";
      });
  },
});

export const { setUsername, setPassword, setRepeatPassword, setAuthNav } =
  authSlice.actions;

export default authSlice.reducer;
