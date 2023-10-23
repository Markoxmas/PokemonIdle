import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import { normalSummonPokemon } from "../lib/normalSummonPokemon";
import Inventory from "../models/Inventory";
import { removeItemFromInventory } from "../lib/removeItemFromInventory";
import { ItemKind } from "../types/ItemKind";
import { createItem } from "../lib/createItem";

export const normalSummonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount, user } = req.params;
    const parsedAmount = parseInt(amount, 10);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      res.status(400).json({ message: "Invalid 'amount' parameter" });
    }

    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    inventory.items = removeItemFromInventory(
      inventory,
      createItem(ItemKind.normalSummonScroll, parsedAmount)
    );

    const summonedPokemon = [];

    for (let i = 0; i < parsedAmount; i++) {
      const pokemon = normalSummonPokemon();
      const newPokemon = new PokemonModel(pokemon);
      await newPokemon.save();
      summonedPokemon.push(newPokemon);
    }

    await inventory.save();

    res.json({
      message: `Summoned ${parsedAmount} new Pokémon!`,
      summonedPokemon,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to summon new Pokémon!" });
  }
};
