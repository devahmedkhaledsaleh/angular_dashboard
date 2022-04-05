import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../models/i-category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  httpOption;

  constructor(private httpClient:HttpClient) {
    this.httpOption={
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        // Authorization: 'my-auth-token'
      })
    };
   }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.apiUrl}/categories`);
  }

  getCategoryById(categoryId:number):Observable<ICategory>{
    return this.httpClient.get<ICategory>(`${environment.apiUrl}/categories/${categoryId}`);
  }

  addCategory(newCategory:ICategory):Observable<ICategory> {
    return this.httpClient
    .post<ICategory>(`${environment.apiUrl}/categories`,JSON.stringify(newCategory),this.httpOption)
  }

  updateCategory(categoryId:number,updateCategory:ICategory) {
    return this.httpClient
    .patch<ICategory>(`${environment.apiUrl}/categories/${categoryId}`,JSON.stringify(updateCategory),this.httpOption)
  }

  deleteCategory(categoryId:number) {
    return this.httpClient
    .delete<ICategory>(`${environment.apiUrl}/categories/${categoryId}`);
  }
}
