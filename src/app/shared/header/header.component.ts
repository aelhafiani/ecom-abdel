import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CartFacade } from '../../services/cart.facade';
@Component({
  selector: 'app-header',
  imports: [ 
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 mobileMenuOpen = false;
 cartFacade = inject(CartFacade) 
 count$ = this.cartFacade.count$;

}
