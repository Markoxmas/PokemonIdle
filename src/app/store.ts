import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigationReducer from "../features/navigation/navigationSlice";
import devReducer from "../features/dev/devSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    dev: devReducer,
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
