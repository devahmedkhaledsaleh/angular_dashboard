import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from '../../models/i-product';
import { AuthenticationService } from '../../services/authentication.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productListOfCategory: any;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private authenticationService:AuthenticationService
  ) {}

  ngOnInit(): void {
    this.productsService
      .getAllProducts()
      .subscribe((products) => (this.productListOfCategory = products));
  }

  openProductDetails(productId: string) {
    
    this.router.navigate(['/products', productId]);
  }

  editProduct(productId: string) {
    this.router.navigate(['/products', productId,'edit']);
  }

  deleteProduct(productId: string) {
    const token = this.authenticationService.getToken();
    if(token) {
      this.productsService.deleteProduct(productId,token).subscribe(() => {
        this.productsService
          .getAllProducts()
          .subscribe((products) => (this.productListOfCategory = products));
      });
    }
    
  }

}
