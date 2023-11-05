import express from "express";
import {
  updateBattleTimelineController,
  createBattleTimelineController,
  deleteBattleTimelineController,
  claimDropsController,
  upgradeTimelineAfterLevelUpController,
} from "../controllers/battleController";

const router = express.Router();

router.patch("/update/timeline/", updateBattleTimelineController);
router.post("/create/timeline/", createBattleTimelineController);
router.delete("/delete/timeline/", deleteBattleTimelineController);
router.patch("/claim/drops/", claimDropsController);
router.patch(
  "/update/timeline/levelup/",
  upgradeTimelineAfterLevelUpController
);

export default router;
