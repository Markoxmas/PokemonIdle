import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import Inventory from "../models/Inventory";

export const levelUpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, user } = req.params;

    // Find the Pokemon
    const pokemon = await PokemonModel.findOne({ _id: id, user });

    if (!pokemon) {
      res.status(404).json({ message: "Pokemon not found" });
      return;
    }

    // Find the user's inventory
    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    // Check if the user has enough exp
    if (inventory.exp >= 1000) {
      // Increase the Pokemon's level by 1
      pokemon.level++;

      // Decrease the user's exp by 1000
      inventory.exp -= 1000;

      // Save the updated Pokemon and inventory
      await pokemon.save();
      await inventory.save();

      res.json({ newLevel: pokemon.level, newExp: inventory.exp });
    } else {
      res.status(400).json({ message: "Not enough exp to level up" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to level up Pokemon" });
  }
};
