import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";
import BattleTimeline from "../models/BattleTimeline";
import Inventory from "../models/Inventory";
import { getBattleResults } from "../lib/getBattleResults";
import { addItemToInventory } from "../lib/addItemToInventory";
import { removeItemFromInventory } from "../lib/removeItemFromInventory";
import { ItemKind } from "../models/Inventory";

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

    //Update battle slots on pokemon
    existingCheckpointPokemons.forEach((pokemon) => {
      const updatedPokemon = checkpointPokemons.find(
        (checkpointPokemon: any) =>
          checkpointPokemon._id === pokemon._id.toString()
      );

      pokemon.inBattle = updatedPokemon.inBattle;
      pokemon.battleSlot = updatedPokemon.battleSlot;
    });

    //If battle timeline hasn't started, start it
    if (battleTimeline?.checkpoints.length === 0) {
      const time = Date.now();
      battleTimeline.startTime = time;
      battleTimeline.checkpoints.push({
        startTime: time,
        pokemon: existingCheckpointPokemons,
      });
    } else if (battleTimeline?.checkpoints.length > 0) {
      const time = Date.now();
      battleTimeline.checkpoints.push({
        startTime: time,
        pokemon: existingCheckpointPokemons,
      });
    }

    await battleTimeline.save();
    await Promise.all(
      existingCheckpointPokemons.map((pokemon) => pokemon.save())
    );

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

export const claimDropsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    const battleTimeline = await BattleTimeline.findOne({ user });

    if (!battleTimeline) {
      res.status(404).json({ message: "Battle timeline not found" });
      return;
    }

    //Get battle results
    const battleResults = getBattleResults(battleTimeline);

    //Add the drops to the inventory
    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    battleResults.drops.forEach((drop) => {
      inventory.items = addItemToInventory(inventory, drop);
    });

    await inventory.save();

    //Reset the battle timeline
    const time = Date.now();
    battleTimeline.startTime = time;
    const lastCheckpoint =
      battleTimeline.checkpoints[battleTimeline.checkpoints.length - 1];
    battleTimeline.checkpoints = [{ ...lastCheckpoint, startTime: time }];
    battleTimeline.startHp = battleResults.startHp;

    await battleTimeline.save();

    res.json({
      drops: battleResults.drops,
      battleTimeline,
      inventory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to claim drops", error });
  }
};
