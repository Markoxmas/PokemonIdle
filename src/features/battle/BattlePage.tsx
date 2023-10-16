import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import BattlePokemonCard from "./BattlePokemonCard";
import EmptyBattleSlot from "./EmptyBattleSlot";
import { openBattleModal } from "./battleSlice";
import BattleModal from "./BattleModal";

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
      <h1 style={{ textAlign: "center" }}>0:00:00</h1>
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
      <Button variant="contained" style={{ marginTop: "20px" }}>
        Claim drops
      </Button>
      <BattleModal battleSlots={battleSlots} />
    </div>
  );
}

export default BattlePage;
