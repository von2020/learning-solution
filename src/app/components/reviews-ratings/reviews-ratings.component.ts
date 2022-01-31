import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
declare var $ : any;

@Component({
  selector: 'app-reviews-ratings',
  templateUrl: './reviews-ratings.component.html',
  styleUrls: ['./reviews-ratings.component.css']
})
export class ReviewsRatingsComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 50
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
   reviews: any;
   courseReviewId: any
  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private courseService: CourseService,
    private adminService: AdminService,
    private router: Router) { }
    
  ngOnInit(): void {
    this.getAllReviews()

    
  }

  getAllReviews() {
    this.courseService.getCourseReviewsbyPagination(this.pageNumber, this.pageLength).subscribe(data => {
      console.log(data);
      
      this.dtOptions = {
        // pagingType: 'full_numbers',
        pageLength: 50,
           lengthMenu : [10, 20, 25, 50],
        processing: true
      };
      this.dtTrigger.next()
      this.reviews = data.data;
    },
    err => {
      console.log(err);
      return false;
    });

  }

  deleteReview(id) {
    this.courseReviewId = id;
    $('#deleteModal').modal('show');
  }

  confirmDeleteReview() {
    this.loading = true;
    this.adminService.deleteCourseReview(this.courseReviewId).subscribe(data => {
      this.loading = false;
      console.log(data);
        if(data.statusCode == 200){
          this.reviews = this.reviews.filter((ser) => {
            return ser.courseId !== this.courseReviewId
          });
          console.log(this.reviews);
          this.toastr.info('Review removed');
          $('#deleteModal').modal('hide');
        } else if (data.statusMessage == "No Review with the specified ID") {
          this.toastr.info(data.statusMessage);
          $('#deleteModal').modal('hide');
        }
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

  
  onLogoutClick(){
    $("#logoutModal").modal('hide')
    this.authService.logout();
    this.toastr.success('Logout Successfull');
    this.router.navigate(['/login-super-admin']);
    return false;
  }

}
