import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import emptyBattleSlot from "../../assets/icons/emptyBattleSlot.png";
import { useAppDispatch } from "../../app/hooks";
import { openBattleModal } from "./battleSlice";

export default function EmptyBattleSlot() {
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        m: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          width: "150px",
        }}
        onClick={() => dispatch(openBattleModal())}
      >
        <img width={70} src={emptyBattleSlot} alt="Empty Slot" />
      </Paper>
    </Box>
  );
}
