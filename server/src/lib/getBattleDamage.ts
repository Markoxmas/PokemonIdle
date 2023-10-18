import { BattleTimeline } from "../types/BattleTimeline";

export const getBattleDamage = (battleTimeline: BattleTimeline) => {
  const checkpoints = battleTimeline.checkpoints;
  return checkpoints.reduce((totalDamage, checkpoint, i) => {
    const time2 =
      i !== checkpoints.length - 1
        ? checkpoints[i + 1].startTime / 1000
        : Date.now() / 1000;
    const time1 = checkpoint.startTime / 1000;
    const damage = checkpoint.pokemon.reduce(
      (total, pokemon) => total + pokemon.cp,
      0
    );
    return totalDamage + Math.floor(damage * (time2 - time1));
  }, 0);
};
