import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LearnerService } from '../services/learner.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private learnerService: LearnerService
  ) {}

  canActivate(){
    if(this.learnerService.loggedIn()){
      this.router.navigate(['/home']);
      return false

      } else {
        return true;
      }
  }
  
}
