import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import { getPokedex } from "../lib/getPokedex";
import calculateCp from "../lib/calculateCp";
import { getLevelUpCost } from "../lib/getLevelUpCost";
import { getMaxLevel } from "../lib/getMaxLevel";
import { getStarSacrifices } from "../lib/getStarSacrifices";
import mongoose from "mongoose";

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

export const deleteUsersPokemonController = async (
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

export const createSpecificPokemonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req.params;
    const {
      pokemonData,
    }: { pokemonData: { name: string; stars: number; level: number } } =
      req.body;
    const pokedex = getPokedex();
    const pokedexPokemon = pokedex.find(
      (pokemon) => pokemon.name === pokemonData.name
    );

    if (pokedexPokemon) {
      const pokemon = {
        _id: new mongoose.Types.ObjectId(),
        pokedexId: pokedexPokemon.id,
        user,
        name: pokemonData.name,
        level: pokemonData.level,
        stars: pokemonData.stars,
        inBattle: false,
        battleSlot: -1,
      };

      //@ts-ignore
      pokemon.cp = calculateCp(pokemon);
      //@ts-ignore
      pokemon.nextLevelCost = getLevelUpCost(pokemon);
      //@ts-ignore
      pokemon.maxLevel = getMaxLevel(pokemon);
      //@ts-ignore
      pokemon.sacrifices = getStarSacrifices(pokemon);

      await PokemonModel.create(pokemon);

      res.json({ pokemon });
    } else {
      res.status(404).json({ message: "Invalid Pokémon name!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to create Pokémon!" });
  }
};
