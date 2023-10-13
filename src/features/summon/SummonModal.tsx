import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { closeModal } from "./summonSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SummonPokemonCard from "../pokemon/SummonPokemonCard";
import Button from "@mui/material/Button";

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
  const { openModal, summonedPokemon } = useAppSelector(
    (state) => state.summon
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => dispatch(closeModal())}
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
              Congratulations, you've summoned {summonedPokemon.length} Pokemon!
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {summonedPokemon.map((pokemon) => (
                <SummonPokemonCard pokemon={pokemon} />
              ))}
            </div>
            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              onClick={() => dispatch(closeModal())}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
