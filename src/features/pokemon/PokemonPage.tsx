import PokemonInventory from "./PokemonInventory";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchAllPokemon } from "./pokemonSlice";
import PokemonSearch from "./PokemonSearch";

function PokemonPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  return (
    <div>
      <PokemonSearch />
      <PokemonInventory />
    </div>
  );
}

export default PokemonPage;
