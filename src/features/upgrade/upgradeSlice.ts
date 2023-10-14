import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SacrificeSlot = {
  name: string | null;
  stars: number;
  amount: number;
};

export interface UpgradeState {
  pokemonId: string;
}

const initialState: UpgradeState = {
  pokemonId: "",
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
    setUpgradePokemonId: (state, action: PayloadAction<string>) => {
      state.pokemonId = action.payload;
    },
  },
});

export const { setUpgradePokemonId } = upgradeSlice.actions;

export default upgradeSlice.reducer;
