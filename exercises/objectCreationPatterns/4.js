class ItemCreator {
  constructor(itemName, category, quantity) {
    if (this.#allValidFields(itemName, category, quantity)) {
      this.sku = this.#generateSku(itemName, category);
      this.itemName = itemName;
      this.category = category;
      this.quantity = quantity;
    } else {
      return { notValid: true };
    }
  }

  #allValidFields(itemName, category, quantity) {
    return this.#isValidItemName(itemName) 
    && this.#isValidCategory(category) 
    && this.#isValidQuantity(quantity);
  }

  #isValidItemName(itemName) {
    return itemName.match(/\S/g).length >= 5;
  }

  #isValidCategory(category) {
    return !/\s/.test(category) && category.length >= 5;
  }

  #isValidQuantity(quantity) {
    return typeof quantity === 'number' && quantity >= 0;
  }

  #generateSku(itemName, category) {
    let first = itemName.replace(' ', '').slice(0, 3);
    let last = category.replace(' ', '').slice(0, 2);
    return (first + last).toUpperCase();
  }
}

class ItemManager {
  static items = [];

  static create(name, category, quantity) {
    const item = new ItemCreator(name, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      ItemManager.items.push(item);
      return item;
    }
  }

  static update(sku, itemInformation) {
    Object.assign(this.findItemBySku(sku), itemInformation);
  }

  static delete(sku) {
    this.items = this.items.filter(item => item.sku !== sku);
  }

  static inStock() {
    return this.items.filter(item => item.quantity > 0);
  }

  static itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  }

  static findItemBySku(sku) {
    return this.items.find(item => item.sku === sku);
  }
}

class ReportManager {
  static items;

  static init(itemManager) {
    this.items = itemManager;
  }

  static reportInStock() {
    console.log(this.items.inStock().map(item => item.itemName).join(','));
  }

  static createReporter(sku) {
    const item = this.items.findItemBySku(sku);

    return {
      itemInfo() {
        Object.keys(item).forEach(key => {
          console.log(`${key}: ${item[key]}`);
        });
      },
    };
  }
}

ItemManager.create('basket ball', 'sports', 0);       // valid
ItemManager.create('asd', 'sports', 0);               // invalid (too short)
ItemManager.create('soccer ball', 'sports', 5);       // valid
ItemManager.create('football', 'sports');             // invalid (no quantity)
ItemManager.create('football', 'sports', 3);          // valid
ItemManager.create('kitchen pot', 'cooking items', 0); // invalid (category has space)
ItemManager.create('kitchen pot', 'cooking', 3);      // valid

console.log(ItemManager.items);
// => list with 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs: soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// => return the football & kitchen pot objects

ReportManager.reportInStock();
// logs: football,kitchen pot

console.log(ItemManager.itemsInCategory('sports'));
// => returns the basket ball, soccer ball, & football objects

ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// => remaining 3 valid items (soccer ball removed)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs:
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs:
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10