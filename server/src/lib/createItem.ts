import { ItemKind } from "../types/ItemKind";

export const createItem = (kind: ItemKind, amount = 0) => {
  switch (kind) {
    case ItemKind.exp:
      return {
        stackable: true,
        type: ItemKind.exp,
        name: "Exp",
        image: "exp",
        amount: amount,
      };
    case ItemKind.normalSummonScroll:
      return {
        stackable: true,
        type: ItemKind.normalSummonScroll,
        name: "Normal Summon Scroll",
        image: "normalSummonScroll",
        amount: amount,
      };
  }
};
