import express from "express";
import {
  updateBattleTimelineController,
  createBattleTimelineController,
  deleteBattleTimelineController,
} from "../controllers/battleController";

const router = express.Router();

router.patch("/updatetimeline/:user", updateBattleTimelineController);
router.post("/createtimeline/:user", createBattleTimelineController);
router.delete("/deletetimeline/:user", deleteBattleTimelineController);

export default router;
