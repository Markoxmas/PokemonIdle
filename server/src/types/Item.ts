import { ItemKind } from "./ItemKind";

export type Item = {
  stackable: boolean;
  type: ItemKind;
  name: string;
  image: string;
  amount: number;
};
