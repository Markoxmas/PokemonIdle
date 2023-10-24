import { BattleTimeline } from "../models/BattleTimeline";
import { Pokemon } from "../models/Pokemon";

export const getPokemonsToKickOut = (
  battle: BattleTimeline,
  currentPokemons: Pokemon[]
) => {
  if (battle.checkpoints.length === 0) {
    return [];
  } else {
    const lastPokemons =
      battle.checkpoints[battle.checkpoints.length - 1].pokemon;
    const reset: Pokemon[] = [];

    lastPokemons.forEach((pokemon) => {
      const foundPokemon = currentPokemons.find(
        (currentPokemon) => currentPokemon._id === pokemon._id
      );
      if (!foundPokemon) {
        reset.push(pokemon);
      }
    });

    return reset;
  }
};
