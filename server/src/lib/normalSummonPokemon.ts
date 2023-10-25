import getPokedex from "./getPokedex";
import calculateCp from "./calculateCp";
import mongoose from "mongoose";
import { getLevelUpCost } from "./getLevelUpCost";
import { serverConfig } from "../serverConfig";
import { getMaxLevel } from "./getMaxLevel";

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
    user: "admin",
    name: chosenPokemon.name,
    level: 1,
    stars: getStars(starRoll),
    cp: 0,
    sacrifices: [
      {
        name: chosenPokemon.name,
        stars: 3,
        amount: 1,
        slot: 0,
      },
      {
        name: null,
        stars: 4,
        amount: 2,
        slot: 1,
      },
    ],
    inBattle: 0,
    battleSlot: 0,
  };

  //@ts-ignore
  pokemon.cp = calculateCp(pokemon);
  //@ts-ignore
  pokemon.nextLevelCost = getLevelUpCost(pokemon);
  //@ts-ignore
  pokemon.maxLevel = getMaxLevel(pokemon);

  return pokemon;
};
