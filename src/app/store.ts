import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import devReducer from "../features/dev/devSlice";
import pokemonReducer from "../features/pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    dev: devReducer,
    pokemon: pokemonReducer,
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
