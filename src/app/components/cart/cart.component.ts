import { AsyncPipe, CommonModule } from '@angular/common';
import { Component,  inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartFacade } from '../../services/cart.facade';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,FormsModule,AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  readonly DISCOUNT_THRESHOLD = 100; // 100 threshold for discount
  readonly DISCOUNT_RATE = 0.10;  // 10% discount
  cartFacade  = inject(CartFacade);
  cartItems$ = this.cartFacade.items$;

  totalItems$ = this.cartItems$.pipe(
    map(items => items.reduce((acc, i) => acc + i.quantity, 0))
  );

  totalPrice$ = this.cartItems$.pipe(
    map(items => items.reduce((acc, i) => acc + i.quantity * i.price, 0))
  );
  discountAmount$ = this.totalPrice$.pipe(
    map(total => total >= this.DISCOUNT_THRESHOLD ? total * this.DISCOUNT_RATE : 0)
  );
  
  finalPrice$ = this.totalPrice$.pipe(
    map(total => total >= this.DISCOUNT_THRESHOLD ? total * (1 - this.DISCOUNT_RATE) : total)
  );

  onQuantityChange(productId: number, quantity: number) {
    if (quantity < 1) quantity = 1;
    this.cartFacade.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number) {
    this.cartFacade.remove(productId);
  }

}
