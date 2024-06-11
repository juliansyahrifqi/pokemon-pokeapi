import { useEffect, useState } from "react";
import PokeCard from "./components/PokeCard";
import { Pokemon } from "./types/types";
import Pagination from "./components/Pagination";
import { Link } from "react-router-dom";

function App() {
  const [pokeData, setPokeData] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * 20}&limit=20`);
        const data = await response.json();
        
        const detailedDataPromises = data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          return res.json();
        });

        const detailedData = await Promise.all(detailedDataPromises);
        setPokeData(detailedData);
        setTotalPages(Math.ceil(data.count / 20));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="md:mx-8 lg:mx-10 mx-2">
      <section className="flex items-center my-4">
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src="/pokeball.png" alt="Pokeball" className="sm:w-16 w-10"/>
            <h1 className="sm:text-3xl text-xl font-bold">Pokedex</h1>
          </div>
        </Link>
        <div className="ml-auto flex items-center">
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />
        </div>
      </section>

      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <img src="/pokeball.png" alt="Pokeball" className="animate-bounce w-16" />
          <p className="font-bold animate-pulse">loading...</p>
        </div>
      ) : (
        <section className="grid md:grid-cols-3 xl:grid-cols-4 grid-cols-2 sm:gap-4 gap-2 my-4">
          {pokeData.map((pokemon) => (
            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <PokeCard pokemon={pokemon} />
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
