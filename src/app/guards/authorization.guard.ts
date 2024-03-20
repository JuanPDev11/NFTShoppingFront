import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountModule } from '../account/account.module';
import { AccountService } from '../services/account.service';
import { SharedService } from '../shared/shared.service';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard  {

  constructor(private serviceAccount: AccountService, private serviceShared: SharedService,
  private _redirect:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    
    return this.serviceAccount.user$.pipe(
      map((user: User | null) => {
        if (user) {
          return true;
        } else {
          this.serviceShared.showModal("restricted Area", "leave inmediately!");
          this._redirect.navigate(['/account/login'], { queryParams: {returnUrl: state.url } });
          return false;
        }
      })
    )
  }
}

