import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(){
    const currentUser = this.authenticationService.currentUserValue;
    if(localStorage.getItem('id_token')){
      return true;

      } else {
          this.router.navigate(['/home']);
          return false
      }
  }
}
