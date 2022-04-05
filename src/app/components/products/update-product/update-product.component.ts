import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../models/i-category';
import { IProduct } from '../../../models/i-product';
import { AuthenticationService } from '../../../services/authentication.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  // categoriesList: ICategory[];

  adminToken:string | null = this.authenticationService.getToken()


  isValidFormSubmitted = false;

  currentId: any;
  token: FormControl;
  _id: FormControl;
  currentProduct: any;
  productForm: FormGroup;
  name: FormControl;
  price: FormControl;
  quantity: FormControl;
  image: FormControl;
  category: FormControl;

  initFormControl() {
    this.name = new FormControl(this.currentProduct?.data?.name, [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.price = new FormControl(this.currentProduct?.data?.price, [
      Validators.required,
      Validators.pattern('^-?(0|[1-9])*$'),
    ]);
    this.quantity = new FormControl(this.currentProduct?.data?.quantity, [
      Validators.required,
      Validators.pattern('^-?(0|[1-9])*$'),
    ]);
    this.image = new FormControl(this.currentProduct?.data?.image);
    this.category = new FormControl(this.currentProduct?.data?.category, [
      Validators.required,
    ]);
    this.token = new FormControl(this.adminToken, [Validators.required]);
    this._id = new FormControl(this.currentProduct?.data?._id, [Validators.required]);

  }

  createForm() {
    this.productForm = new FormGroup({
      name: this.name,
      token: this.token,
      _id: this._id,
      price: this.price,
      quantity: this.quantity,
      image: this.image,
      category: this.category,
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private authenticationService:AuthenticationService
  ) {
    console.log("Here");
    
  }

  ngOnInit(): void {
    
       this.activatedRoute.paramMap.subscribe((arg) => {
        this.currentId = arg.get('id');
        console.log(this.currentId);
        
        this.productsService
          .getProductById(this.currentId)
          .subscribe(async (product) => {
            this.currentProduct = await product;
            await this.initFormControl();
            await this.createForm();
          });
      });
    
  }

  onSubmit() {
    const observer = {
      next: (currentProduct: IProduct) => {
        alert('Product Add Successfult');
        this.router.navigate(['/products']);
      },
      error: (err: Error) => console.log(err.message),
    };

    this.productsService
      .updateProduct(this.currentId, this.productForm.value)
      .subscribe(observer);
  }
}
