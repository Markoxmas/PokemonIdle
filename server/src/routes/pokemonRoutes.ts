import express from "express";
import {
  getAllPokemonController,
  deleteAllPokemonController,
} from "../controllers/pokemonController";

const router = express.Router();

router.get("/:user", getAllPokemonController);
router.delete("/:user", deleteAllPokemonController);

export default router;
