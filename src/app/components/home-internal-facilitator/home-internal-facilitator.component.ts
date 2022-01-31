import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home-internal-facilitator',
  templateUrl: './home-internal-facilitator.component.html',
  styleUrls: ['./home-internal-facilitator.component.css']
})
export class HomeInternalFacilitatorComponent implements OnInit {
  facilitatorId: any;
  facilitatorCourses: any;
  facilitatorCourseCount: any;
  coursesCount: any;
  settled : any
  amounts: any;
  settles: any;

  pageNumber: number = 1
  pageLength: number = 10
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
  courses: any;
  courseId: any;
  course: any;
  modal: any;
  authFToken: any;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private toastr: ToastrService,
    private courseService: CourseService,
    private facilitatorService: FacilitatorService,
    private learnerService: LearnerService,
    private router: Router

    
  ) { }

  ngOnInit(): void {
    // $('app-navbar'). find('header'). remove() ;
    // $('app-footer'). find('footer'). remove() ;
    this.facilitatorId = JSON.parse(localStorage.getItem('userFId'));
    this.getAllCoursesByFacilitatorId();
    this.getCoursesByFacilitatorLearnerEnrolledFor(this.facilitatorId);
    this.getTotalSales(this.facilitatorId);
    this.getPendingCourse()
    
  }

  getPendingCourse() {
    this.courseService.getLearnersByStatusId(this.facilitatorId).subscribe(data => {
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

  approveLearner(id) {
    console.log('hi',id)
    
    console.log('see me',this.courses)
  
    this.courseService.approveLearner(id, this.facilitatorId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        this.toastr.success("Course Approved and Verified Successfully");
        this.courses = this.courses.filter((ser) => {
                  return ser.id !== id;
                });
      }
     
      else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  declineLearner(id) {
    console.log('hi',id)
    
    console.log('see me',this.courses)
  
    this.courseService.declineLearner(id, this.facilitatorId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        this.toastr.success("Course Declined Successfully");
        this.courses = this.courses.filter((ser) => {
                  return ser.id !== id;
                });
      }
     
      else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    });
  }

  // declineCourse(id) {
  //   this.courseId = id;
  //   $('#declineModal').modal('show');
  // }

  completeDeclineCourse() {

  }
  

  getAllCoursesByFacilitatorId() {
    this.facilitatorService. getAllCoursesByFacilitatorId(this.facilitatorId).subscribe(detail => {
       
  
    if(detail.statusMessage == 'No Available Record') {
      this.facilitatorCourseCount = 0
      return;
  }
  
  this.facilitatorCourses = detail.data;
  this.facilitatorCourseCount = this.facilitatorCourses.length;
    },
    err => {
      console.log(err);
      return false;
    });
    }

    
  getCoursesByFacilitatorLearnerEnrolledFor(id) {
    this.learnerService.getCoursesByFacilitatorLearnerEnrolledFor(id).subscribe(course => {
      console.log(course);

      if(course.statusMessage == 'No Available Record') {
        this.coursesCount = 0
        return;
    }

    
    this.coursesCount = course.data.length;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getTotalSales(id) {
    this.facilitatorService.getTotalEarningsSettled(id).subscribe((response) => {
      
      console.log(response);
      if (response.statusMessage === 'No Available Record') {
        // alert('create at least 1 course');
        this.settled = 0
        return;
      }
      // this.toastr.success(response.statusMessage);
      this.settles = response.data;
      console.log(this.settles)

      this.amounts = []

      this.settles.forEach(element => { 
        this.amounts.push(element.totalAmountEarned);
        });
      
      console.log(this.amounts)
      this.settled = this.amounts.reduce((a, b) => a + b, 0)
      console.log(this.settled)

    });
  }

  loadFToken() {
    const token = localStorage.getItem('id_token');
    this.authFToken = token;
  }


  onLogoutClick(){
    this.loadFToken();
    console.log('hey', this.authFToken)
    this.authService.logout();
    this.toastr.success('You are Logged Out');
    // this._snackBar.open('You are logged out', 'dismiss', {
    //   duration: 500,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    this.router.navigate(['/home']);
    console.log()
    return false;
    
  }

}
