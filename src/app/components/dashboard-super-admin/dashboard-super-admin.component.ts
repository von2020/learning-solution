import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
declare var $ : any;

@Component({
  selector: 'app-dashboard-super-admin',
  templateUrl: './dashboard-super-admin.component.html',
  styleUrls: ['./dashboard-super-admin.component.css']
})
export class DashboardSuperAdminComponent implements OnInit {
  courses: any;
  message: string;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPendingCourse()
  }

  getPendingCourse() {
    this.courseService.getCoursesByStatusId(2).subscribe(data => {
      console.log(data);

    this.courses = data.data;

    if(data.statusMessage == "No Available Record") {
        this.message = data.statusMessage;
    }
    },
    err => {
      console.log(err);
      return false;
    });
  }
   
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}