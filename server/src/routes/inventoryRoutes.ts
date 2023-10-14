import express from "express";
import {
  getInventoryController,
  createInventoryController,
  deleteUsersInventoryController,
  deleteAllInventoriesController,
  addNormalSummonScrollsController,
  addExpController,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/:user", getInventoryController);
router.post("/:user", createInventoryController);
router.delete("/:user", deleteUsersInventoryController);
router.delete("/all", deleteAllInventoriesController);
router.patch(
  "/:user/normalSummonScrolls/:amount",
  addNormalSummonScrollsController
);
router.patch("/:user/exp/:amount", addExpController);

export default router;
