import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'products/add',
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id/edit',
    component: UpdateProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },

  // { path: 'categories', component: CategoriesComponent },
  // { path: 'categories/add', component: AddCategoryComponent },
  // {
  //   path: 'categories/:id/edit',
  //   component: UpdateCategoryComponent,
  // },
  // { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
