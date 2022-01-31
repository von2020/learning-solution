import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthFGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}
  canActivate(){
    const currentFUser = this.authenticationService.currentFUserValue;
    if(localStorage.getItem('id_Ftoken')){
      return true;

      } else {
          this.router.navigate(['/home']);
          return false
      }
  }

}
