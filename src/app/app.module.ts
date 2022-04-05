import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { UpdateCategoryComponent } from './components/categories/update-category/update-category.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { ContentHeaderComponent } from './components/layout/content-header/content-header.component';
import { MainContentComponent } from './components/layout/main-content/main-content.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MasterComponent } from './components/layout/master/master.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
    NavbarComponent,
    SidebarComponent,
    ContentHeaderComponent,
    MainContentComponent,
    FooterComponent,
    MasterComponent,
    HomeComponent,
    OrdersComponent,
    OrderDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
