import express from "express";
import {
  updateTimelineController,
  createTimelineController,
  deleteTimelineController,
} from "../controllers/battleController";

const router = express.Router();

router.patch("/updatetimeline/:user", updateTimelineController);
router.post("/createtimeline/:user", createTimelineController);
router.delete("/deletetimeline/:user", deleteTimelineController);

export default router;
