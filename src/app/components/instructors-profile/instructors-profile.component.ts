import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {Location} from '@angular/common';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
import { AdminService } from 'src/app/services/admin.service';
declare var $ : any;

@Component({
  selector: 'app-instructors-profile',
  templateUrl: './instructors-profile.component.html',
  styleUrls: ['./instructors-profile.component.css']
})
export class InstructorsProfileComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  course: any;
  facilitatorId: any;
  enrolledCourses: any;
  learnerId: any;
  message: any;
  marked=false;
  searchText : string;
  loading:boolean=false;

  currentCourse = null;

  page = 1;
  count = 0;
  pageSize = 6;
  pageSizes = [6, 9, 12];
  currentIndex = -1;
  facilitatorCourses: any;
  facilitator: any;
  facilitatorCourseCount: any;
  coursesCount: any;
  reviewsCount: any;
  profilePicture: any;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private facilitatorService: FacilitatorService,
    private adminService: AdminService,
    private courseService: CourseService,
    private learnerService: LearnerService,
    private router: Router,
    private _location: Location) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    
    this.sub = this.route.queryParams.subscribe(params => {
      // this.facilitatorId = +params['id']; // (+) converts string 'id' to a number
      this.facilitatorId = params.id; // (+) converts string 'id' to a number

      console.log(this.facilitatorId);
      // In a real app: dispatch action to load the details here.
      
    this.getFacilitatorById(this.facilitatorId)
    this.getAllCoursesByFacilitatorId();
    this.getCoursesByFacilitatorLearnerEnrolledFor(this.facilitatorId);
    this.getFacilitatorCourseReviews(this.facilitatorId);

   });

  }

  
  getFacilitatorById(id) {
    this.facilitatorService.getFacilitatorById(id).subscribe(detail => {
      console.log(detail.data);
      this.facilitator = detail.data;
      var dp = this.authService.baseUrl;
      this.profilePicture = this.facilitator.profilePictureUrl;
      // this.profilePicture = dp+this.facilitator.profilePictureUrl;
      // this.sendDataService.setMessage(detail.data);
    },
    err => {
      console.log(err);
      return false;
    });
  
  }

  getAllCoursesByFacilitatorId() {
    this.showLoadingSpinner();
    this.facilitatorService. getAllCoursesByFacilitatorId(this.facilitatorId).subscribe(detail => {
      console.log(detail);
      if(detail.statusCode == 200) {
        console.log(detail);
  
    if(detail.statusMessage == "No Available Record") {
      this.facilitatorCourseCount = 0;
      this.hideLoadingSpinner();
      this.message = "Facilitator hasn't Started Making any Course yet !!!";
      // $("#message").show
      console.log(this.message);
  }
  else {

    console.log(detail.data);
    this.facilitatorCourses = detail.data;
    this.facilitatorCourseCount = this.facilitatorCourses.length;
    this.hideLoadingSpinner();
    // this.sendDataService.setMessage(detail.data);

  }

    }
    },
    err => {
      console.log(err);
      return false;
    });
    }

    
    getCoursesByFacilitatorLearnerEnrolledFor(id) {
    this.learnerService.getCoursesByFacilitatorLearnerEnrolledFor(id).subscribe(course => {
      console.log(course);
      if(course.statusCode == 200) {
      console.log(course.data);
      this.coursesCount = course.data.length;
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }

  getFacilitatorCourseReviews (id) {
    this.facilitatorService.getfacilitatorCoursesReviews(id).subscribe(review => {
      console.log(review);
      if(review.statusCode == 200) {
      console.log(review.data);
      this.reviewsCount = review.data.length;
      }
    },
    err => {
      console.log(err);
      return false;
    });
  }



getCoursesEnrolledFor() {
  this.showLoadingSpinner();
this.facilitatorService.getAllCoursePaginationByFacilitatorId(this.facilitatorId,this.page,this.pageSize).subscribe(
//   data => {
//   console.log(data);
//   console.log(data.data);
//   this.enrolledCourses = data.data;
// }
  response => {
    const { facilitatorCourses, totalItems } = response;
    if(response.statusCode == 200) {
      
      
    
if(response.statusMessage == "No Available Record") {
  this.hideLoadingSpinner();
  this.message = "No Courses to show yet !!!";
  $("#message").show
  console.log(this.message);
}
else {
  this.facilitatorCourses = facilitatorCourses;
          this.count = totalItems;
          console.log(response);
          this.hideLoadingSpinner();
          console.log(response);
          console.log(response.data);
          this.facilitatorCourses = response.data;
          this.hideLoadingSpinner();
}
          
        }
}

,
err => {
console.log(err);
this.message = "An Error Occured. Could not get your Courses"
return false;
});

}

  onNativeChange(e) { // here e is a native event
    if(e.target.closed){
      // do something 
      this.marked= e.target.closed;
      // this.getCoursesEnrolledFor();
      this.getAllCoursesByFacilitatorId();
      // this.show = !this.show;
    }
    //  else if(!e.target.checked)  {
    //   this.marked != this.marked;
    //   this.sendMessage();
    //   this.retrieveCourses();
    // }
      // this.buttonName = "Show";
    
  }

  showLoadingSpinner() {
    this.loading = true;
}

  hideLoadingSpinner() {
    this.loading = false;
}


getRequestParams(searchTitle, page, pageSize): any {
  // tslint:disable-next-line:prefer-const
  let params = {};

  if (searchTitle) {
    params[`title`] = searchTitle;
  }

  if (page) {
    params[`page`] = page - 1;
  }

  if (pageSize) {
    params[`size`] = pageSize;
  }

  return params;
}

handlePageChange(event) {
  this.page = event;
  // this.getCoursesEnrolledFor();
  // this.getLeanerCourses();
  this.getAllCoursesByFacilitatorId();
}


handlePageSizeChange(event): void {
  this.pageSize = event.target.value;
  this.page = 1;
  // this.getCoursesEnrolledFor();
  // this.getLeanerCourses();
  this.getAllCoursesByFacilitatorId();
}

setActiveCourse(course, index): void {
  this.currentCourse = course;
  this.currentIndex = index;
}


resendLink(email) {
    
  this.adminService.resendPasswordResetLink(email).subscribe(data => {
        console.log(data);
        if(data.statusCode == 200){
          // alert(data.statusMessage)
          this.toastr.success(data.statusMessage);
        }else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      });
    }

backClicked() {
  this._location.back();
}

onLogoutClick(){
  $("#logoutModal").modal('hide')
  this.authService.logout();
  this.toastr.success('Logout Successfull');
  this.router.navigate(['/login-super-admin']);
  return false;
}

}
