import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LearnerService } from 'src/app/services/learner.service';
declare var $:any;

@Component({
  selector: 'app-archived-courses-learner',
  templateUrl: './archived-courses-learner.component.html',
  styleUrls: ['./archived-courses-learner.component.css']
})
export class ArchivedCoursesLearnerComponent implements OnInit {

  enrolledCourses: any;
  learnerId: any;
  message: any;
  loading:boolean=false;

  courseId: any;

  constructor(private authService: AuthService,
    private learnerService: LearnerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.learnerId = JSON.parse(this.authService.getId());
    console.log(this.learnerId)

    this.getLeanerCourses();
  }

  getLeanerCourses() {
    this.showLoadingSpinner();
  this.learnerService.getAllArchivedCoursesEnrolledFor(this.learnerId).subscribe(data => {
    if(data.statusCode == 200) {
    console.log(data);
    console.log(data.data);
    
    setTimeout(function () {
      $('.m-rating').starRating({
        initialRating: 2,
        starSize: 18,
        starShape: 'rounded',
        hoverColor: 'crimson',
        activeColor: 'salmon'
      });
    }, 2000);
  
    this.enrolledCourses = data.data;
    this.hideLoadingSpinner();
  }
  
  if(data.statusMessage == "Successful, No Record Available") {
    this.message = "You haven't Archived any Course yet !!!";
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
deleteCourse(id) {
  this.courseId = id;
  $('#deleteModal').modal('show');
}

archiveCourse(id) {
  const user = {
    learnerId: this.learnerId,
    courseId: id
  }

  this.learnerService.archiveOrUnArchiveCourseEnrolledFor(JSON.stringify(user), this.learnerId, id).subscribe(data => {
    console.log(data);
    if(data.statusMessage == "Course Archived/UnArchived Successfully"){
      this.toastr.success("Course UnArchived Successfully");
      this.router.navigate(['/courses-learner'])
    }else {
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


  showLoadingSpinner() {
    this.loading = true;
}

  hideLoadingSpinner() {
    this.loading = false;
}

}
