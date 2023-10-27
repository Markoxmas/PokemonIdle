import express from "express";
import {
  updateBattleTimelineController,
  createBattleTimelineController,
  deleteBattleTimelineController,
  claimDropsController,
} from "../controllers/battleController";

const router = express.Router();

router.patch("/update-battle-timeline/:user", updateBattleTimelineController);
router.post("/create-battle-timeline/:user", createBattleTimelineController);
router.delete("/delete-battle-timeline/:user", deleteBattleTimelineController);
router.patch("/claim-drops/:user", claimDropsController);

export default router;
