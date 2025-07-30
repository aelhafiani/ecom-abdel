import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AddToCart, RemoveFromCart, UpdateQuantity } from './cart.actions';
import { CartItem } from '../../models/cart';

export interface CartStateModel {
  items: CartItem[];
}

@State<CartStateModel>({
  name: 'cartSate',
  defaults: {
    items: []
  }
})
@Injectable()
export class CartState {

  @Selector()
  static items(state: CartStateModel): CartItem[] {
    return state.items;
  }

  @Selector()
  static totalCount(state: CartStateModel): number {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  }

  @Selector()
  static totalPrice(state: CartStateModel): number {
    return state.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  @Selector()
  static hasProduct(state: CartStateModel): (productId: number) => boolean {
    return (productId: number) => state.items.some(item => item.id === productId);
  }


  @Action(AddToCart)
  addToCart(ctx: StateContext<CartStateModel>, action: AddToCart) {
    const state = ctx.getState();
    const items = [...state.items];
    const existingIndex = items.findIndex(item => item.id === action.product.id);

    if (existingIndex > -1) {
      items[existingIndex] = {
        ...items[existingIndex],
        quantity: items[existingIndex].quantity + 1
      };
    } else {
      const newItem: CartItem = { ...action.product, quantity: 1 };
      items.push(newItem);
    }

    ctx.setState({ items });
  }

  @Action(RemoveFromCart)
  removeFromCart(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
    const state = ctx.getState();
    const updatedItems = state.items.filter(item => item.id !== action.productId);
    ctx.patchState({ items: updatedItems });
  }

  @Action(UpdateQuantity)
updateQuantity(ctx: StateContext<CartStateModel>, action: UpdateQuantity) {
  const state = ctx.getState();
  const items = state.items.map(item =>
    item.id === action.productId
      ? { ...item, quantity: action.quantity }
      : item
  );
  ctx.setState({ items });
}
}
