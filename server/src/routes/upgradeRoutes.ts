import express from "express";
import { levelUpController } from "../controllers/upgradeController";

const router = express.Router();

router.patch("/levelup/:user/:id", levelUpController);

export default router;
