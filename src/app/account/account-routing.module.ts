import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComfirmEmailComponent } from './comfirm-email/comfirm-email.component';

const routes: Routes = [
  {path:'login' , component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'confirmEmail' , component : ComfirmEmailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class AccountRoutingModule { }
