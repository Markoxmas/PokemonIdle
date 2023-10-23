import { Inventory } from "../models/Inventory";
import { Item } from "../models/Inventory";

export const removeItemFromInventory = (inventory: Inventory, item: Item) => {
  if (item.stackable) {
    const itemInInventory = inventory.items.find(
      (inventoryItem) => inventoryItem.type === item.type
    );

    if (itemInInventory) {
      if (itemInInventory.amount === item.amount) {
        inventory.items = inventory.items.filter(
          (item) => item.type !== item.type
        );
      } else {
        inventory.items = inventory.items.map((inventoryItem) =>
          inventoryItem.type === item.type
            ? { ...inventoryItem, amount: inventoryItem.amount - item.amount }
            : inventoryItem
        );
      }
    }
  } else {
    inventory.items = inventory.items.filter((item) => item.type !== item.type);
  }

  return inventory.items;
};
