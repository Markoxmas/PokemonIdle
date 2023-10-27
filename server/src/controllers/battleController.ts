import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import BattleTimelineModel from "../models/BattleTimeline";
import Inventory from "../models/Inventory";
import { getBattleResults } from "../lib/getBattleResults";
import { addItemToInventory } from "../lib/addItemToInventory";
import { Pokemon } from "../models/Pokemon";
import { addCheckpointToTimeline } from "../lib/addCheckpointToTimeline";
import mongoose from "mongoose";

export const updateBattleTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;
    const { checkpointPokemons }: { checkpointPokemons: Pokemon[] } = req.body;

    let battleTimeline = await BattleTimelineModel.findOne({ user });

    if (!battleTimeline) {
      res.status(404).json({ message: "Battle timeline not found" });
      return;
    }

    //Reset all user's pokemon
    const update = {
      $set: {
        battleSlot: 0,
        inBattle: 0,
      },
    };

    try {
      await PokemonModel.updateMany({ user }, update);
    } catch (err) {
      console.error("Error resetting Pokémon:", err);
    }

    const updatePromises = checkpointPokemons.map(async (checkpointPokemon) => {
      try {
        const pokemon = await PokemonModel.findOne({
          _id: checkpointPokemon._id,
          user: checkpointPokemon.user,
        });

        if (!pokemon) {
          console.error(`Pokemon not found for _id: ${checkpointPokemon._id}`);
          return;
        }

        pokemon.battleSlot = checkpointPokemon.battleSlot;
        pokemon.inBattle = checkpointPokemon.inBattle;

        await pokemon.save();
      } catch (error) {
        console.error(`Error updating Pokemon: ${error}`);
      }
    });

    await Promise.all(updatePromises);

    battleTimeline = addCheckpointToTimeline(
      battleTimeline,
      checkpointPokemons
    );

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

    const battleTimeline = await BattleTimelineModel.findOne({ user });

    if (battleTimeline) {
      res.status(400).json({ message: "Battle timeline already exists" });
      return;
    }

    const newBattleTimeline = new BattleTimelineModel({
      _id: new mongoose.Types.ObjectId(),
      user,
    });

    await newBattleTimeline.save();

    res.json({ battleTimeline: newBattleTimeline });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create battle timeline", error });
  }
};

export const deleteBattleTimelineController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    await BattleTimelineModel.deleteOne({ user });

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
    const { checkpointPokemons } = req.body;

    const battleTimeline = await BattleTimelineModel.findOne({ user });

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
    if (checkpointPokemons.length > 0) {
      battleTimeline.startTime = time;
      battleTimeline.checkpoints = [
        { startTime: time, pokemon: checkpointPokemons },
      ];
      battleTimeline.startHp = battleResults.startHp;
    } else {
      //Reset all user's pokemon
      const update = {
        $set: {
          battleSlot: 0,
          inBattle: 0,
        },
      };

      try {
        await PokemonModel.updateMany({ user }, update);
      } catch (err) {
        console.error("Error resetting Pokémon:", err);
      }

      //Initialize empty battle timeline
      battleTimeline.startTime = time;
      battleTimeline.checkpoints = [];
      battleTimeline.startHp = battleResults.startHp;
    }

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
