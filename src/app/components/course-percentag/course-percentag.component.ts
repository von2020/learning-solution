import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
declare var $ : any;

@Component({
  selector: 'app-course-percentag',
  templateUrl: './course-percentag.component.html',
  styleUrls: ['./course-percentag.component.css']
})
export class CoursePercentagComponent implements OnInit {
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
  courses: any;
  percentage: number;
  courseId: number;
  activeCourse : any = {}
  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {

    this.getCourses()

  }

  getCourses() {
    this.adminService.getPercentagesEarnedOnCourses().subscribe(data => {
      console.log(data);
      this.dtOptions = {
        // pagingType: 'full_numbers',
        pageLength: 10,
           lengthMenu : [10, 20, 25, 50],
        processing: true
      };
      this.dtTrigger.next()
    this.courses = data.data;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  updateCourse(course) {
    this.activeCourse = course
    this.courseId = this.activeCourse.id;
    // $('#editModal').modal('show');
  }

  updateCoursePercentage() {
    this.loading = true;
    console.log(this.courseId)
    const updatedPercentage = {
      courseId: this.courseId,
      percentage: Number(this.activeCourse.percentage)
    }
  
    console.log(updatedPercentage)
    this.adminService.updatePercentageEarnedOnCourses(updatedPercentage, this.activeCourse.percentage, this.courseId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusMessage == "Updated Successfully"){
          location.reload()
          console.log(this.courses);
          this.toastr.info('Course Percentage Updated');
          $('#editModal').modal('hide');
        } else if (data.statusMessage == "No Record Found") {
          this.toastr.info(data.statusMessage);
          $('#editModal').modal('hide');
        }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#editModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
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
