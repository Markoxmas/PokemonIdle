import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { AVATAR } from "../../assets/avatars/index";
import StarIcon from "@mui/icons-material/Star";
import { Pokemon } from "../pokemon/pokemonSlice";

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

export default function SummonPokemonCard({ pokemon }: { pokemon: Pokemon }) {
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
      <Paper elevation={3} sx={{ display: "inline-block", padding: "10px" }}>
        <div>
          <b>{pokemon.name} </b>
        </div>
        <img width={120} src={AVATAR[pokemon.name]} alt={pokemon.name} />
        <div>{renderStars(pokemon.stars)}</div>
      </Paper>
    </Box>
  );
}
