import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-comfirm-email',
  templateUrl: './comfirm-email.component.html',
  styleUrl: './comfirm-email.component.scss'
})
export class ComfirmEmailComponent implements OnInit{
  userId!: string | null;
  token!: string | null;
  emailConfirmed = false;
  constructor(private _route: ActivatedRoute, private _serviceA: AccountService) {
    this._route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
      
    });
  }



  ngOnInit(): void {
    this.confirmEmail();
  }

  confirmEmail() {
    if (this.userId !== null && this.token !== null) {
      this._serviceA.confirmEmail(this.userId, this.token ).subscribe();
    }
    this.emailConfirmed = true;
  }
}
