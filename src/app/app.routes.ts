import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/product-list/product-list.component').then(m => m.ProductListComponent)},
  { path: 'product/:id', loadComponent: () => import('./features/product-detail/product-detail.component').then((m) => m.ProductDetailComponent)},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },

];
