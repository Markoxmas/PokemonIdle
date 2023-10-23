import mongoose, { Document, Schema } from "mongoose";
import { Item } from "../types/Item";
import { ItemKind } from "../types/ItemKind";

export interface InventoryDocument extends Document {
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

const inventorySchema = new Schema<InventoryDocument>({
  user: { type: String, required: true },
  items: [itemSchema],
});

const Inventory = mongoose.model<InventoryDocument>(
  "Inventory",
  inventorySchema
);

export default Inventory;
