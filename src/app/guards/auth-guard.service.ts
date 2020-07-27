import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {LoginService} from "../login.service";
import {catchError, filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate() {
    return this.loginService.checkLogin().pipe(
      map(retorno => {
        console.log('Verificando...', retorno);
        return retorno.success;
      }),
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        this.router.navigateByUrl("/login");
        return of(false);
      }),
    );

  }
}
