import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { LearnerService } from 'src/app/services/learner.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Email: String;
  Password: String;
  loginForm: FormGroup;
  firstname: any;
  facilitator: boolean;
  showModal: boolean;
  Code: String;

  email: any;

  constructor(
    private validateService: ValidateService,
    private sendDataService: SendDataService,
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private learnerService: LearnerService,
    private authService: AuthService,
    private facilitatorService: FacilitatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // $('#confirmModal').modal({ show: false})

    $('#confirmModal').modal('hide');

    this.loginForm = new FormGroup({
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onLoginSubmit() {
    const value = this.loginForm.value;
    // let formObj = value.getRawValue();
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);
    // const user = {
    //   email: this.Email,
    //   password: this.Password
    // }

    //Required Fields
    if (!this.validateService.validateRegister(this.loginForm.value)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // alert('Please fill in all fields')
      this.toastr.error('Please fill in all fields', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      // this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please fill in all fields');
      // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(this.loginForm.value.Email)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // alert('Please use a valid email')
      this.toastr.error('Please use a valid email', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please use a valid email');
      return false;
    }

    this.authService.loginLearner(serializedForm).subscribe((data) => {
      console.log(data);
      if (data.statusCode == 200) {
        let userFirstname = data.data.firstName;
        this.sendDataService.setMessage(userFirstname.toString());
        console.log(userFirstname.toString());
        this.authService.storeUserData(
          'Bearer ' + data.token,
          data.data,
          data.data.userId
        );

        this.toastr.success(data.statusMessage);

        // alert(data.statusMessage)
        // this._flashMessagesService.show('You are now Logged in', {cssClass: 'alert-success', closeOnClick: true,});
        this.router.navigate(['/home-learner']);
      } else if (
        data.statusMessage == 'This Account Exist but has not been Activated!'
      ) {
        this.toastr.error(data.statusMessage, 'Inactive Account', {
          timeOut: 3000,
        });
        // alert(data.statusMessage)
        let userEmail = this.loginForm.value.Email;
        this.sendDataService.setMessage(userEmail);
        this.authService.StoreConfimationEmail(userEmail);
        this.resendLearnerCode(userEmail);
        this.router.navigate(['/confirmation']);
      } else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        this.router.navigate(['/login']);
        // alert(data.statusMessage)
      }
    });
  }

  resendLearnerCode(userEmail: any) {
    this.learnerService.resendLearnerActivationCode(userEmail).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this.toastr.success(data.statusMessage);
          // alert(data.statusMessage)
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
          // this.router.navigate(['login'])
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // alert(data.statusMessage)
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  onFacilitatorLogin() {
    const value = this.loginForm.value;
    // let formObj = value.getRawValue();
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);
    // const user = {
    //   email: this.Email,
    //   password: this.Password
    // }

    //Required Fields
    if (!this.validateService.validateRegister(this.loginForm.value)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.toastr.error('Please fill in all fields', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      console.log('Please fill in all fields');
      // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(this.loginForm.value.Email)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });

      this.toastr.error('Please use a valid email', 'Something Went Wrong!', {
        timeOut: 3000,
      });

      console.log('Please use a valid email');
      return false;
    }

    this.authService.loginFacilitator(serializedForm).subscribe((data) => {
      console.log(data);
      if (data.statusCode == 200) {
        let userFirstname = data.data.firstName;
        this.sendDataService.setMessage(userFirstname.toString());
        this.authService.storeFacilitatorData(
          'Bearer ' + data.token,
          data.data,
          data.data.userId
        );
        // alert(data.statusMessage)
        this.toastr.success('Login Successful');
        // this._flashMessagesService.show('You are now Logged in', {cssClass: 'alert-success', closeOnClick: true,});
        switch (data.data.facilitatorTypeId) {
          case 1:
            this.router.navigate(['/home-teachers']);
            break;
          case 2:
            this.router.navigate(['/home-internal-facilitator']);
            break;
        }
      } else if (
        data.statusMessage == 'This Account Exist but has not been Activated'
      ) {
        // let userEmail = this.loginForm.value.Email;
        // this.email = userEmail;
        // this.sendDataService.setMessage(userEmail)
        // this.resendCode()
        // this.router.navigate(['/teacher-home'])
        // $('#confirmModal').modal('show');
        // alert(data.statusMessage)
        let userEmail = this.loginForm.value.Email;
        this.sendDataService.setMessage(userEmail);
        this.resendLearnerCode(userEmail);
        this.router.navigate(['/confirmation-facilitator']);
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.show();
      } else {
        // alert(data.statusMessage)

        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['/login'])
      }
    });
  }

  //   show()
  // {
  //   this.showModal = true; // Show-Hide Modal Check
  //   // this.content = "This is content!!"; // Dynamic Data
  //   // this.title = "This is title!!";    // Dynamic Data
  // }
  // //Bootstrap Modal Close event
  // hide()
  // {
  //   this.showModal = false;
  // }

  onActivateSubmit() {
    const user = {
      email: this.email,
      Code: this.Code,
    };

    this.facilitatorService
      .activateFacilitatorAccount(JSON.stringify(user))
      .subscribe((data) => {
        if (data.statusCode == 200) {
          // alert(data.statusMessage)
          this.toastr.success(data.statusMessage);
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
          this.router.navigate(['login']);
          $('#confirmModal').modal('hide');
        } else {
          // alert(data.statusMessage)
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
          // this.router.navigate(['confirmation'])
        }
      });
  }

  resendCode() {
    this.facilitatorService
      .resendFacilitatorActivationCode(this.email)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.statusCode == 200) {
            this.toastr.success(data.statusMessage);
            // alert(data.statusMessage)
            // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
            this.router.navigate(['login']);
          } else {
            this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
              timeOut: 3000,
            });
            // alert(data.statusMessage)
            // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
            // this.router.navigate(['confirmation'])
          }
        },
        (err) => {
          console.log(err);
          return false;
        }
      );
  }
}
