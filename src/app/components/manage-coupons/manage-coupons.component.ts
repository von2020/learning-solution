import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LearnerService } from 'src/app/services/learner.service';
declare var $ : any;

@Component({
  selector: 'app-manage-coupons',
  templateUrl: './manage-coupons.component.html',
  styleUrls: ['./manage-coupons.component.css']
})
export class ManageCouponsComponent implements OnInit {
  pageNumber: number = 1
  pageLength: number = 50
  dtOptions: DataTables.Settings = {};
   dtTrigger : any = new Subject();
   loading : boolean
   coupons: any = [];
   selectedFile: File
   CouponCode: any;
   CouponPercentage: any;
   CreatedById: any;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private adminService: AdminService,
    private courseService: CourseService,
    private router: Router) { 

      this.CreatedById = JSON.parse(localStorage.getItem('userAId'));
    }

  ngOnInit(): void {

    this.getCouponCodes()

    
  }

  createCoupons() {

const couponItem = {
  CouponCode: this.CouponCode,
  CouponPercentage: this.CouponPercentage,
  CreatedById: this.CreatedById
}

console.log(couponItem);

this.adminService.createCoupon(couponItem).subscribe(data => {
console.log(data);
if(data.statusMessage == " Coupon Code Created Successfully") {
this.toastr.success('Coupon Created');
// this.coupons.unshift(couponItem);
location.reload();
}else {
this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
  timeOut: 3000,
});
}
});

      }
    
      

  getCouponCodes() {
    this.adminService.getAllCouponCodes().subscribe(data => {
      console.log(data);
      
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 50,
         lengthMenu : [10, 20, 25, 50],
      processing: true
    };
    this.dtTrigger.next()
    this.coupons = data.data;
    },
    err => {
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