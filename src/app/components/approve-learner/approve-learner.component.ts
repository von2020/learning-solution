import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
declare var $ : any;

@Component({
  selector: 'app-approve-learner',
  templateUrl: './approve-learner.component.html',
  styleUrls: ['./approve-learner.component.css']
})
export class ApproveLearnerComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
  courses: any;
  courseId: any;
  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private courseService: CourseService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPendingCourse()
  }
  getPendingCourse() {
    this.courseService.getCoursesByStatusId(2).subscribe(data => {
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

  viewCourse(id) {
    console.log(id);
    this.router.navigate(['/course-view'], { queryParams: { id: id } });

  }

  approveCourse(id) {
    console.log(id)
  
    this.adminService.approveCourseCreation(id).subscribe(data => {
      console.log(data);
      if(data.statusMessage == "Course Approved and Verified Successfully"){
        this.toastr.success("Course Approved and Verified Successfully");
        this.courses = this.courses.filter((ser) => {
                  return ser.courseData.id !== id;
                });
      }
      else if (data.statusMessage == "No Course with the specified ID") {
        this.toastr.info(data.statusMessage);
      }
      else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  declineCourse(id) {
    this.courseId = id;
    $('#declineModal').modal('show');
  }

  completeDeclineCourse() {

  }
  
onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}
