import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";
import { getPokedex } from "./getPokedex";

export const getEvolutionData = (pokemon: Pokemon) => {
  if (
    pokemon.stars === serverConfig.evolution_1st_stage ||
    pokemon.stars === serverConfig.evolution_2nd_stage
  ) {
    const pokedex = getPokedex();
    const pokedexPokemon = pokedex.find(
      (dexPokemon) => dexPokemon.name === pokemon.name
    );
    if (pokedexPokemon?.evolution) {
      const evolutionPokemon = pokedex.find(
        (dexPokemon) => dexPokemon.name === pokedexPokemon.evolution
      );
      if (evolutionPokemon) {
        return {
          pokedexId: evolutionPokemon.id,
          name: evolutionPokemon.name,
        };
      }
    }
  }
  return {
    pokedexId: pokemon.pokedexId,
    name: pokemon.name,
  };
};
