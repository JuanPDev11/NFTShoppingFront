import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetCategoriesComponent } from './components/get-categories/get-categories.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { GetProductComponent } from './components/get-product/get-product.component';
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';
import { GetArtistComponent } from './components/get-artist/GetArtistComponent';
import { ArtistCreupComponent } from './components/artist-creup/artist-creup.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
/*import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';*/
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
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
import { CreUpdUsrComponent } from './components/cre-upd-usr/cre-upd-usr.component';




@NgModule({
  declarations: [
    AppComponent,
    GetCategoriesComponent,
    CreateUpdateComponent,
    GetProductComponent,
    CreateUpdateProductComponent,
    GetArtistComponent,
    ArtistCreupComponent,
    NotFoundComponent,
    
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    CreatorComponent,
    DetailsComponent,
    RankingComponent,
    MarketPlaceComponent,
    CartComponent,
    SummaryComponent,
    OrdersuccessComponent,
    GetOrdersComponent,
    OrderDetailsComponent,
    GetUsersComponent,
    CreUpdUsrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    
  ],
  
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    {provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
