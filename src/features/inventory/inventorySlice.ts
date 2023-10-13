import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";

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
  extraReducers: (builder) => {
    builder.addCase(normalSummonPokemon.fulfilled, (state, action) => {
      state.normalSummonScrolls -= action.payload.normalSummonScrollsAmount;
    });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
