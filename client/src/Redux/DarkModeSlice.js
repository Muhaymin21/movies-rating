import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    status: JSON.parse(localStorage.getItem("darkMode")) ?? false,
  },
  reducers: {
    toggle: (state) => {
      let newValue = !state.status;
      state.status = newValue;
      localStorage.setItem("darkMode", JSON.stringify(newValue));
    },
  },
});

export const { toggle } = darkModeSlice.actions;

export default darkModeSlice.reducer;
