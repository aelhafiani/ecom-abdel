import { inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartState } from '../store/cart/cart.state';
import { CartItem } from '../models/cart';
import { Product } from '../models/product';
import { AddToCart, RemoveFromCart, UpdateQuantity } from '../store/cart/cart.actions';



@Injectable({ providedIn: 'root' })
export class CartFacade {
    private store = inject(Store);

    items$ = this.store.select(CartState.items);
    count$ = this.store.select(CartState.totalCount);
    total$ = this.store.select(CartState.totalPrice);

  add(product: Product): void {
    this.store.dispatch(new AddToCart(product));
  }

  updateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(new UpdateQuantity(productId, quantity));
  }
  remove(productId: number): void {
    this.store.dispatch(new RemoveFromCart(productId));
  }


  getCount(): number {
    return this.store.selectSnapshot(CartState.totalCount);
  }


  getItems(): CartItem[] {
    return this.store.selectSnapshot(CartState.items);
  }

 
  getTotal(): number {
    return this.store.selectSnapshot(CartState.totalPrice);
  }
}
