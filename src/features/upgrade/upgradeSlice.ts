import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemon/pokemonSlice";

export type SacrificeSlot = {
  name: string | null;
  stars: number;
  amount: number;
};

export interface UpgradeState {
  pokemonId: string;
  sacrifices: Array<Array<string>>;
  sacrificeSlot: SacrificeSlot | null;
  slot: number;
  openSacrificeModal: boolean;
}

const initialState: UpgradeState = {
  pokemonId: "",
  sacrifices: [],
  sacrificeSlot: null,
  slot: 0,
  openSacrificeModal: false,
};

export const levelUpPokemon = createAsyncThunk(
  "upgrade/levelUpPokemon",
  async (pokemonId: string) => {
    const response = await fetch(
      `http://localhost:3001/upgrade/levelup/admin/${pokemonId}`,
      {
        method: "PATCH",
      }
    );
    const data = await response.json();
    return data;
  }
);

export const upgradeSlice = createSlice({
  name: "upgrade",
  initialState,
  reducers: {
    initUpgradePage: (state, action: PayloadAction<Pokemon>) => {
      state.pokemonId = action.payload._id;
      state.sacrifices = action.payload.sacrifices.map((sacrifice) => []);
    },
    openSacrificeModal: (
      state,
      action: PayloadAction<{ sacrificeSlot: SacrificeSlot; slot: number }>
    ) => {
      state.openSacrificeModal = true;
      state.sacrificeSlot = action.payload.sacrificeSlot;
      state.slot = action.payload.slot;
    },
    closeSacrificeModal: (state) => {
      state.openSacrificeModal = false;
    },
    toggleSacrifice: (
      state,
      action: PayloadAction<{ id: string; slot: number }>
    ) => {
      const { id, slot } = action.payload;
      if (state.sacrifices[slot].includes(id)) {
        state.sacrifices[slot] = state.sacrifices[slot].filter(
          (sacrifice) => sacrifice !== id
        );
      } else {
        state.sacrifices[slot] = [...state.sacrifices[slot], id];
      }
    },
  },
});

export const {
  initUpgradePage,
  openSacrificeModal,
  closeSacrificeModal,
  toggleSacrifice,
} = upgradeSlice.actions;

export default upgradeSlice.reducer;
