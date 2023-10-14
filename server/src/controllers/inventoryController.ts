import { Request, Response } from "express";
import Inventory from "../models/Inventory";

export const getInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.params.user;

    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Failed to get inventory", error });
  }
};

export const createInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.params.user;

    const existingInventory = await Inventory.findOne({ user });

    if (existingInventory) {
      res
        .status(400)
        .json({ message: "Inventory for this user already exists" });
      return;
    }

    const newInventory = new Inventory({ user });

    await newInventory.save();

    res.status(201).json({
      message: "Inventory created successfully",
      inventory: newInventory,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create inventory", error });
  }
};

export const deleteAllInventoriesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await Inventory.deleteMany({});

    if (result.deletedCount) {
      res.status(200).json({ message: "All inventories deleted successfully" });
    } else {
      res.status(404).json({ message: "No inventories found to delete" });
    }
  } catch (error) {
    console.error("Error deleting inventories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUsersInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.params.user;

    const result = await Inventory.deleteOne({ user });

    if (result.deletedCount) {
      res.status(200).json({ message: "Inventory deleted successfully" });
    } else {
      res.status(404).json({ message: "Inventory not found" });
    }
  } catch (error) {
    console.error("Error deleting inventory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addNormalSummonScrollsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.params.user;
    const amount = parseInt(req.params.amount, 10);

    if (isNaN(amount) || amount <= 0) {
      res.status(400).json({ message: "Invalid 'amount' parameter" });
      return;
    }

    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    inventory.normalSummonScrolls += amount;

    await inventory.save();

    res.status(200).json({
      message: `Added ${amount} normal summon scrolls to ${user}'s inventory`,
      inventory,
    });
  } catch (error) {
    console.error("Error adding normal summon scrolls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
