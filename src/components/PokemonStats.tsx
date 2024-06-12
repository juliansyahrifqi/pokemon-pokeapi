import { Pokemon } from "../types/types";

interface PokemonStatsProps {
  pokemon: Pokemon
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  return (
    <>
      {pokemon.stats.map((stat) => (
        <div key={stat.stat.name} className='grid grid-cols-[2fr_1fr_2fr] items-center my-2'>
          <p className='font-medium text-gray-400 capitalize'>{stat.stat.name}</p>
          <p className='font-bold text-gray-700'>{stat.base_stat}</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`bg-gradient-to-r ${stat.base_stat < 50 ? 'from-rose-500 to-red-600' : 'from-emerald-500 to-teal-600'} h-2.5 rounded-full`} style={{ width: `${stat.base_stat}%` }}></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default PokemonStats;
