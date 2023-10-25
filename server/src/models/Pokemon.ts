import mongoose, { Document, ObjectId, Schema } from "mongoose";

type SacrificeSlot = {
  name: string | null;
  stars: number;
  amount: number;
  slot: number;
};

export interface Pokemon extends Document {
  _id: ObjectId;
  user: string;
  name: string;
  level: number;
  stars: number;
  cp: number;
  sacrifices: SacrificeSlot[];
  inBattle: number;
  battleSlot: number;
  nextLevelCost: number;
}

export const PokemonSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  user: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  stars: { type: Number, required: true },
  cp: { type: Number, required: true },
  sacrifices: { type: Array, required: true },
  inBattle: { type: Number, required: true },
  battleSlot: { type: Number, required: true },
  nextLevelCost: { type: Number, required: true },
});

const PokemonModel = mongoose.model<Pokemon>("Pokemon", PokemonSchema);

export default PokemonModel;
