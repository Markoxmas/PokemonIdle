import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Pokemon = {
  _id: string;
  name: string;
  level: number;
  stars: number;
  cp: number;
};

export interface PokemonState {
  pokemon: Pokemon[];
  loadStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PokemonState = {
  pokemon: [],
  loadStatus: "idle",
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
  reducers: {},
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
      });
  },
});

export const {} = navigationSlice.actions;

export default navigationSlice.reducer;
