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
router.post("/create/:user", createInventoryController);
router.delete("/:user", deleteUsersInventoryController);
router.patch("/add/item/:user", addItemToInventoryController);

export default router;
