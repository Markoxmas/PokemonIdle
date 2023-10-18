import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ITEM } from "../../assets/items/index";
import { Item as ItemType } from "./inventorySlice";

export default function Item({ item }: { item: ItemType }) {
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
        sx={{ display: "inline-block", padding: "10px", minWidth: "150px" }}
      >
        <div>
          <b>{item.name} </b>
        </div>
        <img width={80} src={ITEM[item.image]} alt={item.name} />
        <div>{item.amount}</div>
      </Paper>
    </Box>
  );
}
