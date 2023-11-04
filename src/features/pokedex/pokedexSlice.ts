import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "../init/initSlice";

export interface PokedexState {
  pokedex: any[];
}

const initialState: PokedexState = {
  pokedex: [],
};

export const pokedexSlice = createSlice({
  name: "pokedex",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeApp.fulfilled, (state, action) => {
      state.pokedex = action.payload.pokedex;
    });
  },
});

export default pokedexSlice.reducer;
