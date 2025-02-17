export interface PokemonMove {
  move: {
    name: string;
  };
  power?: number;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
  stats: { base_stat: number }[];
  types: { type: { name: string } }[];
  moves: PokemonMove[];
}
