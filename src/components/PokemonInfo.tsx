import { Pokemon, PokemonSpecies } from "../types/types";

interface PokemonInfoProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const PokemonInfo: React.FC<PokemonInfoProps>= ({ pokemon, species }) => {
  const englishFlavorText = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text;
  
  return (
    <>
      <div className='my-6'>
        <p className='text-gray-400 font-medium'>Description</p>
        <p className='font-bold text-gray-700 mt-2'>{englishFlavorText || "No description available"}</p>
      </div>
      
      <div className='grid grid-cols-2 my-2'>
        <p className='text-gray-400 font-medium'>Species</p>
        <p className='font-bold text-gray-700'>{species.genera.find(genus => genus.language.name === "en")?.genus || "Unknown"}</p>
      </div>

      <div className='grid grid-cols-2 my-2'>
        <p className='text-gray-400 font-medium'>Height</p>
        <p className='font-bold text-gray-700'>{pokemon.height / 10} m</p>
      </div>

      <div className='grid grid-cols-2 my-2'>
        <p className='text-gray-400 font-medium'>Weight</p>
        <p className='font-bold text-gray-700'>{pokemon.weight / 10} kg</p>
      </div>

      <div className='grid grid-cols-2 my-2'>
        <p className='text-gray-400 font-medium'>Abilities</p>
        <p className='font-bold text-gray-700'>{pokemon.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ')}</p>
      </div>
    </>
  )
}

export default PokemonInfo;