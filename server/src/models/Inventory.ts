import mongoose, { Document, Schema } from "mongoose";

export interface Item {
  name: string;
  image: string;
  amount: number;
}

export interface InventoryDocument extends Document {
  user: string;
  items: Item[];
}

const itemSchema = new Schema<Item>({
  name: { type: String, required: true },
  amount: { type: Number, required: true, default: 1 },
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
