import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { levelUpPokemon, starUpPokemon } from "./upgradeSlice";
import UpgradePokemonCard from "./UpgradePokemonCard";
import SacrificeSlotPokemonCard from "./SacrificeSlotPokemonCard";
import UpgradeModal from "./UpgradeModal";
import { Pokemon } from "../pokemon/pokemonSlice";
import { ItemKind } from "../inventory/inventorySlice";

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
  const exp = inventory.items.find((item) => item.type === ItemKind.exp);

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
              disabled={exp.amount < 1000}
              onClick={() => dispatch(levelUpPokemon(selectedPokemon._id))}
            >
              Level up ({selectedPokemon.nextLevelCost} exp)
            </Button>
            <div>You have {exp.amount} exp</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {selectedPokemon.sacrifices.map((sacrificeSlot) => (
              <SacrificeSlotPokemonCard sacrificeSlot={sacrificeSlot} />
            ))}
          </div>
          <Button
            variant="contained"
            disabled={!sacrificesFulfilled}
            onClick={() =>
              dispatch(
                starUpPokemon({ pokemonId: selectedPokemon._id, sacrifices })
              )
            }
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
