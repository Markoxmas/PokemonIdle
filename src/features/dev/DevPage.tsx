import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  restartAccount,
  addNormalSummonScrolls,
  addExp,
  createSpecificPokemon,
} from "./devSlice";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function DevPage() {
  const dispatch = useAppDispatch();
  const pokedex = useAppSelector((state) => state.pokedex.pokedex);
  const [selectedPokemon, setSelectedPokemon] = useState("Houndour");
  const [selectedStars, setSelectedStars] = useState(3);
  const [selectedLevel, setSelectedLevel] = useState(1);

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
          key="restart-account"
          onClick={() => {
            dispatch(restartAccount());
          }}
        >
          Restart account
        </Button>
        <Button
          key="add-1000-scrolls-of-summon"
          onClick={() => {
            dispatch(addNormalSummonScrolls(1000));
          }}
        >
          Add 1000 scrolls of summon
        </Button>
        <Button
          key="add-1m-exp"
          onClick={() => {
            dispatch(addExp(1000000));
          }}
        >
          Add 1M exp
        </Button>
      </ButtonGroup>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Autocomplete
          disablePortal
          id="pokemon-dropdown"
          options={pokedex.map((pokemon) => pokemon.name)}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Pokemon" />}
          value={selectedPokemon}
          onChange={(event, newValue) => {
            setSelectedPokemon(newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="stars-dropdown"
          options={[3, 4, 5, 6, 7, 8, 9, 10]}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Stars" />}
          value={selectedStars}
          onChange={(event, newValue) => {
            setSelectedStars(newValue === null ? 3 : newValue);
          }}
        />
        <Autocomplete
          disablePortal
          id="level-dropdown"
          options={Array.from({ length: 300 }, (_, index) => index + 1)}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Level" />}
          value={selectedLevel}
          onChange={(event, newValue) => {
            setSelectedLevel(newValue === null ? 1 : newValue);
          }}
        />
        <Button
          key="add-pokemon"
          variant="contained"
          onClick={() => {
            dispatch(
              createSpecificPokemon({
                //@ts-ignore
                name: selectedPokemon,
                stars: selectedStars,
                level: selectedLevel,
              })
            );
          }}
        >
          Add pokemon
        </Button>
      </div>
    </Box>
  );
}
