class ProductCart extends Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    quantity
  ) {
    super(id, name, price, screen, backCamera, frontCamera, img, desc, type);
    this.quantity = quantity;
  }
  calcTotal() {
    return this.price * this.quantity;
  }
}
