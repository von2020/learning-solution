import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-confirmation-school',
  templateUrl: './confirmation-school.component.html',
  styleUrls: ['./confirmation-school.component.css'],
})
export class ConfirmationSchoolComponent implements OnInit, OnDestroy {
  Email: any;
  Code: String;
  countdown: boolean = false;

  constructor(
    private sendDataService: SendDataService,
    private toastr: ToastrService,
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    $('.header-section').css({ position: 'relative' });
    $('.header-section').addClass('shadow');
    $('.navbar').addClass('navbar-light').removeClass('navbar-dark');
    $('.navbar').addClass('bg-white').removeClass('bg-light');

    this.authService.removeConfimationEmail();
  }

  ngOnInit(): void {
    $('.header-section').removeAttr('style');
    $('.header-section').css({ position: 'absolute' });
    $('.header-section').removeClass('shadow');
    this.Email =
      this.sendDataService.getMessage() ||
      JSON.parse(this.authService.getConfimationEmail());

    console.log(this.Email);
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

  onActivateSubmit() {
    const user = {
      email: this.Email,
      Code: this.Code,
    };

    this.authService.postActivation(user).subscribe(
      (red: any) => {
        console.log(red.data);
        if (red.statusCode == 200) {
          this.toastr.success(red.statusMessage);
          this.router.navigate(['/school-log-in']);
        } else {
          this.toastr.error(red.statusMessage, 'Something Went Wrong!', {
            timeOut: 3000,
          });
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.title, 'Something Went Wrong!', {
          timeOut: 3000,
        });
        return false;
      }
    );

    // this.authService.activateAccount(JSON.stringify(user)).subscribe(data => {
    //   console.log(data);
    //   if(data){
    //     alert(data.statusMessage)
    //     this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-success', closeOnClick: true,});
    //     this.router.navigate(['login'])
    //   }else {
    //     alert(data.statusMessage)
    //     this._flashMessagesService.show(data.statusMessage, {cssClass: 'alert-danger', closeOnClick: true, timeout: 5000});
    //     this.router.navigate(['confirmation'])
    //   }
    // });
  }

  resendCode() {
    this.authService.resendSchoolActivationCode(this.Email).subscribe(
      (data) => {
        console.log(data);
        if (data.statusCode == 200) {
          this._flashMessagesService.show(data.statusMessage, {
            cssClass: 'alert-success',
            closeOnClick: true,
          });
          this.countdown = true;
          this.startCountdown();
          // this.router.navigate(['/school-log-in']);
        } else {
          this._flashMessagesService.show(data.statusMessage, {
            cssClass: 'alert-danger',
            closeOnClick: true,
            timeout: 5000,
          });
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
