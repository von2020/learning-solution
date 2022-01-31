import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from 'src/app/services/send-data.service';
import { CourseService } from 'src/app/services/course.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  FirstName: String;
  LastName: String;
  Email: String;
  Password: String;
  ConfirmPassword: String;
  PhoneNumber: String;
  levelTypeName: String;
  LevelTypeId: number;
  items: any;
  registerForm: FormGroup;
  registerFacilitatorForm: FormGroup;
  countdown: boolean = false;

  showModal: boolean;
  Code: String;

  email: any;

  constructor(
    private sendDataService: SendDataService,
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private courseService: CourseService,
    private authService: AuthService,
    private facilitatorService: FacilitatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseService.getCourseLevel().subscribe(
      (level) => {
        console.log(level.data);
        this.items = level.data;
        // console.log(this.levelType);

        // this.items = []

        // this.levelType.forEach(element => {
        //  this.items.push(element.levelTypeName);
        //   });

        // console.log(this.items)
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    this.registerForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      LevelTypeId: new FormControl(null, Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.registerFacilitatorForm = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onRegisterSubmit() {
    const value = {
      ...this.registerForm.value,
      LevelTypeId: Number(this.registerForm.value.LevelTypeId),
    };
    // let formObj = value.getRawValue();
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);
    // const user = {
    //   firstname: this.FirstName,
    //   lastname: this.LastName,
    //   email: this.Email,
    //   password: this.Password,
    //   confirmPassword: this.ConfirmPassword,
    //   phoneNumber: this.PhoneNumber,
    //   // levelTypeId: parseInt(this.levelTypeId)
    // }

    //Required Fields
    if (!this.validateService.validateRegister(this.registerForm.value)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.toastr.error(
        'Please fill in all fields',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );
      console.log('Please fill in all fields');
      // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // // Validate Email
    else if ((this.registerForm.value.LevelTypeId = 0)) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      this.toastr.error(
        'Please select a Level',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );

      console.log('Please select a Level');
      return false;
    }

    // // Validate Email
    else if (
      !this.validateService.validateEmail(this.registerForm.value.Email)
    ) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      this.toastr.error(
        'Please use a valid email',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );

      console.log('Please use a valid email');
      return false;
    } else if (
      this.registerForm.value.Password !=
      this.registerForm.value.ConfirmPassword
    ) {
      this.toastr.error(
        'Passwords do not Match',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );
      return false;
    }

    // Validate Password
    else if (
      !this.validateService.validatePassword(
        this.registerForm.value.ConfirmPassword
      )
    ) {
      // 1st parameter is a toast message text
      // 2nd parameter is optional. You can pass object with options.
      this.toastr.error(
        'Password must be at least six characters long including upper cases',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );
      return false;
    } else {
      //Register user
      this.authService.registerLearner(serializedForm).subscribe((data) => {
        console.log(data);
        if (data.statusCode == 200) {
          let userEmail = data.data.email;
          this.email = userEmail;
          this.sendDataService.setMessage(userEmail.toString());
          this.authService.StoreConfimationEmail(userEmail);
          console.log(userEmail.toString());
          this.authService.storeUserData(
            'Bearer ' + data.token,
            data.data,
            data.data.userId
          );
          this.toastr.info(
            'Please Activate your Account to Continue',
            'Account Activation!',
            {
              timeOut: 3000,
            }
          );
          this.router.navigate(['/confirmation']);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
        }
      });
    }
  }

  onRegisterFacilitatorSubmit() {
    // const value = { ...this.registerForm.value, LevelTypeId: Number(this.registerForm.value.LevelTypeId) };
    // let formObj = value.getRawValue();

    const value = this.registerFacilitatorForm.value;
    let serializedForm = JSON.stringify(value);
    console.log(serializedForm);
    // const user = {
    //   firstname: this.FirstName,
    //   lastname: this.LastName,
    //   email: this.Email,
    //   password: this.Password,
    //   confirmPassword: this.ConfirmPassword,
    //   phoneNumber: this.PhoneNumber,
    //   // levelTypeId: parseInt(this.levelTypeId)
    // }

    //Required Fields
    if (
      !this.validateService.validateRegister(this.registerFacilitatorForm.value)
    ) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.toastr.error(
        'Please fill in all fields',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );
      console.log('Please fill in all fields');
      // this.ngFlashMessageService.showFlashMessage('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // // Validate Email
    else if (
      !this.validateService.validateEmail(
        this.registerFacilitatorForm.value.Email
      )
    ) {
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      this.toastr.error(
        'Please use a valid email',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );

      console.log('Please use a valid email');
      return false;
    } else if (
      this.registerFacilitatorForm.value.Password !=
      this.registerFacilitatorForm.value.ConfirmPassword
    ) {
      this.toastr.error(
        'Passwords do not Match',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );
      return false;
    }

    // Validate Password
    else if (
      !this.validateService.validatePassword(
        this.registerFacilitatorForm.value.ConfirmPassword
      )
    ) {
      // 1st parameter is a toast message text
      // 2nd parameter is optional. You can pass object with options.
      this.toastr.error(
        'Password must be at least six characters long including upper cases',
        'One or more validation errors occurred!',
        {
          timeOut: 3000,
        }
      );
      return false;
    } else {
      //Register user
      this.authService.registerFacilitator(serializedForm).subscribe((data) => {
        console.log(data);
        if (data.statusCode == 200) {
          let userEmail = data.data.email;
          this.email = userEmail;
          this.sendDataService.setMessage(userEmail.toString());
          this.authService.StoreConfimationEmail(userEmail);
          console.log(userEmail.toString());
          this.authService.storeFacilitatorData(
            'Bearer ' + data.token,
            data.data,
            data.data.userId
          );
          this.toastr.info(
            'Please Activate your Account to Continue',
            'Account Activation!',
            {
              timeOut: 3000,
            }
          );

          $('#confirmModal').modal('show');
        } else if (data.statusMessage == 'This Email has been taken') {
          // alert(data.statusMessage)
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          this._flashMessagesService.show(data.statusMessage, {
            cssClass: 'alert-danger',
            timeout: 3000,
          });
          // this.router.navigate(['/login']);
        } else {
          this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
          // alert(data.statusMessage)
          // this._flashMessagesService.show(data.statusMessage, { cssClass: 'alert-danger', timeout: 3000 });
          // this.router.navigate(['/register']);
        }
      });
    }
  }

  onActivateSubmit() {
    const user = {
      email: this.email,
      Code: this.Code,
    };

    this.facilitatorService
      .activateFacilitatorAccount(JSON.stringify(user))
      .subscribe(
        (data) => {
          if (data.statusCode == 200) {
            this.toastr.success(data.statusMessage);
            // alert(data.statusMessage)
            // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
            $('#confirmModal').modal('hide');
            this.router.navigate(['/login']);
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

  startCountdown() {
    var maxTicks = 60;
    var tickCount = 0;

    var tick = () => {
      if (tickCount >= maxTicks) {
        // Stops the interval.
        clearInterval(myInterval);
        this.countdown = false;
        return;
      }

      /* The particular code you want to excute on each tick */
      document.getElementById('timer').innerHTML = (
        maxTicks - tickCount
      ).toString();

      tickCount++;
    };

    // Start calling tick function every 1 second.
    var myInterval = setInterval(tick, 1000);
  }

  resendCode() {
    this.facilitatorService
      .resendFacilitatorActivationCode(this.email)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.statusCode == 200) {
            this.toastr.success(data.statusMessage);
            this.countdown = true;
            this.startCountdown();
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

  // console.log(onRegisterSubmit)
}
