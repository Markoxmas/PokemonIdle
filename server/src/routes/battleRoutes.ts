import express from "express";
import {
  updateBattleTimelineController,
  createBattleTimelineController,
  deleteBattleTimelineController,
  claimDropsController,
  upgradeTimelineAfterLevelUpController,
} from "../controllers/battleController";

const router = express.Router();

router.patch("/update/timeline/:user", updateBattleTimelineController);
router.post("/create/timeline/:user", createBattleTimelineController);
router.delete("/delete/timeline/:user", deleteBattleTimelineController);
router.patch("/claim/drops/:user", claimDropsController);
router.patch(
  "/update/timeline/levelup/:user",
  upgradeTimelineAfterLevelUpController
);

export default router;
