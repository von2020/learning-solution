import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-navbar',
  templateUrl: './school-navbar.component.html',
  styleUrls: ['./school-navbar.component.css']
})
export class SchoolNavbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    if(this.authService.authToken == null || this.authService.authToken == undefined) {
          return false;
        } else {
          return true;
      }
  }

}
