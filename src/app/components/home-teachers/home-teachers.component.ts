import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
declare var $:any;

@Component({
  selector: 'app-home-teachers',
  templateUrl: './home-teachers.component.html',
  styleUrls: ['./home-teachers.component.css']
})
export class HomeTeachersComponent implements OnInit {
  facilitatorId: any;
  facilitatorCourses: any;
  facilitatorCourseCount: any;
  coursesCount: any;
  settled : any
  amounts: any;
  settles: any;

  constructor(
    private authService: AuthService,
    private facilitatorService: FacilitatorService,
    private courseService: CourseService,
    private learnerService: LearnerService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // $('app-navbar'). find('header'). remove() ;
    // $('app-footer'). find('footer'). remove() ;
    this.facilitatorId = JSON.parse(localStorage.getItem('userFId'));
    this.getAllCoursesByFacilitatorId();
    this.getCoursesByFacilitatorLearnerEnrolledFor(this.facilitatorId);
    this.getTotalSales(this.facilitatorId);
    
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

  onLogoutClick(){
    this.authService.logout();
    this.toastr.success('You are Logged Out');
    // this._snackBar.open('You are logged out', 'dismiss', {
    //   duration: 500,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    this.router.navigate(['/home']);
    return false;
  }

}
