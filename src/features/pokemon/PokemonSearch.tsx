import TextField from "@mui/material/TextField";
import { useAppDispatch } from "../../app/hooks";
import { setSearchInput } from "./pokemonSlice";

function PokemonSearch() {
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event.target.value));
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <TextField
        id="search-field"
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default PokemonSearch;
