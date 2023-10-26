import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";

export const getStarSacrifices = (pokemon: Pokemon) => {
  if (pokemon.stars < serverConfig.max_star_level) {
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
              name: pokemon.name,
              stars: sacrifice.stars,
              amount: sacrifice.amount,
              slot: sacrifice.slot,
            }
    );

    return sacrifices;
  }
  return [];
};
