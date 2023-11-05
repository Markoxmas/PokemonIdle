import express from "express";
import {
  initAppController,
  restartUserAccountController,
} from "../controllers/initAppController";

const router = express.Router();

router.get("/", initAppController);
router.put("/restart/account/", restartUserAccountController);

export default router;
