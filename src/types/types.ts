export interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

export interface Type {
  type: {
    name: string;
    url: string;
  };
}

export interface Sprite {
  other: {
    "official-artwork": {
      front_default: string;
    };
  };
}

export interface Pokemon {
  name: string;
  id: number; // Assuming id is a number, not a string
  height: number;
  weight: number;
  abilities: Ability[];
  types: Type[];
  sprites: Sprite;
  stats: Stat[];
  moves: Move[];
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Move {
  move: {
    name: string;
  };
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
  genera: Genus[];
  name: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface Genus {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

export interface EvolutionChain {
  chain: EvolutionDetail;
}

export interface EvolutionDetail {
  evolves_to: EvolutionDetail[];
  species: {
    name: string;
    url: string;
  };
}
