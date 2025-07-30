import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent {

  @Output() categoryChange = new EventEmitter<string>();

  selectedCategory = '';
  selectedMaxPrice: number | null = null;
  categories = [
  '', // All
  "beauty",
  "fragrances",
  "furniture",
  "groceries"
];
  onCategoryChange() {
    this.categoryChange.emit(this.selectedCategory);
  }


}
