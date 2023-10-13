import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemon/pokemonSlice";

export interface PokemonState {
  summonedPokemon: Pokemon[];
  status: "idle" | "loading" | "succeeded" | "failed";
  openModal: boolean;
}

const initialState: PokemonState = {
  summonedPokemon: [],
  status: "idle",
  openModal: false,
};

export const normalSummonPokemon = createAsyncThunk(
  "pokemon/normalSummonPokemon",
  async (amount: number) => {
    const response = await fetch(
      `http://localhost:3001/summon/normal/${amount}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    );
    const data = await response.json();
    data.normalSummonScrollsAmount = amount;
    return data;
  }
);

export const summonSlice = createSlice({
  name: "summon",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.openModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(normalSummonPokemon.pending, (state) => {
        state.status = "loading";
        state.summonedPokemon = [];
      })
      .addCase(normalSummonPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.summonedPokemon = action.payload.summonedPokemon;
        state.openModal = true;
      })
      .addCase(normalSummonPokemon.rejected, (state) => {
        state.status = "failed";
        state.summonedPokemon = [];
        state.openModal = false;
      });
  },
});

export const { closeModal } = summonSlice.actions;

export default summonSlice.reducer;
