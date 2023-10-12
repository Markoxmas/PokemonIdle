import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum RequestStatus {
  Idle,
  Pending,
  Success,
  Failure,
}

export interface DevState {
  status: RequestStatus;
  success: string | null;
}

const initialState: DevState = {
  status: RequestStatus.Idle,
  success: null,
};

export const summonPokemon = createAsyncThunk(
  "dev/summonPokemon",
  async (amount: number) => {
    const response = await fetch(
      `http://localhost:3001/summon/normal/${amount}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteAllPokemon = createAsyncThunk(
  "dev/deleteAllPokemon",
  async () => {
    const response = await fetch(`http://localhost:3001/pokemon/all`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
);

export const devSlice = createSlice({
  name: "dev",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(summonPokemon.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(summonPokemon.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(summonPokemon.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      })
      .addCase(deleteAllPokemon.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(deleteAllPokemon.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(deleteAllPokemon.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      });
  },
});

export const {} = devSlice.actions;

export default devSlice.reducer;
