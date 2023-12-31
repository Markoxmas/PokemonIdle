import { Request, Response } from "express";
import Inventory from "../models/Inventory";
import { ItemKind } from "../models/Inventory";
import { createItem } from "../lib/createItem";
import { addItemToInventory } from "../lib/addItemToInventory";

export const getInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const user = req.user;

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
    //@ts-ignore
    const user = req.user;

    const existingInventory = await Inventory.findOne({ user });

    if (existingInventory) {
      res
        .status(400)
        .json({ message: "Inventory for this user already exists" });
      return;
    }

    const newInventory = new Inventory({ user });
    newInventory.items = [
      createItem(ItemKind.exp),
      createItem(ItemKind.normalSummonScroll),
    ];

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
    //@ts-ignore
    const user = req.user;

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

export const addItemToInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const user = req.user;
    const { item } = req.body;

    const inventory = await Inventory.findOne({ user });

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    inventory.items = addItemToInventory(inventory, item);

    await inventory.save();

    res.json({ item });
  } catch (error) {
    console.error("Error adding item to inventory:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
