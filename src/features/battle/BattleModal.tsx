import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "@mui/material/Button";
import { Pokemon } from "../pokemon/pokemonSlice";
import BattlePokemonCard from "./BattlePokemonCard";
import EmptyBattleSlot from "./EmptyBattleSlot";
import { closeBattleModal } from "./battleSlice";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function SummonModal({
  battleSlots,
}: {
  battleSlots: Pokemon[] | undefined[];
}) {
  const dispatch = useAppDispatch();
  const { openModal } = useAppSelector((state) => state.battle);
  const { pokemon } = useAppSelector((state) => state.pokemon);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => dispatch(closeBattleModal())}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              style={{ marginBottom: "20px" }}
            >
              Choose Pokemon for battle!
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {battleSlots.map((pokemon) =>
                pokemon ? (
                  <BattlePokemonCard pokemon={pokemon} />
                ) : (
                  <EmptyBattleSlot />
                )
              )}
            </div>
            <Divider sx={{ margin: "10px" }} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                height: "500px",
                overflow: "auto",
              }}
            >
              {pokemon
                .filter((p) => p.inBattle === 0)
                .sort((a, b) => b.cp - a.cp)
                .map((p) => (
                  <BattlePokemonCard pokemon={p} />
                ))}
            </div>

            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              onClick={() => dispatch(closeBattleModal())}
            >
              Choose
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}