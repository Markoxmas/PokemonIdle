import { Checkpoint } from "../models/BattleTimeline";
import { Pokemon } from "../models/Pokemon";

export const updateCheckpointPokemon = (
  checkpoint: Checkpoint,
  pokemonChanges: { update: Pokemon[]; remove: Pokemon[] }
): Checkpoint => {
  const checkpointPokemon = [...checkpoint.pokemon];
  const { update, remove } = pokemonChanges;

  if (update.length) {
    update.forEach((pokemon) => {
      const indexOfPokemon = checkpointPokemon.findIndex(
        (checkpointPokemon) =>
          checkpointPokemon._id.toString() === pokemon._id.toString()
      );
      if (indexOfPokemon !== -1) {
        checkpointPokemon[indexOfPokemon] = pokemon;
      }
    });
  }

  if (remove.length) {
    remove.forEach((pokemon) => {
      const indexOfPokemon = checkpointPokemon.findIndex(
        (checkpointPokemon) => checkpointPokemon._id === pokemon._id
      );
      if (indexOfPokemon !== -1) {
        checkpointPokemon.splice(indexOfPokemon, 1);
      }
    });
  }

  return {
    startTime: Date.now(),
    pokemon: checkpointPokemon,
  };
};
