import { BattleTimeline } from "../models/BattleTimeline";

export const getBattleKills = (
  battleTimeline: BattleTimeline,
  damageDone: number
) => {
  return battleTimeline.startHp - damageDone > 0
    ? 0
    : Math.floor(
        (damageDone - battleTimeline.startHp) / battleTimeline.maxHp + 1
      );
};
