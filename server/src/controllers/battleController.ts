import { Request, Response } from "express";
import Pokemon from "../models/Pokemon";
import BattleTimeline from "../models/BattleTimeline";
import Inventory from "../models/Inventory";
import { getDropTable } from "../lib/getDropTable";

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

    const checkpoints = battleTimeline.checkpoints;

    //Calculate the damage done in the battle
    const damageDone = checkpoints.reduce((totalDamage, checkpoint, i) => {
      const time2 =
        i !== checkpoints.length - 1
          ? checkpoints[i + 1].startTime / 1000
          : Date.now() / 1000;
      const time1 = checkpoint.startTime / 1000;
      const damage = checkpoint.pokemon.reduce(
        (total, pokemon) => total + pokemon.cp,
        0
      );
      return totalDamage + Math.floor(damage * (time2 - time1));
    }, 0);

    //Calculate the kills
    const kills =
      battleTimeline.startHp - damageDone > 0
        ? 0
        : Math.floor(
            (damageDone - battleTimeline.startHp) / battleTimeline.maxHp + 1
          );
    battleTimeline.startHp =
      battleTimeline.startHp - damageDone + kills * battleTimeline.maxHp;

    //Calculate the drops
    const dropTable = getDropTable();
    const drops = {
      exp: Math.floor(dropTable.exp * damageDone),
      normalSummonScroll: dropTable.normalSummonScroll * kills,
    };

    //Add the drops to the inventory
    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    //Add exp to inventory
    const exp = inventory.items.find(
      (inventoryItem) => inventoryItem.name === "exp"
    );
    if (exp) {
      exp.amount += drops.exp;
    } else {
      inventory.items.push({
        name: "exp",
        image: "exp",
        amount: drops.exp,
      });
    }
    const normalSummonScrolls = inventory.items.find(
      (inventoryItem) => inventoryItem.name === "normalSummonScroll"
    );
    if (normalSummonScrolls) {
      normalSummonScrolls.amount += drops.normalSummonScroll;
    } else {
      inventory.items.push({
        name: "normalSummonScroll",
        image: "normalSummonScroll",
        amount: drops.normalSummonScroll,
      });
    }

    await inventory.save();

    //Reset the battle timeline
    const time = Date.now();
    battleTimeline.startTime = time;
    const lastCheckpoint =
      battleTimeline.checkpoints[battleTimeline.checkpoints.length - 1];
    battleTimeline.checkpoints = [{ ...lastCheckpoint, startTime: time }];

    await battleTimeline.save();
    console.log(drops, inventory);
    res.json({
      drops,
      battleTimeline,
      inventory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to claim drops", error });
  }
};
