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

export const summonPokemon = createAsyncThunk(
  "dev/summonPokemon",
  async (amount: number) => {
    const response = await fetch(
      `http://localhost:3001/summon/normal/admin/${amount}`,
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
    const response = await fetch(`http://localhost:3001/pokemon/admin`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
);

export const deleteInventory = createAsyncThunk(
  "dev/deleteInventory",
  async () => {
    const response = await fetch(`http://localhost:3001/inventory/admin`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  }
);

export const createInventory = createAsyncThunk(
  "dev/createInventory",
  async () => {
    const response = await fetch(`http://localhost:3001/inventory/admin`, {
      method: "POST",
    });
    const data = await response.json();
    return data;
  }
);

export const addNormalSummonScrolls = createAsyncThunk(
  "dev/addNormalSummonScrolls",
  async (amount: number) => {
    const response = await fetch(
      "http://localhost:3001/inventory/add-item/admin",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
      }
    );
    const data = await response.json();
    return data;
  }
);

export const addExp = createAsyncThunk("dev/addExp", async (amount: number) => {
  const response = await fetch(
    `http://localhost:3001/inventory/admin/exp/${amount}`,
    {
      method: "PATCH",
    }
  );
  const data = await response.json();
  return data;
});

export const createBattleTimeline = createAsyncThunk(
  "dev/createBattleTimeline",
  async () => {
    const response = await fetch(
      `http://localhost:3001/battle/create-battle-timeline/admin`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    return data;
  }
);

export const deleteBattleTimeline = createAsyncThunk(
  "dev/deleteBattleTimeline",
  async () => {
    const response = await fetch(
      `http://localhost:3001/battle/delete-battle-timeline/admin`,
      {
        method: "DELETE",
      }
    );
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
      })
      .addCase(deleteInventory.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      })
      .addCase(createInventory.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      })
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
      .addCase(createBattleTimeline.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(createBattleTimeline.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(createBattleTimeline.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      })
      .addCase(deleteBattleTimeline.pending, (state) => {
        state.status = RequestStatus.Pending;
        state.success = null;
      })
      .addCase(deleteBattleTimeline.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.success = action.payload.message;
      })
      .addCase(deleteBattleTimeline.rejected, (state, action) => {
        state.status = RequestStatus.Failure;
        state.success = null;
      });
  },
});

export default devSlice.reducer;
