import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
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

  @Input() id!: number;
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  cartFacade = inject(CartFacade);
  destroy$ = new Subject<void>();
  product!: Product;

   get roundedRating(): number {
    return Math.round(this.product?.rating?.rate || 0);
  }
  ngOnInit(): void {
  if (this.id) {
    this.productService.getProductById(this.id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data) => {
        if (!data) {

          this.router.navigate(['**']);
        } else {
          this.product = data;
        }
      },
        error: (err) => {
          console.error('Error loading product:', err);
          // Optionally handle error UI here
        }
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
