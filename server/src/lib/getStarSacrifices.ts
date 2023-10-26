import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";
import { getPokedex } from "./getPokedex";

export const getStarSacrifices = (pokemon: Pokemon) => {
  if (pokemon.stars < serverConfig.max_star_level) {
    const pokedexPokemon = getPokedex().find(
      (dexPokemon) => dexPokemon.name === pokemon.name
    );
    //@ts-ignore
    const sacrifices = serverConfig[
      "sacrifices_" + pokemon.stars + "_star"
    ].map(
      (sacrifice: {
        type: string;
        stars: number;
        amount: number;
        slot: number;
      }) =>
        sacrifice.type === "any"
          ? {
              name: null,
              stars: sacrifice.stars,
              amount: sacrifice.amount,
              slot: sacrifice.slot,
            }
          : {
              name: pokedexPokemon?.basicPokemon,
              stars: sacrifice.stars,
              amount: sacrifice.amount,
              slot: sacrifice.slot,
            }
    );

    return sacrifices;
  }
  return [];
};
