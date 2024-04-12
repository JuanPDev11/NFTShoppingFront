import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RoleServiceService } from '../services/role-service.service';
import { Observable, of } from 'rxjs';
import { SharedService } from '../shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class roleGuardGuard implements CanActivate {
  islocal = this.checkLocal();
  constructor(private _serviceR:RoleServiceService, private _redirect:Router, private _ServiceS:SharedService) { }
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {

    const expectedRoleAdmin = route.data['expectedRoleAdmin'];
    const expectedRoleEmployee = route.data['expectedRoleEmployee'];
    if (this.islocal) {

      const actualRole = this._serviceR.getRole();
      if (actualRole !== expectedRoleAdmin && actualRole !== expectedRoleEmployee) {
        this._ServiceS.showModal('Unauthorized', 'this area is for admin');
        this._redirect.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      }

      return of(true);
    }
    return of(true);

  }

  checkLocal() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }


}
