import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { levelUpPokemon } from "./upgradeSlice";
import UpgradePokemonCard from "../pokemon/UpgradePokemonCard";
import SacrificeSlotPokemonCard from "../pokemon/SacrificeSlotPokemonCard";

function UpgradePage() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.pokemon.pokemon);
  const selectedPokemonId = useAppSelector((state) => state.upgrade.pokemonId);
  const selectedPokemon = allPokemon.find(
    (pokemon) => pokemon._id === selectedPokemonId
  );
  const inventory = useAppSelector((state) => state.inventory);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      {selectedPokemon && (
        <div>
          <UpgradePokemonCard selectedPokemon={selectedPokemon} />
          <div style={{ margin: "20px" }}>
            <Button
              variant="contained"
              disabled={inventory.exp < 1000}
              onClick={() => dispatch(levelUpPokemon(selectedPokemon._id))}
            >
              Level up (1000 exp)
            </Button>
            <div>You have {inventory.exp} exp</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {selectedPokemon.sacrifices.map((sacrificeSlot) => (
              <SacrificeSlotPokemonCard sacrificeSlot={sacrificeSlot} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpgradePage;
