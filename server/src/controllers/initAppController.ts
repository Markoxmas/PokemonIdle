import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import InventoryModel, { ItemKind } from "../models/Inventory";
import BattleTimelineModel from "../models/BattleTimeline";
import { createItem } from "../lib/createItem";
import { getPokedex } from "../lib/getPokedex";

export const initAppController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const user = req.user;

    const pokemon = await PokemonModel.find({ user });

    const inventory = await InventoryModel.findOne({ user });

    const battleTimeline = await BattleTimelineModel.findOne({ user });

    const pokedex = getPokedex();

    if (pokemon && inventory) {
      res.status(200).json({ pokemon, inventory, battleTimeline, pokedex });
    } else {
      res.status(404).json({ message: "User not found or no data available" });
    }
  } catch (error) {
    console.error("Error initializing app:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const restartUserAccountController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const user = req.user;

    try {
      await PokemonModel.deleteMany({ user });
      await InventoryModel.deleteOne({ user });
      await BattleTimelineModel.deleteOne({ user });
    } catch (error) {
      console.error("Error deleting user account data");
      res.status(500).json({ message: "Internal server error" });
    }

    //Create new inventory
    const inventory = new InventoryModel({
      user,
      items: [
        createItem(ItemKind.exp),
        createItem(ItemKind.normalSummonScroll),
      ],
    });

    //Create new battle timeline
    const battleTimeline = new BattleTimelineModel({
      user,
      startTime: -1,
      startHp: 10000,
      maxHp: 10000,
      checkpoints: [],
    });

    await inventory.save();
    await battleTimeline.save();

    res.json({ pokemon: [], inventory, battleTimeline });
  } catch (error) {
    console.error("Error restarting user account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
