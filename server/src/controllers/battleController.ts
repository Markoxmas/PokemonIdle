import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";
import BattleTimeline from "../models/BattleTimeline";

export const updateBattleTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;
    const { checkpointPokemons } = req.body;

    const battleTimeline = await BattleTimeline.findOne({ user });

    if (!battleTimeline) {
      res.status(404).json({ message: "Battle timeline not found" });
      return;
    }

    // Check if checkpointPokemons exist in the database
    const existingCheckpointPokemons = await Pokemon.find({
      user,
      _id: { $in: checkpointPokemons },
    });

    if (existingCheckpointPokemons.length !== checkpointPokemons.length) {
      res.status(404).json({ message: "Invalid Pokemon in the request" });
      return;
    }

    //If battle timeline hasn't started, start it
    if (battleTimeline?.checkpoints.length === 0) {
      const time = Date.now();
      battleTimeline.startTime = time;
      battleTimeline.checkpoints.push({
        startTime: time,
        pokemon: checkpointPokemons,
      });
    } else if (battleTimeline?.checkpoints.length > 0) {
      const time = Date.now();
      battleTimeline.checkpoints.push({
        startTime: time,
        pokemon: checkpointPokemons,
      });
    }

    await battleTimeline.save();

    //Return the battle timeline to the user
    res.json({ battleTimeline });
  } catch (error) {
    res.status(500).json({ message: "Failed to update battle timeline" });
  }
};

export const createBattleTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    const battleTimeline = await BattleTimeline.findOne({ user });

    if (battleTimeline) {
      res.status(400).json({ message: "Battle timeline already exists" });
      return;
    }

    const newBattleTimeline = new BattleTimeline({
      user,
    });

    await newBattleTimeline.save();

    res.json({ battleTimeline: newBattleTimeline });
  } catch (error) {
    res.status(500).json({ message: "Failed to create battle timeline" });
  }
};

export const deleteBattleTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    await BattleTimeline.deleteOne({ user });

    res.json({ message: "Battle timeline deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete battle timeline" });
  }
};
