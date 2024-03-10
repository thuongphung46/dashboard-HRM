import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface controllBarState {
  toggled: boolean;
  collapsed: boolean;
}

// Define the initial state using that type
const initialState: controllBarState = {
  toggled: false,
  collapsed: false,
};

export const controllBarSlice = createSlice({
  name: "controllBar",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // tạo một acction set state chung
    setState: (state, action: PayloadAction<controllBarState>) => {
      state.toggled = action.payload.toggled;
      state.collapsed = action.payload.collapsed;
    },
  },
});

export const { setState } = controllBarSlice.actions;

export const ControllBarReducer = controllBarSlice.reducer;
