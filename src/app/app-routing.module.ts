import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCategoriesComponent } from './components/get-categories/get-categories.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';
import { GetProductComponent } from './components/get-product/get-product.component';
import { ArtistCreupComponent } from './components/artist-creup/artist-creup.component';
import { GetArtistComponent } from './components/get-artist/GetArtistComponent';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  { path: '', component:HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
    children: [
      {path:'categoryIndex',component: GetCategoriesComponent}
    ]
  },
  /*{ path: 'categoryIndex', component: GetCategoriesComponent },*/
  { path: 'createUpdate', component: CreateUpdateComponent },
  { path: 'createUpdate/:id', component: CreateUpdateComponent },
  { path: 'productIndex', component: GetProductComponent },
  { path: 'creUpd', component: CreateUpdateProductComponent },
  { path: 'creUpd/:id', component: CreateUpdateProductComponent },
  { path: 'artistCreUpd', component: ArtistCreupComponent},
  { path: 'artistCreUpd/:id', component: ArtistCreupComponent },
  { path: 'artistIndex', component: GetArtistComponent},
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule)},
  { path: 'not-found',component:NotFoundComponent},
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
