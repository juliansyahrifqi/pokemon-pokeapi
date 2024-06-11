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
  abilities: Ability[];
  types: Type[];
  sprites: Sprite;
  name: string;
  id: string;
}
