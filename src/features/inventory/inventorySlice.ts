import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";
import { initializeApp } from "../init/initSlice";

export interface InventoryState {
  normalSummonScrolls: number;
  exp: number;
}

const initialState: InventoryState = {
  normalSummonScrolls: 0,
  exp: 0,
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(normalSummonPokemon.fulfilled, (state, action) => {
        state.normalSummonScrolls -= action.payload.normalSummonScrollsAmount;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.normalSummonScrolls =
          action.payload.inventory.normalSummonScrolls;
        state.exp = action.payload.inventory.exp;
      });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
