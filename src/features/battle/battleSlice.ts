import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../pokemon/pokemonSlice";

type Checkpoint = {
  startTime: number;
  pokemon: Pokemon[];
};

type BattleTimeline = {
  user: string;
  startTime: number;
  startHp: number;
  checkpoints: Checkpoint[];
};

export interface BattleState {
  battleTimeline: BattleTimeline;
  status: "idle" | "loading" | "succeeded" | "failed";
  openModal: boolean;
}

const initialState: BattleState = {
  battleTimeline: {
    user: "admin",
    startTime: -1,
    startHp: 10000,
    checkpoints: [],
  },
  status: "idle",
  openModal: false,
};

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
});

export const { openBattleModal, closeBattleModal } = summonSlice.actions;

export default summonSlice.reducer;
