import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from '../../../models/i-category';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  isValidFormSubmitted = false;
  categoryForm: FormGroup;
  name: FormControl;

  initFormControl() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);
  }

  createForm() {
    this.categoryForm = new FormGroup({
      name: this.name,
    });
  }

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.initFormControl();
    this.createForm();
  }

  newCategory: ICategory = {} as ICategory;

  ngOnInit(): void {}

  onSubmit() {
    this.isValidFormSubmitted = false;
    if (this.categoryForm.invalid) {
      return;
    }

    this.isValidFormSubmitted = true;
    const observer = {
      next: (newCategory: ICategory) => {
        alert('Category Add Successfult');
        this.router.navigate(['/categories']);
      },
      error: (err: Error) => console.log(err.message),
    };

    this.categoriesService
      .addCategory(this.categoryForm.value)
      .subscribe(observer);
  }
}
