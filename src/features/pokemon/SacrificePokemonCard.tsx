import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { AVATAR } from "../../assets/avatars/index";
import StarIcon from "@mui/icons-material/Star";
import { Pokemon } from "./pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleSacrifice } from "../upgrade/upgradeSlice";

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
  const { slot } = useAppSelector((state) => state.upgrade);
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
          dispatch(toggleSacrifice({ id: pokemon._id, slot }));
        }}
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
