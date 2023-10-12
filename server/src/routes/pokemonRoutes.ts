import express from "express";
import {
  getAllPokemonController,
  deleteAllPokemonController,
} from "../controllers/pokemonController";

const router = express.Router();

router.get("/", getAllPokemonController);
router.delete("/all", deleteAllPokemonController);

export default router;
