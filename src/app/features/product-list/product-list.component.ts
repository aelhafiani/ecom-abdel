import {
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ProductFilterComponent, InfiniteScrollDirective],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private productService = inject(ProductService);

  // Signals
  selectedCategory = signal('');

  // Pagination
  private offset = 0;
  private limit = 20;
  private hasMore = true;
  private loading = signal(false);
  private allProducts = signal<Product[]>([]);

  private loadMoreTrigger$ = new BehaviorSubject<void>(undefined);

  // Reactive product stream
  filteredProducts$ = combineLatest([
    toObservable(this.selectedCategory),
    this.loadMoreTrigger$
  ]).pipe(
    tap(() => this.loading.set(true)),
    switchMap(([category]) =>
      this.productService.getProductsFiltred({
        category: category || undefined,
        limit: this.limit,
        skip: this.offset
      }).pipe(
        tap((res) => {
          const total = res.total;
          this.allProducts.update(prev => [...prev, ...res.products]);
          this.offset += this.limit;
           if (this.allProducts().length >= total) {
            this.hasMore = false;
          }
          this.loading.set(false);
        })
      )
    ),
    map(() => this.allProducts())
  );

  // Infinite scroll
  onScrollDown() {
    if (!this.loading() && this.hasMore) {
      this.loadMoreTrigger$.next();
    }
  }

  // On category change
  onCategoryChange(category: string) {
    this.selectedCategory.set(category);
     this.offset = 0;
    this.hasMore = true;
    this.allProducts.set([]);
 
  }


}
