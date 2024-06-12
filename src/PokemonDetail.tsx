import { useEffect, useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { Tab } from '@headlessui/react';
import { Pokemon, PokemonSpecies, EvolutionChain, EvolutionDetail } from "./types/types"; // Ensure you have proper type definitions
import PokemonInfo from "./components/PokemonInfo";
import PokemonStats from "./components/PokemonStats";
import PokemonEvolution from "./components/PokemonEvolution";
import PokemonMoves from "./components/PokemonMoves";
import Loader from "./components/Loader";

const PokemonDetail = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionChain | null>(null);
  const [loading, setLoading] = useState(true);
  const [evolutionData, setEvolutionData] = useState<{ [name: string]: Pokemon }>({});

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemonData = await pokemonResponse.json();
        setPokemon(pokemonData);

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}/`);
        const speciesData = await speciesResponse.json();
        setSpecies(speciesData);

        const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionChainData = await evolutionChainResponse.json();
        setEvolutionChain(evolutionChainData);

        if (evolutionChainData) {
          const fetchEvolutionData = async (chain: EvolutionDetail) => {
            const evolutionPromises = [];
            let current = chain;
            while (current) {
              evolutionPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${current.species.name}`).then(res => res.json()));
              current = current.evolves_to[0];
            }
            const evolutionResults = await Promise.all(evolutionPromises);
            const evolutionData = evolutionResults.reduce((acc, evoData) => {
              acc[evoData.name] = evoData;
              return acc;
            }, {});
            setEvolutionData(evolutionData);
          };

          fetchEvolutionData(evolutionChainData.chain);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (!pokemon || !species) {
    return <div className="text-white">No Pokémon found</div>;
  }

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
    <main className={`bg-gradient-to-r ${getGradientFromAbility(pokemon.types[0].type.name)} grid grid-cols-1 lg:grid-cols-2 min-h-screen`}>
      <section className="py-4 md:px-8 lg:px-10 px-4 relative">
        <Link to="/">
          <button className="px-3 py-1 rounded-full bg-white text-gray-700 outline-none">
            &#8249;
          </button>
        </Link>

        

        <div className="mt-8 relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl text-white font-bold capitalize">{pokemon.name}</p>

              <div className="flex gap-2 mt-2 items-start">
                {pokemon.types.map((typeInfo) => (
                  <div key={typeInfo.type.name} className="bg-white bg-opacity-30 text-white sm:px-4 px-2 py-1 rounded-full md:text-sm text-xs font-medium">
                    {typeInfo.type.name}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-2xl text-white font-medium">#{pokemon.id.toString().padStart(3, '0')}</p>
          </div>

          <div className="mt-8 relative flex justify-center items-center">
            <div className="absolute w-80 h-80 md:h-96 md:w-96 bg-white bg-opacity-40 rounded-full opacity-50"></div>
            <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="block mx-auto z-10" />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-tl-3xl rounded-tr-3xl px-6 pt-12 pb-3 lg:m-10 md:rounded-3xl">
        <Tab.Group>
          <Tab.List className="flex justify-between">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button className={`font-bold ${selected ? 'text-gray-700 border-b-2 border-gray-700' : 'text-gray-300'}`}>About</button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button className={`font-bold ${selected ? 'text-gray-700 border-b-2 border-gray-700' : 'text-gray-300'}`}>Best Stats</button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button className={`font-bold ${selected ? 'text-gray-700 border-b-2 border-gray-700' : 'text-gray-300'}`}>Evolution</button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button className={`font-bold ${selected ? 'text-gray-700 border-b-2 border-gray-700' : 'text-gray-300'}`}>Moves</button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="my-8">
            <Tab.Panel>
              <PokemonInfo pokemon={pokemon} species={species} />
            </Tab.Panel>
            <Tab.Panel>
              <PokemonStats pokemon={pokemon} />
            </Tab.Panel>
            <Tab.Panel>
              <PokemonEvolution evolutionData={evolutionData} evolutionChain={evolutionChain} />
            </Tab.Panel>
            <Tab.Panel>
              <PokemonMoves pokemon={pokemon} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
    </main>
  );
}

export default PokemonDetail;
