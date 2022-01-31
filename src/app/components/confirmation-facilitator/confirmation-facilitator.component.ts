import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FacilitatorService } from 'src/app/services/facilitator.service';
import { SendDataService } from 'src/app/services/send-data.service';

@Component({
  selector: 'app-confirmation-facilitator',
  templateUrl: './confirmation-facilitator.component.html',
  styleUrls: ['./confirmation-facilitator.component.css'],
})
export class ConfirmationFacilitatorComponent implements OnInit {
  Email: any;
  Code: String;
  countdown: boolean = false;

  constructor(
    private sendDataService: SendDataService,
    private facilitatorService: FacilitatorService,
    private _flashMessagesService: FlashMessagesService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      Email: this.Email,
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
      .resendFacilitatorActivationCode(this.Email)
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
}
