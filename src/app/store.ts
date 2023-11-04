import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import devReducer from "../features/dev/devSlice";
import pokemonReducer from "../features/pokemon/pokemonSlice";
import inventoryReducer from "../features/inventory/inventorySlice";
import summonReducer from "../features/summon/summonSlice";
import upgradeReducer from "../features/upgrade/upgradeSlice";
import battleReducer from "../features/battle/battleSlice";
import delayedActionReducer from "../features/delayedAction/delayedActionSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    pokemon: pokemonReducer,
    inventory: inventoryReducer,
    dev: devReducer,
    summon: summonReducer,
    upgrade: upgradeReducer,
    battle: battleReducer,
    delayedAction: delayedActionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
