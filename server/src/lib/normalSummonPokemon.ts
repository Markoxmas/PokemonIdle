import getPokedex from "./getPokedex";

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
  return {
    user: "admin",
    name: chosenPokemon.name,
    level: 1,
    stars: getStars(starRoll),
    cp: Math.floor(Math.random() * 10000) + 1,
  };
};
