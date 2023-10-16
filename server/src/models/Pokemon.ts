import mongoose, { Document, Schema } from "mongoose";

type SacrificeSlot = {
  name: string | null;
  stars: number;
  amount: number;
  slot: number;
};

export interface IPokemon extends Document {
  user: string;
  name: string;
  level: number;
  stars: number;
  cp: number;
  sacrifices: SacrificeSlot[];
  inBattle: number;
  battleSlot: number;
}

const PokemonSchema: Schema = new Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  stars: { type: Number, required: true },
  cp: { type: Number, required: true },
  sacrifices: { type: Array, required: true },
  inBattle: { type: Number, required: true },
  battleSlot: { type: Number, required: true },
});

const PokemonModel = mongoose.model<IPokemon>("Pokemon", PokemonSchema);

export default PokemonModel;
