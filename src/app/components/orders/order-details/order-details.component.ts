import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  currentId: any;
  currentOrder: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((arg) => {
      this.currentId = arg.get('id');
      this.ordersService.getOrderById(this.currentId).subscribe((order) => {
        this.currentOrder = order;

       
      });
    });

  }
}
