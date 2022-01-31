import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $ : any;

@Component({
  selector: 'app-remove-course',
  templateUrl: './remove-course.component.html',
  styleUrls: ['./remove-course.component.css']
})
export class RemoveCourseComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 50
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
  courses: any;
  courseId: any;
  email : any;
  confrimedEmail: () => string;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private courseService: CourseService,
    private facilitatorService: FacilitatorService,
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit(): void {

    this.confrimedEmail = this.authService.getAEmail;
    this.getAllCourse(this.pageNumber, this.pageLength)

    
  }

  onScroll() {
    this.pageNumber++;
    this.getAllCourse(this.pageNumber, this.pageLength);
  }

  getAllCourse(pageNumber, pageLength) {
    this.courseService.getAllCourse(pageNumber, pageLength).subscribe(data => {
      console.log(data.data);
      
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 50,
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

  viewCourse(id) {
    console.log(id);
    this.router.navigate(['/course-view'], { queryParams: { id: id } });

  }

  deleteCourse(id) {
    this.courseId = id;
    $('#deleteModal').modal('show');
  }

  confirmDeleteCourse() {
    this.loading = true;
    this.facilitatorService.deleteCourse(this.courseId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusCode == 200){

          if (data.statusMessage == "This Course has been Enrolled for") {
            this.toastr.info(data.statusMessage);
            $('#deleteModal').modal('hide');
          }
          else 
          {
            this.courses = this.courses.filter((ser) => {
              return ser.id !== this.courseId
            });
            console.log(this.courses);
            this.toastr.success('Course removed');
            $('#deleteModal').modal('hide');
          }
        } 
        // else if (data.statusMessage == "This Course has been Enrolled for") {
        //   this.toastr.info(data.statusMessage);
        //   $('#deleteModal').modal('hide');
        // }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#deleteModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
  }

  hardDeleteCourse(id) {
    this.courseId = id;
    $('#hardDeleteModal').modal('show');
  }

  confirmHardDeleteCourse() {

    if (this.email == this.confrimedEmail) {
    this.loading = true;
    this.adminService.deleteCourseAttachedToEnrollee(this.courseId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusCode == 200){

          if (data.statusMessage == "This Course has been Enrolled for") {
            this.toastr.info(data.statusMessage);
            $('#deleteModal').modal('hide');
          }
          else 
          {
            this.courses = this.courses.filter((ser) => {
              return ser.id !== this.courseId
            });
            console.log(this.courses);
            this.toastr.success('Course removed');
            $('#deleteModal').modal('hide');
          }
        } 
        // else if (data.statusMessage == "This Course has been Enrolled for") {
        //   this.toastr.info(data.statusMessage);
        //   $('#deleteModal').modal('hide');
        // }
        else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          $('#deleteModal').modal('hide');
        }
      },
      err => {
        this.loading = false;
        console.log(err);
        return false;
      });
  }
  else {
    this.toastr.error("Wrong Email", 'Something Went Wrong!', {
      timeOut: 3000,
    });
  }
}
  
  onLogoutClick(){
    $("#logoutModal").modal('hide')
    this.authService.logout();
    this.toastr.success('Logout Successfull');
    this.router.navigate(['/login-super-admin']);
    return false;
  }

}
