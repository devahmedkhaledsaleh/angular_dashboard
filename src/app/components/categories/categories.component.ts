import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../../models/i-category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesList: ICategory[];

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesService
      .getAllCategories()
      .subscribe((categories) => (this.categoriesList = categories));
      
      
  }

  editCategory(categoryId: number) {
    this.router.navigate(['/categories', categoryId,'edit']);
  }

  deleteCategory(categoryId: number) {
    this.categoriesService.deleteCategory(categoryId).subscribe(() => {
      this.categoriesService
        .getAllCategories()
        .subscribe((categories) => (this.categoriesList = categories));
    });
  }

}
