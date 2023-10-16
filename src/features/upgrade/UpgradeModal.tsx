import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { closeSacrificeModal } from "./upgradeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "@mui/material/Button";
import SacrificePokemonCard from "./SacrificePokemonCard";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function SummonModal() {
  const dispatch = useAppDispatch();
  const { pokemonId, sacrifices, sacrificeSlot, openSacrificeModal } =
    useAppSelector((state) => state.upgrade);
  const { pokemon } = useAppSelector((state) => state.pokemon);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openSacrificeModal}
        onClose={() => dispatch(closeSacrificeModal())}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openSacrificeModal}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              style={{ marginBottom: "20px" }}
            >
              {sacrifices[sacrificeSlot.slot].length}/{sacrificeSlot.amount}
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {sacrificeSlot.name &&
                pokemon
                  .filter(
                    (p) =>
                      p._id !== pokemonId &&
                      p.name === sacrificeSlot.name &&
                      p.stars === sacrificeSlot.stars
                  )
                  .map((p) => <SacrificePokemonCard pokemon={p} />)}
              {sacrificeSlot.name === null &&
                pokemon
                  .filter(
                    (p) =>
                      p._id !== pokemonId && p.stars === sacrificeSlot.stars
                  )
                  .map((p) => <SacrificePokemonCard pokemon={p} />)}
            </div>
            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              onClick={() => dispatch(closeSacrificeModal())}
            >
              Choose
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
