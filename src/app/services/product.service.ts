import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(limit: number, offset: number): Observable<Product[]> {
    return this.http
      .get<{ products: Product[] }>(
        `${this.apiUrl}?limit=${limit}&skip=${offset}`
      )
      .pipe(map((res) => res.products));
  }

  getProductsFiltred(params?: {
    limit?: number;
    skip?: number;
    category?: string;

  }) {
    const { limit = 12, skip = 0, category } = params || {};

    let endpoint = 'https://dummyjson.com/products';
    const queryParams: string[] = [];

    // Use category endpoint if category is selected
    if (category && category !== '') {
      endpoint += `/category/${encodeURIComponent(category)}`;
    }

    queryParams.push(`limit=${limit}`);
    queryParams.push(`skip=${skip}`);

    const query = queryParams.join('&');

    return this.http
      .get<{ products: Product[]; total: number }>(`${endpoint}?${query}`)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
