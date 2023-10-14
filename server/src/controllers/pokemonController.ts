import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";

export const getAllPokemonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;

    const pokemonInventory = await PokemonModel.find({ user });

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
    const { user } = req.params;

    await PokemonModel.deleteMany({ user });

    res.json({ message: `Deleted all Pokémon for ${user}!` });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all Pokémon!" });
  }
};
