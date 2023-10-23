import { InventoryDocument } from "../models/Inventory";
import { Item } from "../types/Item";

export const addItemToInventory = (
  inventory: InventoryDocument,
  item: Item
) => {
  if (item.stackable) {
    const itemInInventory = inventory.items.find(
      (inventoryItem) => inventoryItem.type === item.type
    );

    if (itemInInventory) {
      itemInInventory.amount += item.amount;
    } else {
      inventory.items.push(item);
    }
  } else {
    inventory.items.push(item);
  }

  return inventory.items;
};
