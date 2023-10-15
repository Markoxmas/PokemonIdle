import StarIcon from "@mui/icons-material/Star";
import { AVATAR } from "../../assets/avatars/index";
import sacrificePokeball from "../../assets/icons/sacrificePokeball.png";
import { SacrificeSlot } from "../upgrade/upgradeSlice";
import Paper from "@mui/material/Paper";
import { openSacrificeModal } from "../upgrade/upgradeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const renderStars = (amount: number) => {
  const stars = [];
  if (amount < 6) {
    for (let i = 0; i < amount; i++) {
      stars.push(<StarIcon key={i} style={{ color: "yellow" }} />);
    }
  } else {
    for (let i = 0; i < amount - 5; i++) {
      stars.push(
        <StarIcon key={i} style={{ color: "red" }} sx={{ width: "15px" }} />
      );
    }
  }

  return stars;
};

function SacrificeSlotPokemonCard({
  sacrificeSlot,
}: {
  sacrificeSlot: SacrificeSlot;
}) {
  const dispatch = useAppDispatch();
  const { sacrifices } = useAppSelector((state) => state.upgrade);
  const chosenSacrifices = sacrifices[sacrificeSlot.slot].length;
  const neededSacrifices = sacrificeSlot.amount;
  return (
    <Paper
      elevation={1}
      sx={{ display: "inline-block", padding: "5px", margin: "10px" }}
      onClick={() => dispatch(openSacrificeModal(sacrificeSlot))}
      style={chosenSacrifices !== neededSacrifices ? { opacity: 0.5 } : {}}
    >
      <div>
        {chosenSacrifices}/{neededSacrifices}
      </div>
      {sacrificeSlot.name ? (
        <div>
          <b>{sacrificeSlot.name}</b>
        </div>
      ) : (
        <div>&nbsp;</div>
      )}
      {sacrificeSlot.name ? (
        <img
          width={100}
          src={AVATAR[sacrificeSlot.name]}
          alt={sacrificeSlot.name}
        />
      ) : (
        <div>
          <img width={100} src={sacrificePokeball} alt="Any pokemon" />
        </div>
      )}
      <div>{renderStars(sacrificeSlot.stars)}</div>
    </Paper>
  );
}

export default SacrificeSlotPokemonCard;
