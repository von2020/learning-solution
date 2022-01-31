import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $ : any;

@Component({
  selector: 'app-facilitator-profile',
  templateUrl: './facilitator-profile.component.html',
  styleUrls: ['./facilitator-profile.component.css']
})
export class FacilitatorProfileComponent implements OnInit, AfterViewInit, OnDestroy {

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

  constructor(private sendDataService : SendDataService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private courseService: CourseService,
    private learnerService: LearnerService,
    private facilitatorService: FacilitatorService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
  ngAfterViewInit(): void {
      console.log('AFTER VIEW INIT', this.id);
    }

  ngOnInit(): void {

    console.log('ON INIT', this.id);

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });

   this.courseService.getCoursesById(this.id).subscribe(category => {
    console.log(category);
    if(category.statusCode == 200){
    this.course = category.data[0];
    this.facilitatorId = category.data[0].courseData.facilitatorId;
    console.log(this.facilitatorId);
    this.getFacilitatorById(this.facilitatorId)
    this.getAllCoursesByFacilitatorId();
    this.getCoursesByFacilitatorLearnerEnrolledFor(this.facilitatorId);
    this.getFacilitatorCourseReviews(this.facilitatorId);
    }
   //  this.sendDataService.setMessage(category.data);
  },
  err => {
    console.log(err);
    return false;
  });

    // this.getAllCoursesByFacilitatorId();

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
      if(detail.statusCode == 200) {
      console.log(detail.data);
      this.facilitatorCourses = detail.data;
      setTimeout( ()=>{
      
        $(".my-rating").starRating({
          starSize: 18,
          starShape: 'rounded',
          readOnly: true
        });
        }, 2000);
      this.facilitatorCourseCount = this.facilitatorCourses.length;
      this.hideLoadingSpinner();
      // this.sendDataService.setMessage(detail.data);
    }
  
    if(detail.statusMessage == "Successful, No Record Available") {
      this.message = "You haven't Started Making any Course yet !!!";
      // $("#message").show
      console.log(this.message);
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
      
          this.facilitatorCourses = facilitatorCourses;
          this.count = totalItems;
          console.log(response);
          this.hideLoadingSpinner();
          console.log(response);
          console.log(response.data);
          this.facilitatorCourses = response.data;
          this.hideLoadingSpinner();
        }
    
if(response.statusMessage == "Successful, No Record Available") {
  this.message = "You haven't Started Taking any Course yet !!!";
  // $("#message").show
  console.log(this.message);
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

  getCourseByCourseName(value:string) {
    this.showLoadingSpinner();
    this.courseService.searchCourseByCourseName(value).subscribe(data => {
      if(data.statusCode == 200) {
      console.log(data);
      console.log(data.data);
      this.enrolledCourses = data.data;
      this.hideLoadingSpinner();
    }
    
    if(data.statusMessage == `There is no Course with the Name ${value}`) {
      this.hideLoadingSpinner();
      this.message = data.statusMessage;
      // $("#message").show
      console.log(this.message);
  }
},
  err => {
    console.log(err);
    this.message = "An Error Occured. Could not get your Courses"
    return false;
  });
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

}
