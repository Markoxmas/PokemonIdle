import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";

export const getMaxLevel = (pokemon: Pokemon) => {
  //@ts-ignore
  return serverConfig["max_level_" + pokemon.stars + "_star"];
};
