import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "@mui/material/Button";
import { ITEM } from "../../assets/items/index";
import Item from "../inventory/Item";
import { closeDropsModal } from "./battleSlice";

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

export default function DropsModal() {
  const dispatch = useAppDispatch();
  const { openDropsModal, drops } = useAppSelector((state) => state.battle);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDropsModal}
        onClose={() => dispatch(closeDropsModal())}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDropsModal}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              style={{ marginBottom: "20px" }}
            >
              Congratulations, you've claimed:
            </Typography>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {drops.map((item) => (
                <Item item={item} />
              ))}
            </div>
            <Button
              variant="outlined"
              style={{ marginTop: "20px" }}
              onClick={() => dispatch(closeDropsModal())}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
