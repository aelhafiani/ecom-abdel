import { Component, inject, signal } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { combineLatest, map, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductCardComponent,ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  private productService = inject(ProductService);

  listProducts$ = this.productService.getProducts();
  selectedCategory = signal('');
  maxPrice = signal<number | null>(null);

  filteredProducts$: Observable<Product[]> = combineLatest([
    this.listProducts$,
    toObservable(this.selectedCategory),
    toObservable(this.maxPrice),
  ]).pipe(
    map(([products, category, price]) =>
      products.filter((product) => {
        const matchCategory = !category || product.category === category;
        const matchPrice = price == null || product.price <= price;
        return matchCategory && matchPrice;
      })
    )
  );

  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
  }

  onMaxPriceChange(price: number | null) {
    this.maxPrice.set(price);
  }
}
