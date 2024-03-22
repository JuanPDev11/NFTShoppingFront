import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from '../shared/shared.module';
import { AppModule } from '../app.module';
import { ValidationMessagesComponent } from '../components/errors/validation-messages/validation-messages.component';
import { AccountService } from '../services/account.service';
import { ComfirmEmailComponent } from './comfirm-email/comfirm-email.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ValidationMessagesComponent,
    ComfirmEmailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    
  ]
})
export class AccountModule {

  constructor(private _service:AccountService) { }

  


}
