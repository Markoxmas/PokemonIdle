import mongoose, { Document, Schema } from "mongoose";
import { IPokemon, PokemonSchema } from "./Pokemon";

interface Checkpoint {
  startTime: number;
  pokemon: Array<IPokemon>;
}

interface IBattleTimeline extends Document {
  user: string;
  startTime: number;
  startHp: number;
  maxHp: number;
  checkpoints: Array<Checkpoint>;
}

const CheckpointSchema: Schema = new Schema({
  startTime: { type: Number, required: true },
  pokemon: [PokemonSchema],
});

const BattleTimelineSchema: Schema = new Schema({
  user: { type: String, required: true },
  startTime: { type: Number, required: true, default: -1 },
  startHp: { type: Number, required: true, default: 10000 },
  maxHp: { type: Number, required: true, default: 10000 },
  checkpoints: { type: [CheckpointSchema], required: true, default: [] },
});

const BattleTimelineModel = mongoose.model<IBattleTimeline>(
  "BattleTimeline",
  BattleTimelineSchema
);

export default BattleTimelineModel;
