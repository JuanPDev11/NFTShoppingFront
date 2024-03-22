import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit {
  private isLocalStorageAvailable = typeof localStorage !== 'undefined'; 

  constructor(private _service:AccountService) { }
  ngOnInit(): void {

    if (this.isLocalStorageAvailable)
    {

    this.RefreshUser();
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
      })
    } else {
      this._service.refreshUser(null).subscribe();
    }
  }

  
}
