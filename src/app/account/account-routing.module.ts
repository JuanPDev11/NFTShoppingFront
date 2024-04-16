import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ComfirmEmailComponent } from './comfirm-email/comfirm-email.component';
import { CreUpdUsrComponent } from '../components/cre-upd-usr/cre-upd-usr.component';

const routes: Routes = [
  {path:'login' , component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'confirmEmail', component: ComfirmEmailComponent },
  { path: 'creUpdUsr', component: CreUpdUsrComponent},
  { path: 'creUpdUsr/:id', component: CreUpdUsrComponent },
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
