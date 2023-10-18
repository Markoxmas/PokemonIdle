import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemon/pokemonSlice";
import { initializeApp } from "../init/initSlice";
import { Item } from "../inventory/inventorySlice";

type Checkpoint = {
  startTime: number;
  pokemon: Pokemon[];
};

export type BattleTimeline = {
  user: string;
  startTime: number;
  startHp: number;
  maxHp: number;
  checkpoints: Checkpoint[];
};

export interface BattleState {
  battleTimeline: BattleTimeline;
  status: "idle" | "loading" | "succeeded" | "failed";
  openModal: boolean;
  drops: Item[];
}

const initialState: BattleState = {
  battleTimeline: {
    user: "admin",
    startTime: -1,
    startHp: 10000,
    maxHp: 10000,
    checkpoints: [],
  },
  status: "idle",
  openModal: false,
  drops: [],
};

export const updateBattleTimeline = createAsyncThunk(
  "battle/updateBattleTimeline",
  async (checkpointPokemons: Pokemon[]) => {
    const response = await fetch(
      `http://localhost:3001/battle/update-battle-timeline/admin`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checkpointPokemons }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const claimDrops = createAsyncThunk("battle/claimDrops", async () => {
  const response = await fetch(
    `http://localhost:3001/battle/claim-drops/admin`
  );
  const data = await response.json();
  return data;
});

export const summonSlice = createSlice({
  name: "summon",
  initialState,
  reducers: {
    openBattleModal: (state) => {
      state.openModal = true;
    },
    closeBattleModal: (state) => {
      state.openModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.battleTimeline = action.payload.battleTimeline;
      })
      .addCase(updateBattleTimeline.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBattleTimeline.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.battleTimeline = action.payload.battleTimeline;
      })
      .addCase(updateBattleTimeline.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(claimDrops.pending, (state) => {
        state.status = "loading";
      })
      .addCase(claimDrops.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.battleTimeline = action.payload.battleTimeline;
        state.drops = action.payload.drops;
      })
      .addCase(claimDrops.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { openBattleModal, closeBattleModal } = summonSlice.actions;

export default summonSlice.reducer;
