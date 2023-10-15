import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { AVATAR } from "../../assets/avatars/index";
import StarIcon from "@mui/icons-material/Star";
import { Pokemon } from "./pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleSacrifice } from "../upgrade/upgradeSlice";
import { useState, useEffect } from "react";

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

export default function SacrificePokemonCard({
  pokemon,
}: {
  pokemon: Pokemon;
}) {
  const dispatch = useAppDispatch();
  const { sacrifices, sacrificeSlot } = useAppSelector(
    (state) => state.upgrade
  );
  const [sacrificeIds, setSacrificeIds] = useState(
    sacrifices[sacrificeSlot.slot] || []
  );

  useEffect(() => {
    setSacrificeIds(sacrifices[sacrificeSlot.slot] || []);
  }, [sacrifices]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
        textAlign: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ display: "inline-block", padding: "10px" }}
        onClick={() => {
          dispatch(toggleSacrifice(pokemon._id));
        }}
        style={
          sacrificeIds.includes(pokemon._id)
            ? { border: "3px solid black" }
            : {}
        }
      >
        <div>
          <b>{pokemon.name} </b> ({pokemon.level})
        </div>
        <img width={120} src={AVATAR[pokemon.name]} alt={pokemon.name} />
        <div>CP {pokemon.cp}</div>
        <div>{renderStars(pokemon.stars)}</div>
      </Paper>
    </Box>
  );
}
