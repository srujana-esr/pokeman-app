import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPokemon } from "./action";
import { Pokemon } from "../types";

interface PokemonState {
  players: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  players: [],
  loading: false,
  error: null,
};

//redux slcie
const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPokemon.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemon.fulfilled, (state, action: PayloadAction<Pokemon[]>) => {
        state.players = action.payload;
        state.loading = false;
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pokemonSlice.reducer;
