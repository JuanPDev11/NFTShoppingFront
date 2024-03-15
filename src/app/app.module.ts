import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetCategoriesComponent } from './components/get-categories/get-categories.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { GetProductComponent } from './components/get-product/get-product.component';
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    GetCategoriesComponent,
    CreateUpdateComponent,
    GetProductComponent,
    CreateUpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
