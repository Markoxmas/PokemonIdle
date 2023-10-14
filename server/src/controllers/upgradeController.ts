import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import Inventory from "../models/Inventory";
import calculateCp from "../lib/calculateCp";

export const levelUpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, user } = req.params;

    const pokemon = await PokemonModel.findOne({ _id: id, user });

    if (!pokemon) {
      res.status(404).json({ message: "Pokemon not found" });
      return;
    }

    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    if (inventory.exp >= 1000) {
      pokemon.level++;
      pokemon.cp = calculateCp(pokemon);

      inventory.exp -= 1000;

      await pokemon.save();
      await inventory.save();

      res.json({
        pokemon: pokemon,
        newExp: inventory.exp,
      });
    } else {
      res.status(400).json({ message: "Not enough exp to level up" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to level up Pokemon" });
  }
};
