function setPrice(newPrice) {
  if (newPrice < 0) {
    alert('Invalid Price');
  } else {
    this.price = newPrice;
  }
}

function describe() {
  console.log(`=> Name: ${this.name}`);
  console.log(`=> ID: ${this.id}`);
  console.log(`=> Price: $${this.price}`);
  console.log(`=> Stock: ${this.stock}`);
}

function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    setPrice,
    describe,
  };
}

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let ladder = createProduct(2, 'Ladder', 5, 75);
let screwdriver = createProduct(3, 'Phillips Screwdriver', 50, 5);