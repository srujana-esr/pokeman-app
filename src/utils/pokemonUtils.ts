import { getAvailablePokemonList } from "../api/pokemonApi"; 

//trying to get 2 unique and random pokemon names dynamically
export const getRandomPokemonNames = async (): Promise<string[]> => {
  try {
    const availablePokemon = await getAvailablePokemonList(); 

    if (availablePokemon.length === 0) {
      throw new Error("Failed to fetch available Pokémon list.");
    }

    // shuffle the list and pick the first 2 unique pokemon
    const shuffled = [...availablePokemon].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  } catch (error) {
    console.error("Error selecting random Pokémon names:", error);
    return [];
  }
};
