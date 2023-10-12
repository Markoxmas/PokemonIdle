import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import { normalSummonPokemon } from "../lib/normalSummonPokemon";

export const normalSummonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount } = req.params;
    const parsedAmount = parseInt(amount, 10);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      res.status(400).json({ message: "Invalid 'amount' parameter" });
    }

    const summonedPokemon = [];

    for (let i = 0; i < parsedAmount; i++) {
      const pokemon = normalSummonPokemon();
      const newPokemon = new PokemonModel(pokemon);
      await newPokemon.save();
      summonedPokemon.push(newPokemon);
    }

    res.json({
      message: `Summoned ${parsedAmount} new Pokémon!`,
      summonedPokemon,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to summon new Pokémon!" });
  }
};
