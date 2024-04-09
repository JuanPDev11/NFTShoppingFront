import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


//Angular Material
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { AccountModule } from '../account/account.module';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { AppComponent } from '../app.component';
import { CreateUpdateComponent } from '../components/create-update/create-update.component';
import { GetCategoriesComponent } from '../components/get-categories/get-categories.component';
import { GetProductComponent } from '../components/get-product/get-product.component';
import { CreateUpdateProductComponent } from '../components/create-update-product/create-update-product.component';
import { GetArtistComponent } from '../components/get-artist/GetArtistComponent';
import { ArtistCreupComponent } from '../components/artist-creup/artist-creup.component';
import { NotFoundComponent } from '../components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from '../components/errors/validation-messages/validation-messages.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HomeComponent } from '../components/home/home.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    

    

  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule



    
    
    
  ],
  exports: [
    MatPaginatorModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule

  

 
  ]
})
export class SharedModule { }
