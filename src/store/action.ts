import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon } from "../api/pokemonApi";
import { Pokemon } from "../types";
import { getRandomPokemonNames } from "../utils/pokemonUtils";


export const fetchPokemon = createAsyncThunk<Pokemon[], void, { rejectValue: string }>(
  "pokemon/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const names = await getRandomPokemonNames(); //dynamically gets 2 pokemon names
      const pokemonData = await Promise.all(names.map(getPokemon));

      return pokemonData.filter((pokemon): pokemon is Pokemon => pokemon !== null); 
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return rejectWithValue("Failed to fetch Pokémon. Please try again later.");
    }
  }
);
