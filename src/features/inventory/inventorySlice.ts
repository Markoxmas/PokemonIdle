import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";
import { initializeApp } from "../init/initSlice";
import { levelUpPokemon } from "../upgrade/upgradeSlice";
import { claimDrops } from "../battle/battleSlice";

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
      })
      .addCase(levelUpPokemon.fulfilled, (state, action) => {
        state.exp = action.payload.newExp;
      })
      .addCase(claimDrops.fulfilled, (state, action) => {
        state.exp = action.payload.inventory.exp;
        state.normalSummonScrolls =
          action.payload.inventory.normalSummonScrolls;
      });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
