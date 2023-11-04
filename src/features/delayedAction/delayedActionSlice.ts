import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DelayedActionState {
  levelUpTimeoutRef: NodeJS.Timeout | null;
}

const initialState: DelayedActionState = {
  levelUpTimeoutRef: null,
};

export const delayedActionSlice = createSlice({
  name: "delayedAction",
  initialState,
  reducers: {
    setLevelUpTimeoutRef: (state, action: PayloadAction<NodeJS.Timeout>) => {
      if (state.levelUpTimeoutRef) {
        clearTimeout(state.levelUpTimeoutRef);
      }
      state.levelUpTimeoutRef = action.payload;
    },
  },
});

export const { setLevelUpTimeoutRef } = delayedActionSlice.actions;

export default delayedActionSlice.reducer;
