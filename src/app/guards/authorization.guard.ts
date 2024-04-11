import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../services/account.service';
import { SharedService } from '../shared/shared.service';
import { User } from '../interface/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard  {
  private isLocalStorage = typeof localStorage !== undefined;
  constructor(private serviceAccount: AccountService, private serviceShared: SharedService,
  private _redirect:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    
    let local = localStorage.getItem(environment.userKey);
    if (local !== null) {
      console.log("from true");
      return of(true);
    } else {
      console.log("from false");
      this.serviceShared.showModal("Please Login","You must be logged")
      this._redirect.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    }
  }
}

