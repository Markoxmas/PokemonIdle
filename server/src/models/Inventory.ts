import mongoose, { Document, Schema } from "mongoose";

export enum ItemKind {
  exp,
  normalSummonScroll,
}

export type Item = {
  stackable: boolean;
  type: ItemKind;
  name: string;
  image: string;
  amount: number;
};

export interface Inventory extends Document {
  user: string;
  items: Item[];
}

const itemSchema = new Schema<Item>({
  stackable: { type: Boolean, required: true },
  type: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
});

const inventorySchema = new Schema<Inventory>({
  user: { type: String, required: true },
  items: [itemSchema],
});

const Inventory = mongoose.model<Inventory>("Inventory", inventorySchema);

export default Inventory;
