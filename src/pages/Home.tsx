
import { useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useFetchPokemon from "../hooks/useFetchPokemon";
import PokemonCard from "../components/PokemonCard";
import { fetchPokemon } from "../store/action";
import { fetchMoveDetails, setPokemons } from "../store/battleSlice";
import { AppDispatch } from "../store";

const LoadingIndicator = () => (
    <div className="w-full flex flex-col items-center justify-center">
      <img src="/loading.gif" alt="Loading Pokémon..." className="w-24 h-24" loading="lazy" />
      <p className="mt-2 text-gray-700 text-center">Fetching Pokemon… please wait.</p>
    </div>
  );

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { players, loading } = useFetchPokemon();
  const [isFetching, setIsFetching] = useState(false);

  const handleRefresh = useCallback(() => {
    if (isFetching) return;
    setIsFetching(true);

    dispatch(fetchPokemon()).finally(() => {
      setTimeout(() => setIsFetching(false), 500);
    });
  }, [dispatch, isFetching]);

  const [playerOne, playerTwo] = useMemo(() => players, [players]);

  const handleSelectGame = async () => {
    if (!playerOne || !playerTwo) {
      alert("Please select Pokémon first!");
      return;
    }

    try {
      dispatch(setPokemons({ pokemon1: playerOne, pokemon2: playerTwo }));
      await dispatch(fetchMoveDetails(playerOne));
      await dispatch(fetchMoveDetails(playerTwo));
      navigate("/battle");
    } catch (error) {
      alert("Error fetching moves. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-200 p-6">
      <h1 className="text-2xl underline font-medium mb-6 text-gray-900">Select Random Pokémon</h1>
         <div
        role="region"
        aria-live="polite"
        className="relative bg-white shadow-lg rounded-3xl p-8 flex items-center justify-between w-full max-w-3xl border border-gray-200 min-h-[350px]"
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
          <div className="flex-1 flex flex-col items-center">
            <PokemonCard
                key={playerOne?.id}
                name={playerOne?.name}
                sprite={playerOne?.sprites?.back_default || "/placeholder.png"}
                isLeft
                />
                </div>
            <div
            role="img"
            aria-label="Versus battle indicator"
            className="text-xl font-extrabold text-gray-700 mx-6 p-4 bg-gray-200 rounded-lg shadow-md"
          >
            VS
          </div>
          <div className="flex-1 flex flex-col items-center">
            <PokemonCard
            key={playerTwo?.id}
            name={playerTwo?.name}
            sprite={playerTwo?.sprites?.front_default || "/placeholder.png"}
            />
            </div>
          </>
        )}
      </div>

      <div className="mt-10 flex gap-10">
        <button
        onClick={handleRefresh} 
        disabled={isFetching}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
        {isFetching ? "Refreshing..." : "Refresh Pokemon"}
        </button>
        <button
         onClick={handleSelectGame} 
         className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md  transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
         >
          Pokemon Selected
        </button>
      </div>
    </div>
  );
};

export default Home;
