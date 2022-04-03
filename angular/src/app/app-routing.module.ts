import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Gọi ra các component đi qua trang khác
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { PostCategoryComponent } from './post-category/post-category.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CategoryComponent } from './category/category.component';


// not found
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'post-category',
    component: PostCategoryComponent
  },
  {
    path: 'category/:id',
    component: CategoryComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
