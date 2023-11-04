import express from "express";
import {
  initAppController,
  restartUserAccountController,
} from "../controllers/initAppController";

const router = express.Router();

router.get("/:user", initAppController);
router.put("/restart/account/:user", restartUserAccountController);

export default router;
