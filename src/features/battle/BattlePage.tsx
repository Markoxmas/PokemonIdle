import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import BattlePokemonCard from "./BattlePokemonCard";
import EmptyBattleSlot from "./EmptyBattleSlot";
import { openBattleModal, claimDrops } from "./battleSlice";
import BattleModal from "./BattleModal";
import DropsModal from "./DropsModal";
import BattleTimer from "./BattleTimer";

function BattlePage() {
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector((state) => state.pokemon.pokemon);
  const pokemonInBattle = pokemon
    .filter((p) => p.inBattle === 1)
    .sort((a, b) => a.battleSlot - b.battleSlot); //Because it's battlefield number 1
  const desiredLength = 5;
  const battleSlots = Array.from(
    { length: desiredLength },
    (_, index) => pokemonInBattle[index] || undefined
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <BattleTimer />
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {battleSlots.map((pokemon) =>
          pokemon ? (
            <BattlePokemonCard pokemon={pokemon} />
          ) : (
            <EmptyBattleSlot />
          )
        )}
      </div>
      <Button
        variant="contained"
        style={{ marginTop: "20px" }}
        onClick={() => dispatch(openBattleModal())}
      >
        Modify
      </Button>
      <Button
        variant="contained"
        style={{ marginTop: "20px" }}
        onClick={() =>
          dispatch(claimDrops(pokemon.filter((p) => p.inBattle === 1)))
        }
      >
        Claim drops
      </Button>
      <BattleModal battleSlots={battleSlots} />
      <DropsModal />
    </div>
  );
}

export default BattlePage;
