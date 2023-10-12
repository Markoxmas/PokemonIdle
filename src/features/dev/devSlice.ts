import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DevState {}

const initialState: DevState = {};

export const devSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {},
});

export const {} = devSlice.actions;

export default devSlice.reducer;
