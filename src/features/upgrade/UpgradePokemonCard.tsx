import { Pokemon } from "../pokemon/pokemonSlice";
import StarIcon from "@mui/icons-material/Star";
import { AVATAR } from "../../assets/avatars/index";
import { formatNumber } from "../../lib/formatNumber";

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

function UpgradePokemonCard({ selectedPokemon }: { selectedPokemon: Pokemon }) {
  return (
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
      <div>CP {formatNumber(selectedPokemon.cp)}</div>
      <div>{renderStars(selectedPokemon.stars)}</div>
    </div>
  );
}

export default UpgradePokemonCard;
