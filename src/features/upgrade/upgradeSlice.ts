import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UpgradeState {
  pokemonId: string;
}

const initialState: UpgradeState = {
  pokemonId: "",
};

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
