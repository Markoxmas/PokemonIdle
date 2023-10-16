import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import Inventory from "../models/Inventory";
import Timeline from "../models/BattleTimeline";

export const initAppController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    const pokemon = await PokemonModel.find({ user });

    const inventory = await Inventory.findOne({ user });

    const timeline = await Timeline.findOne({ user });

    if (pokemon && inventory) {
      res.status(200).json({ pokemon, inventory, timeline });
    } else {
      res.status(404).json({ message: "User not found or no data available" });
    }
  } catch (error) {
    console.error("Error initializing app:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
