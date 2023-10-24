import { BattleTimeline } from "../models/BattleTimeline";
import { Pokemon } from "../models/Pokemon";

export const addCheckpointToTimeline = (
  battleTimeline: BattleTimeline,
  checkpointPokemons: Pokemon[]
) => {
  const time = Date.now();

  if (battleTimeline.checkpoints.length === 0) {
    battleTimeline.startTime = time;
  }
  battleTimeline.checkpoints.push({
    startTime: time,
    pokemon: checkpointPokemons,
  });

  return battleTimeline;
};
