import { Product } from "../../models/product";

export class AddToCart {
  static readonly type = '[Cart] Add Product';
  constructor(public product: Product) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove Product';
  constructor(public productId: number) {}
}

export class UpdateQuantity {
  static readonly type = '[Cart] Update Quantity';
  constructor(public productId: number, public quantity: number) {}
}