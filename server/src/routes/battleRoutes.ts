import express from "express";
import {
  updateBattleTimelineController,
  createBattleTimelineController,
  deleteBattleTimelineController,
} from "../controllers/battleController";

const router = express.Router();

router.patch("/update-battle-timeline/:user", updateBattleTimelineController);
router.post("/create-battle-timeline/:user", createBattleTimelineController);
router.delete("/delete-battle-timeline/:user", deleteBattleTimelineController);

export default router;
