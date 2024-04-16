import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { CategoryService } from './services/category.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit {
  public isLocalStorageAvailable!: boolean;
  public carts: any;

  constructor(private _service: AccountService, private _cartService: CategoryService) {

    
  }
  ngOnInit(): void {
    this.isLocalStorageAvailable = this.checkLocalStorage();
    if (this.isLocalStorageAvailable)
    {

      this.RefreshUser();
      this._cartService.getCart()
      
    }

  }

  checkLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  private  RefreshUser(){
    const jwt =  this._service.getJWT();
    if (jwt) {
      this._service.refreshUser(jwt).subscribe({
        next: _ => { },
        error: _ => {
          this._service.logout();
        }
      });
      
    } else {
      this._service.refreshUser(null).subscribe();
    }
  }

  
}
