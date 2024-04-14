import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Category } from '../../interface/category';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AppComponent } from '../../app.component';
import { RoleServiceService } from '../../services/role-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';
  
  token: any;
  carts: any;
  constructor(private _redirect: Router, public service: AccountService, public app: AppComponent,
              private _roleService:RoleServiceService,private serviceC:CategoryService) {
    
  }
    

  logout() {
    this.service.logout();
    //this._redirect.navigateByUrl('');
    //location.reload();
  }

  ngOnInit(): void {
    if (this.isLocalStorageAvailable) {
      this.getCarts();
      this.token = this._roleService.getRole();
    }
    
  }

  getCarts() {
    this.serviceC.cartObservable.subscribe({
      next: (data: any) => {
        this.carts = data;
      }
    })

    this.serviceC.cartObservable.subscribe({
      next: (data: any) => {
        this.carts = data;
      }
    })
  }

  
}
