import { useDispatch, useSelector } from "react-redux";
import { startBattle } from "../store/battleSlice";
import { RootState, AppDispatch } from "../store";
import { useMemo } from "react";

const BattleView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemon1, pokemon2, selectedMoves, battleLog } = useSelector((state: RootState) => state.battle);

  // useMemo to prevent unnecessary calculations
  const move1 = useMemo(() => {
    if (pokemon1?.name && selectedMoves[pokemon1.name]) {
      return selectedMoves[pokemon1.name];
    }
    return null; 
  }, [pokemon1, selectedMoves]);

  const move2 = useMemo(() => {
    if (pokemon2?.name && selectedMoves[pokemon2.name]) {
      return selectedMoves[pokemon2.name];
    }
    return null; 
  }, [pokemon2, selectedMoves]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="border border-gray-300 bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl relative">
        
        <div className="flex flex-col space-y-6 px-4 py-6 border border-gray-300">
          {pokemon1 && (
            <div className="flex items-center justify-end">
            <div className="relative flex items-center border border-gray-400 rounded-lg px-4 py-2">
              <strong className="text-lg font-semibold">{pokemon1.name}</strong>
              {move1 ? (
                <div className="ml-3 bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {move1.move.name}: {move1.power}
                </div>
              ) : (
                <div className="ml-3 bg-red-200 text-red-800 text-sm px-3 py-1 rounded-full">Move not found</div>
              )}
            </div>
            <span className="text-gray-500">{">"}</span>
            <img src={pokemon1.sprites.front_default} alt={pokemon1.name || "Pokémon"} className="w-40 h-40" />
          </div>
          )}

          {pokemon2 && (
              <div className="flex items-center">
              <img src={pokemon2.sprites.back_default} alt={pokemon2.name || "Pokémon"} className="w-40 h-40" />
              <span className=" text-gray-500">{"<"}</span>
              <div className="relative flex items-center border border-gray-400 rounded-lg px-4 py-2">
                <strong className="text-lg font-semibold">{pokemon2.name}</strong>
                {move2 ? (
                  <div className="ml-3 bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full">
                    {move2.move.name}: {move2.power}
                  </div>
                ) : (
                  <div className="ml-3 bg-red-200 text-red-800 text-sm px-3 py-1 rounded-full">Move not found</div>
                )}
                
              </div>
            </div>
            
          )}
        </div>

        <div className="border border-gray-300 mt-4 px-4 py-6">
          <h3 className="text-lg font-semibold mb-2">Battle Log</h3>
          <div className="bg-gray-100 p-4 rounded-lg min-h-[50px] text-gray-700">
            {battleLog || "Click 'Start Battle' to begin!"}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => dispatch(startBattle())}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Start Battle!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattleView;
