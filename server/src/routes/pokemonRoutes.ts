import express from "express";
import {
  getAllPokemonController,
  deleteUsersPokemonController,
  createSpecificPokemonController,
} from "../controllers/pokemonController";

const router = express.Router();

router.get("/all/:user", getAllPokemonController);
router.delete("/all/:user", deleteUsersPokemonController);
router.post("/create/:user", createSpecificPokemonController);

export default router;
