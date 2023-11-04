import express from "express";
import {
  getAllPokemonController,
  deleteUsersPokemonController,
} from "../controllers/pokemonController";

const router = express.Router();

router.get("/all/:user", getAllPokemonController);
router.delete("/all/:user", deleteUsersPokemonController);

export default router;
