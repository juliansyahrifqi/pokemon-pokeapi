import { EvolutionChain, EvolutionDetail, Pokemon } from "../types/types";

interface PokemonEvolutionProps {
  evolutionChain: EvolutionChain;
  evolutionData: { [name: string]: Pokemon };
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({ evolutionChain, evolutionData }) => {
  const renderEvolutionChain = (chain: EvolutionDetail) => {
    const evolutions = [];
    let current = chain;
    while (current) {
      evolutions.push(current);
      current = current.evolves_to[0];
    }
    return evolutions.map((evolution) => (
      <div className="relative flex justify-center gap-2 bg-gray-100 shadow-md p-4 w-full rounded-xl">
        <div className="absolute w-16 h-16 bg-gradient-to-r from-neutral-300 to-stone-400 shadow-xl rounded-full opacity-50"></div>

        <div>
          <img
            src={evolutionData[evolution.species.name]?.sprites.other["official-artwork"].front_default}
            alt={evolution.species.name}
            className="w-16 h-16 md:w-24 md:h-24 mx-auto relative z-10"
          />
          <p className="capitalize text-center mt-2 z-10">{evolution.species.name}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="my-6">
      <div className="font-bold text-gray-700 my-2 grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {renderEvolutionChain(evolutionChain.chain)}
      </div>
    </div>
  );
};

export default PokemonEvolution;
