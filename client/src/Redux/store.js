import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./DarkModeSlice";

export default configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});
