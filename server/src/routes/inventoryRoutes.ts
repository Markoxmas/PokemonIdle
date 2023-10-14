import express from "express";
import {
  getInventoryController,
  createInventoryController,
  deleteUsersInventoryController,
  deleteAllInventoriesController,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/:user", getInventoryController);
router.post("/:user", createInventoryController);
router.delete("/:user", deleteUsersInventoryController);
router.delete("/all", deleteAllInventoriesController);

export default router;
