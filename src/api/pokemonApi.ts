import axios from "axios";
import { Pokemon, PokemonMove } from "../types";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const MOVE_API_BASE_URL = "https://pokeapi.co/api/v2/move";

// tried to get pokemon names dynamically from the api response as the given api is specifically paginated 
export const getAvailablePokemonList = async (limit: number = 20): Promise<string[]> => {
  try {
    const { data } = await axios.get<{ results: { name: string }[] }>(`${POKE_API_BASE_URL}?limit=${limit}`);

    return data.results.map(pokemon => pokemon.name);
  } catch (error) {
    console.error("Error fetching available Pokémon list:", error);
    return [];
  }
};

export const getPokemon = async (name: string): Promise<Pokemon | null> => {
  try {
    const { data } = await axios.get<Pokemon>(`${POKE_API_BASE_URL}/${name}`);

    return {
      id: data.id,
      name: data.name,
      sprites: {
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default,
      },
      stats: data.stats,
      types: data.types,
      moves: extractMoves(data.moves),
    };
  } catch (error) {
    console.error(`Error fetching Pokémon with name ${name}:`, error);
    return null;
  }
};

export const getMoveDetails = async (moveName: string): Promise<PokemonMove> => {
  try {
    const { data } = await axios.get<{ power: number }>(`${MOVE_API_BASE_URL}/${moveName}`);

    return { move: { name: moveName }, power: data.power || 0 }; // default to 0 if power is null from the move api response 
  } catch (error) {
    console.error(`Error fetching move ${moveName}:`, error);
    return { move: { name: moveName }, power: 0 };
  }
};

const extractMoves = (moves: PokemonMove[], limit: number = 3): PokemonMove[] =>
  moves.slice(0, limit);
