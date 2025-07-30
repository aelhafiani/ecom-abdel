import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/product-list/product-list.component').then(m => m.ProductListComponent)},
  { path: 'product/:id', loadComponent: () => import('./components/product-detail/product-detail.component').then((m) => m.ProductDetailComponent)},
  { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
];
