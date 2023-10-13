import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InventoryState {
  normalSummonScrolls: number;
}

const initialState: InventoryState = {
  normalSummonScrolls: 11,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
