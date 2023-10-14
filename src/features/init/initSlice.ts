import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../dev/devSlice";

export interface InitState {
  status: RequestStatus;
}

const initialState: InitState = {
  status: RequestStatus.Idle,
};

export const initializeApp = createAsyncThunk("init/initalizeApp", async () => {
  const response = await fetch(`http://localhost:3001/init/admin`);
  const data = await response.json();
  return data;
});

export const initSlice = createSlice({
  name: "init",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.pending, (state) => {
        state.status = RequestStatus.Pending;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
      })
      .addCase(initializeApp.rejected, (state) => {
        state.status = RequestStatus.Failure;
      });
  },
});

export const {} = initSlice.actions;

export default initSlice.reducer;
