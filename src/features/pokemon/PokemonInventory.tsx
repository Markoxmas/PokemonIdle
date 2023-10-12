import Pokemon from "./PokemonCard";
import { useAppSelector } from "../../app/hooks";
import Container from "@mui/material/Container";

function PokemonInventory() {
  const pokemon = useAppSelector((state) => state.pokemon.pokemon);
  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {pokemon.map((p) => (
        <Pokemon pokemon={p} />
      ))}
    </Container>
  );
}

export default PokemonInventory;
