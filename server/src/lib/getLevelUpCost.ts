import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";

export const getLevelUpCost = (pokemon: Pokemon) => {
  return Math.floor(
    serverConfig.levelCostA1 * serverConfig.levelCostR ** (pokemon.level - 1)
  );
};
