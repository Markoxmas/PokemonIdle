import { getDropTable } from "./getDropTable";
import { ItemKind } from "../types/ItemKind";

export const getBattleDrops = (damageDone: number, kills: number) => {
  const dropTable = getDropTable();
  return [
    {
      stackable: true,
      type: ItemKind.exp,
      name: "Exp",
      image: "exp",
      amount: Math.floor(dropTable.exp * damageDone),
    },
    {
      stackable: true,
      type: ItemKind.normalSummonScroll,
      name: "Normal Summon Scroll",
      image: "normalSummonScroll",
      amount: dropTable.normalSummonScroll * kills,
    },
  ];
};
