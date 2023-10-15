import express from "express";
import {
  levelUpController,
  starUpController,
} from "../controllers/upgradeController";

const router = express.Router();

router.patch("/levelup/:user/:id", levelUpController);
router.patch("/starup/:user/:id", starUpController);

export default router;
