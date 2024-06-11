import { Pokemon } from "../types/types";

interface Props {
  pokemon: Pokemon;
}

const PokeCard: React.FC<Props> = ({ pokemon }) => {
  const capitalizeFirstChar = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getGradientFromAbility = (abilityName: string) => {
    switch (abilityName.toLowerCase()) {
      case "grass":
        return "from-emerald-500 to-teal-600";
      case "fire":
        return "from-rose-500 to-red-600";
      case "water":
        return "from-sky-500 to-blue-600";
      default:
        return "from-amber-500 to-yellow-500";
    }
  };

  return (
    <div className={`relative rounded-3xl py-8 px-4 hover:scale-105 transition ease-in duration-300 cursor-pointer overflow-hidden bg-gradient-to-r ${getGradientFromAbility(pokemon.types[0].type.name)}`}>
      <div className="absolute -right-14 w-64 h-64 bg-white bg-opacity-40 rounded-full opacity-50"></div>
            
      <div className="absolute inset-0 sm:py-4 sm:px-2 flex justify-end items-center">
        <img 
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={capitalizeFirstChar(pokemon.name)}
          className="h-2 md:h-36 lg:max-h-full 4"
        />
      </div>
      
      <div className="relative">
        <p className="text-white font-bold text-lg md:text-2xl lg:text-3xl ">{capitalizeFirstChar(pokemon.name)}</p>

        <div className="flex flex-col gap-3 mt-4 items-start">
          {pokemon.abilities.map((ability, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-30 text-white sm:px-4 px-2 py-1 rounded-full md:text-sm text-xs font-medium"
            >
              {capitalizeFirstChar(ability.ability.name)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokeCard;
