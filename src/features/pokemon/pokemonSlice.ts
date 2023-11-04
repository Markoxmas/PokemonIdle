import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalSummonPokemon } from "../summon/summonSlice";
import { initializeApp } from "../init/initSlice";
import { levelUpPokemon, starUpPokemon } from "../upgrade/upgradeSlice";
import { SacrificeSlot } from "../upgrade/upgradeSlice";
import { restartAccount } from "../dev/devSlice";
import { createSpecificPokemon } from "../dev/devSlice";

export type Pokemon = {
  _id: string;
  name: string;
  level: number;
  stars: number;
  cp: number;
  sacrifices: SacrificeSlot[];
  inBattle: number;
  battleSlot: number;
  nextLevelCost: number;
  maxLevel: number;
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
    setBattleSlot: (
      state,
      action: PayloadAction<{ pokemon: Pokemon; battle: number }>
    ) => {
      //If pokemon is in battle, remove it from battle
      if (action.payload.pokemon.inBattle !== 0) {
        state.pokemon = state.pokemon.map((pokemon) => {
          return pokemon._id === action.payload.pokemon._id
            ? { ...pokemon, inBattle: 0, battleSlot: 0 }
            : pokemon;
        });
      } else if (action.payload.pokemon.inBattle === 0) {
        //If pokemon is not in battle, add it to battle
        const pokemonInBattle = state.pokemon
          .filter((pokemon) => pokemon.inBattle === action.payload.battle)
          .sort((a, b) => a.battleSlot - b.battleSlot)
          //reset battle slots
          .map((pokemon, i) => {
            return { ...pokemon, battleSlot: i + 1 };
          });

        //create object with pokemon id as key and battle slot as value
        const slotData: { [key: string]: number } = pokemonInBattle.reduce(
          (data, pokemon) => {
            data[pokemon._id] = pokemon.battleSlot;
            return data;
          },
          {} as { [key: string]: number }
        );
        const pokemonInBattleIds = Object.keys(slotData);

        if (pokemonInBattle.length < 5) {
          //Update battleSlots in pokemon array
          state.pokemon = state.pokemon.map((pokemon) =>
            pokemonInBattleIds.includes(pokemon._id)
              ? { ...pokemon, battleSlot: slotData[pokemon._id] }
              : pokemon
          );
          //Update battleSlot of pokemon being added to battle
          state.pokemon = state.pokemon.map((pokemon) => {
            return pokemon._id === action.payload.pokemon._id
              ? {
                  ...pokemon,
                  inBattle: action.payload.battle,
                  battleSlot: pokemonInBattle.length + 1,
                }
              : pokemon;
          });
        }
      }
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
      })
      .addCase(starUpPokemon.fulfilled, (state, action) => {
        //upgrade starred up pokemon
        state.pokemon = state.pokemon.map((pokemon) =>
          pokemon._id === action.payload.pokemon._id
            ? action.payload.pokemon
            : pokemon
        );
        //remove sacrificed pokemon
        state.pokemon = state.pokemon.filter(
          (pokemon) => !action.payload.sacrificedPokemon.includes(pokemon._id)
        );
      })
      .addCase(restartAccount.fulfilled, (state, action) => {
        state.pokemon = action.payload.pokemon;
      })
      .addCase(createSpecificPokemon.fulfilled, (state, action) => {
        state.pokemon = [...state.pokemon, action.payload.pokemon];
      });
  },
});

export const { setSearchInput, setBattleSlot } = navigationSlice.actions;

export default navigationSlice.reducer;
