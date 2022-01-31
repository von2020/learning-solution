import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
declare var $:any;

@Component({
  selector: 'app-forgot-password-learner',
  templateUrl: './forgot-password-learner.component.html',
  styleUrls: ['./forgot-password-learner.component.css']
})
export class ForgotPasswordLearnerComponent implements OnInit {

  Email: any;
  Code: any;
  NewPassword: any;
  ConfirmPassword: any;

  constructor(private sendDataService : SendDataService,
    private validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onResetSubmit() {
    // const user = {
    //   email: this.Email
    // }

    console.log(this.Email)

    // Validate Email
  if (!this.validateService.validateEmail(this.Email)) {
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

if (!this.validateService.validateNoEmail(this.Email)) {
  // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      // alert('Please use a valid email')
      this.toastr.error('This Field cannot be empty', 'Something Went Wrong!', {
        timeOut: 3000,
      });
      // this._flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
console.log('This Field cannot be empty');
return false;
}

    this.authService.resetLearnerPassword(this.Email).subscribe(data => {
      console.log(data);
      if(data.statusCode == 200){
        // alert(data.statusMessage)
        this.toastr.success(data.statusMessage);
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
        $('#resetModal').modal('show');
        // this.router.navigate(['login'])
      }else {
        this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // this.router.navigate(['confirmation'])
      }
    });
  }

  getCode() {
        this.sendDataService.setMessage(this.Code)
        $('#resetModal').modal('hide');
        $('#changeModal').modal('show');
  }

  onChangePasswordSubmit() {
    const user = {
      Code: this.sendDataService.getMessage(),
      NewPassword : this.NewPassword,
      ConfirmPassword : this.ConfirmPassword
    }

    console.log(user)

    this.authService.changeLearnerPassword(JSON.stringify(user)).subscribe(data => {
      if(data.statusCode == 200){
        this.toastr.success(data.statusMessage);
        // alert(data.statusMessage)
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
        $('#changeModal').modal('hide');
        $('.toast').toast('show')
        this.router.navigate(['login'])
      }else {
        this.toastr.error(data.statusMessage, `password error`, {
          timeOut: 3000,
        });
        // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
        // // this.router.navigate(['confirmation'])
        // alert(data.statusMessage)
      }
    }, error=>{
      console.log(error.error.statusMessage, 'see me o')
      
      this.toastr.error(error.error.statusMessage);
    });
  }

}
