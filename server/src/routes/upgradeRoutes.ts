import express from "express";
import {
  levelUpController,
  starUpController,
} from "../controllers/upgradeController";

const router = express.Router();

router.patch("/levelup/:id", levelUpController);
router.patch("/starup/:id", starUpController);

export default router;
