import { getDropTable } from "./getDropTable";

export const getBattleDrops = (damageDone: number, kills: number) => {
  const dropTable = getDropTable();
  return [
    {
      name: "Exp",
      image: "exp",
      amount: Math.floor(dropTable.exp * damageDone),
    },
    {
      name: "Normal Summon Scroll",
      image: "normalSummonScroll",
      amount: dropTable.normalSummonScroll * kills,
    },
  ];
};
