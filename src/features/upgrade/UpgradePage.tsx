import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { levelUpPokemon } from "./upgradeSlice";
import UpgradePokemonCard from "../pokemon/UpgradePokemonCard";
import SacrificeSlotPokemonCard from "../pokemon/SacrificeSlotPokemonCard";
import UpgradeModal from "./UpgradeModal";
import { Pokemon } from "../pokemon/pokemonSlice";

function areSacrificesFulfilled(pokemon: Pokemon, sacrifices: string[][]) {
  for (let i = 0; i < pokemon.sacrifices.length; i++) {
    if (pokemon.sacrifices[i].amount !== sacrifices[i].length) {
      return false;
    }
  }
  return true;
}

function UpgradePage() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.pokemon.pokemon);
  const selectedPokemonId = useAppSelector((state) => state.upgrade.pokemonId);
  const selectedPokemon = allPokemon.find(
    (pokemon) => pokemon._id === selectedPokemonId
  );
  const inventory = useAppSelector((state) => state.inventory);
  const { sacrifices } = useAppSelector((state) => state.upgrade);
  const sacrificesFulfilled = selectedPokemon
    ? areSacrificesFulfilled(selectedPokemon, sacrifices)
    : false;

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
          <Button
            variant="contained"
            disabled={!sacrificesFulfilled}
            onClick={() => {}}
          >
            Star up
          </Button>
          <UpgradeModal />
        </div>
      )}
    </div>
  );
}

export default UpgradePage;
