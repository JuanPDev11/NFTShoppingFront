import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Register } from '../interface/register';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../interface/login';
import { User } from '../interface/user';
import { ReplaySubject, map, of } from 'rxjs';
import { env } from 'process';
import { Router } from '@angular/router';
import { decode } from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  myApiUrl = environment.endpoint;
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();
  

  constructor(private _http:HttpClient, private router:Router) { }

  register(model:Register) {
    return this._http.post(`${this.myApiUrl}api/account/register`, model);
  }

  login(model: Login) {
    return this._http.post<User>(`${this.myApiUrl}api/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          
          this.setUser(user);
          

        }
      })   
    );
    
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigate(['']);
    location.reload();
  }

  refreshUser(jwt:string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined)
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);
    return this._http.get<User>(`${this.myApiUrl}api/account/refresh-token`, { headers }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }


  confirmEmail(userId:string,token:string) {
    return this._http.get(`${this.myApiUrl}api/account?userId=${userId}&token=${token}`);
  }


   getJWT()  {
    

      const key = localStorage.getItem(environment.userKey);

      if (key) {
        const user: User = JSON.parse(key);
        
        
        
        return user.jwt;
      } else {
        return null;
      }

    
  }

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.userSource.next(user);
  }



}
