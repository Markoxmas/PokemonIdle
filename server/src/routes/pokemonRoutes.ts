import express from "express";
import {
  getAllPokemonController,
  deleteUsersPokemonController,
  createSpecificPokemonController,
} from "../controllers/pokemonController";

const router = express.Router();

router.get("/all/", getAllPokemonController);
router.delete("/all/", deleteUsersPokemonController);
router.post("/create/", createSpecificPokemonController);

export default router;
