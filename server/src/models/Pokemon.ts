import mongoose, { Document, Schema } from "mongoose";

interface IPokemon extends Document {
  user: string;
  name: string;
  level: number;
  stars: number;
  cp: number;
}

const PokemonSchema: Schema = new Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  stars: { type: Number, required: true },
  cp: { type: Number, required: true },
});

const PokemonModel = mongoose.model<IPokemon>("Pokemon", PokemonSchema);

export default PokemonModel;
