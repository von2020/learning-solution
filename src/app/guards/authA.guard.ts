import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthAGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}
  canActivate(){
    const currentAUser = this.authenticationService.currentAUserValue;
    if(localStorage.getItem('id_Atoken')){
      return true;

      } else {
          this.router.navigate(['/login-super-admin']);
          return false
      }
  }

}
