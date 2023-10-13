import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../app/hooks";

export default function BasicCard() {
  const { normalSummonScrolls } = useAppSelector((state) => state.inventory);
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
            Scrolls: {normalSummonScrolls}
          </Typography>
          <Typography variant="body2">
            You can summon
            <br />
            any Pokemon with this summon.
          </Typography>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "center" }}>
          <Button size="small" disabled={normalSummonScrolls < 1}>
            Summon 1
          </Button>
          <Button size="small" disabled={normalSummonScrolls < 10}>
            Summon 10
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
