import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ischool } from '../../shared/Model';
import { AuthService } from '../../services/auth.service';
import {Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidateService } from 'src/app/services/validate.service';
import { SendDataService } from 'src/app/services/send-data.service';
declare var $:any;


@Component({
  selector: 'app-school-sign-up',
  templateUrl: './school-sign-up.component.html',
  styleUrls: ['./school-sign-up.component.css']
})
export class SchoolSignUpComponent implements OnInit, OnDestroy {

  school: Ischool;
  
  schoolTypes: Array<any>;
  constructor(private auth: AuthService, private router: Router,
    private toastr: ToastrService, private validateService: ValidateService,
    private sendDataService : SendDataService) {
    this.school = {};
    this.school.schoolTypeId = null;
    
    this.auth.getSchoolType().subscribe((res: any) => {
     
      this.schoolTypes = res.data;
      console.log(res.data);
    })
   }

  ngOnDestroy(): void {
    $('.header-section').css({ position: "relative" });
    $(".header-section").addClass("shadow");
    $(".navbar").addClass('navbar-light').removeClass('navbar-dark');
    $(".navbar").addClass('bg-white').removeClass('bg-light');
  }

  
  ngOnInit(): void {
    $(".header-section").removeAttr("style");
    $('.header-section').css({ position: "absolute" });
    $(".header-section").removeClass("shadow");
  }
  create() {
    console.log(this.school);
    this.school.confirmPassword = this.school.password;
    this.school.schoolTypeId = Number(this.school.schoolTypeId);

    // Validate Password
  if (!this.validateService.validatePassword(this.school.confirmPassword)) {
      // 1st parameter is a toast message text
          // 2nd parameter is optional. You can pass object with options.
          this.toastr.error('Password must be at least six characters long including upper cases', 'One or more validation errors occurred!', {
            timeOut: 3000,
          });
    return false;
  }

    // Validate School Code
    else if (!this.validateService.validateSchoolCode(this.school.schoolCode)) {
      // 1st parameter is a toast message text
          // 2nd parameter is optional. You can pass object with options.
          this.toastr.error('School Code must contain only Alphabets and be in Uppercase only', 'One or more validation errors occurred!', {
            timeOut: 3000,
          });
    return false;
  }

  else {

    this.auth.postNewSchool(this.school).subscribe((res: any) => {
      console.log(res)
      if (res.statusCode == 200) {
        this.toastr.success(res.statusMessage);
        let userEmail = this.school.email;
        // this.email = userEmail;
        this.sendDataService.setMessage(userEmail.toString());
        this.auth.StoreConfimationEmail(userEmail);
        console.log(userEmail.toString());
        this.toastr.info('Please Activate your Account to Continue', 'Account Activation!', {
          timeOut: 3000,
        });
        this.router.navigate(['/confirmation-school']);
      }
      else {
        this.toastr.error(res.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
      }
    },
    err => {
      console.log(err);
      this.toastr.error(err.errors, 'Something Went Wrong!', {
        timeOut: 3000,
      });
      return false;
    })
  }
}



}