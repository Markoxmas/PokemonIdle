import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemon/pokemonSlice";

export type SacrificeSlot = {
  name: string | null;
  stars: number;
  amount: number;
  slot: number;
};

export interface UpgradeState {
  pokemonId: string;
  sacrifices: Array<Array<string>>;
  sacrificeSlot: SacrificeSlot;
  openSacrificeModal: boolean;
  statusLevelUp: "idle" | "loading" | "succeeded" | "failed";
  statusStarUp: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UpgradeState = {
  pokemonId: "",
  sacrifices: [],
  sacrificeSlot: { name: null, stars: 0, amount: 0, slot: 0 },
  openSacrificeModal: false,
  statusLevelUp: "idle",
  statusStarUp: "idle",
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

export const starUpPokemon = createAsyncThunk(
  "upgrade/starUpPokemon",
  async ({
    pokemonId,
    sacrifices,
  }: {
    pokemonId: string;
    sacrifices: Array<Array<string>>;
  }) => {
    const response = await fetch(
      `http://localhost:3001/upgrade/starup/admin/${pokemonId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sacrifices }),
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
    openSacrificeModal: (state, action: PayloadAction<SacrificeSlot>) => {
      state.openSacrificeModal = true;
      state.sacrificeSlot = action.payload;
    },
    closeSacrificeModal: (state) => {
      state.openSacrificeModal = false;
    },
    toggleSacrifice: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const slot = state.sacrificeSlot.slot;

      if (state.sacrifices[slot].includes(id)) {
        state.sacrifices[slot] = state.sacrifices[slot].filter(
          (sacrifice) => sacrifice !== id
        );
      } else if (state.sacrificeSlot.amount > state.sacrifices[slot].length) {
        state.sacrifices[slot] = [...state.sacrifices[slot], id];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(levelUpPokemon.pending, (state) => {
        state.statusLevelUp = "loading";
      })
      .addCase(levelUpPokemon.fulfilled, (state) => {
        state.statusLevelUp = "succeeded";
      })
      .addCase(levelUpPokemon.rejected, (state) => {
        state.statusLevelUp = "failed";
      })
      .addCase(starUpPokemon.pending, (state) => {
        state.statusStarUp = "loading";
      })
      .addCase(starUpPokemon.fulfilled, (state) => {
        state.statusStarUp = "succeeded";
      })
      .addCase(starUpPokemon.rejected, (state) => {
        state.statusStarUp = "failed";
      });
  },
});

export const {
  initUpgradePage,
  openSacrificeModal,
  closeSacrificeModal,
  toggleSacrifice,
} = upgradeSlice.actions;

export default upgradeSlice.reducer;
