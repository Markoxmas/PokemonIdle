import express from "express";
import { normalSummonController } from "../controllers/summonController";

const router = express.Router();

router.post("/normal/:amount", normalSummonController);

export default router;
