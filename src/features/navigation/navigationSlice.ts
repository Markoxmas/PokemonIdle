import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Tab {
  Battle,
  Pokemon,
  Summon,
  Dev,
}

export interface NavigationState {
  tab: Tab;
}

const initialState: NavigationState = {
  tab: Tab.Dev,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<Tab>) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = navigationSlice.actions;

export default navigationSlice.reducer;
