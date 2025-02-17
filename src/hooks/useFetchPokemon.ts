import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../store/action";
import { RootState, AppDispatch } from "../store";

//custom hook to get pokemon data - players and loading from redux store 
const useFetchPokemon = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { players, loading } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    if (!players.length) {
      dispatch(fetchPokemon());
    }
  }, [dispatch, players.length]);

  return { players, loading };
};

export default useFetchPokemon;