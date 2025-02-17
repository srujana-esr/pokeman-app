import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pokemon, PokemonMove } from "../types";
import { getMoveDetails } from "../api/pokemonApi";

interface BattleState {
  pokemon1?: Pokemon; 
  pokemon2?: Pokemon;
  selectedMoves: Record<string, PokemonMove | undefined>; 
  battleLog: string;
}

const initialState: BattleState = {
  selectedMoves: {}, 
  battleLog: "",
};

export const fetchMoveDetails = createAsyncThunk(
  "battle/fetchMoveDetails",
  async (pokemon: Pokemon, { rejectWithValue }) => {
    try {
      if (!pokemon.moves.length) return rejectWithValue("No moves available");

      const randomMove = pokemon.moves[Math.floor(Math.random() * pokemon.moves.length)].move.name;
      const moveDetails = await getMoveDetails(randomMove);

      if (!moveDetails) return rejectWithValue("Move details not found");

      return { pokemonName: pokemon.name, move: moveDetails };
    } catch (error) {
      return rejectWithValue("Failed to fetch move details");
    }
  }
);

const battleSlice = createSlice({
  name: "battle",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<{ pokemon1: Pokemon; pokemon2: Pokemon }>) => {
      state.pokemon1 = action.payload.pokemon1;
      state.pokemon2 = action.payload.pokemon2;
      state.battleLog = ""; // reset battle log when new pokemon are selected
      state.selectedMoves = {}; //clear previous moves
    },

    startBattle: (state) => {
      const move1 = state.pokemon1 ? state.selectedMoves[state.pokemon1.name] : undefined;
      const move2 = state.pokemon2 ? state.selectedMoves[state.pokemon2.name] : undefined;

      if (!move1 || !move2 || move1.power === undefined || move2.power === undefined) {
        state.battleLog = "Error: Moves not available for one or both Pokémon.";
        return;
      }

      const winner = move1.power > move2.power ? state.pokemon1 : move2.power > move1.power ? state.pokemon2 : undefined;
      const loser = winner === state.pokemon1 ? state.pokemon2 : state.pokemon1;

      if (winner && loser) {
        state.battleLog = `${winner.name} lands a decisive blow with ${
          winner === state.pokemon1 ? move1.move.name : move2.move.name
        }, knocking out ${loser.name}!`;
      } else {
        state.battleLog = `Draw! Both Pokemon used equal power.`;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMoveDetails.fulfilled, (state, action) => {
      state.selectedMoves[action.payload.pokemonName] = action.payload.move;
    });

    builder.addCase(fetchMoveDetails.rejected, (_, action) => {
      console.error("Move fetch error:", action.payload);
    });
  },
});

export const { setPokemons, startBattle } = battleSlice.actions;
export default battleSlice.reducer;
