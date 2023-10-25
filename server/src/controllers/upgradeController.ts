import { Request, Response } from "express";
import PokemonModel from "../models/Pokemon";
import Inventory from "../models/Inventory";
import calculateCp from "../lib/calculateCp";
import { Pokemon } from "../models/Pokemon";
import { ItemKind } from "../models/Inventory";
import { removeItemFromInventory } from "../lib/removeItemFromInventory";
import { createItem } from "../lib/createItem";
import { getLevelUpCost } from "../lib/getLevelUpCost";

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

    const exp = inventory.items.find((item) => item.type === ItemKind.exp);
    if (exp) {
      if (exp.amount >= pokemon.nextLevelCost) {
        inventory.items = removeItemFromInventory(
          inventory,
          createItem(ItemKind.exp, pokemon.nextLevelCost)
        );

        pokemon.level++;
        pokemon.cp = calculateCp(pokemon);
        pokemon.nextLevelCost = getLevelUpCost(pokemon);

        await pokemon.save();
        await inventory.save();

        res.json({
          pokemon: pokemon,
          exp: inventory.items.find((item) => item.type === ItemKind.exp),
        });
      } else {
        res.status(400).json({ message: "Not enough exp to level up" });
      }
    } else {
      res.status(400).json({ message: "Exp item isn't found in inventory" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to level up Pokemon" });
  }
};

export const starUpController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user, id } = req.params;
    const sacrifices = req.body.sacrifices;

    //Get initial pokemon
    const pokemon = await PokemonModel.findOne({ _id: id, user });

    if (!pokemon) {
      res.status(404).json({ message: "Initial Pokemon not found" });
    }

    if (pokemon) {
      //Get all sacrifice pokemon
      const sacrificedPokemon: Array<Array<Pokemon>> = await Promise.all(
        sacrifices.map(async (sacrificeArray: string[]) => {
          return Promise.all(
            sacrificeArray.map(async (sacrificeId: string) => {
              const sacrificed = await PokemonModel.findOne({
                _id: sacrificeId,
                user,
              });
              return sacrificed;
            })
          );
        })
      );

      //Check if sacrifices are valid
      pokemon.sacrifices.forEach((sacrificeSlot, index) => {
        if (sacrificedPokemon[index].length !== sacrificeSlot.amount) {
          res.status(400).json({ message: "Invalid sacrifices" });
        }
        sacrificedPokemon[index].forEach((sacrifice) => {
          if (sacrifice.stars !== sacrificeSlot.stars) {
            res.status(400).json({ message: "Invalid sacrifices" });
          }
        });
        if (sacrificeSlot.name !== null) {
          sacrificedPokemon[index].forEach((sacrifice) => {
            if (sacrifice.name !== sacrificeSlot.name) {
              res.status(400).json({ message: "Invalid sacrifices" });
            }
          });
        }
        sacrificedPokemon[index].forEach((sacrifice) => {
          // @ts-ignore
          if (sacrifice._id === pokemon._id) {
            res.status(400).json({ message: "Invalid sacrifices" });
          }
        });
      });

      pokemon.stars += 1;
      pokemon.cp = calculateCp(pokemon);

      await pokemon.save();

      //flatten and extract ids from sacrificedPokemon
      const flattenedSacrifices = sacrificedPokemon.flat().map((pokemon) => {
        // @ts-ignore
        return pokemon._id;
      });
      PokemonModel.deleteMany({ _id: { $in: flattenedSacrifices } })
        .exec()
        .then(() => {
          res.json({
            pokemon: pokemon,
            sacrificedPokemon: flattenedSacrifices,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Failed to delete sacrificed pokemon" });
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to star up Pokemon" });
  }
};
