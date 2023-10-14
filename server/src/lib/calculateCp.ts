import { Pokemon } from "../types/Pokemon";

export default function calculateCp(pokemon: Pokemon): number {
  return Math.floor(
    20 * 1.08 ** (pokemon.level - 1) * (1 + pokemon.stars * 0.1)
  );
}
