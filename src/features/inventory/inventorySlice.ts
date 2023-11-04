import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";
import { initializeApp } from "../init/initSlice";
import { levelUpPokemon } from "../upgrade/upgradeSlice";
import { claimDrops } from "../battle/battleSlice";
import { addNormalSummonScrolls, addExp } from "../dev/devSlice";
import { restartAccount } from "../dev/devSlice";

export enum ItemKind {
  exp,
  normalSummonScroll,
}

export type Item = {
  stackable: boolean;
  type: ItemKind;
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
          item.type === ItemKind.normalSummonScroll
            ? {
                ...item,
                amount: item.amount - action.payload.summonedPokemon.length,
              }
            : item
        );
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.items = action.payload.inventory.items;
      })
      .addCase(levelUpPokemon.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.type === ItemKind.exp
            ? { ...item, amount: action.payload.exp.amount }
            : item
        );
      })
      .addCase(claimDrops.fulfilled, (state, action) => {
        state.items = action.payload.inventory.items;
      })
      .addCase(addNormalSummonScrolls.fulfilled, (state, action) => {
        state.items = [
          ...state.items.map((item) =>
            item.type === ItemKind.normalSummonScroll
              ? { ...item, amount: item.amount + action.payload.item.amount }
              : item
          ),
        ];
      })
      .addCase(addExp.fulfilled, (state, action) => {
        state.items = [
          ...state.items.map((item) =>
            item.type === ItemKind.exp
              ? { ...item, amount: item.amount + action.payload.item.amount }
              : item
          ),
        ];
      })
      .addCase(restartAccount.fulfilled, (state, action) => {
        state.user = action.payload.inventory.user;
        state.items = action.payload.inventory.items;
      });
  },
});

export const {} = inventorySlice.actions;

export default inventorySlice.reducer;
