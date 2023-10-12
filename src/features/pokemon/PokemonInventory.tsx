import Pokemon from "./PokemonCard";
import { useAppSelector } from "../../app/hooks";
import Container from "@mui/material/Container";

function PokemonInventory() {
  const { pokemon, searchInput } = useAppSelector((state) => state.pokemon);
  return (
    <Container
      maxWidth="md"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {pokemon
        .filter((p) => p.name.toLowerCase().includes(searchInput.toLowerCase()))
        .map((p) => (
          <Pokemon pokemon={p} />
        ))}
    </Container>
  );
}

export default PokemonInventory;
