import mongoose, { Document, Schema } from "mongoose";

interface IPokemon extends Document {
  name: string;
  level: number;
}

const PokemonSchema: Schema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
});

const PokemonModel = mongoose.model<IPokemon>("Pokemon", PokemonSchema);

export default PokemonModel;
