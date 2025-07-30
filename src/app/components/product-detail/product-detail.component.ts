import { Component, inject } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartFacade } from '../../services/cart.facade';
import { Subject, takeUntil } from 'rxjs';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule,CurrencyPipe,RouterModule,NgbRatingModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartFacade = inject(CartFacade);
  destroy$ = new Subject<void>();
  product!: Product;
   get roundedRating(): number {
    return Math.round(this.product?.rating?.rate || 0);
  }
  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  if (id) {
    this.productService.getProductById(id).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.product = data;
    });
  }
  }

  addToCart(product: Product) {
    this.cartFacade.add(product);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
