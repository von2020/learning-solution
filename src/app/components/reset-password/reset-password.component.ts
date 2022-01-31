import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';
import { ValidateService } from 'src/app/services/validate.service';
declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  Email: any;
  NewPassword: any;
  OldPassword: any;
  ConfirmPassword: any;
  userId: string;
  sessionId: string;
  userType: string;

  constructor(
    private route: ActivatedRoute,
    private validateService: ValidateService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.userType = this.route.snapshot.queryParamMap.get('userType');
    this.sessionId = this.route.snapshot.queryParamMap.get('sessionId');
  }

  ngOnInit(): void {}

  onResetSubmit() {
    if (this.NewPassword != this.ConfirmPassword) {
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
    else if (!this.validateService.validatePassword(this.ConfirmPassword)) {
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
      const user = {
        userId: this.userId,
        newPassword: this.NewPassword,
        sessionId: this.sessionId,
        userType: this.userType,
      };

      console.log(user);

      this.authService
        .resetInternalFacilitatorPassword(
          JSON.stringify(user),
          this.userId,
          this.sessionId,
          this.NewPassword,
          this.userType
        )
        .subscribe((data) => {
          console.log(data);
          if (data.statusCode == 200) {
            this.toastr.success(data.statusMessage);
            // alert(data.statusMessage)
            // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
            $('#changeModal').modal('hide');
            $('.toast').toast('show');
            this.router.navigate(['login']);
          } else {
            this.toastr.error(data.statusMessage, 'Something Went Wrong!', {
              timeOut: 3000,
            });
            // this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
            // // this.router.navigate(['confirmation'])
            // alert(data.statusMessage)
          }
        });
    }
  }
}
