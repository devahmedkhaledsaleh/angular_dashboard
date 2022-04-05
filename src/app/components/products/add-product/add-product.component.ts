import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from '../../../models/i-category';
import { IProduct } from '../../../models/i-product';
import { AuthenticationService } from '../../../services/authentication.service';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

  file:any;

  adminToken:string | null = this.authenticationService.getToken()

  categoriesList: ICategory[];

  isValidFormSubmitted = false;

  productForm: FormGroup;
  name: FormControl;
  token: FormControl;
  price: FormControl;
  quantity: FormControl;
  image: FormControl;
  category: FormControl;
  selectedFile: File;
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  initFormControl() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.price = new FormControl('', [
      Validators.required,
      Validators.pattern('^-?(0|[1-9])*$'),
    ]);
    this.quantity = new FormControl('', [
      Validators.required,
      Validators.pattern('^-?(0|[1-9])*$'),
    ]);
    this.image = new FormControl('');
    this.category = new FormControl('', [Validators.required]);
    this.token = new FormControl(this.adminToken, [Validators.required]);
  }

  createForm() {
    this.productForm = new FormGroup({
      name: this.name,
      price: this.price,
      quantity: this.quantity,
      image: this.image,
      category: this.category,
      token: this.token,
    });
  }

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private httpClient:HttpClient,
    private authenticationService:AuthenticationService
  ) {
    this.initFormControl();
    this.createForm();
  }

  newProduct: IProduct = {} as IProduct;

  ngOnInit(): void {
    this.categoriesService
      .getAllCategories()
      .subscribe((categories) => (this.categoriesList = categories));
  }

  getFile(event:any){
    this.file = event?.target.files[0];
    console.log("file",this.file);
    
  }

  onSubmit() {

    // console.log("Here");
    
    // this.isValidFormSubmitted = false;
    // if (this.productForm.invalid) {
    //   return;
    // }
    
    // this.isValidFormSubmitted = true;

    //  this.productForm.value.image = this.file.name
    
    const observer = {
      next: (newProduct: any) => {
        alert('Product Add Successfult');
        console.log(newProduct);
        
        this.router.navigate(['/products']);
      },
      error: (err: Error) => console.log(err.message),
    };

    this.productsService.addProduct(this.productForm.value).subscribe(observer);
   }
}
