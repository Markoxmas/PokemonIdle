import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";
import Timeline from "../models/Timeline";

export const updateTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;
    const { checkpointPokemons } = req.body;

    const timeline = await Timeline.findOne({ user });

    if (!timeline) {
      res.status(404).json({ message: "Timeline not found" });
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

    //If timeline hasn't started, start it
    if (timeline?.checkpoints.length === 0) {
      const time = Date.now();
      timeline.startTime = time;
      timeline.checkpoints.push({
        startTime: time,
        pokemon: checkpointPokemons,
      });
    } else if (timeline?.checkpoints.length > 0) {
      const time = Date.now();
      timeline.checkpoints.push({
        startTime: time,
        pokemon: checkpointPokemons,
      });
    }

    await timeline.save();

    //Return the timeline to the user
    res.json({ timeline });
  } catch (error) {
    res.status(500).json({ message: "Failed to update timeline" });
  }
};

export const createTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    const timeline = await Timeline.findOne({ user });

    if (timeline) {
      res.status(400).json({ message: "Timeline already exists" });
      return;
    }

    const newTimeline = new Timeline({
      user,
    });

    await newTimeline.save();

    res.json({ timeline: newTimeline });
  } catch (error) {
    res.status(500).json({ message: "Failed to create timeline" });
  }
};

export const deleteTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    await Timeline.deleteOne({ user });

    res.json({ message: "Timeline deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete timeline" });
  }
};
