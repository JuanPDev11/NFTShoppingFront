import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCategoriesComponent } from './components/get-categories/get-categories.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';
import { GetProductComponent } from './components/get-product/get-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'categoryIndex', pathMatch: 'full' },
  { path: 'categoryIndex', component: GetCategoriesComponent },
  { path: 'createUpdate', component: CreateUpdateComponent },
  { path: 'createUpdate/:id', component: CreateUpdateComponent },
  { path: 'productIndex', component: GetProductComponent },
  { path: 'creUpd', component: CreateUpdateProductComponent },
  { path: 'creUpd/:id', component: CreateUpdateProductComponent },
  { path:'**', redirectTo: 'categoryIndex' , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
