import express from "express";
import {
  getInventoryController,
  createInventoryController,
  deleteUsersInventoryController,
  deleteAllInventoriesController,
  addItemToInventoryController,
} from "../controllers/inventoryController";

const router = express.Router();

router.get("/", getInventoryController);
router.post("/create/", createInventoryController);
router.delete("/", deleteUsersInventoryController);
router.patch("/add/item/", addItemToInventoryController);

export default router;
