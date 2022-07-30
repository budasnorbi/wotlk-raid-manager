import { Classes, InventoryType } from "@type/trinity-types"

export const getItemInventoryTypeBySniffIndex = (
  classId: Classes,
  index: number
): InventoryType => {
  let inventoryType: InventoryType
  switch (index) {
    case 0: {
      inventoryType = InventoryType.head
      break
    }
    case 1: {
      inventoryType = InventoryType.neck
      break
    }
    case 2: {
      inventoryType = InventoryType.shoulder
      break
    }
    case 3: {
      inventoryType = InventoryType.back
      break
    }
    case 4: {
      inventoryType = InventoryType.chest
      break
    }
    case 5: {
      inventoryType = InventoryType.wrists
      break
    }
    case 6: {
      inventoryType = InventoryType.hands
      break
    }
    case 7: {
      inventoryType = InventoryType.waist
      break
    }
    case 8: {
      inventoryType = InventoryType.legs
      break
    }
    case 9: {
      inventoryType = InventoryType.feet
      break
    }
    case 10: {
      inventoryType = InventoryType.finger
      break
    }
    case 11: {
      inventoryType = InventoryType.finger
      break
    }
    case 12: {
      inventoryType = InventoryType.trinket
      break
    }
    case 13: {
      inventoryType = InventoryType.trinket
      break
    }
  }

  if (index === 14) {
    inventoryType = InventoryType.mainHand
  }

  if (index === 15) {
    inventoryType = InventoryType.offHand
  }

  if (index === 16) {
    if (classId === Classes.druid || classId === Classes.paladin) {
      inventoryType = InventoryType.relic
    } else {
      inventoryType = InventoryType.ranged
    }
  }

  return inventoryType
}
