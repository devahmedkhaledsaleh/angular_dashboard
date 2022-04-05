import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }

  getAllOrders():Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/orders/getAllOrders`);
  }

  getOrderById(orderId:string):Observable<any>{
    return this.httpClient.get<any>(`${environment.apiUrl}/api/orders/getOrderById/${orderId}`);
  }

  deleteOrder(orderId: string,token:string) {
    return this.httpClient.delete<any>(
      `${environment.apiUrl}/api/orders/deleteOrder`,
      {
        body: {
          token:
            token,
            orderId: orderId,
        },
      }
    );
  }

  
}
