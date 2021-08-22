import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./DarkModeSlice";
import ScopeSlice from "./ScopeSlice";

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
    scope: ScopeSlice
  },
});
