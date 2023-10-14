import getPokedex from "./getPokedex";
import calculateCp from "./calculateCp";

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
    user: "admin",
    name: chosenPokemon.name,
    level: 1,
    stars: getStars(starRoll),
    cp: 0,
  };

  pokemon.cp = calculateCp(pokemon);

  return pokemon;
};
