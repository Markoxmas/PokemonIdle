import { Inventory } from "../models/Inventory";
import { Item } from "../models/Inventory";

export const addItemToInventory = (inventory: Inventory, item: Item) => {
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
