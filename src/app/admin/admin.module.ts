import { NgModule } from '@angular/core';
import { AddNewCategoryComponent } from './components/category/add-new-category/add-new-category.component';
import { DetailCategoryComponent } from './components/category/detail-category/detail-category.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { DeleteCategoryComponent } from './components/category/delete-category/delete-category.component';
import { FormsModule } from '@angular/forms';
import { CategoryAdminPageComponent } from './pages/category-admin-page/category-admin-page.component';


import { AddNewProductComponent } from './components/product/add-new-product/add-new-product.component';
import { DetailProductComponent } from './components/product/detail-product/detail-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { DeleteProductComponent } from './components/product/delete-product/delete-product.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';

import { BlogAdminPageComponent } from './pages/blog-admin-page/blog-admin-page.component';
import { AddNewBlogComponent } from './components/blog/add-new-blog/add-new-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
import { DetailBlogComponent } from './components/blog/detail-blog/detail-blog.component';
import { UpdateBlogComponent } from './components/blog/update-blog/update-blog.component';

import { BrandAdminPageComponent } from './pages/brand-admin-page/brand-admin-page.component';
import { AddNewBrandComponent } from './components/brand/add-new-brand/add-new-brand.component';
import { DetailBrandComponent } from './components/brand/detail-brand/detail-brand.component';
import { UpdateBrandComponent } from './components/brand/update-brand/update-brand.component';
import { DeleteBrandComponent } from './components/brand/delete-brand/delete-brand.component';

import { OrderAdminPageComponent } from './pages/order-admin-page/order-admin-page.component';
import { AddNewOrderComponent } from './components/order/add-new-order/add-new-order.component';
import { DetailOrderComponent } from './components/order/detail-order/detail-order.component';
import { UpdateOrderComponent } from './components/order/update-order/update-order.component';
import { DeleteOrderComponent } from './components/order/delete-order/delete-order.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CategoryAdminPageComponent,
    AddNewCategoryComponent,
    DetailCategoryComponent,
    UpdateCategoryComponent,
    DeleteCategoryComponent,

    ProductAdminPageComponent,
    AddNewProductComponent,
    DetailProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,

    BlogAdminPageComponent,
    AddNewBlogComponent,
    DeleteBlogComponent,
    DetailBlogComponent,
    UpdateBlogComponent,

    BrandAdminPageComponent,
    AddNewBrandComponent,
    DetailBrandComponent,
    UpdateBrandComponent,
    DeleteBrandComponent,

    OrderAdminPageComponent,
    AddNewOrderComponent,
    DetailOrderComponent,
    UpdateOrderComponent,
    DeleteOrderComponent,
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    CategoryAdminPageComponent,
    ProductAdminPageComponent,
    BrandAdminPageComponent,
    BlogAdminPageComponent
  ]
})
export class AdminModule { }
