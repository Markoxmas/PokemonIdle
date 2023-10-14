import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AVATAR } from "../../assets/avatars/index";
import { levelUpPokemon } from "./upgradeSlice";

import StarIcon from "@mui/icons-material/Star";

const renderStars = (amount: number) => {
  const stars = [];
  if (amount < 6) {
    for (let i = 0; i < amount; i++) {
      stars.push(<StarIcon key={i} style={{ color: "yellow" }} />);
    }
  } else {
    for (let i = 0; i < amount - 5; i++) {
      stars.push(<StarIcon key={i} style={{ color: "red" }} />);
    }
  }

  return stars;
};

function UpgradePage() {
  const dispatch = useAppDispatch();
  const allPokemon = useAppSelector((state) => state.pokemon.pokemon);
  const selectedPokemonId = useAppSelector((state) => state.upgrade.pokemonId);
  const selectedPokemon = allPokemon.find(
    (pokemon) => pokemon._id === selectedPokemonId
  );
  const inventory = useAppSelector((state) => state.inventory);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {selectedPokemon && (
        <div>
          <div>
            <div>
              <b>{selectedPokemon.name}</b>
            </div>
            <div>Lv. {selectedPokemon.level}</div>
            <img
              width={200}
              src={AVATAR[selectedPokemon.name]}
              alt={selectedPokemon.name}
            />
            <div>CP {selectedPokemon.cp}</div>
            <div>{renderStars(selectedPokemon.stars)}</div>
          </div>
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
        </div>
      )}
    </div>
  );
}

export default UpgradePage;
