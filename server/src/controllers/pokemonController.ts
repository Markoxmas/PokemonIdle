import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";

export const getAllPokemonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const pokemonInventory = await PokemonModel.find();
    res.json({ pokemonInventory });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve Pokémon inventory!" });
  }
};

export const deleteAllPokemonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await PokemonModel.deleteMany();
    res.json({ message: "Deleted all Pokémon!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all Pokémon!" });
  }
};
