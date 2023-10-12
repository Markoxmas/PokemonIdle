import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { AVATAR } from "../../assets/avatars/index";
import StarIcon from "@mui/icons-material/Star";

export default function Pokemon() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <Paper elevation={3} sx={{ display: "inline-block", padding: "10px" }}>
        <div>
          <b>Charizard </b> (23)
        </div>
        <img width={150} src={AVATAR.Charizard} alt="Charizard" />
        <div>CP 5342</div>
        <div>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
      </Paper>
    </Box>
  );
}
