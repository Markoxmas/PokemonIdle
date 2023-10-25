import { Pokemon } from "../models/Pokemon";
import { serverConfig } from "../serverConfig";

export default function calculateCp(pokemon: Pokemon): number {
  return Math.floor(
    serverConfig.level_cp_a1 *
      serverConfig.level_cp_r ** (pokemon.level - 1) *
      (1 +
        (serverConfig.star_cp_a1 *
          serverConfig.star_cp_r ** (pokemon.stars - 1)) /
          100)
  );
}
