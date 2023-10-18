import { Pokemon } from "./Pokemon";

type Checkpoint = {
  startTime: number;
  pokemon: Pokemon[];
};

export type BattleTimeline = {
  user: string;
  startTime: number;
  startHp: number;
  maxHp: number;
  checkpoints: Checkpoint[];
};
