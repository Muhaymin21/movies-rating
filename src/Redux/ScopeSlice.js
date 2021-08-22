import { createSlice } from "@reduxjs/toolkit";

export const ScopeSlice = createSlice({
  name: "Scope",
  initialState: {
    scopes: [],
  },
  reducers: {
    setScopes: (state, action) => {
      state.scopes = action.payload
    },
  },
});

export const { setScopes } = ScopeSlice.actions;

export default ScopeSlice.reducer;
