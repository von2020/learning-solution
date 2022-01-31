import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-super-admin-navbar',
  templateUrl: './super-admin-navbar.component.html',
  styleUrls: ['./super-admin-navbar.component.css']
})
export class SuperAdminNavbarComponent implements OnInit {
  user : any = {}
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const auser = this.authService.getAUser();
    this.user = auser
    console.log(this.user);
  }

}
