import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";
import { initializeApp } from "../init/initSlice";
import { levelUpPokemon } from "../upgrade/upgradeSlice";
import { claimDrops } from "../battle/battleSlice";

export type Item = {
  name: string;
  image: string;
  amount: number;
};

export interface InventoryState {
  user: string;
  items: any[];
}

const initialState: InventoryState = {
  user: "admin",
  items: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(normalSummonPokemon.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.name === "normalSummonScroll"
            ? {
                ...item,
                amount: item.amount - action.payload.normalSummonScrollsAmount,
              }
            : item
        );
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.items = action.payload.inventory.items;
      })
      .addCase(levelUpPokemon.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.name === "exp"
            ? { ...item, amount: action.payload.exp.amount }
            : item
        );
      })
      .addCase(claimDrops.fulfilled, (state, action) => {
        state.items = action.payload.inventory.items;
      });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
