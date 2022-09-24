import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cuentaService: AccountService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree>{
    return this.cuentaService.currentUser$.pipe(
      map(auth =>{
        if(auth){
          return true;
        }else{
          this.router.navigate(['cuenta/login'], {queryParams: {returnUrl: state.url}});
          return false
        }
      })
    );
  }
  
}
