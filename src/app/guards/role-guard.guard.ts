import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RoleServiceService } from '../services/role-service.service';
import { Observable, of } from 'rxjs';
import { SharedService } from '../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class roleGuardGuard implements CanActivate {

  constructor(private _serviceR:RoleServiceService, private _redirect:Router, private _ServiceS:SharedService) { }
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    const expectedRole = route.data['expectedRole'];
    const actualRole = this._serviceR.getRole();
    if (actualRole !== expectedRole) {
      this._ServiceS.showModal('Unauthorized', 'this area is for admin');
      this._redirect.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    }

    return of(true);
  }




}
