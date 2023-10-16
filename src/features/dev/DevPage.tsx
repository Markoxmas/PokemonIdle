import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  summonPokemon,
  deleteAllPokemon,
  deleteInventory,
  createInventory,
  addNormalSummonScrolls,
  addExp,
  createBattleTimeline,
  deleteBattleTimeline,
} from "./devSlice";

export default function DevPage() {
  const dispatch = useAppDispatch();
  const { status, success } = useAppSelector((state) => state.dev);

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
        <Button
          key="create-a-pokemon"
          onClick={() => dispatch(summonPokemon(1))}
        >
          Create a pokemon
        </Button>
        <Button
          key="create-5-pokemons"
          onClick={() => dispatch(summonPokemon(5))}
        >
          Create 5 pokemons
        </Button>
        <Button
          key="delete-all-pokemons"
          onClick={() => dispatch(deleteAllPokemon())}
        >
          Delete all pokemons
        </Button>
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button
          key="restart-inventory"
          onClick={() => {
            dispatch(deleteInventory());
          }}
        >
          Delete inventory
        </Button>
        <Button
          key="create-inventory"
          onClick={() => {
            dispatch(createInventory());
          }}
        >
          Create inventory
        </Button>
        <Button
          key="add-100-normal-summon-scrolls"
          onClick={() => dispatch(addNormalSummonScrolls(100))}
        >
          Add 100 normal summon scrolls
        </Button>
        <Button
          key="add-100-normal-summon-scrolls"
          onClick={() => dispatch(addExp(10000))}
        >
          Add 10000 exp
        </Button>
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button
          key="create-battle-timeline"
          onClick={() => dispatch(createBattleTimeline())}
        >
          Create battle timeline
        </Button>
        <Button
          key="delete-battle-timeline"
          onClick={() => dispatch(deleteBattleTimeline())}
        >
          Delete battle timeline
        </Button>
      </ButtonGroup>
    </Box>
  );
}
