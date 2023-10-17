import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { normalSummonPokemon } from "./summonSlice";

export default function BasicCard() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.inventory);
  const normalSummonScrolls = items.find(
    (item) => item.name === "normalSummonScroll"
  );
  console.log(normalSummonScrolls);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Card sx={{ minWidth: 275, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Normal summon
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Scrolls: {normalSummonScrolls.amount}
          </Typography>
          <Typography variant="body2">
            You can summon
            <br />
            any Pokemon with this summon.
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            disabled={normalSummonScrolls.amount < 1}
            onClick={() => dispatch(normalSummonPokemon(1))}
          >
            Summon 1
          </Button>
          <Button
            size="small"
            disabled={normalSummonScrolls.amount < 10}
            onClick={() => dispatch(normalSummonPokemon(10))}
          >
            Summon 10
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
