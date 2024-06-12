import { Pokemon } from "../types/types";

interface PokemonMovesProps {
  pokemon: Pokemon;
}

const PokemonMoves: React.FC<PokemonMovesProps> = ({ pokemon }) => {
  return (
    <div className="my-6">
      <p className="text-gray-400 font-medium">Moves</p>
      <ul className="list-disc list-inside font-bold text-gray-700 mt-2">
        {pokemon.moves.map((moveInfo) => (
          <li key={moveInfo.move.name} className="capitalize flex items-center">
            {moveInfo.move.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonMoves;
