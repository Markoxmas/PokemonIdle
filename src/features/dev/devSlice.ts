import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const addNormalSummonScrolls = createAsyncThunk(
  "dev/addNormalSummonScrolls",
  async (amount: number) => {
    const response = await fetch("http://localhost:3001/inventory/add/item", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        item: {
          stackable: true,
          type: 1, //should be ItemKind.normalSummonScroll, but for some reason it gives an error
          name: "Normal Summon Scroll",
          image: "normalSummonScroll",
          amount: amount,
        },
      }),
    });
    const data = await response.json();
    return data;
  }
);

export const addExp = createAsyncThunk("dev/addExp", async (amount: number) => {
  const response = await fetch(`http://localhost:3001/inventory/add/item`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      item: {
        stackable: true,
        type: 0, //should be ItemKind.exp, but for some reason it gives an error
        name: "Exp",
        image: "exp",
        amount: amount,
      },
    }),
  });
  const data = await response.json();
  return data;
});

export const restartAccount = createAsyncThunk(
  "dev/restartAccount",
  async () => {
    const response = await fetch(`http://localhost:3001/init/restart/account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const createSpecificPokemon = createAsyncThunk(
  "dev/createSpecificPokemon",
  async (pokemonData: {
    pokemonData: { name: string; stars: number; level: number };
  }) => {
    const response = await fetch(`http://localhost:3001/pokemon/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ pokemonData }),
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
      .addCase(addNormalSummonScrolls.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(addNormalSummonScrolls.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(addNormalSummonScrolls.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      })
      .addCase(addExp.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(addExp.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(addExp.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      })
      .addCase(restartAccount.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(restartAccount.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(restartAccount.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      });
  },
});

export default devSlice.reducer;
