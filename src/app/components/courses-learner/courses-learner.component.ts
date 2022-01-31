import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $:any;

@Component({
  selector: 'app-courses-learner',
  templateUrl: './courses-learner.component.html',
  styleUrls: ['./courses-learner.component.css']
})
export class CoursesLearnerComponent implements OnInit {

  enrolledCourses: any;
  learnerId: any;
  message: any;
  marked=false;
  searchText : string;
  loading:boolean=false;

  currentCourse = null;

  page = 1;
  count = 0;
  pageSize = 9;
  pageSizes = [9, 12, 15];
  currentIndex = -1;
  courseId: any;


  constructor(private sendDataService : SendDataService,
    private authService: AuthService,
    private courseService : CourseService,
    private learnerService : LearnerService,
    private router: Router,
    private toastr: ToastrService) {

     }

  ngOnInit(): void {

    this.learnerId = JSON.parse(this.authService.getId());
    console.log(this.learnerId)

    this.getLeanerCourses();
    // setTimeout(function () {
      // this.getCoursesEnrolledFor();
      // }, 3000);
    
      // $(".my-rating").starRating({
      //   starSize: 18,
      //   readOnly: true,
      //   starShape: 'rounded',
      //   hoverColor: 'crimson',
      //   activeColor: 'salmon',
      // });

  }

  getLeanerCourses() {
    this.showLoadingSpinner();
  this.learnerService.getAllCoursesLearnerEnrolledFor(this.learnerId).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200) {
    console.log(data.data);
    
    setTimeout(function () {
      $('.m-rating').starRating({
        initialRating: 2,
        starSize: 18,
        readOnly: true,
        starShape: 'rounded',
        hoverColor: 'crimson',
        activeColor: 'salmon'
      });
    }, 2000);
  
    this.enrolledCourses = data.data;
    this.hideLoadingSpinner();
  }
  
  if(data.statusMessage == "Successful, No Record Available") {
    this.message = "You haven't Started Taking any Course yet !!!";
    // $("#message").show
    console.log(this.message);
}
},
err => {
  console.log(err);
  // this.message = "An Error Occured. Could not get your Courses"
  return false;
});

}

getCoursesEnrolledFor() {
  this.showLoadingSpinner();
this.learnerService.getAllCoursesLearnerEnrolledForByPagination(this.learnerId,this.page,this.pageSize).subscribe(
  response => {
    const { enrolledCourses, totalItems } = response.data;
    if(response.statusCode == 200) {
      
          this.enrolledCourses = enrolledCourses;
          this.count = totalItems;
          console.log(response);
          this.hideLoadingSpinner();
          console.log(response);
          console.log(response.data);
          this.enrolledCourses = response.data;
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

deleteCourse(id) {
  this.courseId = id;
  $('#deleteModal').modal('show');
}

archiveCourse(id) {
  console.log(id)
  const archivedCourse = {
    learnerId: this.learnerId,
    courseId: id
  }

  console.log(archivedCourse)

  this.learnerService.archiveOrUnArchiveCourseEnrolledFor(archivedCourse, this.learnerId, id).subscribe(data => {
    console.log(data);
    if(data.statusMessage == "Course Archived/UnArchived Successfully"){
      this.toastr.success("Course Archived Successfully");
      this.router.navigate(['/archived-courses-learner'])
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

confirmDeleteCourse() {
  this.loading = true;
  this.learnerService.deleteCourseEnrolledbyCourseId(this.courseId).subscribe(data => {
    this.loading = false;
    console.log(data);
      if(data.statusCode == 200){
        this.enrolledCourses = this.enrolledCourses.filter((ser) => {
          return ser.courseId !== this.courseId
        });
        // this.authService.removeCart();
        // $("#badgevisibility").hide();
        // this.getCartSubTotalCheckout();
        console.log(this.enrolledCourses);
        // this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
        this.toastr.info('Course removed');
        $('#deleteModal').modal('hide');
        // this._flashMessagesService.show("Course Topic removed", {cssClass: 'alert-success', closeOnClick: true,});
      } else if (data.statusMessage == "This Course has been Enrolled for") {
        this.toastr.info(data.statusMessage);
        $('#deleteModal').modal('hide');
      }
      else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        $('#deleteModal').modal('hide');
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    },
    err => {
      this.loading = false;
      console.log(err);
      return false;
    });
}

  onNativeChange(e) { // here e is a native event
    if(e.target.value.trim){
      // do something 
      // this.marked= e.target.closed;
      this.getCoursesEnrolledFor();
      this.getLeanerCourses();
      // this.show = !this.show;
    }
    
  }

  toggle() {
    var selectOptionValue = $( "#sel option:selected" ).val();
    console.log(selectOptionValue);
  if (selectOptionValue == 0) {
      this.getCoursesEnrolledFor();
      this.getLeanerCourses();
    }
    else if (selectOptionValue == 1) {
      this.getPaidCourses()
    }

    else if (selectOptionValue == 2) {
      this.getFreeCourses();
    }
  // }
  }

  getPaidCourses() {
    this.showLoadingSpinner();
  this.learnerService.getAllCoursesLearnerEnrolledFor(this.learnerId).subscribe(data => {
    console.log(data);
    if(data.statusCode == 200) {
    let paidCourses = data.data;
    this.enrolledCourses = paidCourses.filter(function (e) {
      return e.courseTypeName == "Paid";
  });
  console.log(this.enrolledCourses);
    this.hideLoadingSpinner();
  }
  
  if(data.statusMessage == "Successful, No Record Available") {
    this.message = "You haven't Started Taking any Course yet !!!";
    // $("#message").show
    console.log(this.message);
}
},
err => {
  console.log(err);
  // this.message = "An Error Occured. Could not get your Courses"
  return false;
});

    
  console.log(this.enrolledCourses);
  }

  getFreeCourses() {
    this.showLoadingSpinner();
    this.learnerService.getAllCoursesLearnerEnrolledFor(this.learnerId).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200) {
      let paidCourses = data.data;
      this.enrolledCourses = paidCourses.filter(function (e) {
        return e.courseTypeName == "Free";
    });
    console.log(this.enrolledCourses);
      this.hideLoadingSpinner();
    }
    
    if(data.statusMessage == "Successful, No Record Available") {
      this.message = "You haven't Started Taking any Course yet !!!";
      // $("#message").show
      console.log(this.message);
  }
  },
  err => {
    console.log(err);
    // this.message = "An Error Occured. Could not get your Courses"
    return false;
  });
  console.log(this.enrolledCourses);
  }


  getCourseBySearchedName(value:string) {
    this.showLoadingSpinner();
    this.learnerService.searchCoursesEnrolledFor(this.learnerId, value).subscribe(data => {
      console.log(data);
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
    // this.message = "An Error Occured. Could not get your Courses"
    return false;
  });
  console.log(this.enrolledCourses);
  }


//   getCourseByCourseName(value:string) {
//     this.showLoadingSpinner();
//     this.authService.searchCourseByCourseName(value).subscribe(data => {
//       if(data.statusCode == 200) {
//       console.log(data);
//       console.log(data.data);
//       this.enrolledCourses = data.data;
//       this.hideLoadingSpinner();
//     }
    
//     if(data.statusMessage == `There is no Course with the Name ${value}`) {
//       this.hideLoadingSpinner();
//       this.message = data.statusMessage;
//       // $("#message").show
//       console.log(this.message);
//   }
// },
//   err => {
//     console.log(err);
//     this.message = "An Error Occured. Could not get your Courses"
//     return false;
//   });
//   }

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
  this.getLeanerCourses();
}


handlePageSizeChange(event): void {
  this.pageSize = event.target.value;
  this.page = 1;
  // this.getCoursesEnrolledFor();
  this.getLeanerCourses();
}

setActiveCourse(course, index): void {
  this.currentCourse = course;
  this.currentIndex = index;
}

}
