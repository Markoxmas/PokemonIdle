import { getPokedex } from "./getPokedex";
import calculateCp from "./calculateCp";
import mongoose from "mongoose";
import { getLevelUpCost } from "./getLevelUpCost";
import { getMaxLevel } from "./getMaxLevel";
import { getStarSacrifices } from "./getStarSacrifices";

const starChances = [0.5, 0.9, 1.0];

const getStars = (starRoll: number) => {
  if (starRoll <= starChances[0]) {
    return 3;
  } else if (starRoll <= starChances[1]) {
    return 4;
  } else {
    return 5;
  }
};

export const normalSummonPokemon = () => {
  const basicPokemon = getPokedex().filter((pokemon) => pokemon.basic);
  const chosenPokemon =
    basicPokemon[Math.floor(Math.random() * basicPokemon.length)];
  const starRoll = Math.random();

  let pokemon = {
    _id: new mongoose.Types.ObjectId(),
    pokedexId: chosenPokemon.id,
    user: "admin",
    name: chosenPokemon.name,
    level: 1,
    stars: getStars(starRoll),
    inBattle: 0,
    battleSlot: 0,
  };

  //@ts-ignore
  pokemon.cp = calculateCp(pokemon);
  //@ts-ignore
  pokemon.nextLevelCost = getLevelUpCost(pokemon);
  //@ts-ignore
  pokemon.maxLevel = getMaxLevel(pokemon);
  //@ts-ignore
  pokemon.sacrifices = getStarSacrifices(pokemon);

  return pokemon;
};
