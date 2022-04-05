import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../models/i-category';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  isValidFormSubmitted = false;
  currentId: number;
  currentCategory: ICategory | null;
  categoryForm: FormGroup;
  name: FormControl;
    
   initFormControl() {
    
     
    this.name = new FormControl(this.currentCategory?.name, [
      Validators.required,
      Validators.minLength(4),
    ]);
  }

  createForm() {
    this.categoryForm = new FormGroup({
      name: this.name, 
    });
  }

  constructor(private categoriesService:CategoriesService,private router:Router,private activatedRoute: ActivatedRoute) {}



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((arg) => {
      this.currentId = Number(arg.get('id'));
      this.categoriesService.getCategoryById(this.currentId).subscribe(async category=>{
        this.currentCategory = await category;
        await this.initFormControl();
        await this.createForm();
      });
      
    });

    
  }

  onSubmit() {
    this.isValidFormSubmitted = false;
    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidFormSubmitted = true;
    
    const observer = {
      next: (newCategory:ICategory)=>{
           alert("Category Add Successfult");    
           this.router.navigate(['/categories']);
       },
       error: (err:Error)=>console.log(err.message)
    }
    
     this.categoriesService.updateCategory(this.currentId,this.categoryForm.value).subscribe(observer);
  }

}
