import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Register } from '../interface/register';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  myApiUrl = environment.endpoint;

  constructor(private _http:HttpClient) { }

  register(model:Register) {
    return this._http.post(`${this.myApiUrl}api/account/register`, model);
  }

  login(model: Login) {
    return this._http.post(`${this.myApiUrl}api/account/login`, model);
  }
}
