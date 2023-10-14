import express from "express";
import {
  getAllPokemonController,
  deleteUsersPokemonController,
  deleteAllPokemonController,
} from "../controllers/pokemonController";

const router = express.Router();

router.get("/:user", getAllPokemonController);
router.delete("/:user", deleteUsersPokemonController);
router.delete("/all", deleteAllPokemonController);

export default router;
