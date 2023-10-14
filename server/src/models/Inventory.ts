import mongoose, { Document, Schema } from "mongoose";

export interface InventoryDocument extends Document {
  user: string;
  normalSummonScrolls: number;
  gold: number;
}

const inventorySchema = new Schema<InventoryDocument>({
  user: { type: String, required: true },
  normalSummonScrolls: { type: Number, required: true, default: 0 },
  gold: { type: Number, required: true, default: 0 },
});

const Inventory = mongoose.model<InventoryDocument>(
  "Inventory",
  inventorySchema
);

export default Inventory;
