import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../models/i-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOption;

  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${environment.apiUrl}/api/products/getAllProducts`
    );
  }

  getAllProductsByCategoryId(categoryId: number): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${environment.apiUrl}/products?categoryId=${categoryId}`
    );
  }

  getProductById(ProductId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `${environment.apiUrl}/api/products/getProductById/${ProductId}`
    );
  }

  addProduct(newProduct: any): Observable<IProduct> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/api/products/addProduct`,
      JSON.stringify(newProduct),
      this.httpOption
    );
  }

  updateProduct(productId: string, updateProduct: IProduct) {
    return this.httpClient.patch<IProduct>(
      `${environment.apiUrl}/api/products/updateProduct`,
      JSON.stringify(updateProduct),
      this.httpOption
    );
  }

  deleteProduct(productId: string,token:string) {
    return this.httpClient.delete<IProduct>(
      `${environment.apiUrl}/api/products/deleteProduct`,
      {
        body: {
          token:
            token,
          productId: productId,
        },
      }
    );
  }
}
