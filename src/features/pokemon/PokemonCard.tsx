import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { AVATAR } from "../../assets/avatars/index";
import StarIcon from "@mui/icons-material/Star";
import { Pokemon } from "./pokemonSlice";
import { useAppDispatch } from "../../app/hooks";
import { setTab, Tab } from "../navigation/navigationSlice";
import { initUpgradePage } from "../upgrade/upgradeSlice";
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

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const dispatch = useAppDispatch();
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
          dispatch(initUpgradePage(pokemon));
          dispatch(setTab(Tab.Upgrade));
        }}
      >
        <div>
          <b>{pokemon.name} </b> ({pokemon.level})
        </div>
        <img width={120} src={AVATAR[pokemon.name]} alt={pokemon.name} />
        <div>CP {formatNumber(pokemon.cp)}</div>
        <div>{renderStars(pokemon.stars)}</div>
      </Paper>
    </Box>
  );
}
