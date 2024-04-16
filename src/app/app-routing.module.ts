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
import { roleGuardGuard } from './guards/role-guard.guard';
import { CreatorComponent } from './components/creator/creator.component';
import { DetailsComponent } from './components/details/details.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { MarketPlaceComponent } from './components/market-place/market-place.component';
import { CartComponent } from './components/cart/cart.component';
import { SummaryComponent } from './components/summary/summary.component';
import { OrdersuccessComponent } from './components/ordersuccess/ordersuccess.component';
import { GetOrdersComponent } from './components/get-orders/get-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { GetUsersComponent } from './components/get-users/get-users.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  {
    path: 'categoryIndex',
    component : GetCategoriesComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [roleGuardGuard],
    data: { expectedRoleAdmin: 'Admin', expectedRoleEmployee: 'Employee' }
  },
  {
    path: 'artistIndex',
    component: GetArtistComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [roleGuardGuard],
    data: { expectedRoleAdmin: 'Admin', expectedRoleEmployee: 'Employee' }
  },
  {
    path: 'productIndex',
    component: GetProductComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [roleGuardGuard],
    data: { expectedRoleAdmin: 'Admin', expectedRoleEmployee: 'Employee' }
  },
  {
    path: 'orderIndex',
    component: GetOrdersComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [roleGuardGuard],
    data: { expectedRoleAdmin: 'Admin', expectedRoleEmployee: 'Employee' }
  },
  {
    path: 'cart',
    component: CartComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'indexUsers',
    component: GetUsersComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [roleGuardGuard],
    data: {expectedRoleAdmin:'Admin',expectedRoleEmployee:'Employee'}
  },
  { path: 'createUpdate', component: CreateUpdateComponent },
  { path: 'createUpdate/:id', component: CreateUpdateComponent },
  { path: 'creUpd', component: CreateUpdateProductComponent },
  { path: 'creUpd/:id', component: CreateUpdateProductComponent },
  { path: 'artistCreUpd', component: ArtistCreupComponent},
  { path: 'artistCreUpd/:id', component: ArtistCreupComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'account', loadChildren: () => import('./account/account.module').then(module => module.AccountModule)},
  { path: 'details/:id', component: DetailsComponent },
  { path: 'creator/:id', component: CreatorComponent},
  { path: 'ranking', component: RankingComponent},
  { path: 'market', component: MarketPlaceComponent },
  { path: 'ordersuccess/:id', component: OrdersuccessComponent },
  { path: 'orderdetails/:id', component: OrderDetailsComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
