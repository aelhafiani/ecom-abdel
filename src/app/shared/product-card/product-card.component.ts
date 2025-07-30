import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CartFacade } from '../../services/cart.facade';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
 cartFacade = inject(CartFacade); 
 @Input() product!: Product;

 addToCart(product: Product): void {
    this.cartFacade.add(product);
 }
} 
