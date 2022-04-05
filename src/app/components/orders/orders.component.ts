import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  constructor(private ordersService: OrdersService,
    private router: Router,
    private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.ordersService
      .getAllOrders()
      .subscribe((orders) => (this.orders = orders));
  }

  openOrderDetails(orderId: string) {
    this.router.navigate(['/orders', orderId]);
  }

  deleteOrder(orderId: string) {
    const token = this.authenticationService.getToken();
    if(token) {
      this.ordersService.deleteOrder(orderId,token).subscribe(() => {
        this.ordersService
          .getAllOrders()
          .subscribe((orders) => (this.orders = orders));
      });
    }
    
  }

 


}
