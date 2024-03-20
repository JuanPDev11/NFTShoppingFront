import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { ValidationMessagesComponent } from '../components/errors/validation-messages/validation-messages.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ValidationMessagesComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    
  ]
})
export class AccountModule { }
