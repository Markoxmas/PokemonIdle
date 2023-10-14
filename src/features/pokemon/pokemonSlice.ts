import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";
import { initializeApp } from "../init/initSlice";
import { levelUpPokemon } from "../upgrade/upgradeSlice";
import { SacrificeSlot } from "../upgrade/upgradeSlice";

export type Pokemon = {
  _id: string;
  name: string;
  level: number;
  stars: number;
  cp: number;
  sacrifices: SacrificeSlot[];
};

export interface PokemonState {
  pokemon: Pokemon[];
  loadStatus: "idle" | "loading" | "succeeded" | "failed";
  searchInput: string;
}

const initialState: PokemonState = {
  pokemon: [],
  loadStatus: "idle",
  searchInput: "",
};

export const fetchAllPokemon = createAsyncThunk(
  "pokemon/fetchAllPokemon",
  async () => {
    const response = await fetch(`http://localhost:3001/pokemon`);
    const data = await response.json();
    return data;
  }
);

export const navigationSlice = createSlice({
  name: "pokemonInventory",
  initialState,
  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokemon.pending, (state) => {
        state.loadStatus = "loading";
      })
      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
        state.loadStatus = "succeeded";
        state.pokemon = action.payload.pokemonInventory;
      })
      .addCase(fetchAllPokemon.rejected, (state) => {
        state.loadStatus = "failed";
      })
      .addCase(normalSummonPokemon.fulfilled, (state, action) => {
        state.pokemon = [...state.pokemon, ...action.payload.summonedPokemon];
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.pokemon = action.payload.pokemon;
      })
      .addCase(levelUpPokemon.fulfilled, (state, action) => {
        state.pokemon = state.pokemon.map((pokemon) => {
          return pokemon._id === action.payload.pokemon._id
            ? action.payload.pokemon
            : pokemon;
        });
      });
  },
});

export const { setSearchInput } = navigationSlice.actions;

export default navigationSlice.reducer;
