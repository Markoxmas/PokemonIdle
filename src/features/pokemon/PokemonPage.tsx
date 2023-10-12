import PokemonInventory from "./PokemonInventory";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchAllPokemon } from "./pokemonSlice";

function PokemonPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllPokemon());
  }, []);

  return (
    <div>
      <PokemonInventory />
    </div>
  );
}

export default PokemonPage;
