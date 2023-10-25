import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";

export const getLevelUpCost = (pokemon: Pokemon) => {
  return Math.floor(
    serverConfig.level_cost_a1 *
      serverConfig.level_cost_r ** (pokemon.level - 1)
  );
};
