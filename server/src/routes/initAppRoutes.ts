import express from "express";
import { initAppController } from "../controllers/initAppController";

const router = express.Router();

router.get("/:user", initAppController);

export default router;
