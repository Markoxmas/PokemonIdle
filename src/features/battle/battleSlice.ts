import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BattleState {
  status: "idle" | "loading" | "succeeded" | "failed";
  openModal: boolean;
}

const initialState: BattleState = {
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
