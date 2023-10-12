import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export default function DevPage() {
  return (
    <Box
      sx={{
        textAlign: "center",
        marginTop: "20px",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button key="create-a-pokemon">Create a pokemon</Button>
        <Button key="create-5-pokemons">Create 5 pokemons</Button>
        <Button key="delete-all-pokemons">Delete all pokemons</Button>
      </ButtonGroup>
    </Box>
  );
}
