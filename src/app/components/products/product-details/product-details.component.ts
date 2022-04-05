import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../../models/i-category';
import { IProduct } from '../../../models/i-product';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productListOfCategory: any;

  currentId: any;
  currentProduct: any;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
  ) {}

  ngOnInit(): void {
        

    
    this.activatedRoute.paramMap.subscribe((arg) => {
      
       this.currentId = arg.get('id');
       
      this.productsService.getProductById(this.currentId).subscribe(async product=>{
        
        
         this.currentProduct = await product;         
        
      });
    });
  }

}
