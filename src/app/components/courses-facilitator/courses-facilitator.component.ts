import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $: any;

@Component({
  selector: 'app-courses-facilitator',
  templateUrl: './courses-facilitator.component.html',
  styleUrls: ['./courses-facilitator.component.css'],
})
export class CoursesFacilitatorComponent implements OnInit {
  facilitatorId: any;
  facilitatorCourses: any;
  loading: boolean;
  courseId: any;

  constructor(
    private authService: AuthService,
    private sendDataService: SendDataService,
    private facilitatorService: FacilitatorService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.authService.loadFId();
    this.facilitatorId = JSON.parse(this.authService.getFId());
    console.log(this.facilitatorId);

    this.facilitatorService
      .getAllCoursesByFacilitatorId(this.facilitatorId)
      .subscribe(
        (course) => {
          console.log(course.data);
          this.facilitatorCourses = course.data;
        },
        (err) => {
          console.log(err);
          return false;
        }
      );

    $('.course-rating').starRating({
      starSize: 18,
      readOnly: true,
      starShape: 'rounded',
      hoverColor: 'crimson',
      activeColor: 'salmon',
    });
  }

  deleteCourse(id) {
    this.courseId = id;
    $('#deleteModal').modal('show');
  }

  confirmDeleteCourse() {
    this.loading = true;
    this.facilitatorService.deleteCourse(this.courseId).subscribe(
      (data) => {
        this.loading = false;
        console.log(data);
        if (data.statusMessage == 'Successful') {
          this.facilitatorCourses = this.facilitatorCourses.filter((ser) => {
            return ser.courseData.id !== this.courseId;
          });
          // this.authService.removeCart();
          // $("#badgevisibility").hide();
          // this.getCartSubTotalCheckout();
          console.log(this.facilitatorCourses);
          // this.emptyCart = "Your cart is empty. Keep shopping to find a course!"
          this.toastr.info('Course removed');
          $('#deleteModal').modal('hide');
          // this._flashMessagesService.show("Course Topic removed", {cssClass: 'alert-success', closeOnClick: true,});
        } else if (data.statusMessage == 'This Course has been Enrolled for') {
          this.toastr.info(data.statusMessage);
          $('#deleteModal').modal('hide');
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
        return false;
      }
    );
  }

  goToEditCourse(facilitatorCourse) {
    this.sendDataService.setMessage(facilitatorCourse.courseData.id);
    this.authService.storeCourseId(facilitatorCourse.courseData.id);
    // this.router.navigate(['/edit-course']);
    if ((facilitatorCourse.courseData.isVideoCourse = "false")) {
      this.router.navigate(['/edit-course-material']);
    } else if ((facilitatorCourse.courseData.isVideoCourse = "true")) {
      this.router.navigate(['/edit-course']);
    }
  }

  onLogoutClick() {
    this.authService.logout();
    // this._snackBar.open('You are logged out', 'dismiss', {
    //   duration: 500,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition,
    // });
    this.router.navigate(['/home']);
    return false;
  }
}
