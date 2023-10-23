import { BattleTimeline } from "../models/BattleTimeline";
import { getBattleDamage } from "./getBattleDamage";
import { getBattleDrops } from "./getBattleDrops";
import { getBattleKills } from "./getBattleKills";

export const getBattleResults = (battleTimeline: BattleTimeline) => {
  const damageDone = getBattleDamage(battleTimeline);
  const kills = getBattleKills(battleTimeline, damageDone);
  const drops = getBattleDrops(damageDone, kills);
  const startHp =
    battleTimeline.startHp - damageDone + kills * battleTimeline.maxHp;
  return {
    damageDone,
    kills,
    drops,
    startHp,
  };
};
