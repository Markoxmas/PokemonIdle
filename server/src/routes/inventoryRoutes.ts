import express from "express";
import {
  getInventoryController,
  createInventoryController,
  deleteUsersInventoryController,
  deleteAllInventoriesController,
  addItemToInventoryController,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/:user", getInventoryController);
router.post("/:user", createInventoryController);
router.delete("/:user", deleteUsersInventoryController);
router.delete("/all", deleteAllInventoriesController);
router.patch("/add-item/:user", addItemToInventoryController);

export default router;
