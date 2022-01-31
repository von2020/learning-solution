import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare var $ : any;

@Component({
  selector: 'app-analytics-super-admin',
  templateUrl: './analytics-super-admin.component.html',
  styleUrls: ['./analytics-super-admin.component.css']
})
export class AnalyticsSuperAdminComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}
