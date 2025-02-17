import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";

//redux store configuration
export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  devTools: process.env.NODE_ENV !== "production", 
});

//type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
